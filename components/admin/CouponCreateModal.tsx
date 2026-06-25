'use client'

import { useState, useTransition } from 'react'
import { X } from 'lucide-react'
import { createCoupon } from '@/actions/admin/coupons'

type CouponType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'

interface CouponFormState {
  code: string; description: string; type: CouponType
  value: string; minOrderAmount: string; maxUses: string
  isActive: boolean; startsAt: string; expiresAt: string
}

const EMPTY: CouponFormState = {
  code: '', description: '', type: 'PERCENTAGE',
  value: '', minOrderAmount: '', maxUses: '',
  isActive: true, startsAt: '', expiresAt: '',
}

export function CouponCreateModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function set(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await createCoupon({
        code: form.code,
        description: form.description || undefined,
        type: form.type,
        value: parseFloat(form.value) || 0,
        minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : undefined,
        maxUses: form.maxUses ? parseInt(form.maxUses) : undefined,
        isActive: form.isActive,
        startsAt: form.startsAt || undefined,
        expiresAt: form.expiresAt || undefined,
      })
      if (result.error) { setError(result.error); return }
      setOpen(false)
      setForm(EMPTY)
      window.location.reload()
    })
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-gold px-5 py-2 text-xs">
        + New Coupon
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal border border-charcoal-mid w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-charcoal-mid">
              <h2 className="font-serif text-lg font-light text-off-white">New Coupon</h2>
              <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-stone hover:text-off-white"><X size={18} /></button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="coupon-code" className="label-luxury">Code</label>
                <input
                  id="coupon-code"
                  value={form.code}
                  onChange={(e) => set('code', e.target.value.toUpperCase())}
                  className="input-luxury uppercase font-mono"
                  placeholder="SUMMER20"
                />
              </div>

              <div>
                <label htmlFor="coupon-desc" className="label-luxury">Description (optional)</label>
                <input
                  id="coupon-desc"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  className="input-luxury"
                  placeholder="Summer sale 20% off"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="coupon-type" className="label-luxury">Type</label>
                  <select id="coupon-type" value={form.type} onChange={(e) => set('type', e.target.value)} className="input-luxury text-black">
                    <option value="PERCENTAGE" className="text-black">Percentage</option>
                    <option value="FIXED_AMOUNT" className="text-black">Fixed Amount</option>
                    <option value="FREE_SHIPPING" className="text-black">Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="coupon-value" className="label-luxury">Value {form.type === 'PERCENTAGE' ? '(%)' : form.type === 'FIXED_AMOUNT' ? '($)' : ''}</label>
                  <input
                    id="coupon-value"
                    type="number"
                    min={0}
                    value={form.value}
                    onChange={(e) => set('value', e.target.value)}
                    disabled={form.type === 'FREE_SHIPPING'}
                    className="input-luxury disabled:opacity-40"
                    placeholder={form.type === 'PERCENTAGE' ? '20' : '10.00'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="coupon-min" className="label-luxury">Min Order ($)</label>
                  <input id="coupon-min" type="number" min={0} value={form.minOrderAmount} onChange={(e) => set('minOrderAmount', e.target.value)} className="input-luxury" placeholder="50.00" />
                </div>
                <div>
                  <label htmlFor="coupon-max-uses" className="label-luxury">Max Uses</label>
                  <input id="coupon-max-uses" type="number" min={1} value={form.maxUses} onChange={(e) => set('maxUses', e.target.value)} className="input-luxury" placeholder="Unlimited" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="coupon-starts" className="label-luxury">Starts At</label>
                  <input id="coupon-starts" type="datetime-local" value={form.startsAt} onChange={(e) => set('startsAt', e.target.value)} className="input-luxury" />
                </div>
                <div>
                  <label htmlFor="coupon-expires" className="label-luxury">Expires At</label>
                  <input id="coupon-expires" type="datetime-local" value={form.expiresAt} onChange={(e) => set('expiresAt', e.target.value)} className="input-luxury" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="accent-gold" />
                <span className="text-warm-gray text-sm">Active immediately</span>
              </label>

              {error && <p className="text-red-400 text-xs">{error}</p>}
            </div>

            <div className="p-6 border-t border-charcoal-mid flex gap-3 justify-end">
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost px-6 py-2.5 text-xs">Cancel</button>
              <button type="button" onClick={handleSave} disabled={isPending || !form.code} className="btn-gold px-8 py-2.5 text-xs disabled:opacity-50">
                {isPending ? 'Creating…' : 'Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
