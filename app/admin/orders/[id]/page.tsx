import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'
import { OrderStatusManager } from '@/components/admin/OrderStatusManager'
import { OrderTrackingForm } from '@/components/admin/OrderTrackingForm'
import { OrderNoteForm } from '@/components/admin/OrderNoteForm'

export const metadata: Metadata = { title: 'Admin — Order Detail' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: { select: { name: true, slug: true } } },
      },
      shippingAddress: true,
      payment: true,
    },
  }).catch(() => null)

  if (!order) notFound()

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
    <div className="space-y-6">
      <div>
        <Link href="/admin/orders" className="btn-text mb-4 inline-flex">
          <ArrowLeft size={13} /> Orders
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <p className="label-tag text-gold mb-1">Order</p>
            <h1 className="font-serif text-2xl font-light text-off-white font-mono">{order.orderNumber}</h1>
            <p className="text-stone text-xs mt-1">{formatDate(order.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${statusColors[order.status] ?? 'text-stone border-stone/30'}`}>
            {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — items + payment */}
        <div className="lg:col-span-2 space-y-4">

          {/* Items */}
          <div className="border border-charcoal-mid bg-charcoal p-6">
            <h2 className="label-tag text-stone mb-4">Items</h2>
            <div className="divide-y divide-charcoal-mid">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-3">
                  <div>
                    <p className="text-off-white text-sm">{item.name}</p>
                    <p className="text-stone text-xs mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <p className="text-off-white text-sm">{formatPrice(Number(item.totalPrice))}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-charcoal-mid mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone">Subtotal</span>
                <span className="text-warm-gray">{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-400">Discount {order.couponCode && `(${order.couponCode})`}</span>
                  <span className="text-emerald-400">-{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-stone">Shipping</span>
                <span className="text-warm-gray">{Number(order.shippingCost) === 0 ? 'Free' : formatPrice(Number(order.shippingCost))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone">Tax</span>
                <span className="text-warm-gray">{formatPrice(Number(order.tax))}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-charcoal-mid">
                <span className="text-off-white">Total</span>
                <span className="text-gold font-serif text-lg">{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          {order.shippingAddress && (
            <div className="border border-charcoal-mid bg-charcoal p-6">
              <h2 className="label-tag text-stone mb-4">Shipping Address</h2>
              <div className="text-sm text-warm-gray space-y-0.5">
                <p className="text-off-white font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && <p className="pt-1 text-stone">{order.shippingAddress.phone}</p>}
              </div>
            </div>
          )}

          {/* Payment */}
          {order.payment && (
            <div className="border border-charcoal-mid bg-charcoal p-6">
              <h2 className="label-tag text-stone mb-4">Payment</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-stone text-xs mb-1">Status</p>
                  <p className="text-off-white capitalize">{order.payment.status.toLowerCase()}</p>
                </div>
                {order.payment.brand && (
                  <div>
                    <p className="text-stone text-xs mb-1">Card</p>
                    <p className="text-off-white capitalize">{order.payment.brand} ····{order.payment.last4}</p>
                  </div>
                )}
                {order.payment.receiptUrl && (
                  <div className="col-span-2">
                    <a href={order.payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-gold text-xs hover:underline">
                      View Receipt →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right — management */}
        <div className="space-y-4">
          <div className="border border-charcoal-mid bg-charcoal p-6">
            <h2 className="label-tag text-stone mb-4">Customer</h2>
            <p className="text-off-white text-sm">{order.email}</p>
            {order.shippingMethod && (
              <p className="text-stone text-xs mt-2">Shipping: {order.shippingMethod}</p>
            )}
          </div>

          <OrderStatusManager orderId={order.id} currentStatus={order.status} />
          <OrderTrackingForm orderId={order.id} trackingNumber={order.trackingNumber ?? ''} trackingUrl={order.trackingUrl ?? ''} />
          <OrderNoteForm orderId={order.id} note={order.adminNote ?? ''} />
        </div>
      </div>
    </div>
  )
}
