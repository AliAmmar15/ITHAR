'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'
import { sendPasswordResetEmail } from '@/actions/auth'

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await sendPasswordResetEmail(data.email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Image src="/images/logo-gold.svg" alt="ITHAR" width={40} height={40} className="w-9 h-9 object-contain mx-auto mb-6" />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-5"
            >
              <CheckCircle size={40} className="text-gold mx-auto" />
              <h1 className="font-serif text-2xl font-light text-off-white">Check your email.</h1>
              <p className="text-warm-gray text-sm leading-relaxed">
                If an account exists for <span className="text-off-white">{getValues('email')}</span>,
                we&apos;ve sent a password reset link. Check your inbox and follow the instructions.
              </p>
              <Link href="/login" className="btn-ghost w-full py-3.5 block text-center mt-6">
                Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="label-tag text-gold mb-3">Password Reset</p>
              <h1 className="font-serif text-display-sm font-light text-off-white mb-3">
                Forgot Password?
              </h1>
              <p className="text-warm-gray text-sm leading-relaxed mb-8">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="label-luxury">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    className={cn('input-luxury', errors.email && 'border-red-500')}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 disabled:opacity-50">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                      Sendingâ€¦
                    </span>
                  ) : 'Send Reset Link'}
                </button>
              </form>

              <Link href="/login" className="btn-text mt-6 justify-center w-full">
                <ArrowLeft size={13} /> Back to Sign In
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
