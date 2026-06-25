import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Admin — Journal' }

export default async function AdminJournalPage() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PUBLISHED: 'text-emerald-400 border-emerald-400/30',
      DRAFT: 'text-amber-400 border-amber-400/30',
      ARCHIVED: 'text-stone border-stone/30',
    }
    return map[status] ?? 'text-stone border-stone/30'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="label-tag text-gold mb-1">Content</p>
          <h1 className="font-serif text-2xl font-light text-off-white">Journal</h1>
          <p className="text-stone text-xs mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/journal/new" className="btn-gold px-5 py-2 text-xs">+ New Article</Link>
      </div>

      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['Title', 'Status', 'Tags', 'Published', 'Created', ''].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-black/20 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-off-white text-sm font-medium">{article.title}</p>
                    <p className="text-stone text-xs">/{article.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${statusBadge(article.status)}`}>
                      {article.status.charAt(0) + article.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {article.tags.length > 0 ? article.tags.slice(0, 3).join(', ') : '—'}
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {article.publishedAt
                      ? formatDate(article.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </td>
                  <td className="px-5 py-3 text-stone text-xs">
                    {formatDate(article.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/journal/${article.id}`} className="text-xs text-warm-gray hover:text-gold transition-colors">Edit</Link>
                      {article.status === 'PUBLISHED' && (
                        <Link href={`/journal/${article.slug}`} target="_blank" className="text-xs text-stone hover:text-gold transition-colors">View →</Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm">No articles yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
