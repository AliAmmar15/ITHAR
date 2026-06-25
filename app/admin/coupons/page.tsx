import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'
import { CouponCreateModal } from '@/components/admin/CouponCreateModal'

export const metadata: Metadata = { title: 'Admin — Coupons' }

export default async function AdminCouponsPage() {
  const coupons = await db.coupon.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { orders: true } } },
  }).catch(() => [])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="label-tag text-gold mb-1">Promotions</p>
          <h1 className="font-serif text-2xl font-light text-off-white">Coupons</h1>
          <p className="text-stone text-xs mt-1">{coupons.length} coupon{coupons.length !== 1 ? 's' : ''}</p>
        </div>
        <CouponCreateModal />
      </div>

      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['Code', 'Type', 'Value', 'Min Order', 'Uses', 'Status', 'Expires', ''].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {coupons.map((coupon) => {
                const isExpired = coupon.expiresAt && coupon.expiresAt < new Date()
                const isExhausted = coupon.maxUses != null && coupon.usedCount >= coupon.maxUses
                const isActive = coupon.isActive && !isExpired && !isExhausted

                return (
                  <tr key={coupon.id} className="hover:bg-black/20 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-off-white text-sm font-mono tracking-wide">{coupon.code}</span>
                    </td>
                    <td className="px-5 py-3 text-stone text-xs">
                      {coupon.type === 'PERCENTAGE' ? 'Percentage' : coupon.type === 'FIXED_AMOUNT' ? 'Fixed' : 'Free Shipping'}
                    </td>
                    <td className="px-5 py-3 text-off-white text-sm">
                      {coupon.type === 'PERCENTAGE'
                        ? `${Number(coupon.value)}%`
                        : coupon.type === 'FIXED_AMOUNT'
                        ? formatPrice(Number(coupon.value))
                        : '—'}
                    </td>
                    <td className="px-5 py-3 text-stone text-sm">
                      {coupon.minOrderAmount ? formatPrice(Number(coupon.minOrderAmount)) : '—'}
                    </td>
                    <td className="px-5 py-3 text-warm-gray text-sm">
                      {coupon.usedCount}{coupon.maxUses != null ? ` / ${coupon.maxUses}` : ''}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${
                        isActive
                          ? 'text-emerald-400 border-emerald-400/30'
                          : 'text-stone border-stone/30'
                      }`}>
                        {isExpired ? 'Expired' : isExhausted ? 'Exhausted' : isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-stone text-xs">
                      {coupon.expiresAt ? formatDate(coupon.expiresAt, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3 text-stone text-xs">{coupon._count.orders} orders</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {coupons.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm">No coupons yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
