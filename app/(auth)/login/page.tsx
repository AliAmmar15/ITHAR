import { Suspense } from 'react'
import Image from 'next/image'
import { LoginForm } from './LoginForm'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Left — Brand panel */}
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
          <h2 className="font-serif text-4xl font-light text-off-white mb-4">Welcome back.</h2>
          <p className="text-warm-gray text-sm leading-relaxed max-w-xs">
            Sign in to your ITHAR account to access your orders, saved addresses, and exclusive member benefits.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gold/30" />
            <p className="font-arabic text-gold/60 text-lg" lang="ar">&#x625;&#x64A;&#x62B;&#x627;&#x631;</p>
            <div className="w-10 h-px bg-gold/30" />
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16">
        {/* Mobile logo */}
        <div className="lg:hidden text-center mb-10">
          <Image src="/images/logo-gold.svg" alt="ITHAR" width={40} height={40} className="w-9 h-9 object-contain mx-auto mb-3" />
        </div>
        <Suspense fallback={<div className="w-full max-w-md h-96 animate-pulse bg-charcoal" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
