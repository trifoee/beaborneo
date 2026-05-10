/**
 * Server-side QR Code component.
 *
 * Generates an SVG QR code at build/render time using the `qrcode`
 * package. Because the SVG is inlined into the page HTML, no client
 * JS is needed and the QR is fully static.
 *
 * Usage:
 *   <QRCode value="https://example.com" size={220} />
 */

import QR from 'qrcode';

export default async function QRCode({
  value,
  size = 220,
  margin = 1,
  color = '#111827',
  background = '#ffffff',
  className = '',
  alt = 'QR code',
}) {
  if (!value) return null;

  let svg;
  try {
    svg = await QR.toString(value, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin,
      color: { dark: color, light: background },
      width: size,
    });
  } catch (err) {
    console.error('[QRCode] Failed to generate QR for', value, err);
    return null;
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={className}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
