/**
 * MetaTags Component
 * 
 * Renders JSON-LD structured data for SEO.
 * Used alongside Next.js metadata API.
 */

import { generateOrganizationSchema, generateTourSchema } from '@/lib/seo';

/**
 * JSON-LD Script Component
 * Renders structured data as a script tag
 */
function JsonLd({ data }) {
  if (!data) return null;
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization Schema
 * Add to layout for site-wide organization data
 */
export function OrganizationJsonLd({ locale }) {
  const schema = generateOrganizationSchema(locale);
  return <JsonLd data={schema} />;
}

/**
 * Tour Schema
 * Add to tour detail pages
 */
export function TourJsonLd({ tour, locale }) {
  const schema = generateTourSchema(tour, locale);
  return <JsonLd data={schema} />;
}

/**
 * Breadcrumb Schema
 * For better search result display
 */
export function BreadcrumbJsonLd({ items }) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * FAQ Schema
 * For FAQ pages or sections
 */
export function FaqJsonLd({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

export default function MetaTags({ locale, type = 'organization', data }) {
  switch (type) {
    case 'organization':
      return <OrganizationJsonLd locale={locale} />;
    case 'tour':
      return <TourJsonLd tour={data} locale={locale} />;
    case 'breadcrumb':
      return <BreadcrumbJsonLd items={data} />;
    case 'faq':
      return <FaqJsonLd faqs={data} />;
    default:
      return null;
  }
}
