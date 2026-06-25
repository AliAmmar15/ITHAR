'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function toggleWishlist(productId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Sign in to save items', requiresAuth: true }

  try {
    const existing = await db.wishlistItem.findUnique({
      where: { userId_productId: { userId: session.user.id, productId } },
    })

    if (existing) {
      await db.wishlistItem.delete({ where: { id: existing.id } })
      revalidatePath('/account/wishlist')
      return { success: true, added: false }
    } else {
      await db.wishlistItem.create({
        data: { userId: session.user.id, productId },
      })
      revalidatePath('/account/wishlist')
      return { success: true, added: true }
    }
  } catch {
    return { error: 'Failed to update wishlist' }
  }
}

export async function getWishlistProductIds(): Promise<string[]> {
  const session = await auth()
  if (!session?.user?.id) return []

  try {
    const items = await db.wishlistItem.findMany({
      where: { userId: session.user.id },
      select: { productId: true },
    })
    return items.map((i) => i.productId)
  } catch {
    return []
  }
}
