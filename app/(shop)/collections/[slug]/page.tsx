import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { db } from '@/lib/db'
import { ProductCard } from '@/components/product/ProductCard'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

async function getCollection(slug: string) {
  try { return await db.collection.findUnique({
    where: { slug, isActive: true },
    include: {
      products: {
        orderBy: { sortOrder: 'asc' },
        include: {
          product: {
            include: {
              images: {
                orderBy: { sortOrder: 'asc' },
                take: 2,
                select: { url: true, altText: true },
              },
            },
          },
        },
      },
    },
  }) } catch { return null }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)
  if (!collection) return { title: 'Collection Not Found' }
  return {
    title: collection.seoTitle ?? collection.name,
    description: collection.seoDesc ?? collection.description ?? undefined,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)
  if (!collection) notFound()

  const products = collection.products
    .filter((cp) => cp.product.status === 'ACTIVE')
    .map((cp) => cp.product)

  return (
    <div className="pt-16 md:pt-18">
      {/* Hero */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        {collection.heroImage && (
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 container mx-auto pb-12 md:pb-20">
          <FadeUp>
            <p className="label-tag text-gold mb-4">ITHAR Collection</p>
            <h1 className="font-serif text-display-lg font-light text-off-white leading-tight mb-4">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-warm-gray max-w-xl leading-relaxed text-sm md:text-base">
                {collection.description}
              </p>
            )}
          </FadeUp>
        </div>
      </div>

      {/* Collection story */}
      {collection.story && (
        <div className="bg-charcoal border-b border-charcoal-mid">
          <div className="container mx-auto py-12 md:py-16 max-w-2xl text-center">
            <FadeUp>
              <p className="font-serif text-lg font-light text-warm-gray leading-relaxed italic">
                &ldquo;{collection.story}&rdquo;
              </p>
            </FadeUp>
          </div>
        </div>
      )}

      {/* Products */}
      <section className="section-padding bg-black">
        <div className="container mx-auto">
          <FadeUp className="flex items-end justify-between mb-12">
            <div>
              <p className="label-tag mb-2 text-stone">{products.length} piece{products.length !== 1 ? 's' : ''}</p>
              <h2 className="font-serif text-display-sm font-light text-off-white">
                The Collection
              </h2>
            </div>
          </FadeUp>

          {products.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product as any} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <FadeUp className="text-center py-24">
              <p className="font-serif text-display-sm text-warm-gray font-light mb-4">
                Coming Soon.
              </p>
              <p className="text-stone text-sm">
                The collection is being prepared. Join the waitlist to be first.
              </p>
            </FadeUp>
          )}
        </div>
      </section>
    </div>
  )
}
