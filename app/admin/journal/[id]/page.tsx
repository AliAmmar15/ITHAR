import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { ArticleForm } from '@/components/admin/ArticleForm'

export const metadata: Metadata = { title: 'Admin — Edit Article' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminEditArticlePage({ params }: Props) {
  const { id } = await params

  const article = await db.article.findUnique({ where: { id } }).catch(() => null)
  if (!article) notFound()

  const statusBadge: Record<string, string> = {
    PUBLISHED: 'text-emerald-400 border-emerald-400/30',
    DRAFT: 'text-amber-400 border-amber-400/30',
    ARCHIVED: 'text-stone border-stone/30',
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/journal" className="btn-text mb-4 inline-flex">
          <ArrowLeft size={13} /> Journal
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <p className="label-tag text-gold mb-1">Journal</p>
            <h1 className="font-serif text-2xl font-light text-off-white">{article.title}</h1>
            <p className="text-stone text-xs mt-1">
              {article.publishedAt
                ? `Published ${formatDate(article.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}`
                : `Created ${formatDate(article.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${statusBadge[article.status] ?? 'text-stone border-stone/30'}`}>
              {article.status.charAt(0) + article.status.slice(1).toLowerCase()}
            </span>
            {article.status === 'PUBLISHED' && (
              <Link href={`/journal/${article.slug}`} target="_blank" className="btn-ghost px-4 py-2 text-xs">
                View Live →
              </Link>
            )}
          </div>
        </div>
      </div>

      <ArticleForm
        articleId={article.id}
        initial={{
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt ?? '',
          content: article.content,
          coverImage: article.coverImage ?? '',
          status: article.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
          tags: article.tags.join(', '),
          seoTitle: article.seoTitle ?? '',
          seoDesc: article.seoDesc ?? '',
        }}
      />
    </div>
  )
}
