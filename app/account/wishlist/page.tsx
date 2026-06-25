import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatPrice } from '@/lib/utils'
import { WishlistRemoveButton } from '@/components/account/WishlistRemoveButton'

export const metadata: Metadata = { title: 'Wishlist' }

export default async function WishlistPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/account/wishlist')

  const items = await db.wishlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      product: {
        include: {
          images: { take: 1, orderBy: { sortOrder: 'asc' } },
        },
      },
    },
  }).catch(() => [])

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-12 md:py-16 max-w-4xl">
        <Link href="/account" className="btn-text mb-8 inline-flex">
          <ArrowLeft size={13} /> Account
        </Link>
        <p className="label-tag text-gold mb-3">Saved Items</p>
        <h1 className="font-serif text-display-sm font-light text-off-white mb-10">Wishlist</h1>

        {items.length === 0 ? (
          <div className="border border-charcoal-mid p-16 text-center">
            <Heart size={32} className="text-charcoal-light mx-auto mb-4" />
            <p className="text-warm-gray text-sm mb-6">Your wishlist is empty.</p>
            <Link href="/shop" className="btn-gold px-10">Browse Collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="group border border-charcoal-mid bg-charcoal hover:border-gold transition-all duration-200 relative">
                <WishlistRemoveButton productId={item.productId} />
                <Link href={`/products/${item.product.slug}`} className="block">
                  <div className="relative aspect-[3/4] bg-black overflow-hidden">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart size={32} className="text-charcoal-mid" />
                      </div>
                    )}
                    {item.product.isNew && (
                      <span className="absolute top-3 left-3 label-tag bg-gold text-black px-2 py-0.5">New</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-off-white text-sm font-medium">{item.product.name}</p>
                    <p className="text-gold text-sm mt-1">{formatPrice(Number(item.product.price))}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
