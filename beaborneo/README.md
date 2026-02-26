# Bea Borneo Travel - Multilingual Travel Agency Website

A production-ready, multilingual marketing website for a travel agency built with Next.js 16 and Tailwind CSS.

## Features

- 🌐 **Multilingual Support**: English, Bahasa Melayu, Bahasa Indonesia
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 📝 **CMS Ready**: Sanity CMS schema placeholders included
- 🔍 **SEO Optimized**: Meta tags, Open Graph, structured data
- ⚡ **Fast Performance**: Next.js App Router with optimized images

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity (v3) - Schema placeholders ready
- **Deployment**: Vercel (recommended)

## Project Structure

```
beaborneo/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.js       # Locale layout
│   │   ├── page.js         # Home page
│   │   ├── about/          # About page
│   │   ├── tours/          # Tours listing & detail
│   │   ├── contact/        # Contact page
│   │   └── not-found.js    # 404 page
│   ├── api/
│   │   └── contact/        # Contact form API
│   ├── layout.js           # Root layout
│   ├── page.js             # Root redirect
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Hero, FeaturedTours, etc.
│   ├── ui/                 # Button, Card, ImageBlock
│   └── seo/                # MetaTags, JSON-LD
├── lib/
│   ├── i18n.js             # Internationalization
│   ├── sanity.client.js    # Sanity client config
│   ├── sanity.queries.js   # GROQ queries
│   ├── seo.js              # SEO utilities
│   └── utils.js            # Helper functions
├── sanity/
│   ├── sanity.config.js    # Sanity Studio config
│   └── schemas/            # Content type schemas
├── public/
│   └── images/             # Static images
├── middleware.js           # Locale detection
├── next.config.mjs         # Next.js config
└── .env.local.example      # Environment variables template
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd beaborneo
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Multilingual Routes

The site supports three languages with URL-based routing:

- English: `/en`, `/en/about`, `/en/tours`, `/en/contact`
- Bahasa Melayu: `/ms`, `/ms/about`, `/ms/tours`, `/ms/contact`
- Bahasa Indonesia: `/id`, `/id/about`, `/id/tours`, `/id/contact`

## Content Management

### Current State (Hardcoded Content)

All content is currently hardcoded with comments indicating where CMS data should replace it:

```javascript
/**
 * Hardcoded home page content
 * TODO: Replace with Sanity CMS data
 * Usage: const content = await getHomePage();
 */
const homeContent = {
  hero: {
    title: {
      en: 'Discover the Wild Beauty of Borneo',
      ms: 'Temui Keindahan Liar Borneo',
      id: 'Temukan Keindahan Liar Borneo',
    },
    // ...
  },
};
```

### Integrating Sanity CMS

1. Create a Sanity project at [sanity.io](https://www.sanity.io/)
2. Install Sanity dependencies:
```bash
npm install @sanity/client @sanity/image-url
```
3. Update environment variables with your Sanity project details
4. Uncomment and configure `sanity/sanity.config.js`
5. Replace hardcoded content with CMS queries

## Localized Content Pattern

Content follows a consistent localization pattern:

```javascript
// Content structure
const content = {
  title: {
    en: 'English Title',
    ms: 'Tajuk Bahasa Melayu',
    id: 'Judul Bahasa Indonesia',
  },
};

// Access pattern
const localizedTitle = content.title[locale];

// Or using helper function
import { getLocalizedValue } from '@/lib/i18n';
const localizedTitle = getLocalizedValue(content.title, locale);
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Site URL | Yes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | For CMS |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | For CMS |
| `SANITY_API_TOKEN` | Sanity API token | For CMS |
| `CONTACT_EMAIL` | Email for contact form | For contact |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted

## Future Enhancements

- [ ] Online booking system
- [ ] Payment integration
- [ ] Admin authentication
- [ ] Analytics dashboard
- [ ] CRM integration

## License

Private - All rights reserved

---

Built with ❤️ for Bea Borneo Travel
