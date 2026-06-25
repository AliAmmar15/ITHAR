'use client'

import { useState, useTransition } from 'react'
import { updateAdminNote } from '@/actions/admin/orders'

export function OrderNoteForm({ orderId, note }: { orderId: string; note: string }) {
  const [value, setValue] = useState(note)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSave() {
    setMessage(null)
    startTransition(async () => {
      const result = await updateAdminNote(orderId, value)
      if (result.error) setMessage({ type: 'error', text: result.error })
      else setMessage({ type: 'success', text: 'Note saved.' })
    })
  }

  return (
    <div className="border border-charcoal-mid bg-charcoal p-6">
      <h2 className="label-tag text-stone mb-4">Internal Note</h2>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="Add a note visible only to admins…"
        className="input-luxury w-full resize-none mb-3"
      />
      {message && (
        <p className={`text-xs mb-3 ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{message.text}</p>
      )}
      <button onClick={handleSave} disabled={isPending} className="btn-ghost w-full py-2.5 text-xs disabled:opacity-50">
        {isPending ? 'Saving…' : 'Save Note'}
      </button>
    </div>
  )
}
