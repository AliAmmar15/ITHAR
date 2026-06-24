import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { INSTAGRAM_URL, SITE_NAME } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-charcoal-mid">
      {/* Newsletter banner */}
      <div className="border-b border-charcoal-mid">
        <div className="container mx-auto py-16 md:py-20">
          <div className="max-w-xl mx-auto text-center">
            <p className="label-tag mb-4">Stay Connected</p>
            <h2 className="font-serif text-display-sm text-off-white mb-3 font-light">
              Join the Risers
            </h2>
            <p className="text-warm-gray text-sm mb-8 leading-relaxed">
              Early access. Drop announcements. No filler.
            </p>
            <NewsletterForm source="footer" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo-gold.svg"
            alt="ITHAR"
            width={40}
            height={40}
            className="w-9 h-9 object-contain"
          />
        </Link>

        <p className="text-[11px] text-stone tracking-wide text-center">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 border border-charcoal-light hover:border-gold text-warm-gray hover:text-gold transition-all duration-200"
          aria-label="ITHAR on Instagram"
        >
          <Instagram size={16} />
        </a>
      </div>
    </footer>
  )
}
