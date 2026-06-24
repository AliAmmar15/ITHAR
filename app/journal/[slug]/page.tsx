import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { FadeUp } from '@/components/animations/FadeUp'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    return db.article.findUnique({ where: { slug, status: 'PUBLISHED' } })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDesc ?? article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      {/* Hero */}
      {article.coverImage && (
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      )}

      <div className="container mx-auto py-12 md:py-16 max-w-2xl">
        {/* Back */}
        <Link href="/journal" className="btn-text mb-8 inline-flex">
          <ArrowLeft size={13} /> Journal
        </Link>

        <FadeUp>
          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {article.tags.map((tag) => (
                <span key={tag} className="label-tag text-gold border border-gold/30 px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-display-md font-light text-off-white mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          {article.publishedAt && (
            <p className="label-tag text-stone mb-10">{formatDate(article.publishedAt)}</p>
          )}

          {/* Divider */}
          <div className="w-12 h-px bg-gold mb-10" />

          {/* Content */}
          <div
            className="prose prose-invert prose-sm md:prose-base max-w-none
              prose-headings:font-serif prose-headings:font-light prose-headings:text-off-white
              prose-p:text-warm-gray prose-p:leading-relaxed
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-gold prose-blockquote:text-warm-gray
              prose-strong:text-off-white
              prose-hr:border-charcoal-mid"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </FadeUp>

        {/* Footer CTA */}
        <FadeUp className="mt-16 pt-10 border-t border-charcoal-mid text-center">
          <p className="label-tag text-gold mb-4">Continue Reading</p>
          <Link href="/journal" className="btn-ghost px-10">View All Articles</Link>
        </FadeUp>
      </div>
    </div>
  )
}
