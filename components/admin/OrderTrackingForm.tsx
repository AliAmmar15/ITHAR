'use client'

import { useState, useTransition } from 'react'
import { updateTrackingInfo } from '@/actions/admin/orders'

export function OrderTrackingForm({
  orderId, trackingNumber, trackingUrl,
}: { orderId: string; trackingNumber: string; trackingUrl: string }) {
  const [number, setNumber] = useState(trackingNumber)
  const [url, setUrl] = useState(trackingUrl)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSave() {
    setMessage(null)
    startTransition(async () => {
      const result = await updateTrackingInfo(orderId, number, url)
      if (result.error) setMessage({ type: 'error', text: result.error })
      else setMessage({ type: 'success', text: 'Tracking saved.' })
    })
  }

  return (
    <div className="border border-charcoal-mid bg-charcoal p-6">
      <h2 className="label-tag text-stone mb-4">Tracking</h2>
      <div className="space-y-3">
        <div>
          <label className="label-luxury">Tracking Number</label>
          <input value={number} onChange={(e) => setNumber(e.target.value)} className="input-luxury" placeholder="1Z999AA1..." />
        </div>
        <div>
          <label className="label-luxury">Tracking URL (optional)</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="input-luxury" placeholder="https://..." />
        </div>
        {message && (
          <p className={`text-xs ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{message.text}</p>
        )}
        <button onClick={handleSave} disabled={isPending} className="btn-gold w-full py-2.5 text-xs disabled:opacity-50">
          {isPending ? 'Saving…' : 'Save Tracking'}
        </button>
      </div>
    </div>
  )
}
