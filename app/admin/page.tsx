import type { Metadata } from 'next'
import { TrendingUp, ShoppingCart, Users, Package, AlertTriangle } from 'lucide-react'
import { db } from '@/lib/db'
import { formatPrice } from '@/lib/utils'
import { AdminRevenueChart } from '@/components/admin/AdminRevenueChart'

export const metadata: Metadata = { title: 'Admin Dashboard' }

async function getDashboardStats() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const [
    revenueThisMonth,
    revenueLastMonth,
    ordersThisMonth,
    ordersLastMonth,
    totalCustomers,
    customersThisMonth,
    totalProducts,
    lowStockItems,
    recentOrders,
  ] = await Promise.all([
    db.order.aggregate({ where: { createdAt: { gte: thirtyDaysAgo }, status: { not: 'CANCELLED' } }, _sum: { total: true } }),
    db.order.aggregate({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, status: { not: 'CANCELLED' } }, _sum: { total: true } }),
    db.order.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    db.order.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
    db.user.count({ where: { role: 'CUSTOMER' } }),
    db.user.count({ where: { createdAt: { gte: thirtyDaysAgo }, role: 'CUSTOMER' } }),
    db.product.count({ where: { status: 'ACTIVE' } }),
    db.sizeStock.count({ where: { stock: { lte: 3, gt: 0 } } }),
    db.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { items: { take: 1 } } }),
  ])

  return {
    revenueThisMonth: Number(revenueThisMonth._sum.total ?? 0),
    revenueLastMonth: Number(revenueLastMonth._sum.total ?? 0),
    ordersThisMonth,
    ordersLastMonth,
    totalCustomers,
    customersThisMonth,
    totalProducts,
    lowStockItems,
    recentOrders,
  }
}

function pctChange(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? '+100%' : '—'
  const pct = ((current - previous) / previous) * 100
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats().catch(() => null)
  if (!stats) return <div className="text-red-400">Failed to load stats</div>

  const statCards = [
    {
      label: 'Revenue (30d)',
      value: formatPrice(stats.revenueThisMonth),
      change: pctChange(stats.revenueThisMonth, stats.revenueLastMonth),
      icon: TrendingUp,
      positive: stats.revenueThisMonth >= stats.revenueLastMonth,
    },
    {
      label: 'Orders (30d)',
      value: stats.ordersThisMonth,
      change: pctChange(stats.ordersThisMonth, stats.ordersLastMonth),
      icon: ShoppingCart,
      positive: stats.ordersThisMonth >= stats.ordersLastMonth,
    },
    {
      label: 'Total Customers',
      value: stats.totalCustomers,
      change: `+${stats.customersThisMonth} this month`,
      icon: Users,
      positive: true,
    },
    {
      label: 'Active Products',
      value: stats.totalProducts,
      change: stats.lowStockItems > 0 ? `${stats.lowStockItems} low stock` : 'All stocked',
      icon: Package,
      positive: stats.lowStockItems === 0,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="label-tag text-gold mb-2">Admin</p>
        <h1 className="font-serif text-2xl font-light text-off-white">Dashboard</h1>
      </div>

      {/* Low stock alert */}
      {stats.lowStockItems > 0 && (
        <div className="flex items-center gap-3 p-4 border border-amber-500/30 bg-amber-500/5">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />
          <p className="text-amber-400 text-sm">
            <span className="font-medium">{stats.lowStockItems} size variants</span> are running low on stock.{' '}
            <a href="/admin/products" className="underline">Review inventory →</a>
          </p>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="p-6 border border-charcoal-mid bg-charcoal">
              <div className="flex items-start justify-between mb-4">
                <p className="label-tag text-stone">{card.label}</p>
                <Icon size={16} className="text-warm-gray" />
              </div>
              <p className="font-serif text-3xl text-off-white font-light mb-2">{card.value}</p>
              <p className={`text-xs font-medium ${card.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {card.change}
              </p>
            </div>
          )
        })}
      </div>

      {/* Revenue chart */}
      <div className="border border-charcoal-mid bg-charcoal p-6">
        <h2 className="font-serif text-lg font-light text-off-white mb-6">Revenue (Last 30 Days)</h2>
        <AdminRevenueChart />
      </div>

      {/* Recent orders */}
      <div className="border border-charcoal-mid bg-charcoal p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-light text-off-white">Recent Orders</h2>
          <a href="/admin/orders" className="btn-text">View All</a>
        </div>
        <div className="space-y-0 divide-y divide-charcoal-mid">
          {stats.recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-off-white text-sm font-mono">{order.orderNumber}</p>
                <p className="text-stone text-xs">{order.email}</p>
              </div>
              <div className="text-right">
                <p className="text-off-white text-sm">{formatPrice(Number(order.total))}</p>
                <p className="text-stone text-xs capitalize">{order.status.toLowerCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
