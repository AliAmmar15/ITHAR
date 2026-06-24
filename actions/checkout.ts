'use server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { absoluteUrl, generateOrderNumber } from '@/lib/utils'
import { SHIPPING_METHODS } from '@/lib/constants'
import type { CartItem, ShippingAddress } from '@/types'

interface CreateCheckoutInput {
  items: CartItem[]
  shippingAddress: ShippingAddress
  shippingMethodId: string
  couponCode?: string
}

export async function createCheckoutSession(input: CreateCheckoutInput) {
  const session = await auth()
  const { items, shippingAddress, shippingMethodId, couponCode } = input

  if (items.length === 0) {
    return { error: 'Cart is empty' }
  }

  const shippingMethod = SHIPPING_METHODS.find((m) => m.id === shippingMethodId)
  if (!shippingMethod) {
    return { error: 'Invalid shipping method' }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = subtotal >= 100 && shippingMethodId === 'standard' ? 0 : shippingMethod.price

  // Validate coupon if provided
  let couponDiscount = 0
  let stripeCouponId: string | undefined

  if (couponCode) {
    const coupon = await db.coupon.findUnique({
      where: { code: couponCode, isActive: true },
    })

    if (coupon) {
      const now = new Date()
      const isValid =
        (!coupon.startsAt || coupon.startsAt <= now) &&
        (!coupon.expiresAt || coupon.expiresAt >= now) &&
        (!coupon.maxUses || coupon.usedCount < coupon.maxUses) &&
        (!coupon.minOrderAmount || subtotal >= Number(coupon.minOrderAmount))

      if (isValid) {
        if (coupon.type === 'PERCENTAGE') {
          couponDiscount = subtotal * (Number(coupon.value) / 100)
        } else if (coupon.type === 'FIXED_AMOUNT') {
          couponDiscount = Math.min(Number(coupon.value), subtotal)
        }
      }
    }
  }

  // Build line items for Stripe
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `${item.name} — ${item.variantName} / ${item.size}`,
        images: item.imageUrl ? [item.imageUrl] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: `${shippingMethod.name}`, images: [] },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    })
  }

  const orderNumber = generateOrderNumber()

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: absoluteUrl(`/order-success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`),
      cancel_url: absoluteUrl('/checkout'),
      customer_email: shippingAddress.email,
      metadata: {
        orderNumber,
        userId: session?.user?.id ?? '',
        shippingMethodId,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'AE', 'SA', 'KW', 'QA', 'BH', 'OM', 'IQ'],
      },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },
    })

    return { url: stripeSession.url, sessionId: stripeSession.id }
  } catch (err) {
    console.error('[Stripe checkout error]', err)
    return { error: 'Payment processing failed. Please try again.' }
  }
}
