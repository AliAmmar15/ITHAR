import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = { title: 'Admin — Analytics' }

export default async function AdminAnalyticsPage() {
  const [
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    recentOrders,
  ] = await Promise.all([
    db.order.aggregate({ _sum: { total: true }, where: { status: { notIn: ['CANCELLED', 'REFUNDED'] } } }),
    db.order.count(),
    db.user.count({ where: { role: 'CUSTOMER' } }),
    db.product.count({ where: { status: 'ACTIVE' } }),
    db.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { orderNumber: true, total: true, status: true, createdAt: true },
    }),
  ]).catch(() => [
    { _sum: { total: null } },
    0, 0, 0, [],
  ])

  const stats = [
    { label: 'Total Revenue', value: formatPrice(Number((totalRevenue as any)?._sum?.total ?? 0)), sub: 'excl. cancelled & refunded' },
    { label: 'Total Orders', value: String(totalOrders), sub: 'all time' },
    { label: 'Customers', value: String(totalCustomers), sub: 'registered accounts' },
    { label: 'Active Products', value: String(totalProducts), sub: 'live in store' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="label-tag text-gold mb-1">Reporting</p>
        <h1 className="font-serif text-2xl font-light text-off-white">Analytics</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-charcoal-mid bg-charcoal p-6">
            <p className="font-serif text-3xl text-off-white font-light">{stat.value}</p>
            <p className="label-tag text-stone mt-1">{stat.label}</p>
            <p className="text-stone text-[10px] mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="border border-charcoal-mid bg-charcoal p-6">
        <h2 className="font-serif text-lg font-light text-off-white mb-5">Recent Orders</h2>
        <div className="space-y-3">
          {(Array.isArray(recentOrders) ? recentOrders : []).map((order: any) => (
            <div key={order.orderNumber} className="flex items-center justify-between text-sm border-b border-charcoal-mid pb-3 last:border-0 last:pb-0">
              <span className="text-warm-gray font-mono text-xs">{order.orderNumber}</span>
              <span className="text-off-white">{formatPrice(Number(order.total))}</span>
            </div>
          ))}
          {(Array.isArray(recentOrders) ? recentOrders : []).length === 0 && (
            <p className="text-stone text-sm">No orders yet.</p>
          )}
        </div>
      </div>

      <div className="border border-charcoal-mid bg-charcoal p-8 text-center">
        <p className="text-warm-gray text-sm mb-2">Detailed analytics coming soon.</p>
        <p className="text-stone text-xs">Charts, conversion rates, and revenue breakdowns will appear here.</p>
      </div>
    </div>
  )
}
