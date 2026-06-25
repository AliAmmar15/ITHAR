import type { Metadata, Viewport } from 'next'
import { cormorant, inter, jetbrainsMono, notoNaskhArabic } from '@/lib/fonts'
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/next'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['ITHAR', 'streetwear', 'premium', 'luxury', 'hoodie', 'Islamic fashion', 'Ahlulbayt'],
  authors: [{ name: 'ITHAR' }],
  creator: 'ITHAR',
  publisher: 'ITHAR',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
    creator: '@itharclothing',
  },
  icons: {
    icon: [{ url: '/images/logo-gold.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/images/logo-gold.svg', type: 'image/svg+xml' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoNaskhArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-off-white font-sans antialiased">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
