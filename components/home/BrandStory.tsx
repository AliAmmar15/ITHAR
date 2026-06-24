'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/animations/FadeUp'

export function BrandStory() {
  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div className="space-y-8 lg:order-1">
            <FadeUp>
              <p className="label-tag text-gold mb-4">Our Story</p>
              <h2 className="font-serif text-display-md font-light text-off-white leading-tight">
                A Word With
                <br />
                No Translation.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-5 text-warm-gray text-sm md:text-base leading-relaxed">
                <p>
                  There is a word in Arabic that has no perfect translation.
                </p>
                <p className="font-arabic text-gold text-2xl" lang="ar" dir="rtl">
                  إيثار
                </p>
                <p>
                  Ithar means to give preference to others over yourself.
                  To choose sacrifice when selfishness is easier.
                  To stand for something when standing costs you everything.
                </p>
                <p>
                  This brand was built on that word — inspired by those who
                  lived it fully. The Ahlulbayt (ع), whose loyalty, courage,
                  patience, and devotion wrote the greatest story ever lived.
                </p>
                <p className="text-off-white font-light">
                  ITHAR is not just clothing.
                  <br />
                  It is a declaration.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link href="/about" className="btn-text">
                Read the full story
                <span className="inline-block w-6 h-px bg-gold" />
              </Link>
            </FadeUp>
          </div>

          {/* Image side */}
          <FadeUp delay={0.1} className="lg:order-2 relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/brand-story.svg"
                alt="ITHAR brand story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Quote overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 left-8 right-8"
            >
              <p className="font-serif text-off-white/90 text-lg font-light italic">
                &ldquo;Wear it with intention. Rise with purpose.&rdquo;
              </p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
