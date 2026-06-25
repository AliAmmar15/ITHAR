'use client'

import { useState, useTransition } from 'react'
import { updateProfile } from '@/actions/account'

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const [value, setValue] = useState(name)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSave() {
    setMessage(null)
    startTransition(async () => {
      const result = await updateProfile({ name: value })
      if (result.error) setMessage({ type: 'error', text: result.error })
      else setMessage({ type: 'success', text: 'Name updated.' })
    })
  }

  return (
    <div className="border border-charcoal-mid bg-charcoal p-6">
      <h2 className="label-tag text-stone mb-5">Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="label-luxury">Full Name</label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input-luxury"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="label-luxury">Email</label>
          <div className="border border-charcoal-mid bg-black px-4 py-3 text-stone text-sm">{email}</div>
          <p className="text-stone text-[10px] mt-1">Email cannot be changed.</p>
        </div>

        {message && (
          <p className={`text-xs ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {message.text}
          </p>
        )}

        <button onClick={handleSave} disabled={isPending} className="btn-gold px-8 py-2.5 text-xs disabled:opacity-50">
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
