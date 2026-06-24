import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Eye } from 'lucide-react'
import { db } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Admin — Products' }

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      images: { take: 1, select: { url: true } },
      variants: { include: { sizes: true } },
      _count: { select: { orderItems: true } },
    },
  }).catch(() => [])

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      ACTIVE: 'text-emerald-400 border-emerald-400/30',
      DRAFT: 'text-amber-400 border-amber-400/30',
      ARCHIVED: 'text-stone border-stone/30',
    }
    return map[status] ?? 'text-stone border-stone/30'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-tag text-gold mb-1">Inventory</p>
          <h1 className="font-serif text-2xl font-light text-off-white">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn-gold flex items-center gap-2 px-5 py-2.5 text-xs">
          <Plus size={13} /> New Product
        </Link>
      </div>

      {/* Table */}
      <div className="border border-charcoal-mid bg-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-charcoal-mid">
                {['Product', 'Status', 'Price', 'Stock', 'Orders', 'Created', 'Actions'].map((h) => (
                  <th key={h} className="label-tag text-stone text-left px-5 py-4 first:pl-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-mid">
              {products.map((product) => {
                const totalStock = product.variants.reduce(
                  (sum, v) => sum + v.sizes.reduce((s2, sz) => s2 + sz.stock, 0),
                  0
                )
                return (
                  <tr key={product.id} className="hover:bg-black/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-black overflow-hidden flex-shrink-0">
                          {product.images[0] && (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              width={40}
                              height={48}
                              className="object-cover object-top w-full h-full"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-off-white text-sm font-medium">{product.name}</p>
                          <p className="text-stone text-xs">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${statusBadge(product.status)}`}>
                        {product.status.charAt(0) + product.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-off-white text-sm">{formatPrice(Number(product.price))}</td>
                    <td className="px-5 py-3">
                      <span className={`text-sm ${totalStock === 0 ? 'text-red-400' : totalStock <= 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-warm-gray text-sm">{product._count.orderItems}</td>
                    <td className="px-5 py-3 text-stone text-xs">{formatDate(product.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${product.slug}`} target="_blank" className="p-1.5 text-stone hover:text-warm-gray transition-colors" title="Preview">
                          <Eye size={13} />
                        </Link>
                        <Link href={`/admin/products/${product.id}`} className="p-1.5 text-stone hover:text-gold transition-colors" title="Edit">
                          <Edit size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-warm-gray text-sm mb-4">No products yet.</p>
              <Link href="/admin/products/new" className="btn-gold px-8 inline-flex">Add First Product</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
