'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations'
import { subscribeToNewsletter } from '@/actions/newsletter'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  source?: string
  className?: string
  placeholder?: string
}

export function NewsletterForm({
  source = 'footer',
  className,
  placeholder = 'your@email.com',
}: NewsletterFormProps) {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    const result = await subscribeToNewsletter({ ...data, source })
    if (result.success) {
      setSuccess(true)
      reset()
    }
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3 py-4"
          >
            <CheckCircle size={18} className="text-gold" />
            <span className="text-sm text-off-white">You're on the list. Stay ready.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-0"
          >
            <div className="flex-1">
              <input
                {...register('email')}
                type="email"
                placeholder={placeholder}
                autoComplete="email"
                className={cn(
                  'input-luxury w-full text-sm',
                  errors.email && 'border-red-500'
                )}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold px-5 flex-shrink-0 flex items-center gap-2 disabled:opacity-50"
              aria-label="Subscribe"
            >
              {isSubmitting ? (
                <span className="inline-block w-3.5 h-3.5 border border-black/40 border-t-black rounded-full animate-spin" />
              ) : (
                <ArrowRight size={14} />
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {errors.email && (
        <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
      )}
    </div>
  )
}
