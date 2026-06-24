import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { FadeUp } from '@/components/animations/FadeUp'

export const metadata: Metadata = { title: 'Order Confirmed' }

interface OrderSuccessPageProps {
  searchParams: Promise<{ session_id?: string; order?: string }>
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const params = await searchParams
  const orderNumber = params.order ?? 'ITH-XXXX'

  return (
    <div className="min-h-screen bg-black pt-16 flex items-center justify-center">
      <div className="container mx-auto py-16 max-w-lg text-center">
        <FadeUp>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 border border-gold flex items-center justify-center">
              <CheckCircle size={32} className="text-gold" />
            </div>
          </div>

          {/* Logo */}
          <Image
            src="/images/logo-gold.svg"
            alt="ITHAR"
            width={40}
            height={40}
            className="w-9 h-9 object-contain mx-auto mb-8"
          />

          <p className="label-tag text-gold mb-4">Order Confirmed</p>
          <h1 className="font-serif text-display-sm font-light text-off-white mb-4 leading-tight">
            Thank you for
            <br />
            <span className="italic text-gold">rising with us.</span>
          </h1>

          <p className="text-warm-gray text-sm leading-relaxed mb-8">
            Your order <span className="text-off-white font-medium font-mono">{orderNumber}</span> has been
            confirmed. You&apos;ll receive a confirmation email shortly with your order details
            and tracking information when your order ships.
          </p>

          {/* Arabic */}
          <p className="font-arabic text-gold/60 text-xl mb-10" lang="ar" dir="rtl">
            Ù…Ù† ÙƒÙ†Øª Ù…ÙˆÙ„Ø§Ù‡ ÙÙ‡Ø°Ø§ Ø¹Ù„ÙŠ Ù…ÙˆÙ„Ø§Ù‡
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/orders" className="btn-outline px-8">
              View Order
            </Link>
            <Link href="/shop" className="btn-gold px-8">
              Continue Shopping
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
