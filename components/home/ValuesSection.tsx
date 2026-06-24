'use client'

import { motion } from 'framer-motion'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'
import { BRAND_VALUES } from '@/lib/constants'

export function ValuesSection() {
  return (
    <section className="section-padding bg-black border-t border-charcoal-mid">
      <div className="container mx-auto">
        <FadeUp className="text-center mb-16 md:mb-20">
          <p className="label-tag text-gold mb-4">What We Stand For</p>
          <h2 className="font-serif text-display-md font-light text-off-white">
            The Seven Principles
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {BRAND_VALUES.slice(0, 4).map((value, i) => (
            <StaggerItem key={value.english}>
              <motion.div
                whileHover={{ borderColor: '#B89A67' }}
                transition={{ duration: 0.2 }}
                className="border border-charcoal-mid p-8 md:p-10 cursor-default group
                           hover:bg-charcoal transition-colors duration-300"
              >
                <p className="font-arabic text-gold text-3xl mb-4" lang="ar" dir="rtl">
                  {value.arabic}
                </p>
                <h3 className="font-serif text-xl font-light text-off-white mb-3 group-hover:text-gold transition-colors duration-200">
                  {value.english}
                </h3>
                <p className="text-stone text-xs leading-relaxed">{value.description}</p>
                <div className="mt-6 w-6 h-px bg-gold/30 group-hover:bg-gold transition-colors duration-300" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t-0">
          {BRAND_VALUES.slice(4).map((value) => (
            <StaggerItem key={value.english}>
              <motion.div
                whileHover={{ borderColor: '#B89A67' }}
                transition={{ duration: 0.2 }}
                className="border border-t-0 border-charcoal-mid p-8 md:p-10 cursor-default group
                           hover:bg-charcoal transition-colors duration-300"
              >
                <p className="font-arabic text-gold text-3xl mb-4" lang="ar" dir="rtl">
                  {value.arabic}
                </p>
                <h3 className="font-serif text-xl font-light text-off-white mb-3 group-hover:text-gold transition-colors duration-200">
                  {value.english}
                </h3>
                <p className="text-stone text-xs leading-relaxed">{value.description}</p>
                <div className="mt-6 w-6 h-px bg-gold/30 group-hover:bg-gold transition-colors duration-300" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
