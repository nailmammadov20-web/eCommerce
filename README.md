# Volt — Premium Telefon Adapterləri (Azərbaycan)

Volt is a premium charging-technology storefront for Azerbaijan: phone
adapters and cables today, with room to grow into power banks, wireless
chargers, and laptop adapters. Built with Next.js 15 (App Router), TypeScript,
Tailwind CSS, shadcn/ui, Framer Motion, Prisma on Neon Postgres, and Auth.js.

## Tech stack

- **Next.js 15** — App Router, Server Components, Server Actions
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (this install uses [Base UI](https://base-ui.com), not Radix — see note below)
- **Framer Motion** for animation
- **Prisma ORM** (v7, driver-adapter based) against **Neon Postgres**, via `@prisma/adapter-neon`
- **Auth.js (NextAuth v5)** — email/password (Credentials provider), JWT sessions
- **Zustand** for the client-side cart
- Product/blog images are stored **as bytes directly in Postgres** (no Cloudinary/S3 needed) and served from `/api/images/[id]`

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — a Neon Postgres connection string ([neon.tech](https://neon.tech), free tier works). Use the pooled connection string.
- `AUTH_SECRET` — generate one with `npx auth secret`
- `NEXT_PUBLIC_SITE_URL` — your site's public URL (used in metadata, sitemap, structured data)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — your WhatsApp business number in international format, no `+` or spaces

### 3. Run migrations and seed the database

```bash
npx prisma migrate dev
npx prisma db seed
```

This creates all tables and seeds:
- An admin account: **admin@volt.az / VoltAdmin2026!** — change this password after first login.
- 2 categories, 3 launch products (2 GaN adapters + 1 cable, with realistic specs/pricing — no photos yet; the storefront shows a stylized placeholder visual until you upload real photos from the admin panel).
- 13 phone brands with ~5 models each, and compatibility rules connecting them to the launch products.
- ~13 FAQ entries, 5 blog posts, and homepage/SEO admin settings.

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Admin dashboard is at `/admin` (log in at `/login` first).

## Project structure

```
app/                    Routes (App Router)
  (auth)/login, register
  admin/                Role-gated admin dashboard
  account/              Role-gated customer account area
  api/images/[id]       Serves product/blog images stored as bytes in Postgres
  api/auth/[...nextauth]
  shop/, shop/[slug]/   Storefront + product detail
  ...                   compatibility-checker, charging-guide, blog, faq,
                        warranty, shipping, returns, contact, cart, checkout
components/
  ui/                   shadcn/ui components (Base UI-based, see note below)
  home/, product/, cart/, checkout/, compatibility/, admin/, auth/, warranty/
  layout/               Navbar, Footer, mobile nav, cart button
  shared/                Reusable bits: product visual placeholder, reveal animation, forms
lib/
  db.ts                 Prisma client singleton (Neon driver adapter)
  auth.ts / auth.config.ts   Auth.js setup (edge-safe config split out for middleware)
  session.ts             requireUser()/requireAdmin() guards
  actions/               Server actions (public + lib/actions/admin/* for admin CRUD)
  validations/            Zod schemas
  compatibility-data.ts / compatibility-score.ts   Phone compatibility dataset + scoring
  quiz-data.ts            Product finder quiz logic
  store/cart-store.ts     Zustand cart (persisted to localStorage)
prisma/
  schema.prisma
  seed.ts
```

## Important implementation notes

**This shadcn/ui install uses Base UI, not Radix.** Components like `Button`,
`Sheet`, `Dialog`, `Select`, and `Accordion` use a `render` prop for
polymorphism instead of `asChild`, and `Accordion` has no `type`/`collapsible`
props (it's single-open by default). If you add new shadcn components, check
the generated file in `components/ui/` for the actual prop API before wiring
up links/triggers.

**Money and dates are formatted manually**, not with `Intl.NumberFormat`/
`Intl.DateTimeFormat` for `az-AZ` — Node's bundled ICU data doesn't reliably
match the browser's for that locale, which caused a real server/client
hydration mismatch during development. See `lib/utils.ts` (`formatPrice`,
`formatDate`).

**Product/blog images live in Postgres**, not a CDN. This keeps the stack
simple (no third-party account needed) but means images aren't
CDN-cached/transformed — fine for a small catalog; revisit if the catalog
grows significantly.

## Admin dashboard

Log in as the seeded admin (or promote a user's `role` to `ADMIN` directly in
the database) and visit `/admin` for:

- Products, categories, orders, customers, inventory
- Blog, FAQ, reviews (moderation), warranty claims, contact messages
- Homepage content editor (hero copy, "coming soon" teasers, WhatsApp number)
- SEO defaults

## Checkout

First version supports three payment methods, chosen at checkout:
- **Cash on delivery**
- **Manual bank card** (rekvizitlər sent after order confirmation — wire up
  your real payment gateway later)
- **WhatsApp order** (prefills a WhatsApp message with the order summary)

Stock is decremented and totals/shipping are computed server-side inside a
database transaction (`lib/actions/checkout.actions.ts`) — never trust
client-supplied prices.

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env` in the Vercel project settings.
4. Deploy. Run `npx prisma migrate deploy` against your production `DATABASE_URL`
   (e.g. via a Vercel deploy hook or manually) before the first real traffic,
   and `npx prisma db seed` once if you want the starter content.

## What I can't do for you

I don't have access to your Neon/Vercel accounts, so I can't provision
databases or deploy on your behalf beyond what's described above — those
steps need your own credentials and logins.
