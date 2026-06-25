'use server'

import { db } from '@/lib/db'

export async function validateCoupon(code: string, subtotal: number) {
  if (!code) return { error: 'Enter a coupon code' }

  try {
    const coupon = await db.coupon.findUnique({
      where: { code: code.toUpperCase(), isActive: true },
    })

    if (!coupon) return { error: 'Invalid coupon code' }

    const now = new Date()
    if (coupon.startsAt && coupon.startsAt > now) return { error: 'This coupon is not yet active' }
    if (coupon.expiresAt && coupon.expiresAt < now) return { error: 'This coupon has expired' }
    if (coupon.maxUses != null && coupon.usedCount >= coupon.maxUses) return { error: 'This coupon has reached its usage limit' }
    if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
      return { error: `Minimum order of $${Number(coupon.minOrderAmount).toFixed(2)} required` }
    }

    let discount = 0
    if (coupon.type === 'PERCENTAGE') {
      discount = subtotal * (Number(coupon.value) / 100)
    } else if (coupon.type === 'FIXED_AMOUNT') {
      discount = Math.min(Number(coupon.value), subtotal)
    }

    return {
      success: true,
      discount,
      type: coupon.type,
      value: Number(coupon.value),
      code: coupon.code,
    }
  } catch {
    return { error: 'Failed to validate coupon' }
  }
}
