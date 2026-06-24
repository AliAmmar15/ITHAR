import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { FadeUp } from '@/components/animations/FadeUp'
import { formatPrice, formatDate, getInitials } from '@/lib/utils'

export const metadata: Metadata = { title: 'My Account' }

async function getUserData(userId: string) {
  const [user, orders, wishlistCount] = await Promise.all([
    db.user.findUnique({ where: { id: userId }, select: { name: true, email: true, createdAt: true } }),
    db.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { items: { take: 1, include: { product: { select: { name: true } } } } },
    }),
    db.wishlistItem.count({ where: { userId } }),
  ])
  return { user, orders, wishlistCount }
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/account')

  const { user, orders, wishlistCount } = await getUserData(session.user.id!).catch(() => ({
    user: session.user,
    orders: [],
    wishlistCount: 0,
  }))

  const initials = getInitials(user?.name ?? session.user.email ?? 'R')

  const statusColors: Record<string, string> = {
    PENDING: 'text-amber-400',
    CONFIRMED: 'text-emerald-400',
    PROCESSING: 'text-blue-400',
    SHIPPED: 'text-blue-400',
    DELIVERED: 'text-emerald-400',
    CANCELLED: 'text-red-400',
    REFUNDED: 'text-stone',
  }

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-12 md:py-16">
        {/* Header */}
        <FadeUp className="flex items-center gap-6 mb-12 pb-8 border-b border-charcoal-mid">
          <div className="w-16 h-16 bg-gold flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-xl text-black font-medium">{initials}</span>
          </div>
          <div>
            <p className="label-tag text-gold mb-1">Welcome back</p>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-off-white">
              {user?.name ?? 'Riser'}
            </h1>
            <p className="text-stone text-sm mt-1">{user?.email ?? session.user.email}</p>
          </div>
        </FadeUp>

        {/* Quick stats */}
        <FadeUp className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Orders', value: orders.length, href: '/account/orders' },
            { label: 'Wishlist', value: wishlistCount, href: '/account/wishlist' },
            { label: 'Member Since', value: formatDate(user?.createdAt ?? new Date(), { year: 'numeric', month: 'short' }), href: null },
          ].map((stat) => (
            <div key={stat.label} className={`p-6 border border-charcoal-mid bg-charcoal ${stat.href ? 'hover:border-gold transition-colors cursor-pointer' : ''}`}>
              {stat.href ? (
                <Link href={stat.href} className="block">
                  <p className="font-serif text-3xl text-off-white font-light mb-1">{stat.value}</p>
                  <p className="label-tag text-stone">{stat.label}</p>
                </Link>
              ) : (
                <>
                  <p className="font-serif text-2xl text-off-white font-light mb-1">{stat.value}</p>
                  <p className="label-tag text-stone">{stat.label}</p>
                </>
              )}
            </div>
          ))}
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent orders */}
          <div className="lg:col-span-2">
            <FadeUp>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-light text-off-white">Recent Orders</h2>
                <Link href="/account/orders" className="btn-text">View All</Link>
              </div>

              {orders.length === 0 ? (
                <div className="border border-charcoal-mid p-12 text-center">
                  <p className="text-warm-gray text-sm mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link href="/shop" className="btn-gold px-8">Shop Now</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/account/orders/${order.id}`}
                      className="flex items-center justify-between p-5 border border-charcoal-mid bg-charcoal hover:border-gold transition-all duration-200"
                    >
                      <div>
                        <p className="text-sm font-medium text-off-white font-mono">{order.orderNumber}</p>
                        <p className="text-xs text-stone mt-1">{formatDate(order.createdAt)}</p>
                        {order.items[0] && (
                          <p className="text-xs text-warm-gray mt-0.5">{order.items[0].product.name}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-off-white">{formatPrice(Number(order.total))}</p>
                        <p className={`text-xs mt-1 ${statusColors[order.status] ?? 'text-stone'}`}>
                          {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </FadeUp>
          </div>

          {/* Account nav */}
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-xl font-light text-off-white mb-6">Account</h2>
            <nav className="space-y-1 divide-y divide-charcoal-mid border-t border-charcoal-mid">
              {[
                { label: 'Order History', href: '/account/orders' },
                { label: 'Saved Addresses', href: '/account/addresses' },
                { label: 'Wishlist', href: '/account/wishlist' },
                { label: 'Account Settings', href: '/account/settings' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-4 text-sm text-warm-gray hover:text-gold transition-colors duration-200"
                >
                  {item.label}
                  <span className="text-stone">→</span>
                </Link>
              ))}
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex items-center justify-between py-4 text-sm text-stone hover:text-red-400 transition-colors duration-200 w-full text-left"
                >
                  Sign Out
                  <span>→</span>
                </button>
              </form>
            </nav>
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
