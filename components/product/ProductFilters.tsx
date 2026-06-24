'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { ProductFilters } from '@/types'

interface ProductFiltersProps {
  currentFilters: ProductFilters
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name A–Z' },
]

export function ProductFilters({ currentFilters }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <p className="label-tag mb-4">Sort By</p>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('sort', option.value)}
              className={cn(
                'block w-full text-left text-sm py-1.5 transition-colors duration-150',
                currentFilters.sortBy === option.value
                  ? 'text-off-white'
                  : 'text-stone hover:text-warm-gray'
              )}
            >
              {option.value === currentFilters.sortBy && (
                <span className="inline-block w-2 h-px bg-gold mr-2 mb-0.5" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div>
        <p className="label-tag mb-4">Search</p>
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={currentFilters.search ?? ''}
          onChange={(e) => {
            const val = e.target.value
            if (val.length > 2 || val.length === 0) {
              updateFilter('search', val || null)
            }
          }}
          className="input-luxury text-sm w-full"
        />
      </div>
    </div>
  )
}
