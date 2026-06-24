'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import type { ProductCard as ProductCardType } from '@/types'

interface ProductCardProps {
  product: ProductCardType
  priority?: boolean
  className?: string
}

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const primaryImage = product.images[0]
  const secondaryImage = product.images[1]
  const isOnSale = product.comparePrice && product.comparePrice > product.price

  return (
    <motion.article
      whileHover="hover"
      className={cn('group relative flex flex-col', className)}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative overflow-hidden aspect-product bg-charcoal block"
        aria-label={`View ${product.name}`}
      >
        {primaryImage ? (
          <>
            <motion.div
              variants={{ hover: { opacity: 0 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText ?? product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top"
                priority={priority}
              />
            </motion.div>
            {secondaryImage && (
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={secondaryImage.url}
                  alt={secondaryImage.altText ?? `${product.name} alternate view`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </motion.div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
            <span className="text-stone text-xs tracking-wide uppercase">No image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-gold text-black text-[9px] font-semibold tracking-widest uppercase">
              New
            </span>
          )}
          {isOnSale && (
            <span className="px-2.5 py-1 bg-charcoal/90 text-off-white text-[9px] font-medium tracking-wider uppercase border border-charcoal-light">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <motion.button
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm border border-charcoal-light hover:border-gold text-warm-gray hover:text-gold transition-colors duration-200"
          aria-label={`Add ${product.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault()
            // TODO: trigger wishlist action
          }}
        >
          <Heart size={14} />
        </motion.button>
      </Link>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-1">
        <Link href={`/products/${product.slug}`} className="group/name">
          <h3 className="font-serif text-off-white text-base font-light leading-snug group-hover/name:text-gold transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-warm-gray text-sm">{formatPrice(Number(product.price))}</span>
          {isOnSale && (
            <span className="text-stone text-xs line-through">
              {formatPrice(Number(product.comparePrice))}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-product skeleton" />
      <div className="space-y-2">
        <div className="h-4 skeleton w-3/4" />
        <div className="h-3 skeleton w-1/3" />
      </div>
    </div>
  )
}
