import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArticleForm } from '@/components/admin/ArticleForm'

export const metadata: Metadata = { title: 'Admin — New Article' }

export default function AdminNewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/journal" className="btn-text mb-4 inline-flex">
          <ArrowLeft size={13} /> Journal
        </Link>
        <p className="label-tag text-gold mb-1">Journal</p>
        <h1 className="font-serif text-2xl font-light text-off-white">New Article</h1>
      </div>

      <ArticleForm />
    </div>
  )
}
