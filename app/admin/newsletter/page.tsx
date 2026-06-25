import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Admin — Newsletter' }

export default async function AdminNewsletterPage() {
  const [subscribers, total] = await Promise.all([
    db.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    db.newsletterSubscriber.count(),
  ]).catch(() => [[], 0])

  const confirmed = Array.isArray(subscribers)
    ? subscribers.filter((s) => s.isConfirmed).length
    : 0

  return (
    <div className="space-y-6">
      <div>
        <p className="label-tag text-gold mb-1">Marketing</p>
        <h1 className="font-serif text-2xl font-light text-off-white">Newsletter</h1>
        <p className="text-stone text-xs mt-1">{total} subscribers · {confirmed} confirmed</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-charcoal-mid bg-charcoal p-6">
          <p className="font-serif text-3xl text-off-white font-light">{total}</p>
          <p className="label-tag text-stone mt-1">Total Subscribers</p>
        </div>
        <div className="border border-charcoal-mid bg-charcoal p-6">
          <p className="font-serif text-3xl text-emerald-400 font-light">{confirmed}</p>
          <p className="label-tag text-stone mt-1">Confirmed</p>
        </div>
      </div>

      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['Email', 'Name', 'Source', 'Status', 'Joined'].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {(Array.isArray(subscribers) ? subscribers : []).map((sub) => (
                <tr key={sub.id} className="hover:bg-black/20 transition-colors">
                  <td className="px-5 py-3 text-off-white text-sm">{sub.email}</td>
                  <td className="px-5 py-3 text-warm-gray text-sm">{sub.firstName ?? <span className="text-stone">—</span>}</td>
                  <td className="px-5 py-3 text-stone text-xs capitalize">{sub.source ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${
                      sub.isConfirmed ? 'text-emerald-400 border-emerald-400/30' : 'text-amber-400 border-amber-400/30'
                    }`}>
                      {sub.isConfirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {formatDate(sub.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(Array.isArray(subscribers) ? subscribers : []).length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm">No subscribers yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
