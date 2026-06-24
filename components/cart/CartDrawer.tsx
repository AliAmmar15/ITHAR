'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice, cn } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getItemCount } =
    useCartStore()

  const subtotal = getSubtotal()
  const itemCount = getItemCount()
  const freeShippingRemaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-charcoal border-l border-charcoal-mid flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-mid">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-warm-gray" />
                <span className="font-serif text-lg font-light text-off-white">
                  Your Cart
                </span>
                {itemCount > 0 && (
                  <span className="text-[10px] bg-gold text-black font-semibold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-warm-gray hover:text-off-white transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-black/30 border-b border-charcoal-mid">
                {freeShippingRemaining > 0 ? (
                  <p className="text-xs text-warm-gray mb-2">
                    Add{' '}
                    <span className="text-gold font-medium">{formatPrice(freeShippingRemaining)}</span>
                    {' '}for free shipping
                  </p>
                ) : (
                  <p className="text-xs text-emerald-400 mb-2">✓ You qualify for free shipping!</p>
                )}
                <div className="h-px bg-charcoal-mid overflow-hidden">
                  <motion.div
                    className="h-full bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 px-6">
                  <ShoppingBag size={40} className="text-charcoal-light" />
                  <div className="text-center">
                    <p className="font-serif text-xl font-light text-off-white mb-2">
                      Your cart is empty.
                    </p>
                    <p className="text-stone text-sm">Begin with intention.</p>
                  </div>
                  <button onClick={closeCart} className="btn-gold px-8">
                    Explore Collection
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-charcoal-mid">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 p-5"
                      >
                        {/* Image */}
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-24 flex-shrink-0 bg-black overflow-hidden"
                        >
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover object-top"
                              sizes="80px"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-charcoal" />
                          )}
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="font-serif text-sm text-off-white hover:text-gold transition-colors leading-snug line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-stone">{item.variantName} / {item.size}</p>
                          <p className="text-sm text-off-white mt-auto">{formatPrice(item.price)}</p>

                          {/* Qty + Remove */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-charcoal-mid">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 text-stone hover:text-off-white transition-colors"
                                aria-label="Decrease"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2.5 text-xs text-off-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxStock}
                                className="p-1.5 text-stone hover:text-off-white transition-colors disabled:opacity-30"
                                aria-label="Increase"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-stone hover:text-red-400 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-charcoal-mid p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray text-sm">Subtotal</span>
                  <span className="text-off-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-stone text-xs">Shipping and taxes calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-gold w-full py-4 text-center flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </Link>
                <button
                  onClick={closeCart}
                  className="btn-ghost w-full py-3 text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
