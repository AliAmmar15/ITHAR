'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createArticle, updateArticle } from '@/actions/admin/journal'

interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  tags: string
  seoTitle: string
  seoDesc: string
}

const EMPTY: ArticleFormData = {
  title: '', slug: '', excerpt: '', content: '',
  coverImage: '', status: 'DRAFT', tags: '', seoTitle: '', seoDesc: '',
}

interface Props {
  articleId?: string
  initial?: Partial<ArticleFormData>
}

export function ArticleForm({ articleId, initial }: Props) {
  const [form, setForm] = useState<ArticleFormData>({ ...EMPTY, ...initial })
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function set(key: keyof ArticleFormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const data = {
        ...form,
        coverImage: form.coverImage || undefined,
      }
      const result = articleId
        ? await updateArticle(articleId, data)
        : await createArticle(data)

      if (result.error) { setError(result.error); return }

      if (!articleId && 'slug' in result) {
        router.push('/admin/journal')
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="border border-charcoal-mid bg-charcoal p-6 space-y-4">
        <h2 className="label-tag text-stone">Article Content</h2>

        <div>
          <label className="label-luxury">Title</label>
          <input
            value={form.title}
            onChange={(e) => {
              set('title', e.target.value)
              if (!articleId) set('slug', autoSlug(e.target.value))
            }}
            className="input-luxury"
            placeholder="The Meaning Behind Wilayah"
          />
        </div>

        <div>
          <label className="label-luxury">Slug (URL)</label>
          <input
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className="input-luxury font-mono"
            placeholder="the-meaning-behind-wilayah"
          />
        </div>

        <div>
          <label className="label-luxury">Excerpt</label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
            className="input-luxury resize-none"
            placeholder="Short summary shown in article listings..."
          />
        </div>

        <div>
          <label className="label-luxury">Content</label>
          <textarea
            rows={16}
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            className="input-luxury resize-y font-mono text-sm"
            placeholder="Full article content (Markdown supported)..."
          />
        </div>

        <div>
          <label className="label-luxury">Cover Image URL (optional)</label>
          <input
            value={form.coverImage}
            onChange={(e) => set('coverImage', e.target.value)}
            className="input-luxury"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="label-luxury">Tags (comma separated)</label>
          <input
            value={form.tags}
            onChange={(e) => set('tags', e.target.value)}
            className="input-luxury"
            placeholder="culture, design, spirituality"
          />
        </div>
      </div>

      <div className="border border-charcoal-mid bg-charcoal p-6 space-y-4">
        <h2 className="label-tag text-stone">Publishing</h2>
        <div>
          <label className="label-luxury">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value as ArticleFormData['status'])} className="input-luxury text-black">
            <option value="DRAFT" className="text-black">Draft</option>
            <option value="PUBLISHED" className="text-black">Published</option>
            <option value="ARCHIVED" className="text-black">Archived</option>
          </select>
        </div>

        <div>
          <label className="label-luxury">SEO Title (optional)</label>
          <input value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className="input-luxury" />
        </div>
        <div>
          <label className="label-luxury">SEO Description (optional)</label>
          <textarea rows={2} value={form.seoDesc} onChange={(e) => set('seoDesc', e.target.value)} className="input-luxury resize-none" />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={isPending || !form.title || !form.slug || !form.content}
          className="btn-gold px-10 py-3 text-xs disabled:opacity-50"
        >
          {isPending ? 'Saving…' : articleId ? 'Save Changes' : 'Create Article'}
        </button>
        <a href="/admin/journal" className="btn-ghost px-8 py-3 text-xs">Cancel</a>
      </div>
    </div>
  )
}
