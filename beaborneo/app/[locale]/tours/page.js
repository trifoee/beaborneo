import { getAllTours } from '@/lib/sanity.queries';
import ToursPageClient from './ToursPageClient';

export default async function ToursPage({ params }) {
  const { locale } = await params;

  let tours = [];
  try {
    tours = (await getAllTours()) || [];
  } catch (err) {
    console.error('Failed to fetch tours from Sanity:', err);
  }

  return <ToursPageClient locale={locale} tours={tours} />;
}
