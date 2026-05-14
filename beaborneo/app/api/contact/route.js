/**
 * Contact Form API Route
 *
 * Sends contact form submissions as formatted emails via Resend.
 *
 * Required env vars (set in .env.local locally and in Vercel):
 *   RESEND_API_KEY  Resend API key (re_...)
 *   FROM_EMAIL      Sender address — must live on a domain verified in
 *                   Resend, e.g. "Bea Borneo Travel <noreply@beaborneo.com>"
 *   CONTACT_EMAIL   Inbox that receives form submissions, e.g.
 *                   "contact@beaborneo.com"
 */

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const SUBJECT_LABELS = {
  general: 'General Inquiry',
  booking: 'Tour Booking',
  custom: 'Custom Tour Request',
  feedback: 'Feedback',
};

/* ------------------------------------------------------------------ */
/*  Lazy Resend client                                                 */
/* ------------------------------------------------------------------ */
/* Initialising at module scope crashes the build when the env var is
   missing. We defer it so build/CI never fails on import — only
   actual POSTs require the key. */

let _resend = null;
function getResend() {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

/* ------------------------------------------------------------------ */
/*  Email template                                                     */
/* ------------------------------------------------------------------ */

function escapeHtml(input) {
  if (input == null) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailHtml({ name, email, phone, subject, message }) {
  const subjectLabel = SUBJECT_LABELS[subject] || subject || 'General Inquiry';
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    subject: escapeHtml(subjectLabel),
    message: escapeHtml(message),
  };

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
      <div style="background: #E31E24; padding: 32px 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">
          New Contact Form Submission
        </h1>
        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">
          ${safe.subject}
        </p>
      </div>

      <div style="background: #ffffff; padding: 32px 24px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; width: 120px; color: #6b7280; font-size: 14px; vertical-align: top;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${safe.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="mailto:${safe.email}" style="color: #E31E24; text-decoration: none;">${safe.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${safe.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Subject</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${safe.subject}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <p style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
          <div style="background: #f9fafb; border-radius: 8px; padding: 16px; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safe.message}</div>
        </div>
      </div>

      <div style="background: #f9fafb; padding: 20px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
          This email was sent from the contact form at beaborneo.com
        </p>
      </div>
    </div>
  `;
}

function buildEmailText({ name, email, phone, subject, message }) {
  const subjectLabel = SUBJECT_LABELS[subject] || subject || 'General Inquiry';
  return [
    `New contact form submission`,
    ``,
    `Subject: ${subjectLabel}`,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || 'Not provided'}`,
    ``,
    `Message:`,
    `${message}`,
    ``,
    `— Sent from the contact form at beaborneo.com`,
  ].join('\n');
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s\-().]{7,20}$/;
const VALID_SUBJECTS = new Set(['', 'general', 'booking', 'custom', 'feedback']);
const MAX_LEN = { name: 100, email: 254, phone: 30, message: 2000 };

/* Spam keyword patterns — case-insensitive partial matches */
const SPAM_KEYWORDS = [
  /\bcasino\b/i,
  /\bviagra\b/i,
  /\bcialis\b/i,
  /\bcryptocurren/i,
  /\bnft\b/i,
  /\bseo\s+service/i,
  /\bbacklink/i,
  /\bgucci\s+replica/i,
  /\bloan\s+offer/i,
  /\bunclaimed\s+(prize|reward)/i,
  /\bclick\s+here\s+to\s+claim/i,
];

/* Best-effort in-process rate limiting (serverless-safe-ish).
   Prevents bursts on warm instances. Swap for Upstash/Redis for
   cross-instance protection. */
const RATE_LIMITS = { perMinute: 3, perHour: 15 };
const buckets = globalThis.__beaborneoContactBuckets || new Map();
globalThis.__beaborneoContactBuckets = buckets;

function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function hitRateLimit(key, now) {
  const entry = buckets.get(key) || { hits: [] };
  entry.hits = entry.hits.filter((t) => now - t < 60 * 60 * 1000);
  entry.hits.push(now);
  const hitsLastMinute = entry.hits.filter((t) => now - t < 60 * 1000).length;
  const hitsLastHour = entry.hits.length;
  buckets.set(key, entry);
  if (hitsLastMinute > RATE_LIMITS.perMinute) return { limited: true, window: 'minute' };
  if (hitsLastHour > RATE_LIMITS.perHour) return { limited: true, window: 'hour' };
  return { limited: false };
}

