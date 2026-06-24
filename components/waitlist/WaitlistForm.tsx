'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations'
import { joinWaitlist } from '@/actions/waitlist'
import { cn } from '@/lib/utils'
import { SIZES } from '@/lib/constants'
import { FadeUp } from '@/components/animations/FadeUp'

export function WaitlistForm() {
  const [success, setSuccess] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({ resolver: zodResolver(waitlistSchema) })

  const onSubmit = async (data: WaitlistFormData) => {
    const result = await joinWaitlist(data)
    if (result.success) {
      setSuccess(true)
      setPosition(result.position ?? null)
    }
  }

  return (
    <section className="section-padding bg-charcoal border-y border-charcoal-mid" id="waitlist-form">
      <div className="container mx-auto max-w-xl">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <CheckCircle size={48} className="text-gold mx-auto" />
              <div>
                <p className="label-tag text-gold mb-3">You&apos;re on the list.</p>
                <h2 className="font-serif text-display-sm font-light text-off-white mb-4">
                  Welcome, Riser.
                </h2>
                {position && (
                  <p className="text-warm-gray text-sm">
                    You are <span className="text-gold font-semibold">#{position}</span> on the waitlist.
                  </p>
                )}
                <p className="text-stone text-sm mt-3 leading-relaxed">
                  We&apos;ll notify you when early access opens. Stay ready.
                </p>
              </div>
              <p className="font-arabic text-gold/50 text-2xl" lang="ar" dir="rtl">
                إيثار
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FadeUp className="text-center mb-10">
                <p className="label-tag text-gold mb-4">Secure Your Spot</p>
                <h2 className="font-serif text-display-sm font-light text-off-white mb-4">
                  Join the Waitlist
                </h2>
                <p className="text-warm-gray text-sm leading-relaxed">
                  First 313 members receive founding benefits. Complete the form below.
                </p>
              </FadeUp>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-luxury">First Name *</label>
                    <input
                      {...register('firstName')}
                      className={cn('input-luxury', errors.firstName && 'border-red-500')}
                      placeholder="Hassan"
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="label-luxury">Last Name</label>
                    <input {...register('lastName')} className="input-luxury" placeholder="Al-Rawi" />
                  </div>
                </div>

                <div>
                  <label className="label-luxury">Email Address *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className={cn('input-luxury', errors.email && 'border-red-500')}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="label-luxury">Preferred Size</label>
                  <select {...register('size')} className="input-luxury appearance-none">
                    <option value="">Select a size</option>
                    {SIZES.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                      Joining…
                    </span>
                  ) : (
                    'Join the Waitlist'
                  )}
                </button>

                <p className="text-stone text-[10px] text-center leading-relaxed">
                  No spam. Waitlist notification only. You can unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
