'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function requireAdmin() {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session?.user || (role !== 'ADMIN' && role !== 'SUPERADMIN')) {
    throw new Error('Unauthorized')
  }
}

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  tags: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
})

export async function createArticle(formData: unknown) {
  try {
    await requireAdmin()
    const parsed = articleSchema.safeParse(formData)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    const existing = await db.article.findUnique({ where: { slug: parsed.data.slug } })
    if (existing) return { error: 'An article with this slug already exists' }

    const tags = parsed.data.tags
      ? parsed.data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const article = await db.article.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverImage: parsed.data.coverImage ?? undefined,
        status: parsed.data.status,
        tags,
        seoTitle: parsed.data.seoTitle,
        seoDesc: parsed.data.seoDesc,
        publishedAt: parsed.data.status === 'PUBLISHED' ? new Date() : undefined,
      },
    })

    revalidatePath('/admin/journal')
    revalidatePath('/journal')
    return { success: true, id: article.id, slug: article.slug }
  } catch (e: any) {
    return { error: e.message ?? 'Failed to create article' }
  }
}

export async function updateArticle(id: string, formData: unknown) {
  try {
    await requireAdmin()
    const parsed = articleSchema.safeParse(formData)
    if (!parsed.success) return { error: parsed.error.errors[0].message }

    const existing = await db.article.findUnique({ where: { id } })
    if (!existing) return { error: 'Article not found' }

    const tags = parsed.data.tags
      ? parsed.data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const wasPublished = existing.status === 'PUBLISHED'
    const isNowPublished = parsed.data.status === 'PUBLISHED'

    await db.article.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverImage: parsed.data.coverImage ?? null,
        status: parsed.data.status,
        tags,
        seoTitle: parsed.data.seoTitle,
        seoDesc: parsed.data.seoDesc,
        publishedAt: isNowPublished && !wasPublished ? new Date() : existing.publishedAt,
      },
    })

    revalidatePath('/admin/journal')
    revalidatePath(`/journal/${parsed.data.slug}`)
    return { success: true }
  } catch {
    return { error: 'Failed to update article' }
  }
}
