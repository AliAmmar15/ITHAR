import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Admin — Customers' }

export default async function AdminCustomersPage() {
  const customers = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { orders: true } },
    },
  }).catch(() => [])

  return (
    <div className="space-y-6">
      <div>
        <p className="label-tag text-gold mb-1">Community</p>
        <h1 className="font-serif text-2xl font-light text-off-white">Customers</h1>
        <p className="text-stone text-xs mt-1">{customers.length} total accounts</p>
      </div>

      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['Name', 'Email', 'Role', 'Orders', 'Joined', ''].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-black/20 transition-colors">
                  <td className="px-5 py-3 text-off-white text-sm">
                    {customer.name ?? <span className="text-stone">—</span>}
                  </td>
                  <td className="px-5 py-3 text-warm-gray text-sm">{customer.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${
                      customer.role === 'ADMIN' || customer.role === 'SUPERADMIN'
                        ? 'text-gold border-gold/30'
                        : 'text-stone border-stone/30'
                    }`}>
                      {customer.role.charAt(0) + customer.role.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-warm-gray text-sm">{customer._count.orders}</td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {formatDate(customer.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {customer.emailVerified ? (
                      <span className="text-emerald-400">Verified</span>
                    ) : (
                      <span className="text-amber-400">Unverified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm">No customers yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
