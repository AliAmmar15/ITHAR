'use client'

import { useTransition } from 'react'
import { X } from 'lucide-react'
import { toggleWishlist } from '@/actions/wishlist'

export function WishlistRemoveButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleRemove() {
    startTransition(async () => {
      await toggleWishlist(productId)
      window.location.reload()
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="absolute top-2 right-2 w-7 h-7 bg-black/70 border border-charcoal-mid flex items-center justify-center text-stone hover:text-red-400 hover:border-red-400/30 transition-all disabled:opacity-50"
      aria-label="Remove from wishlist"
    >
      <X size={12} />
    </button>
  )
}
