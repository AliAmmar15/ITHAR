'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/actions/admin/products'
import { cn } from '@/lib/utils'

interface ProductFormData {
  name: string
  slug: string
  description: string
  story: string
  fabric: string
  careInstructions: string
  price: string
  comparePrice: string
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
  isNew: boolean
  isFeatured: boolean
}

const EMPTY: ProductFormData = {
  name: '', slug: '', description: '', story: '',
  fabric: '', careInstructions: '', price: '',
  comparePrice: '', status: 'DRAFT', isNew: false, isFeatured: false,
}

interface Props {
  productId?: string
  initial?: Partial<ProductFormData>
}

export function ProductForm({ productId, initial }: Props) {
  const [form, setForm] = useState<ProductFormData>({ ...EMPTY, ...initial })
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function set(key: keyof ProductFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const data = {
        name: form.name,
        slug: form.slug,
        description: form.description || undefined,
        story: form.story || undefined,
        fabric: form.fabric || undefined,
        careInstructions: form.careInstructions || undefined,
        price: parseFloat(form.price),
        comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : undefined,
        status: form.status,
        isNew: form.isNew,
        isFeatured: form.isFeatured,
      }

      const result = productId
        ? await updateProduct(productId, data)
        : await createProduct(data)

      if (result.error) { setError(result.error); return }

      if (!productId && 'id' in result) {
        router.push(`/admin/products/${result.id}`)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Basic info */}
      <div className="border border-charcoal-mid bg-charcoal p-6 space-y-4">
        <h2 className="label-tag text-stone">Product Details</h2>

        <div>
          <label className="label-luxury">Product Name</label>
          <input
            value={form.name}
            onChange={(e) => {
              set('name', e.target.value)
              if (!productId) set('slug', autoSlug(e.target.value))
            }}
            className="input-luxury"
            placeholder="The Wilayah Hoodie"
          />
        </div>

        <div>
          <label className="label-luxury">Slug (URL)</label>
          <input
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className="input-luxury font-mono"
            placeholder="the-wilayah-hoodie"
          />
          <p className="text-stone text-[10px] mt-1">Lowercase letters, numbers, and hyphens only.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-luxury">Price (USD)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              className="input-luxury"
              placeholder="89.00"
            />
          </div>
          <div>
            <label className="label-luxury">Compare Price (optional)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.comparePrice}
              onChange={(e) => set('comparePrice', e.target.value)}
              className="input-luxury"
              placeholder="120.00"
            />
          </div>
        </div>

        <div>
          <label className="label-luxury">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="input-luxury resize-none"
            placeholder="Short product description..."
          />
        </div>

        <div>
          <label className="label-luxury">Story (optional)</label>
          <textarea
            rows={4}
            value={form.story}
            onChange={(e) => set('story', e.target.value)}
            className="input-luxury resize-none"
            placeholder="The story behind this piece..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-luxury">Fabric & Construction</label>
            <textarea
              rows={2}
              value={form.fabric}
              onChange={(e) => set('fabric', e.target.value)}
              className="input-luxury resize-none"
              placeholder="400gsm French Terry, 100% cotton..."
            />
          </div>
          <div>
            <label className="label-luxury">Care Instructions</label>
            <textarea
              rows={2}
              value={form.careInstructions}
              onChange={(e) => set('careInstructions', e.target.value)}
              className="input-luxury resize-none"
              placeholder="Machine wash cold, tumble dry low..."
            />
          </div>
        </div>
      </div>

      {/* Status & flags */}
      <div className="border border-charcoal-mid bg-charcoal p-6 space-y-4">
        <h2 className="label-tag text-stone">Status & Visibility</h2>

        <div>
          <label className="label-luxury">Status</label>
          <select
            value={form.status}
            onChange={(e) => set('status', e.target.value as ProductFormData['status'])}
            className="input-luxury text-black"
          >
            <option value="DRAFT" className="text-black">Draft</option>
            <option value="ACTIVE" className="text-black">Active</option>
            <option value="ARCHIVED" className="text-black">Archived</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { key: 'isNew', label: 'Mark as New' },
            { key: 'isFeatured', label: 'Featured Product' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form[key as keyof ProductFormData] as boolean}
                onChange={(e) => set(key as keyof ProductFormData, e.target.checked)}
                className="accent-gold"
              />
              <span className="text-warm-gray text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={isPending || !form.name || !form.slug || !form.price}
          className="btn-gold px-10 py-3 text-xs disabled:opacity-50"
        >
          {isPending ? 'Saving…' : productId ? 'Save Changes' : 'Create Product'}
        </button>
        <a href="/admin/products" className="btn-ghost px-8 py-3 text-xs">Cancel</a>
      </div>
    </div>
  )
}
