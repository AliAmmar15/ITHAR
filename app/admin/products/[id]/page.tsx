import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Plus } from 'lucide-react'
import { db } from '@/lib/db'
import { formatPrice, formatDate } from '@/lib/utils'
import { ProductForm } from '@/components/admin/ProductForm'
import { StockEditor } from '@/components/admin/StockEditor'

export const metadata: Metadata = { title: 'Admin — Edit Product' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminProductDetailPage({ params }: Props) {
  const { id } = await params

  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      variants: { include: { sizes: { orderBy: { size: 'asc' } } } },
      _count: { select: { orderItems: true, reviews: true } },
    },
  }).catch(() => null)

  if (!product) notFound()

  const totalStock = product.variants.reduce(
    (sum, v) => sum + v.sizes.reduce((s2, sz) => s2 + sz.stock, 0),
    0
  )

  const statusBadge: Record<string, string> = {
    ACTIVE: 'text-emerald-400 border-emerald-400/30',
    DRAFT: 'text-amber-400 border-amber-400/30',
    ARCHIVED: 'text-stone border-stone/30',
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/products" className="btn-text mb-4 inline-flex">
          <ArrowLeft size={13} /> Products
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <p className="label-tag text-gold mb-1">Inventory</p>
            <h1 className="font-serif text-2xl font-light text-off-white">{product.name}</h1>
            <p className="text-stone text-xs mt-1">/{product.slug}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-wide border px-2 py-0.5 ${statusBadge[product.status] ?? 'text-stone border-stone/30'}`}>
              {product.status.charAt(0) + product.status.slice(1).toLowerCase()}
            </span>
            <Link href={`/products/${product.slug}`} target="_blank" className="btn-ghost px-4 py-2 text-xs">
              View Live →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Edit form */}
        <div className="xl:col-span-2">
          <ProductForm
            productId={product.id}
            initial={{
              name: product.name,
              slug: product.slug,
              description: product.description ?? '',
              story: product.story ?? '',
              fabric: product.fabric ?? '',
              careInstructions: product.careInstructions ?? '',
              price: String(Number(product.price)),
              comparePrice: product.comparePrice ? String(Number(product.comparePrice)) : '',
              status: product.status as 'DRAFT' | 'ACTIVE' | 'ARCHIVED',
              isNew: product.isNew,
              isFeatured: product.isFeatured,
            }}
          />
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="border border-charcoal-mid bg-charcoal p-6">
            <h2 className="label-tag text-stone mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-stone text-xs mb-1">Total Stock</p>
                <p className={totalStock === 0 ? 'text-red-400' : totalStock <= 5 ? 'text-amber-400' : 'text-emerald-400'}>
                  {totalStock} units
                </p>
              </div>
              <div>
                <p className="text-stone text-xs mb-1">Orders</p>
                <p className="text-off-white">{product._count.orderItems}</p>
              </div>
              <div>
                <p className="text-stone text-xs mb-1">Reviews</p>
                <p className="text-off-white">{product._count.reviews}</p>
              </div>
              <div>
                <p className="text-stone text-xs mb-1">Created</p>
                <p className="text-warm-gray">{formatDate(product.createdAt, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="border border-charcoal-mid bg-charcoal p-6">
            <h2 className="label-tag text-stone mb-4">Images</h2>
            {product.images.length === 0 ? (
              <p className="text-stone text-xs">No images. Upload via UploadThing once configured.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {product.images.map((img) => (
                  <div key={img.id} className="relative aspect-[3/4] bg-black overflow-hidden">
                    <Image src={img.url} alt={img.altText ?? product.name} fill className="object-cover object-top" />
                    {img.isPrimary && (
                      <span className="absolute top-1 left-1 text-[9px] bg-gold text-black px-1">Primary</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stock editor */}
          {product.variants.length > 0 && (
            <div className="border border-charcoal-mid bg-charcoal p-6">
              <h2 className="label-tag text-stone mb-4">Stock</h2>
              <StockEditor variants={product.variants as any} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
