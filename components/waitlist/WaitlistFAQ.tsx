'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FadeUp } from '@/components/animations/FadeUp'
import { FAQ_ITEMS } from '@/lib/constants'

export function WaitlistFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-padding bg-black">
      <div className="container mx-auto max-w-2xl">
        <FadeUp className="text-center mb-12">
          <p className="label-tag text-gold mb-4">Have Questions?</p>
          <h2 className="font-serif text-display-sm font-light text-off-white">
            FAQ
          </h2>
        </FadeUp>

        <div className="divide-y divide-charcoal-mid border-t border-charcoal-mid">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center justify-between w-full py-5 text-left gap-4"
              >
                <span className="text-sm font-medium text-off-white leading-snug">{item.question}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={16} className="text-warm-gray" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-warm-gray text-sm leading-relaxed pb-5 pr-8">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
