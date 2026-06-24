import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'
import { formatDate } from '@/lib/utils'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories, reflections, and writing from ITHAR. On the values that define us.',
}

async function getArticles() {
  try {
    return await db.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 12,
    })
  } catch {
    return []
  }
}

const placeholderArticles = [
  {
    id: '1', slug: 'the-meaning-of-ghadir', title: 'The Meaning of Ghadir',
    excerpt: 'On the 18th of Dhul Hijjah, 10 AH, a declaration was made that changed everything. What Ghadir means for those who rise.',
    coverImage: '/images/journal-1.jpg',
    publishedAt: new Date('2025-06-18'),
    tags: ['Ghadir', 'Ahlulbayt'],
  },
  {
    id: '2', slug: 'why-ithar', title: 'Why ITHAR?',
    excerpt: 'The word that became a brand. The journey from concept to cloth, and the intention behind every thread.',
    coverImage: '/images/journal-2.jpg',
    publishedAt: new Date('2025-05-30'),
    tags: ['Brand Story', 'Design'],
  },
  {
    id: '3', slug: 'patience-as-strength', title: 'Patience as Strength',
    excerpt: 'Sabr is not passivity. It is the act of enduring with full presence — the way of those who rise when others fall.',
    coverImage: '/images/journal-3.jpg',
    publishedAt: new Date('2025-05-12'),
    tags: ['Values', 'Reflection'],
  },
]

export default async function JournalPage() {
  const articles = await getArticles()
  const displayArticles = articles.length > 0 ? articles : placeholderArticles

  const [featured, ...rest] = displayArticles

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-16 md:py-20">
        <FadeUp className="mb-14">
          <p className="label-tag text-gold mb-4">ITHAR</p>
          <h1 className="font-serif text-display-lg font-light text-off-white">Journal</h1>
          <p className="text-warm-gray text-sm mt-3 max-w-md leading-relaxed">
            Stories, reflections, and writing on the values that define us.
          </p>
        </FadeUp>

        {/* Featured article */}
        {featured && (
          <FadeUp className="mb-14">
            <Link
              href={`/journal/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-charcoal-mid hover:border-gold transition-all duration-300"
            >
              <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-charcoal" />
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex gap-2 flex-wrap mb-5">
                  {(featured as any).tags?.map((tag: string) => (
                    <span key={tag} className="label-tag text-gold border border-gold/30 px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-serif text-display-sm font-light text-off-white mb-4 leading-tight group-hover:text-gold transition-colors duration-200">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-warm-gray text-sm leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                )}
                {featured.publishedAt && (
                  <p className="label-tag text-stone">{formatDate(featured.publishedAt)}</p>
                )}
              </div>
            </Link>
          </FadeUp>
        )}

        {/* Article grid */}
        {rest.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((article) => (
              <StaggerItem key={article.id}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="group block border border-charcoal-mid hover:border-gold transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-charcoal" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-light text-off-white mb-2 leading-snug group-hover:text-gold transition-colors duration-200">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-stone text-xs leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    )}
                    {article.publishedAt && (
                      <p className="label-tag text-stone/60">{formatDate(article.publishedAt)}</p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  )
}
