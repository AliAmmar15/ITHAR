import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { ProductStory } from '@/components/product/ProductStory'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { absoluteUrl } from '@/lib/utils'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  try { return await db.product.findUnique({
    where: { slug, status: 'ACTIVE' },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: {
        include: { sizes: { orderBy: { size: 'asc' } } },
      },
      collections: { include: { collection: true } },
      _count: { select: { reviews: true } },
    },
  }) } catch { return null }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found' }

  const primaryImage = product.images[0]

  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDesc ?? product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.description ?? '',
      images: primaryImage ? [{ url: primaryImage.url, alt: primaryImage.altText ?? product.name }] : [],
      url: absoluteUrl(`/products/${product.slug}`),
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const [product, session] = await Promise.all([getProduct(slug), auth()])

  if (!product) notFound()

  let initialWishlisted = false
  if (session?.user?.id) {
    const item = await db.wishlistItem.findUnique({
      where: { userId_productId: { userId: session.user.id, productId: product.id } },
    }).catch(() => null)
    initialWishlisted = !!item
  }

  return (
    <div className="pt-16 md:pt-18">
      {/* Main product section */}
      <section className="container mx-auto py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product as any} initialWishlisted={initialWishlisted} />
        </div>
      </section>

      {/* Product story */}
      {(product.story || product.fabric || product.careInstructions) && (
        <ProductStory product={product as any} />
      )}

      {/* Related products */}
      <RelatedProducts
        currentProductId={product.id}
        collectionId={product.collections[0]?.collectionId}
      />
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const products = await db.product.findMany({
      where: { status: 'ACTIVE' },
      select: { slug: true },
    })
    return products.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}
