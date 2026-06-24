import Link from 'next/link'
import Image from 'next/image'
import { FadeUp } from '@/components/animations/FadeUp'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <FadeUp>
          <Image
            src="/images/logo-gold.svg"
            alt="ITHAR"
            width={48}
            height={48}
            className="w-10 h-10 object-contain mx-auto mb-10 opacity-40"
          />

          <p className="font-mono text-gold/40 text-8xl font-light mb-6 leading-none">404</p>

          <h1 className="font-serif text-display-sm font-light text-off-white mb-4">
            Lost in the dark.
          </h1>
          <p className="text-warm-gray text-sm leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist.
            Perhaps it was moved, or it never existed. Return to solid ground.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-gold px-10">Return Home</Link>
            <Link href="/shop" className="btn-outline px-10">Shop Now</Link>
          </div>

          <p className="font-arabic text-gold/20 text-3xl mt-12" lang="ar" dir="rtl">Ø¥ÙŠØ«Ø§Ø±</p>
        </FadeUp>
      </div>
    </div>
  )
}
