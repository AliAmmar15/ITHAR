'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { SIZE_GUIDE } from '@/lib/constants'

interface SizeGuideModalProps {
  open: boolean
  onClose: () => void
}

export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-60 bg-charcoal border border-charcoal-mid w-full max-w-lg mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal-mid">
              <div>
                <p className="label-tag text-gold mb-1">Sizing</p>
                <h3 className="font-serif text-xl font-light text-off-white">Size Guide</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-warm-gray hover:text-off-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Table */}
            <div className="p-6">
              <p className="text-stone text-xs mb-4 leading-relaxed">
                The Wilayah Hoodie is designed for an oversized fit with dropped shoulders.
                Model is 6'1" and wears size L. Size down if you prefer a slimmer fit.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-charcoal-mid">
                      <th className="label-tag py-3 pr-4 text-left">Size</th>
                      <th className="label-tag py-3 pr-4 text-left">Chest</th>
                      <th className="label-tag py-3 pr-4 text-left">Waist</th>
                      <th className="label-tag py-3 text-left">Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(SIZE_GUIDE).map(([size, measurements]) => (
                      <tr key={size} className="border-b border-charcoal-mid">
                        <td className="py-3 pr-4 text-off-white font-medium">{size}</td>
                        <td className="py-3 pr-4 text-warm-gray">{measurements.chest}</td>
                        <td className="py-3 pr-4 text-warm-gray">{measurements.waist}</td>
                        <td className="py-3 text-warm-gray">{measurements.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-stone text-xs mt-4">
                All measurements are in inches. For the best fit, measure your body and compare to the chart above.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
