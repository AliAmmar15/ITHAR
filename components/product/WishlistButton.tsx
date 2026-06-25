'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { toggleWishlist } from '@/actions/wishlist'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function WishlistButton({
  productId,
  initialSaved = false,
}: {
  productId: string
  initialSaved?: boolean
}) {
  const [saved, setSaved] = useState(initialSaved)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleWishlist(productId)
      if (result.requiresAuth) {
        router.push('/login?callbackUrl=' + window.location.pathname)
        return
      }
      if (result.success) setSaved(result.added ?? false)
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={cn(
        'flex items-center justify-center w-11 h-11 border transition-all duration-200 disabled:opacity-50',
        saved
          ? 'border-gold bg-gold/10 text-gold'
          : 'border-charcoal-mid text-stone hover:border-gold hover:text-gold'
      )}
    >
      <Heart size={16} className={cn('transition-all', saved && 'fill-gold')} />
    </button>
  )
}
