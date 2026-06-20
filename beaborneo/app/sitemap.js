import { siteConfig } from '@/lib/seo';
import { locales, localeHtmlLang } from '@/lib/i18n';
import { getAllTourSlugs } from '@/lib/sanity.queries';

const baseUrl = siteConfig.baseUrl;

const staticRoutes = ['', '/about', '/tours', '/car-rental', '/events', '/contact'];

function buildAlternates(path) {
  const languages = {};
  locales.forEach((locale) => {
    languages[localeHtmlLang[locale]] = `${baseUrl}/${locale}${path}`;
  });
  return { languages };
}

export default async function sitemap() {
  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
      alternates: buildAlternates(route),
    }))
  );

  let tourEntries = [];
  try {
    const slugs = await getAllTourSlugs();
    tourEntries = (slugs || []).flatMap(({ slug }) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/tours/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: buildAlternates(`/tours/${slug}`),
      }))
    );
  } catch {
    // Sanity unavailable at build time — tour pages omitted from sitemap
  }

  return [...staticEntries, ...tourEntries];
}
