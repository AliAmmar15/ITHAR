import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProductForm } from '@/components/admin/ProductForm'

export const metadata: Metadata = { title: 'Admin — New Product' }

export default function AdminNewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/products" className="btn-text mb-4 inline-flex">
          <ArrowLeft size={13} /> Products
        </Link>
        <p className="label-tag text-gold mb-1">Inventory</p>
        <h1 className="font-serif text-2xl font-light text-off-white">New Product</h1>
        <p className="text-stone text-xs mt-1">Create the product first, then add variants and images from the product detail page.</p>
      </div>

      <ProductForm />
    </div>
  )
}
