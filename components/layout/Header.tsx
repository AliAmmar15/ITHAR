'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Menu, X, ShoppingBag, User, ChevronDown, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

// ─── Waitlist (homepage only) ─────────────────────────────────────────────────

function WaitlistHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'bg-black/95 backdrop-blur-nav border-b border-charcoal-mid' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-18">
            <button className="lg:hidden p-2 text-warm-gray hover:text-off-white transition-colors" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <a href="https://instagram.com/ithar_store" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 text-warm-gray hover:text-gold transition-colors duration-200 text-[11px] tracking-widest uppercase">
              <Instagram size={14} />
              @ithar_store
            </a>
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0" aria-label="ITHAR — Home">
              <Image src="/images/logo2.svg" alt="ITHAR" width={56} height={56} className="w-10 h-10 md:w-12 md:h-12 object-contain" priority />
            </Link>
            <a href="#waitlist-form" className="btn-gold px-5 py-2 text-xs">Join Waitlist</a>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-charcoal border-r border-charcoal-mid flex flex-col lg:hidden">
              <div className="flex items-center justify-between p-6 border-b border-charcoal-mid">
                <Image src="/images/logo2.svg" alt="ITHAR" width={40} height={40} className="w-9 h-9 object-contain" />
                <button type="button" onClick={() => setMobileOpen(false)} className="p-2 text-warm-gray hover:text-off-white" aria-label="Close menu"><X size={20} /></button>
              </div>
              <div className="flex-1 flex flex-col p-8 gap-6">
                <p className="font-serif text-[clamp(1.75rem,7vw,2.5rem)] text-off-white leading-tight">The Wilayah<br />Hoodie</p>
                <p className="text-stone text-sm leading-relaxed">Season 01 — The Risers Collection.<br />Dropping soon. First 313 members receive founding benefits.</p>
                <p className="font-arabic text-gold/50 text-4xl" lang="ar" dir="rtl">إيثار</p>
              </div>
              <div className="p-6 border-t border-charcoal-mid space-y-3">
                <a href="#waitlist-form" onClick={() => setMobileOpen(false)} className="btn-gold w-full text-center block py-3.5">Join the Waitlist</a>
                <a href="https://instagram.com/ithar_store" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 text-warm-gray hover:text-gold transition-colors text-[11px] tracking-widest uppercase py-2">
                  <Instagram size={14} />@ithar_store
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Shop header (all other pages) ───────────────────────────────────────────

function ShopHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const { getItemCount, openCart } = useCartStore()
  const itemCount = getItemCount()

  const role = (session?.user as any)?.role
  const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'bg-black/95 backdrop-blur-nav border-b border-charcoal-mid' : 'bg-black/60 backdrop-blur-sm'
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Mobile hamburger */}
            <button type="button" className="lg:hidden p-2 -ml-2 text-warm-gray hover:text-off-white transition-colors" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link href="/" aria-label="ITHAR — Home" className="flex-shrink-0">
              <Image src="/images/logo2.svg" alt="ITHAR" width={48} height={48} className="w-9 h-9 md:w-10 md:h-10 object-contain" priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-[11px] tracking-widest uppercase transition-colors duration-200',
                    pathname.startsWith(href) ? 'text-gold' : 'text-warm-gray hover:text-off-white'
                  )}
                >
                  {label}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin" className={cn('text-[11px] tracking-widest uppercase transition-colors duration-200 flex items-center gap-1', pathname.startsWith('/admin') ? 'text-gold' : 'text-warm-gray hover:text-gold')}>
                  <LayoutDashboard size={12} />Admin
                </Link>
              )}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">

              {/* Account dropdown */}
              <div ref={accountRef} className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setAccountOpen((o) => !o)}
                  className="p-2 text-warm-gray hover:text-off-white transition-colors flex items-center gap-1"
                  aria-label="Account"
                >
                  <User size={18} />
                  <ChevronDown size={12} className={cn('transition-transform duration-200', accountOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-charcoal border border-charcoal-mid py-2 z-50"
                    >
                      {session?.user ? (
                        <>
                          <div className="px-4 py-2 border-b border-charcoal-mid mb-1">
                            <p className="text-off-white text-xs font-medium truncate">{session.user.name ?? session.user.email}</p>
                            <p className="text-stone text-[10px] truncate">{session.user.email}</p>
                          </div>
                          <Link href="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-xs text-warm-gray hover:text-off-white hover:bg-black/30 transition-colors">My Account</Link>
                          <Link href="/account/orders" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-xs text-warm-gray hover:text-off-white hover:bg-black/30 transition-colors">Orders</Link>
                          <Link href="/account/wishlist" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-xs text-warm-gray hover:text-off-white hover:bg-black/30 transition-colors">Wishlist</Link>
                          <Link href="/account/addresses" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-xs text-warm-gray hover:text-off-white hover:bg-black/30 transition-colors">Addresses</Link>
                          {isAdmin && (
                            <Link href="/admin" onClick={() => setAccountOpen(false)} className="flex items-center gap-1.5 px-4 py-2 text-xs text-gold hover:text-gold-light hover:bg-black/30 transition-colors border-t border-charcoal-mid mt-1">
                              <LayoutDashboard size={11} />Admin Dashboard
                            </Link>
                          )}
                          <div className="border-t border-charcoal-mid mt-1 pt-1">
                            <button type="button" onClick={() => { signOut({ callbackUrl: '/' }); setAccountOpen(false) }} className="w-full text-left px-4 py-2 text-xs text-stone hover:text-off-white hover:bg-black/30 transition-colors">
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link href="/login" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-xs text-warm-gray hover:text-off-white hover:bg-black/30 transition-colors">Sign In</Link>
                          <Link href="/register" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-xs text-warm-gray hover:text-off-white hover:bg-black/30 transition-colors">Create Account</Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                type="button"
                onClick={() => openCart()}
                className="relative p-2 text-warm-gray hover:text-off-white transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-gold text-black text-[9px] font-bold flex items-center justify-center rounded-full">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-charcoal border-r border-charcoal-mid flex flex-col lg:hidden">

              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-charcoal-mid">
                <Image src="/images/logo2.svg" alt="ITHAR" width={36} height={36} className="w-8 h-8 object-contain" />
                <button type="button" onClick={() => setMobileOpen(false)} className="p-2 text-warm-gray hover:text-off-white" aria-label="Close menu"><X size={18} /></button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          'block py-3 text-sm tracking-widest uppercase border-b border-charcoal-mid/50 transition-colors',
                          pathname.startsWith(href) ? 'text-gold' : 'text-warm-gray hover:text-off-white'
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  {isAdmin && (
                    <li>
                      <Link href="/admin" className={cn('flex items-center gap-2 py-3 text-sm tracking-widest uppercase border-b border-charcoal-mid/50 transition-colors', pathname.startsWith('/admin') ? 'text-gold' : 'text-warm-gray hover:text-gold')}>
                        <LayoutDashboard size={14} />Admin
                      </Link>
                    </li>
                  )}
                </ul>

                {/* Account section */}
                <div className="mt-8">
                  <p className="label-tag text-stone mb-3">Account</p>
                  {session?.user ? (
                    <ul className="space-y-1">
                      <li><p className="text-off-white text-sm font-medium truncate">{session.user.name ?? session.user.email}</p></li>
                      <li><Link href="/account" className="block py-2 text-xs text-warm-gray hover:text-off-white transition-colors">My Account</Link></li>
                      <li><Link href="/account/orders" className="block py-2 text-xs text-warm-gray hover:text-off-white transition-colors">Orders</Link></li>
                      <li><Link href="/account/wishlist" className="block py-2 text-xs text-warm-gray hover:text-off-white transition-colors">Wishlist</Link></li>
                      <li><Link href="/account/addresses" className="block py-2 text-xs text-warm-gray hover:text-off-white transition-colors">Addresses</Link></li>
                      <li>
                        <button type="button" onClick={() => signOut({ callbackUrl: '/' })} className="py-2 text-xs text-stone hover:text-off-white transition-colors">
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" className="btn-gold w-full text-center block py-3 text-xs">Sign In</Link>
                      <Link href="/register" className="btn-ghost w-full text-center block py-3 text-xs">Create Account</Link>
                    </div>
                  )}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-5 border-t border-charcoal-mid">
                <a href="https://instagram.com/ithar_store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone hover:text-gold transition-colors text-[11px] tracking-widest uppercase">
                  <Instagram size={13} />@ithar_store
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Root export ─────────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname()
  return pathname === '/' ? <WaitlistHeader /> : <ShopHeader />
}
