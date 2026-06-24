import type { Metadata } from 'next'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { ProductFilters } from '@/components/product/ProductFilters'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'
import { db } from '@/lib/db'
import type { ProductFilters as Filters } from '@/types'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse the full ITHAR collection. Premium streetwear built on principle.',
}

interface ShopPageProps {
  searchParams: Promise<{
    collection?: string
    sort?: string
    search?: string
    page?: string
  }>
}

async function getProducts(filters: Filters) {
  const { sortBy, search, page = 1, limit = 12 } = filters

  const orderBy = (() => {
    switch (sortBy) {
      case 'price-asc': return { price: 'asc' as const }
      case 'price-desc': return { price: 'desc' as const }
      case 'name-asc': return { name: 'asc' as const }
      default: return { createdAt: 'desc' as const }
    }
  })()

  const where = {
    status: 'ACTIVE' as const,
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 2,
          select: { url: true, altText: true },
        },
      },
    }),
    db.product.count({ where }),
  ])

  return { products, total }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const filters: Filters = {
    sortBy: (params.sort as Filters['sortBy']) ?? 'newest',
    search: params.search,
    page: params.page ? parseInt(params.page) : 1,
    limit: 12,
  }

  const { products, total } = await getProducts(filters).catch(() => ({ products: [], total: 0 }))

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero bar */}
      <div className="border-b border-charcoal-mid">
        <div className="container mx-auto py-10 md:py-14">
          <FadeUp>
            <p className="label-tag text-gold mb-3">ITHAR</p>
            <h1 className="font-serif text-display-lg font-light text-off-white">
              All Products
            </h1>
            <p className="text-stone text-sm mt-2">{total} piece{total !== 1 ? 's' : ''}</p>
          </FadeUp>
        </div>
      </div>

      <div className="container mx-auto py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Filters sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <ProductFilters currentFilters={filters} />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {products.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product as any} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeUp className="text-center py-24">
                <p className="font-serif text-display-sm font-light text-warm-gray mb-4">
                  No products found.
                </p>
                <p className="text-stone text-sm">
                  The collection is coming. Join the waitlist to be first.
                </p>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
