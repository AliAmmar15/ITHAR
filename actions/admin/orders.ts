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

const statusSchema = z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'])

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await requireAdmin()
    const parsed = statusSchema.safeParse(status)
    if (!parsed.success) return { error: 'Invalid status' }

    const data: Record<string, unknown> = { status: parsed.data }
    if (parsed.data === 'SHIPPED') data.shippedAt = new Date()
    if (parsed.data === 'DELIVERED') data.deliveredAt = new Date()

    await db.order.update({ where: { id: orderId }, data })
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath('/admin/orders')
    return { success: true }
  } catch {
    return { error: 'Failed to update status' }
  }
}

export async function updateTrackingInfo(orderId: string, trackingNumber: string, trackingUrl?: string) {
  try {
    await requireAdmin()
    await db.order.update({
      where: { id: orderId },
      data: { trackingNumber, trackingUrl: trackingUrl || null },
    })
    revalidatePath(`/admin/orders/${orderId}`)
    return { success: true }
  } catch {
    return { error: 'Failed to update tracking' }
  }
}

export async function updateAdminNote(orderId: string, note: string) {
  try {
    await requireAdmin()
    await db.order.update({ where: { id: orderId }, data: { adminNote: note || null } })
    revalidatePath(`/admin/orders/${orderId}`)
    return { success: true }
  } catch {
    return { error: 'Failed to save note' }
  }
}
