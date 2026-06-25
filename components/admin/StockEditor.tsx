'use client'

import { useState, useTransition } from 'react'
import { updateStock } from '@/actions/admin/products'

interface SizeStock { id: string; size: string; stock: number }
interface Variant { id: string; name: string; colorHex: string | null; sizes: SizeStock[] }

export function StockEditor({ variants }: { variants: Variant[] }) {
  const [stocks, setStocks] = useState<Record<string, number>>(
    Object.fromEntries(variants.flatMap((v) => v.sizes.map((s) => [s.id, s.stock])))
  )
  const [saving, setSaving] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()

  function handleSave(sizeStockId: string) {
    setSaving(sizeStockId)
    startTransition(async () => {
      const result = await updateStock(sizeStockId, stocks[sizeStockId] ?? 0)
      setMessages((prev) => ({
        ...prev,
        [sizeStockId]: result.error ? `Error: ${result.error}` : '✓',
      }))
      setSaving(null)
      setTimeout(() => setMessages((prev) => { const n = { ...prev }; delete n[sizeStockId]; return n }), 2000)
    })
  }

  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.id}>
          <div className="flex items-center gap-2 mb-2">
            {variant.colorHex && (
              <span className="w-3 h-3 rounded-full border border-charcoal-mid" style={{ backgroundColor: variant.colorHex }} />
            )}
            <p className="text-warm-gray text-xs font-medium">{variant.name}</p>
          </div>
          <div className="space-y-2">
            {variant.sizes.map((sz) => (
              <div key={sz.id} className="flex items-center gap-2">
                <span className="text-stone text-[10px] w-8 text-center">{sz.size}</span>
                <input
                  type="number"
                  min={0}
                  value={stocks[sz.id] ?? 0}
                  onChange={(e) => setStocks((prev) => ({ ...prev, [sz.id]: parseInt(e.target.value) || 0 }))}
                  className="input-luxury py-1.5 text-sm w-20 text-center"
                />
                <button
                  onClick={() => handleSave(sz.id)}
                  disabled={isPending && saving === sz.id}
                  className="text-[10px] text-gold hover:text-gold-light transition-colors disabled:opacity-50"
                >
                  {saving === sz.id ? '…' : messages[sz.id] ?? 'Save'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
