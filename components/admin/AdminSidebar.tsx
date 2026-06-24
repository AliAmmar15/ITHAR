'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Mail,
  Tag,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  ListOrdered,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { label: 'Waitlist', href: '/admin/waitlist', icon: ListOrdered },
  { label: 'Coupons', href: '/admin/coupons', icon: Tag },
  { label: 'Journal', href: '/admin/journal', icon: BookOpen },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-charcoal border-r border-charcoal-mid flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-charcoal-mid">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/images/logo-gold.svg" alt="ITHAR" width={32} height={32} className="w-7 h-7 object-contain" />
          <div>
            <p className="text-off-white text-sm font-medium">ITHAR</p>
            <p className="text-stone text-[10px] tracking-wide uppercase">Admin</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-xs font-medium transition-all duration-200',
                isActive
                  ? 'text-gold bg-gold/10 border-l-2 border-gold -ml-px pl-[11px]'
                  : 'text-warm-gray hover:text-off-white hover:bg-black/30'
              )}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-charcoal-mid space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-xs text-stone hover:text-warm-gray transition-colors">
          <LogOut size={14} />
          Back to Site
        </Link>
      </div>
    </aside>
  )
}
