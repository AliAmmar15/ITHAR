'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface WaitlistHeroProps {
  waitlistCount: number
}

export function WaitlistHero({ waitlistCount }: WaitlistHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/waitlist-bg.svg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      </div>

      {/* Gold glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B89A67, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto text-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Image
            src="/images/logo-gold.svg"
            alt="ITHAR"
            width={60}
            height={60}
            className="w-12 h-12 object-contain mx-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="label-tag text-gold mb-6"
        >
          The Risers Collection &mdash; Season 01
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-off-white leading-none tracking-tighter mb-6"
          style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
        >
          Rise First.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-serif text-warm-gray text-xl md:text-2xl italic font-light mb-8 max-w-xl mx-auto"
        >
          Exclusive early access before the world.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-stone text-sm mb-12"
        >
          {waitlistCount > 0 && (
            <>
              <span className="text-gold font-semibold">{waitlistCount.toLocaleString()}</span>{' '}
              Risers already on the list.
            </>
          )}
        </motion.p>

        {/* Hoodie teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xs mx-auto"
        >
          <div className="relative aspect-[3/4] overflow-hidden border border-charcoal-mid">
            <Image
              src="/images/wilayah-hoodie-front.png"
              alt="The Wilayah Hoodie"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <p className="label-tag text-gold">The Wilayah Hoodie</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
