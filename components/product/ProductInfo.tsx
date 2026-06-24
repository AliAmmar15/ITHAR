'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Ruler, ChevronDown, ChevronUp } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, getStockStatus, cn } from '@/lib/utils'
import { SizeGuideModal } from '@/components/product/SizeGuideModal'
import type { ProductWithDetails } from '@/types'

interface ProductInfoProps {
  product: ProductWithDetails
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCartStore()

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]
  const selectedSizeStock = selectedVariant?.sizes.find((s) => s.size === selectedSize)
  const stockStatus = selectedSizeStock ? getStockStatus(selectedSizeStock.stock) : null

  const effectivePrice = Number(selectedVariant?.price ?? product.price)
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null
  const isOnSale = comparePrice && comparePrice > effectivePrice
  const primaryImage = product.images[0]

  const handleAddToCart = () => {
    if (!selectedSize || !selectedSizeStock || !stockStatus?.isAvailable) return

    addItem({
      id: selectedSizeStock.id,
      productId: product.id,
      variantId: selectedVariant!.id,
      name: product.name,
      variantName: selectedVariant!.name,
      size: selectedSize,
      price: effectivePrice,
      comparePrice: comparePrice ?? undefined,
      quantity,
      imageUrl: primaryImage?.url ?? '',
      slug: product.slug,
      maxStock: selectedSizeStock.stock,
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const accordionItems = [
    { id: 'fabric', label: 'Fabric & Construction', content: product.fabric },
    { id: 'care', label: 'Care Instructions', content: product.careInstructions },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: 'Free shipping on orders over $100. Returns accepted within 30 days of delivery on unworn, unwashed items with original tags attached.',
    },
  ].filter((item) => item.content)

  return (
    <div className="flex flex-col gap-7 py-2">
      {/* Breadcrumb / collection */}
      {product.collections[0] && (
        <p className="label-tag text-gold">{product.collections[0].collection.name}</p>
      )}

      {/* Title */}
      <div>
        <h1 className="font-serif text-display-sm font-light text-off-white leading-tight mb-3">
          {product.name}
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-2xl text-off-white">{formatPrice(effectivePrice)}</span>
          {isOnSale && (
            <span className="text-stone text-sm line-through">{formatPrice(comparePrice!)}</span>
          )}
          {isOnSale && (
            <span className="text-[10px] bg-gold text-black px-2 py-0.5 font-semibold tracking-wide uppercase">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-warm-gray text-sm leading-relaxed">{product.description}</p>
      )}

      {/* Variant selector */}
      {product.variants.length > 1 && (
        <div>
          <p className="label-tag mb-3">
            Colorway: <span className="text-off-white normal-case font-normal tracking-normal">{selectedVariant?.name}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => { setSelectedVariantId(variant.id); setSelectedSize(null) }}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all duration-200',
                  variant.id === selectedVariantId
                    ? 'border-gold scale-110'
                    : 'border-charcoal-light hover:border-warm-gray'
                )}
                style={{ backgroundColor: variant.colorHex ?? '#1A1A1A' }}
                aria-label={variant.name}
                title={variant.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="label-tag">
            Size: {selectedSize && <span className="text-off-white normal-case font-normal tracking-normal ml-1">{selectedSize}</span>}
          </p>
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-warm-gray hover:text-gold transition-colors duration-200"
          >
            <Ruler size={12} />
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedVariant?.sizes.map((sizeItem) => {
            const stock = getStockStatus(sizeItem.stock)
            const isSelected = selectedSize === sizeItem.size

            return (
              <button
                key={sizeItem.id}
                onClick={() => stock.isAvailable && setSelectedSize(sizeItem.size)}
                disabled={!stock.isAvailable}
                className={cn(
                  'relative w-12 h-12 border text-xs font-medium transition-all duration-200',
                  isSelected
                    ? 'border-gold bg-charcoal text-off-white'
                    : stock.isAvailable
                    ? 'border-charcoal-mid text-warm-gray hover:border-warm-gray hover:text-off-white'
                    : 'border-charcoal-mid text-stone opacity-30 cursor-not-allowed'
                )}
                aria-label={`Size ${sizeItem.size}${!stock.isAvailable ? ' — out of stock' : ''}`}
              >
                {sizeItem.size}
                {!stock.isAvailable && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-px bg-charcoal-light rotate-45 absolute" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Stock status */}
        <AnimatePresence>
          {stockStatus && selectedSize && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn('text-xs mt-3 flex items-center gap-1.5', stockStatus.color)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {stockStatus.label}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Quantity */}
      <div>
        <p className="label-tag mb-3">Quantity</p>
        <div className="flex items-center border border-charcoal-mid w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-warm-gray hover:text-off-white transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-3 text-off-white text-sm min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(selectedSizeStock?.stock ?? 99, quantity + 1))}
            className="px-4 py-3 text-warm-gray hover:text-off-white transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart + Wishlist */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          disabled={!selectedSize || !stockStatus?.isAvailable}
          className={cn(
            'flex-1 btn-gold py-4 flex items-center justify-center gap-2',
            (!selectedSize || !stockStatus?.isAvailable) && 'opacity-40 cursor-not-allowed'
          )}
        >
          <AnimatePresence mode="wait">
            {addedToCart ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                ✓ Added to Cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={15} />
                {selectedSize ? 'Add to Cart' : 'Select a Size'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <button
          className="p-4 border border-charcoal-mid hover:border-gold text-warm-gray hover:text-gold transition-all duration-200"
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Accordion — Fabric / Care / Shipping */}
      {accordionItems.length > 0 && (
        <div className="border-t border-charcoal-mid">
          {accordionItems.map((item) => (
            <div key={item.id} className="border-b border-charcoal-mid">
              <button
                onClick={() => setAccordionOpen(accordionOpen === item.id ? null : item.id)}
                className="flex items-center justify-between w-full py-4 text-left"
              >
                <span className="text-sm font-medium text-off-white tracking-wide">{item.label}</span>
                {accordionOpen === item.id ? (
                  <ChevronUp size={14} className="text-warm-gray flex-shrink-0" />
                ) : (
                  <ChevronDown size={14} className="text-warm-gray flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {accordionOpen === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-warm-gray text-sm leading-relaxed pb-4 pr-6 whitespace-pre-line">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  )
}
