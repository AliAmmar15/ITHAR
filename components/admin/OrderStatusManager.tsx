'use client'

import { useState, useTransition } from 'react'
import { updateOrderStatus } from '@/actions/admin/orders'

const STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']

export function OrderStatusManager({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleUpdate() {
    setMessage(null)
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, status)
      if (result.error) setMessage({ type: 'error', text: result.error })
      else setMessage({ type: 'success', text: 'Status updated.' })
    })
  }

  return (
    <div className="border border-charcoal-mid bg-charcoal p-6">
      <h2 className="label-tag text-stone mb-4">Update Status</h2>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input-luxury mb-3 text-black"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className="text-black">{s.charAt(0) + s.slice(1).toLowerCase()}</option>
        ))}
      </select>
      {message && (
        <p className={`text-xs mb-3 ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
      <button onClick={handleUpdate} disabled={isPending || status === currentStatus} className="btn-gold w-full py-2.5 text-xs disabled:opacity-50">
        {isPending ? 'Saving…' : 'Save Status'}
      </button>
    </div>
  )
}
