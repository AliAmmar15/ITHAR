import Image from 'next/image'
import { FadeUp } from '@/components/animations/FadeUp'
import type { ProductWithDetails } from '@/types'

interface ProductStoryProps {
  product: ProductWithDetails
}

export function ProductStory({ product }: ProductStoryProps) {
  return (
    <section className="bg-charcoal border-y border-charcoal-mid">
      <div className="container mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Story image */}
          <FadeUp className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.images[1]?.url ?? product.images[0]?.url ?? '/images/placeholder.jpg'}
              alt={`${product.name} detail`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>

          {/* Story text */}
          <div className="space-y-6">
            {product.story && (
              <FadeUp>
                <p className="label-tag text-gold mb-4">The Story</p>
                <div className="space-y-4 text-warm-gray text-sm md:text-base leading-relaxed">
                  {product.story.split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </FadeUp>
            )}

            {product.fabric && (
              <FadeUp delay={0.1}>
                <div className="border-t border-charcoal-mid pt-6">
                  <p className="label-tag mb-3">Construction</p>
                  <p className="text-warm-gray text-sm leading-relaxed">{product.fabric}</p>
                </div>
              </FadeUp>
            )}

            {product.careInstructions && (
              <FadeUp delay={0.15}>
                <div className="border-t border-charcoal-mid pt-6">
                  <p className="label-tag mb-3">Care</p>
                  <p className="text-warm-gray text-sm leading-relaxed whitespace-pre-line">
                    {product.careInstructions}
                  </p>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
