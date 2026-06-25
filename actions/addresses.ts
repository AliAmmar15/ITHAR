'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const addressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  company: z.string().optional(),
  addressLine1: z.string().min(5, 'Required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  postalCode: z.string().min(3, 'Required'),
  country: z.string().min(2, 'Required'),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
})

export async function addAddress(formData: unknown) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const parsed = addressSchema.safeParse(formData)
  if (!parsed.success) return { error: 'Invalid data' }

  try {
    if (parsed.data.isDefault) {
      await db.address.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false },
      })
    }

    const isFirst = (await db.address.count({ where: { userId: session.user.id } })) === 0

    await db.address.create({
      data: {
        ...parsed.data,
        userId: session.user.id,
        isDefault: parsed.data.isDefault || isFirst,
      },
    })

    revalidatePath('/account/addresses')
    return { success: true }
  } catch {
    return { error: 'Failed to save address' }
  }
}

export async function updateAddress(id: string, formData: unknown) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const parsed = addressSchema.safeParse(formData)
  if (!parsed.success) return { error: 'Invalid data' }

  try {
    const existing = await db.address.findFirst({
      where: { id, userId: session.user.id },
    })
    if (!existing) return { error: 'Not found' }

    if (parsed.data.isDefault) {
      await db.address.updateMany({
        where: { userId: session.user.id, id: { not: id } },
        data: { isDefault: false },
      })
    }

    await db.address.update({ where: { id }, data: parsed.data })

    revalidatePath('/account/addresses')
    return { success: true }
  } catch {
    return { error: 'Failed to update address' }
  }
}

export async function deleteAddress(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  try {
    const address = await db.address.findFirst({
      where: { id, userId: session.user.id },
    })
    if (!address) return { error: 'Not found' }

    await db.address.delete({ where: { id } })

    // If we deleted the default, make the first remaining one default
    if (address.isDefault) {
      const next = await db.address.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'asc' },
      })
      if (next) await db.address.update({ where: { id: next.id }, data: { isDefault: true } })
    }

    revalidatePath('/account/addresses')
    return { success: true }
  } catch {
    return { error: 'Failed to delete address' }
  }
}

export async function setDefaultAddress(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  try {
    const address = await db.address.findFirst({
      where: { id, userId: session.user.id },
    })
    if (!address) return { error: 'Not found' }

    await db.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    })
    await db.address.update({ where: { id }, data: { isDefault: true } })

    revalidatePath('/account/addresses')
    return { success: true }
  } catch {
    return { error: 'Failed to set default' }
  }
}
