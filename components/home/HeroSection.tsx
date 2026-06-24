'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background — cinematic dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />

      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/hero-bg.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
      </div>

      {/* Gold crescent top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(ellipse at top, #B89A67, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-24 md:pt-0">
        {/* Label */}
        <motion.p
          custom={0.2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="label-tag mb-8 text-gold"
        >
          The Risers Collection
        </motion.p>

        {/* Logo mark */}
        <motion.div
          custom={0.3}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Image
            src="/images/logo-gold.svg"
            alt="ITHAR"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.4}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-serif font-light text-off-white leading-none tracking-tighter mb-6"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
        >
          ITHAR
        </motion.h1>

        {/* Arabic */}
        <motion.p
          custom={0.5}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-arabic text-gold/70 text-2xl md:text-3xl mb-8 leading-relaxed"
          lang="ar"
        >
          إيثار
        </motion.p>

        {/* Tagline */}
        <motion.p
          custom={0.6}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="font-serif font-light text-warm-gray text-xl md:text-2xl tracking-wide mb-4"
          style={{ fontStyle: 'italic' }}
        >
          Clothing for the Risers.
        </motion.p>

        {/* Description */}
        <motion.p
          custom={0.7}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="text-stone text-sm md:text-base leading-relaxed max-w-md mb-12 tracking-wide"
        >
          Premium streetwear inspired by timeless principles of loyalty,
          sacrifice, and devotion.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.85}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/collections/risers-collection" className="btn-gold px-10 py-4">
            Explore Collection
          </Link>
          <Link href="/waitlist" className="btn-outline px-10 py-4">
            Join Waitlist
          </Link>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mt-16 flex items-center gap-4"
        >
          <div className="w-12 h-px bg-gold/30" />
          <p className="label-tag text-stone/60">Est. 2024 — The Ahlulbayt Collection</p>
          <div className="w-12 h-px bg-gold/30" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-stone/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