function countUrls(text) {
  if (!text) return 0;
  const matches = String(text).match(/https?:\/\/|www\./gi);
  return matches ? matches.length : 0;
}

function isSpam(text) {
  if (!text) return false;
  return SPAM_KEYWORDS.some((re) => re.test(text));
}

export async function POST(request) {
  /* 1. Require the custom header set by our ContactForm fetch call.
     This blocks direct API calls from scripts that don't mimic a browser. */
  if (request.headers.get('x-requested-with') !== 'XMLHttpRequest') {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  /* 2. Origin / Referer check — only accept requests from the same site. */
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL || null;
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (allowedOrigin && origin && !origin.startsWith(allowedOrigin)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  if (allowedOrigin && !origin && referer && !referer.startsWith(allowedOrigin)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  /* 3. Read & validate input */
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = body || {};
  const { website, startedAt } = body || {};

  // Honeypot: bots often fill every field. Pretend success.
  if (website) {
    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you soon!' },
      { status: 200 },
    );
  }

  // Minimum time-on-page check (basic bot deterrent)
  const now = Date.now();
  const startedAtNum = Number(startedAt);
  if (!Number.isFinite(startedAtNum) || now - startedAtNum < 2500) {
    return NextResponse.json(
      { error: 'Please wait a moment before submitting the form.' },
      { status: 429 },
    );
  }

  // Rate limit by IP
  const ip = getClientIp(request);
  const rlIp = hitRateLimit(`ip:${ip}`, now);
  if (rlIp.limited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(String(email))) {
    return NextResponse.json(
      { error: 'Invalid email format.' },
      { status: 400 },
    );
  }

  // Rate limit by email address (catches same sender across IPs)
  const rlEmail = hitRateLimit(`email:${String(email).toLowerCase()}`, now);
  if (rlEmail.limited) {
    return NextResponse.json(
      { error: 'Too many requests from this email. Please try again later.' },
      { status: 429 },
    );
  }

  // Phone format (optional field — only validate when provided)
  if (phone && !PHONE_REGEX.test(String(phone))) {
    return NextResponse.json(
      { error: 'Invalid phone number format.' },
      { status: 400 },
    );
  }

  // Subject must be one of the known values
  if (!VALID_SUBJECTS.has(String(subject || ''))) {
    return NextResponse.json(
      { error: 'Invalid subject.' },
      { status: 400 },
    );
  }

  // Length limits
  if (
    String(name).length > MAX_LEN.name ||
    String(email).length > MAX_LEN.email ||
    String(phone || '').length > MAX_LEN.phone ||
    String(message).length > MAX_LEN.message
  ) {
    return NextResponse.json(
      { error: 'Your message is too long. Please shorten it and try again.' },
      { status: 413 },
    );
  }

  // Too many URLs → likely spam
  const urlCount = countUrls(message);
  if (urlCount >= 3) {
    return NextResponse.json(
      { error: 'Please remove links from the message and try again.' },
      { status: 400 },
    );
  }

  // Keyword spam filter
  if (isSpam(message) || isSpam(name)) {
    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you soon!' },
      { status: 200 },
    );
  }

  /* 2. Validate server config (don't leak details to the client) */
  const resend = getResend();
  const fromEmail = process.env.FROM_EMAIL;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resend || !fromEmail || !contactEmail) {
    console.error(
      '[contact] Missing email config. Set RESEND_API_KEY, FROM_EMAIL, and CONTACT_EMAIL.',
      {
        hasResendKey: Boolean(process.env.RESEND_API_KEY),
        hasFromEmail: Boolean(fromEmail),
        hasContactEmail: Boolean(contactEmail),
      },
    );
    return NextResponse.json(
      { error: 'Email service is not configured. Please contact us directly.' },
      { status: 500 },
    );
  }

  /* 3. Send via Resend */
  const subjectLabel = SUBJECT_LABELS[subject] || subject || 'General Inquiry';

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: email,
      subject: `[Bea Borneo] ${subjectLabel} — ${name}`,
      html: buildEmailHtml({ name, email, phone, subject, message }),
      text: buildEmailText({ name, email, phone, subject, message }),
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data?.id,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 },
  );
}
