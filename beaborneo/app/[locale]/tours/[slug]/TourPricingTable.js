import { getLocalizedField } from '@/lib/sanity.utils';

export default function TourPricingTable({ tour, locale }) {
  const { pricingType } = tour;

  if (pricingType === 'package' && tour.packagePricing?.length > 0) {
    return <PackagePricing rows={tour.packagePricing} locale={locale} />;
  }

  if (pricingType === 'group' && tour.groupPricing?.length > 0) {
    return <GroupPricing rows={tour.groupPricing} locale={locale} />;
  }

  if (pricingType === 'market' && tour.marketPricing?.length > 0) {
    return <MarketPricing rows={tour.marketPricing} locale={locale} />;
  }

  if (
    pricingType === 'accommodation' &&
    tour.accommodationPricingSimple?.length > 0
  ) {
    return (
      <AccommodationPricing
        rows={tour.accommodationPricingSimple}
        locale={locale}
      />
    );
  }

  return (
    <div className="text-center py-2">
      <p className="text-gray-500 text-sm">
        {locale === 'en'
          ? 'Contact us for pricing'
          : 'Hubungi kami untuk harga'}
      </p>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="font-heading text-lg font-bold text-gray-900 mb-4 text-center">
      {children}
    </h3>
  );
}

function PackagePricing({ rows, locale }) {
  return (
    <div>
      <SectionTitle>
        {locale === 'en' ? 'Pricing' : 'Harga'}
      </SectionTitle>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="pb-2 text-left font-medium">
              {locale === 'en' ? 'Package' : 'Pakej'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'Adult' : 'Dewasa'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'Child' : 'Kanak'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50">
              <td className="py-2 font-medium text-gray-900">
                {getLocalizedField(row.package, locale)}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.adult || '—'}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.child || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupPricing({ rows, locale }) {
  return (
    <div>
      <SectionTitle>
        {locale === 'en' ? 'Group Pricing' : 'Harga Kumpulan'}
      </SectionTitle>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="pb-2 text-left font-medium">
              {locale === 'en' ? 'Pax' : 'Pax'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'Adult' : 'Dewasa'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'Child' : 'Kanak'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50">
              <td className="py-2 font-medium text-gray-900">
                {getLocalizedField(row.groupPax, locale)}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.adult || '—'}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.child || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MarketPricing({ rows, locale }) {
  return (
    <div>
      <SectionTitle>
        {locale === 'en' ? 'Pricing' : 'Harga'}
      </SectionTitle>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="pb-2 text-left font-medium">
              {locale === 'en' ? 'Pax' : 'Pax'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'Malaysian' : 'Rakyat MY'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'International' : 'Antarabangsa'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50">
              <td className="py-2 font-medium text-gray-900">
                {getLocalizedField(row.groupPax, locale)}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.malaysian || '—'}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.international || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccommodationPricing({ rows, locale }) {
  return (
    <div>
      <SectionTitle>
        {locale === 'en' ? 'Accommodation Rates' : 'Kadar Penginapan'}
      </SectionTitle>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="pb-2 text-left font-medium">
              {locale === 'en' ? 'Type' : 'Jenis'}
            </th>
            <th className="pb-2 text-right font-medium">
              {locale === 'en' ? 'Per Person' : 'Seorang'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50">
              <td className="py-2 font-medium text-gray-900">
                {getLocalizedField(row.accommodation, locale)}
              </td>
              <td className="py-2 text-right text-gray-700">
                {row.price || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
