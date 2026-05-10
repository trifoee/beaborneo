/**
 * On-Demand Revalidation Webhook
 *
 * Sanity calls this endpoint whenever a document is created, updated,
 * or deleted. We verify the request signature, then call
 * `revalidateTag()` for the affected document type so the next visitor
 * gets fresh data without waiting for a full Next.js rebuild.
 *
 * ─── Setup ───────────────────────────────────────────────────────────
 *   1. Add SANITY_REVALIDATE_SECRET to your environment (.env.local
 *      locally, project settings on Vercel).
 *   2. In Sanity → Manage → API → Webhooks, create a GROQ-powered
 *      webhook with:
 *        URL:      https://<your-domain>/api/revalidate
 *        Dataset:  production
 *        Trigger:  Create, Update, Delete
 *        Filter:   _type in [
 *                    "tour", "transportService", "contactInfo",
 *                    "galleryImage", "ourStory", "ourValue",
 *                    "socialLinks", "activityPackage", "testimonial"
 *                  ]
 *        Projection: { _type, "slug": slug.current }
 *        HTTP method: POST
 *        Secret:   <same value as SANITY_REVALIDATE_SECRET>
 *
 * The endpoint is intentionally tolerant: unknown _types still trigger
 * a generic revalidation so editors never feel stuck.
 */

import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

/* Map a Sanity _type → cache tag(s).
   Keep these in sync with `lib/sanity.queries.js`. */
const TYPE_TO_TAGS = {
  tour: ['tour'],
  transportService: ['transportService'],
  contactInfo: ['contactInfo'],
  galleryImage: ['galleryImage'],
  ourStory: ['ourStory'],
  ourValue: ['ourValue'],
  socialLinks: ['socialLinks'],
  activityPackage: ['activityPackage'],
  testimonial: ['testimonial'],
};

/* Routes that consume each document type. We revalidate them as a
   belt-and-braces fallback so visitors never see stale content even
   if a fetch was missing a tag. Use Next.js route patterns. */
const TYPE_TO_PATHS = {
  tour: ['/[locale]', '/[locale]/tours', '/[locale]/tours/[slug]'],
  transportService: ['/[locale]/car-rental'],
  contactInfo: ['/[locale]/contact'],
  galleryImage: ['/[locale]'],
  ourStory: ['/[locale]/about'],
  ourValue: ['/[locale]/about'],
  socialLinks: ['/[locale]', '/[locale]/contact'],
  activityPackage: ['/[locale]/tours', '/[locale]/tours/[slug]'],
  testimonial: ['/[locale]'],
};

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error('[revalidate] Missing SANITY_REVALIDATE_SECRET env var');
    return NextResponse.json(
      { ok: false, message: 'Server is missing SANITY_REVALIDATE_SECRET' },
      { status: 500 },
    );
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return NextResponse.json(
      { ok: false, message: 'Missing signature header' },
      { status: 401 },
    );
  }

  /* Read the raw body — signature verification needs the exact bytes
     Sanity sent, before any JSON parsing. */
  const rawBody = await request.text();

  let valid;
  try {
    valid = await isValidSignature(rawBody, signature, secret);
  } catch (err) {
    console.error('[revalidate] Signature verification threw:', err);
    valid = false;
  }

  if (!valid) {
    return NextResponse.json(
      { ok: false, message: 'Invalid signature' },
      { status: 401 },
    );
  }

  let body;
  try {
    body = rawBody ? JSON.parse(rawBody) : null;
  } catch (err) {
    console.error('[revalidate] Could not parse JSON:', err);
    return NextResponse.json(
      { ok: false, message: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { ok: false, message: 'Empty body' },
      { status: 400 },
    );
  }

  const { _type, slug } = body;
  if (!_type) {
    return NextResponse.json(
      { ok: false, message: 'Missing _type in payload' },
      { status: 400 },
    );
  }

  const tags = TYPE_TO_TAGS[_type] || [_type];
  const paths = TYPE_TO_PATHS[_type] || [];

  /* Always revalidate the type-level tag. */
  for (const tag of tags) revalidateTag(tag);

  /* Slug-scoped tag (e.g. tour:my-cool-trip) for tour detail pages. */
  const slugCurrent =
    typeof slug === 'string' ? slug : slug?.current || null;
  if (_type === 'tour' && slugCurrent) {
    revalidateTag(`tour:${slugCurrent}`);
  }

  /* Belt-and-braces: revalidate the actual route paths. */
  for (const path of paths) revalidatePath(path, 'page');

  return NextResponse.json({
    ok: true,
    revalidated: { tags, paths, _type, slug: slugCurrent },
    now: Date.now(),
  });
}

/* GET ping for quick smoke testing — does not reveal the secret. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      'Sanity revalidation endpoint. POST a signed Sanity webhook to trigger a refresh.',
  });
}
