import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Admin — Orders' }

interface AdminOrdersProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1')
  const limit = 25
  const status = params.status

  const where = status ? { status: status as any } : {}

  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        items: { take: 1, include: { product: { select: { name: true } } } },
      },
    }),
    db.order.count({ where }),
  ]).catch(() => [[], 0])

  const statuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']
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
        <p className="label-tag text-gold mb-1">Commerce</p>
        <h1 className="font-serif text-2xl font-light text-off-white">Orders</h1>
        <p className="text-stone text-xs mt-1">{total} total orders</p>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        <Link
          href="/admin/orders"
          className={`text-xs px-3 py-1.5 border transition-colors ${!status ? 'border-gold text-gold' : 'border-charcoal-mid text-stone hover:text-warm-gray'}`}
        >
          All
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`text-xs px-3 py-1.5 border transition-colors ${status === s ? 'border-gold text-gold' : 'border-charcoal-mid text-stone hover:text-warm-gray'}`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['Order', 'Customer', 'Items', 'Total', 'Status', 'Date', ''].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {(orders as any[]).map((order) => (
                <tr key={order.id} className="hover:bg-black/20 transition-colors">
                  <td className="px-5 py-3 text-off-white text-sm font-mono">{order.orderNumber}</td>
                  <td className="px-5 py-3 text-warm-gray text-sm">{order.email}</td>
                  <td className="px-5 py-3 text-stone text-sm">
                    {order.items[0]?.product?.name ?? '—'}
                    {order.items.length > 1 && <span className="text-xs"> +{order.items.length - 1}</span>}
                  </td>
                  <td className="px-5 py-3 text-off-white text-sm">{formatPrice(Number(order.total))}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${statusColors[order.status] ?? 'text-stone border-stone/30'}`}>
                      {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">{formatDate(order.createdAt, { month: 'short', day: 'numeric' })}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-xs text-warm-gray hover:text-gold transition-colors">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(orders as any[]).length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm">No orders found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-stone text-xs">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/orders?page=${page - 1}${status ? `&status=${status}` : ''}`} className="btn-ghost px-4 py-2 text-xs">
                Previous
              </Link>
            )}
            {page * limit < total && (
              <Link href={`/admin/orders?page=${page + 1}${status ? `&status=${status}` : ''}`} className="btn-ghost px-4 py-2 text-xs">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
