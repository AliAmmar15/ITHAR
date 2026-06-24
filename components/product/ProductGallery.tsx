'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@prisma/client'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const activeImage = images[activeIndex]

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <>
      <div className="flex gap-4 lg:flex-row-reverse">
        {/* Main image */}
        <div className="flex-1 relative">
          <div
            className={cn(
              'relative aspect-product bg-charcoal overflow-hidden cursor-zoom-in',
              isZoomed && 'cursor-zoom-out'
            )}
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage?.url ?? '/images/placeholder.jpg'}
                  alt={activeImage?.altText ?? productName}
                  fill
                  priority={activeIndex === 0}
                  className={cn(
                    'object-cover object-top transition-transform duration-200',
                    isZoomed && 'scale-150'
                  )}
                  style={
                    isZoomed
                      ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                      : undefined
                  }
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            {!isZoomed && (
              <>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prev() }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 border border-charcoal-light hover:border-gold text-warm-gray hover:text-gold transition-all duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); next() }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 border border-charcoal-light hover:border-gold text-warm-gray hover:text-gold transition-all duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxOpen(true) }}
                  className="absolute top-3 right-3 p-2 bg-black/60 border border-charcoal-light hover:border-gold text-warm-gray hover:text-gold transition-all duration-200"
                  aria-label="Open fullscreen"
                >
                  <ZoomIn size={14} />
                </button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i) }}
                    className={cn(
                      'w-1.5 h-1.5 rounded-full transition-colors duration-200',
                      i === activeIndex ? 'bg-gold' : 'bg-charcoal-light'
                    )}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails — vertical stack */}
        {images.length > 1 && (
          <div className="flex flex-col gap-2 w-16 lg:w-20 flex-shrink-0">
            {images.map((image, i) => (
              <button
                key={image.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'relative aspect-square overflow-hidden border transition-all duration-200',
                  i === activeIndex
                    ? 'border-gold'
                    : 'border-charcoal-mid hover:border-charcoal-light'
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.altText ?? `${productName} ${i + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-3 text-warm-gray hover:text-off-white z-10"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-4 p-3 text-warm-gray hover:text-off-white z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-4 p-3 text-warm-gray hover:text-off-white z-10"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl max-h-[90vh] aspect-product"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage?.url ?? '/images/placeholder.jpg'}
                  alt={activeImage?.altText ?? productName}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
