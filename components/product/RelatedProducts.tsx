import { db } from '@/lib/db'
import { ProductCard } from '@/components/product/ProductCard'
import { StaggerContainer, StaggerItem, FadeUp } from '@/components/animations/FadeUp'

interface RelatedProductsProps {
  currentProductId: string
  collectionId?: string
}

async function getRelated(currentProductId: string, collectionId?: string) {
  try {
    return await db.product.findMany({
      where: {
        id: { not: currentProductId },
        status: 'ACTIVE',
        ...(collectionId && {
          collections: { some: { collectionId } },
        }),
      },
      take: 4,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 2,
          select: { url: true, altText: true },
        },
      },
    })
  } catch {
    return []
  }
}

export async function RelatedProducts({ currentProductId, collectionId }: RelatedProductsProps) {
  const products = await getRelated(currentProductId, collectionId)
  if (products.length === 0) return null

  return (
    <section className="section-padding bg-black border-t border-charcoal-mid">
      <div className="container mx-auto">
        <FadeUp className="mb-12">
          <p className="label-tag text-gold mb-3">You May Also Like</p>
          <h2 className="font-serif text-display-sm font-light text-off-white">
            Complete the Look
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product as any} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
