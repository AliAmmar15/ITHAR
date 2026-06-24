'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'
import { registerUser } from '@/actions/auth'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)
    const result = await registerUser(data)
    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }
    // Auto sign-in after registration
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    router.push('/account')
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-charcoal border-r border-charcoal-mid relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B89A67' fill-opacity='1'%3E%3Cpath d='M40 0l10 17.3h20L60 34.6l10 17.4H50L40 70 30 52H10l10-17.4L10 17.3h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative z-10 text-center p-16">
          <Image src="/images/logo-gold.svg" alt="ITHAR" width={64} height={64} className="w-14 h-14 object-contain mx-auto mb-8" />
          <h2 className="font-serif text-4xl font-light text-off-white mb-4">Join the Risers.</h2>
          <p className="text-warm-gray text-sm leading-relaxed max-w-xs">
            Create your ITHAR account for early access, exclusive drops, and order history.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gold/30" />
            <p className="font-arabic text-gold/60 text-lg" lang="ar">Ø¥ÙŠØ«Ø§Ø±</p>
            <div className="w-10 h-px bg-gold/30" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-10">
            <Image src="/images/logo-gold.svg" alt="ITHAR" width={40} height={40} className="w-9 h-9 object-contain mx-auto mb-3" />
          </div>

          <p className="label-tag text-gold mb-3">Create Account</p>
          <h1 className="font-serif text-display-sm font-light text-off-white mb-8">Register</h1>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-6"
            >
              {error}
            </motion.p>
          )}

          {/* Google */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/account' })}
            className="btn-ghost w-full py-3.5 flex items-center justify-center gap-3 mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-charcoal-mid" />
            <span className="text-stone text-xs">or</span>
            <div className="flex-1 h-px bg-charcoal-mid" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-luxury">First Name</label>
                <input
                  {...register('firstName')}
                  className={cn('input-luxury', errors.firstName && 'border-red-500')}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="label-luxury">Last Name</label>
                <input
                  {...register('lastName')}
                  className={cn('input-luxury', errors.lastName && 'border-red-500')}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

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

            <div>
              <label className="label-luxury">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={cn('input-luxury pr-10', errors.password && 'border-red-500')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-warm-gray">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="label-luxury">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                type="password"
                autoComplete="new-password"
                className={cn('input-luxury', errors.confirmPassword && 'border-red-500')}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-4 mt-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                  Creating Accountâ€¦
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-stone text-[10px] mt-4 text-center leading-relaxed">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-warm-gray">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-warm-gray">Privacy Policy</Link>.
          </p>

          <p className="text-center text-stone text-xs mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-gold hover:text-gold-light transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
