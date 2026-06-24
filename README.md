# ITHAR — Clothing for the Risers

> إيثار · Premium streetwear built on principle.

A production-ready e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Stripe.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Animation | Framer Motion |
| Database | PostgreSQL (Prisma ORM) |
| Auth | NextAuth v5 (Google + Credentials) |
| Payments | Stripe (webhooks, Apple Pay, Google Pay) |
| Email | Resend + React Email |
| Uploads | UploadThing |
| State | Zustand (cart) |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## Local Setup

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or remote — [Neon](https://neon.tech) recommended)
- A Stripe account
- A Resend account
- A Google OAuth app (for social login)
- An UploadThing account

### 1. Clone and install

```bash
git clone <your-repo-url> ithar-website
cd ithar-website
npm install
```

### 2. Environment variables

Copy the example env file and fill in all values:

```bash
cp .env.example .env
```

Open `.env` and set:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/ithar?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
# Create at: console.developers.google.com → Credentials → OAuth 2.0
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
# Get from: dashboard.stripe.com → Developers → API keys
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."   # Set after step 6

# Resend
# Get from: resend.com → API Keys
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="ITHAR <noreply@ithar.co>"

# UploadThing
# Get from: uploadthing.com → Dashboard
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID=""

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Admin notifications
ADMIN_EMAIL="admin@ithar.co"
```

### 3. Database setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates all tables)
npx prisma db push

# Seed with initial data (admin user + Wilayah Hoodie product)
npx prisma db seed
```

The seed creates:
- Admin user: `admin@ithar.co` / `Admin@ITHAR2025` (**change this immediately**)
- The Risers Collection
- The Wilayah Hoodie with all size variants
- One sample journal article

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Prisma Studio (optional)

```bash
npx prisma studio
```

Opens a visual database browser at [http://localhost:5555](http://localhost:5555).

### 6. Stripe webhook (local testing)

Install the Stripe CLI and forward webhooks to your local server:

```bash
# Install Stripe CLI (if not installed)
# Mac: brew install stripe/stripe-cli/stripe
# Windows: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (`whsec_...`) that appears and add it to `.env` as `STRIPE_WEBHOOK_SECRET`.

---

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — ITHAR e-commerce platform"
git remote add origin https://github.com/YOUR_USERNAME/ithar-website.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build config changes needed
4. Add all environment variables from `.env` in the Vercel dashboard
   - Change `NEXTAUTH_URL` to your production URL (e.g., `https://ithar.co`)
   - Change `NEXT_PUBLIC_SITE_URL` to your production URL
   - Use production Stripe keys (not test keys)

### 3. Database for production

Use [Neon](https://neon.tech) for a serverless PostgreSQL database:

1. Create a project at neon.tech
2. Copy the connection string to `DATABASE_URL` in Vercel
3. After deploying, run migrations:

```bash
# Set production DATABASE_URL temporarily
DATABASE_URL="your-prod-connection-string" npx prisma db push
DATABASE_URL="your-prod-connection-string" npx prisma db seed
```

### 4. Stripe webhook (production)

1. Go to [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://ithar.co/api/webhooks/stripe`
3. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET` in Vercel

### 5. Custom domain

In Vercel dashboard → Domains → Add `ithar.co` and configure DNS as instructed.

---

## Project Structure

```
ithar-website/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Login, register, forgot password
│   ├── (shop)/                 # Shop, collection, product pages
│   ├── (legal)/                # Privacy, terms, shipping, returns
│   ├── (account)/              # Account dashboard, orders, settings
│   ├── admin/                  # Admin dashboard (role-protected)
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth handler
│   │   ├── uploadthing/        # UploadThing handler
│   │   └── webhooks/stripe/    # Stripe webhook
│   ├── checkout/               # Checkout page
│   ├── waitlist/               # Waitlist page
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── journal/                # Blog listing + articles
│   └── globals.css             # Global styles + Tailwind layers
├── components/
│   ├── layout/                 # Header, Footer, LegalLayout
│   ├── home/                   # Hero, MarqueeBar, ProductHighlight
│   ├── product/                # ProductCard, ProductGallery, ProductInfo
│   ├── cart/                   # CartDrawer
│   ├── admin/                  # AdminSidebar, AdminRevenueChart
│   ├── waitlist/               # WaitlistCountdown, WaitlistForm
│   └── ui/                     # Toaster, shared UI primitives
├── actions/                    # Server Actions
│   ├── auth.ts                 # registerUser, sendPasswordResetEmail
│   ├── newsletter.ts           # subscribeToNewsletter
│   ├── waitlist.ts             # joinWaitlist
│   ├── contact.ts              # sendContactMessage
│   └── checkout.ts             # createCheckoutSession
├── emails/                     # React Email templates
│   ├── WelcomeEmail.tsx
│   ├── OrderConfirmationEmail.tsx
│   ├── ShippingEmail.tsx
│   └── AbandonedCartEmail.tsx
├── lib/
│   ├── auth.ts                 # NextAuth v5 config
│   ├── db.ts                   # Prisma client singleton
│   ├── stripe.ts               # Stripe client + webhook helpers
│   ├── resend.ts               # Resend email helper
│   ├── uploadthing.ts          # UploadThing router
│   ├── utils.ts                # formatPrice, generateOrderNumber, etc.
│   ├── validations.ts          # All Zod schemas
│   └── constants.ts            # SIZES, SHIPPING_METHODS, FAQ_ITEMS, etc.
├── store/
│   └── cart.ts                 # Zustand cart store with persistence
├── prisma/
│   ├── schema.prisma           # Full database schema (20+ models)
│   └── seed.ts                 # Seed data (admin + Wilayah Hoodie)
├── types/
│   └── index.ts                # Shared TypeScript types
├── middleware.ts               # Auth + role-based route protection
├── tailwind.config.ts          # Custom design tokens
├── DESIGN.md                   # Design system reference
└── BRAND_GUIDELINES.md         # Brand guidelines reference
```

---

## Admin Access

After seeding, log in with:
- URL: `/admin`
- Email: `admin@ithar.co`
- Password: `Admin@ITHAR2025`

**Change the password immediately in `/admin/settings`.**

Admin features:
- Revenue analytics (30-day overview, chart)
- Product management (create, edit, archive)
- Order management (update status, fulfillment)
- Customer management
- Newsletter + waitlist subscribers
- Coupon/discount codes
- Journal articles (create, publish)

---

## Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | Random secret for JWT signing |
| `NEXTAUTH_URL` | Yes | Full URL of your site |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth app secret |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `RESEND_API_KEY` | Yes | Resend API key |
| `RESEND_FROM_EMAIL` | Yes | From address (e.g. `ITHAR <noreply@ithar.co>`) |
| `UPLOADTHING_SECRET` | Yes | UploadThing secret key |
| `UPLOADTHING_APP_ID` | Yes | UploadThing app ID |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full production URL (no trailing slash) |
| `ADMIN_EMAIL` | No | Email for admin contact notifications |

---

## Commands Reference

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx prisma studio    # Open database browser
npx prisma generate  # Regenerate Prisma client (after schema changes)
npx prisma db push   # Sync schema to database
npx prisma db seed   # Run seed file
```

---

*ITHAR — Clothing for the Risers. إيثار*
