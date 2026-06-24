import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { Users } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — Waitlist' }

interface AdminWaitlistProps {
  searchParams: Promise<{ page?: string; size?: string }>
}

export default async function AdminWaitlistPage({ searchParams }: AdminWaitlistProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1')
  const limit = 50
  const sizeFilter = params.size

  const where = sizeFilter ? { size: sizeFilter } : {}

  const result = await Promise.all([
    db.waitlistMember.findMany({
      where,
      orderBy: { position: 'asc' },
      take: limit,
      skip: (page - 1) * limit,
    }),
    db.waitlistMember.count({ where }),
    db.waitlistMember.count(),
  ]).catch(() => null)

  const members = result?.[0] ?? []
  const filtered = result?.[1] ?? 0
  const total = result?.[2] ?? 0

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="label-tag text-gold mb-1">Pre-Launch</p>
          <h1 className="font-serif text-2xl font-light text-off-white">Waitlist</h1>
          <p className="text-stone text-xs mt-1">{total} total signups</p>
        </div>

        {/* Stat pill */}
        <div className="flex items-center gap-2 px-4 py-3 border border-gold/30 bg-gold/5">
          <Users size={14} className="text-gold" />
          <span className="text-gold font-semibold text-lg">{total}</span>
          <span className="text-stone text-xs">Risers</span>
        </div>
      </div>

      {/* Size filters */}
      <div className="flex gap-2 flex-wrap">
        <a
          href="/admin/waitlist"
          className={`text-xs px-3 py-1.5 border transition-colors ${!sizeFilter ? 'border-gold text-gold' : 'border-charcoal-mid text-stone hover:text-warm-gray'}`}
        >
          All Sizes
        </a>
        {sizes.map((s) => (
          <a
            key={s}
            href={`/admin/waitlist?size=${s}`}
            className={`text-xs px-3 py-1.5 border transition-colors ${sizeFilter === s ? 'border-gold text-gold' : 'border-charcoal-mid text-stone hover:text-warm-gray'}`}
          >
            {s}
          </a>
        ))}
      </div>

      {/* Table */}
      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['#', 'Name', 'Email', 'Size', 'Signed Up'].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-black/20 transition-colors">
                  <td className="px-5 py-3 text-stone text-xs font-mono">#{member.position}</td>
                  <td className="px-5 py-3 text-off-white text-sm">
                    {member.firstName || member.lastName
                      ? `${member.firstName ?? ''} ${member.lastName ?? ''}`.trim()
                      : <span className="text-stone">—</span>}
                  </td>
                  <td className="px-5 py-3 text-warm-gray text-sm">{member.email}</td>
                  <td className="px-5 py-3">
                    {member.size
                      ? <span className="text-xs border border-charcoal-mid px-2 py-0.5 text-warm-gray">{member.size}</span>
                      : <span className="text-stone text-xs">—</span>}
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {formatDate(member.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {members.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm">No signups yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filtered > limit && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-stone text-xs">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, filtered)} of {filtered}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <a href={`/admin/waitlist?page=${page - 1}${sizeFilter ? `&size=${sizeFilter}` : ''}`} className="btn-ghost px-4 py-2 text-xs">
                Previous
              </a>
            )}
            {page * limit < filtered && (
              <a href={`/admin/waitlist?page=${page + 1}${sizeFilter ? `&size=${sizeFilter}` : ''}`} className="btn-ghost px-4 py-2 text-xs">
                Next
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
