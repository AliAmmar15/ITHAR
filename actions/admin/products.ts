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

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
  story: z.string().optional(),
  fabric: z.string().optional(),
  careInstructions: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  comparePrice: z.number().positive().optional().nullable(),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']),
  isNew: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
})

export async function createProduct(formData: unknown) {
  try {
    await requireAdmin()
    const parsed = productSchema.safeParse(formData)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    const existing = await db.product.findUnique({ where: { slug: parsed.data.slug } })
    if (existing) return { error: 'A product with this slug already exists' }

    const product = await db.product.create({
      data: {
        ...parsed.data,
        comparePrice: parsed.data.comparePrice ?? undefined,
        price: parsed.data.price,
      },
    })

    revalidatePath('/admin/products')
    return { success: true, id: product.id }
  } catch (e: any) {
    return { error: e.message ?? 'Failed to create product' }
  }
}

export async function updateProduct(id: string, formData: unknown) {
  try {
    await requireAdmin()
    const parsed = productSchema.safeParse(formData)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    await db.product.update({
      where: { id },
      data: {
        ...parsed.data,
        comparePrice: parsed.data.comparePrice ?? null,
      },
    })

    revalidatePath(`/admin/products/${id}`)
    revalidatePath('/admin/products')
    return { success: true }
  } catch {
    return { error: 'Failed to update product' }
  }
}

export async function updateStock(sizeStockId: string, stock: number) {
  try {
    await requireAdmin()
    if (stock < 0) return { error: 'Stock cannot be negative' }
    await db.sizeStock.update({ where: { id: sizeStockId }, data: { stock } })
    revalidatePath('/admin/products')
    return { success: true }
  } catch {
    return { error: 'Failed to update stock' }
  }
}

export async function setProductStatus(id: string, status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED') {
  try {
    await requireAdmin()
    await db.product.update({ where: { id }, data: { status } })
    revalidatePath(`/admin/products/${id}`)
    revalidatePath('/admin/products')
    return { success: true }
  } catch {
    return { error: 'Failed to update status' }
  }
}
