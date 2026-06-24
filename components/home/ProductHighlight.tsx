'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/animations/FadeUp'

const specs = [
  { label: 'Weight', value: '450 GSM' },
  { label: 'Material', value: 'Heavyweight French Terry Cotton' },
  { label: 'Fit', value: 'Oversized, Dropped Shoulders' },
  { label: 'Finish', value: 'Garment Washed' },
  { label: 'Hardware', value: 'Matte Black' },
  { label: 'Detail', value: 'Antique Gold Calligraphy' },
]

export function ProductHighlight() {
  return (
    <section className="section-padding bg-charcoal overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <FadeUp className="relative">
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src="/images/wilayah-hoodie-front.svg"
                alt="The Wilayah Hoodie"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating calligraphy card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-4 bottom-12 md:-right-10 bg-black border border-charcoal-light p-6 max-w-[200px]"
            >
              <p className="font-arabic text-gold text-xl leading-loose text-center" lang="ar" dir="rtl">
                من كنت مولاه
                <br />
                فهذا علي مولاه
              </p>
              <div className="mt-3 pt-3 border-t border-charcoal-mid text-center">
                <p className="text-[9px] tracking-widest uppercase text-stone">Ghadir 10 AH</p>
                <p className="text-[9px] tracking-widest uppercase text-gold mt-0.5">ITHAR</p>
              </div>
            </motion.div>
          </FadeUp>

          {/* Info side */}
          <div className="space-y-8">
            <FadeUp>
              <p className="label-tag text-gold mb-4">The Risers Collection — 001</p>
              <h2 className="font-serif text-display-md font-light text-off-white leading-tight mb-4">
                The Wilayah
                <br />
                <span className="italic text-gold">Hoodie</span>
              </h2>
              <p className="text-warm-gray leading-relaxed text-sm md:text-base">
                Named after the declaration of Ghadir Khumm. Worn as a statement
                of allegiance. Built to last — in fabric and in meaning.
              </p>
            </FadeUp>

            {/* Specs */}
            <FadeUp delay={0.1}>
              <div className="border-t border-charcoal-mid">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between py-3.5 ${
                      i < specs.length - 1 ? 'border-b border-charcoal-mid' : ''
                    }`}
                  >
                    <span className="label-tag text-stone">{spec.label}</span>
                    <span className="text-off-white text-xs font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Price & CTA */}
            <FadeUp delay={0.2} className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-off-white font-light">$120</span>
                <span className="label-tag text-stone">USD</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/products/wilayah-hoodie" className="btn-gold flex-1 text-center py-4">
                  View Product
                </Link>
                <Link href="/waitlist" className="btn-outline flex-1 text-center py-4">
                  Join Waitlist
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
