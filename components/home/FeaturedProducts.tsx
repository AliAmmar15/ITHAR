import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard'
import { StaggerContainer, StaggerItem, FadeUp } from '@/components/animations/FadeUp'
import type { ProductCard as ProductCardType } from '@/types'

interface FeaturedProductsProps {
  products: ProductCardType[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const hasProducts = products.length > 0

  return (
    <section className="section-padding bg-black">
      <div className="container mx-auto">
        {/* Header */}
        <FadeUp className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="label-tag mb-3 text-gold">The Collection</p>
            <h2 className="font-serif text-display-md font-light text-off-white">
              Featured Pieces
            </h2>
          </div>
          <Link href="/shop" className="btn-text hidden sm:flex">
            View All <ArrowRight size={14} />
          </Link>
        </FadeUp>

        {/* Grid */}
        {hasProducts ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <FadeUp className="mt-10 flex justify-center sm:hidden">
          <Link href="/shop" className="btn-ghost">
            View All Products
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
