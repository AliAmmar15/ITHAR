'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-black/95 backdrop-blur-nav border-b border-charcoal-mid'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-warm-gray hover:text-off-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Left — Instagram (desktop) */}
            <a
              href="https://instagram.com/itharclothing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 text-warm-gray hover:text-gold transition-colors duration-200 text-[11px] tracking-widest uppercase"
            >
              <Instagram size={14} />
              @itharclothing
            </a>

            {/* Center — Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex-shrink-0"
              aria-label="ITHAR — Home"
            >
              <Image
                src="/images/logo-gold.svg"
                alt="ITHAR"
                width={56}
                height={56}
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                priority
              />
            </Link>

            {/* Right — Join Waitlist CTA */}
            <a
              href="#waitlist-form"
              className="btn-gold px-5 py-2 text-xs"
            >
              Join Waitlist
            </a>

          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-charcoal border-r border-charcoal-mid flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-charcoal-mid">
                <Image
                  src="/images/logo-gold.svg"
                  alt="ITHAR"
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-warm-gray hover:text-off-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col p-8 gap-6">
                <p className="font-serif text-[clamp(1.75rem,7vw,2.5rem)] text-off-white leading-tight">
                  The Wilayah<br />Hoodie
                </p>
                <p className="text-stone text-sm leading-relaxed">
                  Season 01 — The Risers Collection.<br />
                  Dropping soon. First 313 members receive founding benefits.
                </p>
                <p className="font-arabic text-gold/50 text-4xl" lang="ar" dir="rtl">
                  إيثار
                </p>
              </div>

              <div className="p-6 border-t border-charcoal-mid space-y-3">
                <a
                  href="#waitlist-form"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full text-center block py-3.5"
                >
                  Join the Waitlist
                </a>
                <a
                  href="https://instagram.com/itharclothing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 text-warm-gray hover:text-gold transition-colors text-[11px] tracking-widest uppercase py-2"
                >
                  <Instagram size={14} />
                  @itharclothing
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
