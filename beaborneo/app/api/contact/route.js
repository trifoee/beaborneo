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

export async function POST(request) {
  /* 1. Read & validate input */
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

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format.' },
      { status: 400 },
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
