import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'
import { FadeUp } from '@/components/animations/FadeUp'

export const metadata: Metadata = { title: 'Order History' }

export default async function OrderHistoryPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/account/orders')

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: { select: { name: true, slug: true } } },
        take: 3,
      },
    },
  }).catch(() => [])

  const statusColors: Record<string, string> = {
    PENDING: 'text-amber-400 border-amber-400/30',
    CONFIRMED: 'text-emerald-400 border-emerald-400/30',
    PROCESSING: 'text-blue-400 border-blue-400/30',
    SHIPPED: 'text-blue-400 border-blue-400/30',
    DELIVERED: 'text-emerald-400 border-emerald-400/30',
    CANCELLED: 'text-red-400 border-red-400/30',
    REFUNDED: 'text-stone border-stone/30',
  }

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-12 md:py-16 max-w-3xl">
        <FadeUp>
          <Link href="/account" className="btn-text mb-8 inline-flex">
            <ArrowLeft size={13} /> Account
          </Link>
          <p className="label-tag text-gold mb-3">Your Orders</p>
          <h1 className="font-serif text-display-sm font-light text-off-white mb-10">Order History</h1>
        </FadeUp>

        {orders.length === 0 ? (
          <FadeUp className="border border-charcoal-mid p-16 text-center">
            <p className="text-warm-gray text-sm mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop" className="btn-gold px-10">Browse Collection</Link>
          </FadeUp>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <FadeUp key={order.id} delay={i * 0.05}>
                <div className="border border-charcoal-mid bg-charcoal hover:border-gold transition-all duration-200">
                  {/* Order header */}
                  <div className="flex items-start justify-between p-5 border-b border-charcoal-mid">
                    <div>
                      <p className="text-off-white font-medium font-mono text-sm">{order.orderNumber}</p>
                      <p className="text-stone text-xs mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block text-[10px] font-medium tracking-wide uppercase border px-2.5 py-1 ${statusColors[order.status] ?? 'text-stone border-stone/30'}`}>
                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                      </span>
                      <p className="text-off-white text-sm font-medium mt-2">{formatPrice(Number(order.total))}</p>
                    </div>
                  </div>

                  {/* Order items preview */}
                  <div className="p-5 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-warm-gray">
                          {item.product.name}{' '}
                          <span className="text-stone">× {item.quantity}</span>
                        </span>
                        <span className="text-off-white">{formatPrice(Number(item.totalPrice))}</span>
                      </div>
                    ))}
                    {order.items.length === 3 && (
                      <p className="text-stone text-xs">+ more items</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-5">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="btn-ghost w-full py-2.5 text-center text-xs"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
