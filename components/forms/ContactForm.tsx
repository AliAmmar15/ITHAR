'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { sendContactMessage } from '@/actions/contact'
import { cn } from '@/lib/utils'

const subjects = [
  'Order Inquiry',
  'Product Question',
  'Wholesale / Collaboration',
  'Press Inquiry',
  'General Question',
  'Other',
]

export function ContactForm() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    const result = await sendContactMessage(data)
    if (result.success) {
      setSuccess(true)
      reset()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center gap-6 py-16"
        >
          <CheckCircle size={40} className="text-gold" />
          <div>
            <h3 className="font-serif text-2xl font-light text-off-white mb-3">Message received.</h3>
            <p className="text-warm-gray text-sm leading-relaxed max-w-xs">
              We&apos;ll get back to you within 24–48 hours. Thank you for reaching out.
            </p>
          </div>
          <button onClick={() => setSuccess(false)} className="btn-ghost px-8">
            Send Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label-luxury">Your Name</label>
              <input
                {...register('name')}
                placeholder="Hassan Al-Rawi"
                className={cn('input-luxury', errors.name && 'border-red-500')}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label-luxury">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="your@email.com"
                className={cn('input-luxury', errors.email && 'border-red-500')}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="label-luxury">Subject</label>
            <select
              {...register('subject')}
              className={cn('input-luxury appearance-none', errors.subject && 'border-red-500')}
            >
              <option value="">Select a subject</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="label-luxury">Message</label>
            <textarea
              {...register('message')}
              rows={6}
              placeholder="Write your message here…"
              className={cn(
                'input-luxury resize-none leading-relaxed',
                errors.message && 'border-red-500'
              )}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full py-4 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                Sending…
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
