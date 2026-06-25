'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function requireAdmin() {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session?.user || (role !== 'ADMIN' && role !== 'SUPERADMIN')) {
    throw new Error('Unauthorized')
  }
}

const couponSchema = z.object({
  code: z.string().min(1).max(50).transform((v) => v.toUpperCase()),
  description: z.string().optional(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING']),
  value: z.number().min(0),
  minOrderAmount: z.number().min(0).optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  isActive: z.boolean().default(true),
  startsAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
})

export async function createCoupon(formData: unknown) {
  try {
    await requireAdmin()
    const parsed = couponSchema.safeParse(formData)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    const existing = await db.coupon.findUnique({ where: { code: parsed.data.code } })
    if (existing) return { error: 'A coupon with this code already exists' }

    await db.coupon.create({
      data: {
        code: parsed.data.code,
        description: parsed.data.description,
        type: parsed.data.type,
        value: parsed.data.value,
        minOrderAmount: parsed.data.minOrderAmount ?? undefined,
        maxUses: parsed.data.maxUses ?? undefined,
        isActive: parsed.data.isActive,
        startsAt: parsed.data.startsAt ? new Date(parsed.data.startsAt) : undefined,
        expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : undefined,
      },
    })

    revalidatePath('/admin/coupons')
    return { success: true }
  } catch (e: any) {
    return { error: e.message ?? 'Failed to create coupon' }
  }
}

export async function toggleCouponActive(id: string, isActive: boolean) {
  try {
    await requireAdmin()
    await db.coupon.update({ where: { id }, data: { isActive } })
    revalidatePath('/admin/coupons')
    return { success: true }
  } catch {
    return { error: 'Failed to update coupon' }
  }
}

export async function deleteCoupon(id: string) {
  try {
    await requireAdmin()
    await db.coupon.delete({ where: { id } })
    revalidatePath('/admin/coupons')
    return { success: true }
  } catch {
    return { error: 'Failed to delete coupon' }
  }
}
