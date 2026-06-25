'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { shippingAddressSchema, type ShippingAddressFormData } from '@/lib/validations'
import { formatPrice, cn } from '@/lib/utils'
import { SHIPPING_METHODS, TAX_RATE } from '@/lib/constants'
import { createCheckoutSession } from '@/actions/checkout'
import { validateCoupon } from '@/actions/validateCoupon'

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore()
  const [selectedShipping, setSelectedShipping] = useState<string>(SHIPPING_METHODS[0].id)
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponApplied, setCouponApplied] = useState(false)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressFormData>({
    resolver: zodResolver(shippingAddressSchema),
  })

  const subtotal = getSubtotal()
  const selectedShippingMethod = SHIPPING_METHODS.find((m) => m.id === selectedShipping)!
  const shippingCost = subtotal >= 100 ? 0 : selectedShippingMethod.price
  const taxAmount = (subtotal - couponDiscount) * TAX_RATE
  const total = subtotal - couponDiscount + shippingCost + taxAmount

  const handleApplyCoupon = async () => {
    setCouponError(null)
    setCouponApplied(false)
    setIsApplyingCoupon(true)
    try {
      const result = await validateCoupon(couponCode, subtotal)
      if (result.error) {
        setCouponError(result.error)
        setCouponDiscount(0)
      } else {
        setCouponDiscount(result.discount ?? 0)
        setCouponApplied(true)
      }
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const onSubmit = async (address: ShippingAddressFormData) => {
    setIsProcessing(true)
    try {
      const result = await createCheckoutSession({
        items,
        shippingAddress: address,
        shippingMethodId: selectedShipping,
        couponCode: couponCode || undefined,
      })
      if (result.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error(err)
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-serif text-2xl font-light text-off-white">Your cart is empty.</p>
          <Link href="/shop" className="btn-gold inline-flex">Browse Collection</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-18">
      <div className="container mx-auto py-10 md:py-16">
        {/* Back */}
        <Link href="/shop" className="btn-text mb-8 inline-flex">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-12 lg:gap-16">
          {/* Left — Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div>
              <h1 className="font-serif text-display-sm font-light text-off-white mb-2">Checkout</h1>
              <div className="flex items-center gap-2 text-xs text-stone mt-3">
                <Lock size={11} />
                <span>Secured by Stripe</span>
              </div>
            </div>

            {/* Shipping address */}
            <section>
              <h2 className="font-serif text-lg font-light text-off-white mb-6 pb-4 border-b border-charcoal-mid">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'firstName', label: 'First Name', colSpan: 1 },
                  { name: 'lastName', label: 'Last Name', colSpan: 1 },
                  { name: 'email', label: 'Email Address', colSpan: 2, type: 'email' },
                  { name: 'phone', label: 'Phone Number', colSpan: 2, type: 'tel' },
                  { name: 'addressLine1', label: 'Street Address', colSpan: 2 },
                  { name: 'addressLine2', label: 'Apartment / Suite (optional)', colSpan: 2 },
                  { name: 'city', label: 'City', colSpan: 1 },
                  { name: 'state', label: 'State / Province', colSpan: 1 },
                  { name: 'postalCode', label: 'Postal Code', colSpan: 1 },
                  { name: 'country', label: 'Country', colSpan: 1 },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={field.colSpan === 2 ? 'sm:col-span-2' : ''}
                  >
                    <label className="label-luxury">
                      {field.label}
                    </label>
                    <input
                      {...register(field.name as keyof ShippingAddressFormData)}
                      type={field.type ?? 'text'}
                      className={cn('input-luxury', errors[field.name as keyof typeof errors] && 'border-red-500')}
                    />
                    {errors[field.name as keyof typeof errors] && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors[field.name as keyof typeof errors]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping method */}
            <section>
              <h2 className="font-serif text-lg font-light text-off-white mb-6 pb-4 border-b border-charcoal-mid">
                Shipping Method
              </h2>
              <div className="space-y-3">
                {SHIPPING_METHODS.map((method) => {
                  const effectivePrice = subtotal >= 100 && method.id === 'standard' ? 0 : method.price
                  return (
                    <label
                      key={method.id}
                      className={cn(
                        'flex items-center justify-between p-4 border cursor-pointer transition-all duration-200',
                        selectedShipping === method.id
                          ? 'border-gold bg-charcoal'
                          : 'border-charcoal-mid hover:border-charcoal-light'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={() => setSelectedShipping(method.id)}
                          className="accent-gold"
                        />
                        <div>
                          <p className="text-sm font-medium text-off-white">{method.name}</p>
                          <p className="text-xs text-stone mt-0.5">{method.description}</p>
                        </div>
                      </div>
                      <span className="text-sm text-off-white font-medium">
                        {effectivePrice === 0 ? (
                          <span className="text-emerald-400">Free</span>
                        ) : (
                          formatPrice(effectivePrice)
                        )}
                      </span>
                    </label>
                  )
                })}
              </div>
            </section>

            {/* Coupon */}
            <section>
              <h2 className="font-serif text-lg font-light text-off-white mb-4 pb-4 border-b border-charcoal-mid">
                Discount Code
              </h2>
              <div className="flex gap-0">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponApplied(false); setCouponError(null) }}
                  className="input-luxury flex-1 uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode}
                  className="btn-outline px-6 flex-shrink-0 disabled:opacity-50"
                >
                  {isApplyingCoupon ? '…' : 'Apply'}
                </button>
              </div>
              {couponError && <p className="text-red-400 text-xs mt-2">{couponError}</p>}
              {couponApplied && <p className="text-emerald-400 text-xs mt-2">Coupon applied!</p>}
            </section>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isProcessing}
              whileTap={{ scale: 0.98 }}
              className="btn-gold w-full py-5 flex items-center justify-center gap-3 text-sm disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Lock size={14} />
                  Place Order — {formatPrice(total)}
                </>
              )}
            </motion.button>

            <p className="text-stone text-xs text-center">
              By placing your order, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-warm-gray">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-warm-gray">Privacy Policy</Link>.
            </p>
          </form>

          {/* Right — Order summary */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <h2 className="font-serif text-lg font-light text-off-white pb-4 border-b border-charcoal-mid">
                Order Summary
              </h2>

              {/* Items */}
              <ul className="space-y-4 max-h-72 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-charcoal flex-shrink-0 overflow-hidden">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                          sizes="64px"
                        />
                      )}
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-off-white leading-snug line-clamp-2">{item.name}</p>
                      <p className="text-xs text-stone mt-1">{item.variantName} / {item.size}</p>
                      <p className="text-sm text-off-white mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="border-t border-charcoal-mid pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span className="text-off-white">{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Discount</span>
                    <span className="text-emerald-400">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Shipping</span>
                  <span className="text-off-white">
                    {shippingCost === 0 ? <span className="text-emerald-400">Free</span> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Estimated Tax</span>
                  <span className="text-off-white">{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-3 border-t border-charcoal-mid">
                  <span className="text-off-white">Total</span>
                  <span className="text-gold font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Secure badges */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-stone text-[10px]">
                  <Lock size={10} />
                  SSL Secured
                </div>
                <span className="text-charcoal-mid">·</span>
                <span className="text-stone text-[10px]">Stripe Payments</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
