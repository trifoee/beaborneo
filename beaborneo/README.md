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
| `SANITY_REVALIDATE_SECRET` | Shared secret for the on-demand revalidation webhook | For instant updates |
| `RESEND_API_KEY` | API key for the Resend email service | For contact |
| `CONTACT_EMAIL` | Inbox where contact-form submissions are sent | For contact |
| `FROM_EMAIL` | Verified "From" address for outgoing emails | For contact |

## On-Demand Revalidation (Sanity → Next.js)

The site uses Next.js cache tags so Sanity content updates show up
instantly without rebuilding the app. Every Sanity fetch in
`lib/sanity.queries.js` is tagged by document `_type`, and the route
at `app/api/revalidate/route.js` listens for Sanity webhook calls and
purges the matching tag(s).

### One-time setup

1. **Generate a strong secret** locally:
   ```bash
   openssl rand -hex 32
   ```
2. **Add it to Vercel** (Project → Settings → Environment Variables):
   `SANITY_REVALIDATE_SECRET = <your-secret>` for *Production*,
   *Preview*, and *Development*.
3. **Add the same secret to your local `.env.local`** so you can test
   the endpoint with `curl` or `ngrok`.
4. **Create the Sanity webhook** at
   <https://www.sanity.io/manage/project/nfz6prcr/api/webhooks>
   → "Create webhook":
   - **Name:** `Next.js revalidate`
   - **URL:** `https://<your-production-domain>/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:**
     ```
     _type in [
       "tour",
       "transportService",
       "contactInformation",
       "galleryImage",
       "ourStory",
       "ourValue",
       "socialLinks",
       "activityPackage",
       "testimonial"
     ]
     ```
   - **Projection:**
     ```
     { _type, "slug": slug.current }
     ```
   - **HTTP method:** `POST`
   - **API version:** `2024-01-01`
   - **Secret:** paste the same value as `SANITY_REVALIDATE_SECRET`
5. **Save** the webhook. Edit any document in Sanity Studio → publish
   → the live site updates within a few seconds without a rebuild.

### Smoke test

After deploying, hit the endpoint with a `GET` to confirm it's wired:

```bash
curl https://<your-domain>/api/revalidate
# → { "ok": true, "message": "Sanity revalidation endpoint. ..." }
```

A `POST` without a valid signature returns `401`, which is exactly
what you want.

### How it works

- `lib/sanity.queries.js` tags every fetch — `getAllTours()` uses the
  `tour` tag, `getTransportServices()` uses `transportService`, etc.
- `app/api/revalidate/route.js` verifies the Sanity signature with
  `@sanity/webhook`, then calls `revalidateTag(_type)` plus a
  `revalidatePath()` for the routes that consume that type as a
  fallback.
- The next request after a webhook fires re-runs the GROQ query and
  re-renders the page. Subsequent requests are served from the new
  cached version until the next change.

Adding a new document type? Add it to:
1. `SANITY_TAGS` in `lib/sanity.queries.js`
2. `TYPE_TO_TAGS` and `TYPE_TO_PATHS` in
   `app/api/revalidate/route.js`
3. The webhook filter in Sanity Manage

### Testimonials & SSG randomization

The homepage testimonials live in Sanity (`testimonial` document
type). The page is statically generated, so picking a random subset
on the server would freeze the same 3 testimonials between
revalidations. Instead:

- The full testimonial pool is fetched at build/revalidation time
  (cache tag: `testimonial`).
- Search engines and no-JS visitors see the editor-ordered "featured
  first" subset baked into the static HTML.
- Real browsers receive the full pool and `components/sections/Testimonials.js`
  shuffles it after hydration, picking 3 random reviews per visit.
- When an editor adds or edits a testimonial, the webhook fires and
  the homepage's static HTML is regenerated with the new pool.

To highlight specific reviews, toggle the `featured` field in Sanity
Studio — those will appear first in the SSG'd HTML (good for the
hero few seconds before JS hydrates) while still being part of the
random rotation.

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
