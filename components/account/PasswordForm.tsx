'use client'

import { useState, useTransition } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { changePassword } from '@/actions/account'

export function PasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!hasPassword) {
    return (
      <div className="border border-charcoal-mid bg-charcoal p-6">
        <h2 className="label-tag text-stone mb-3">Security</h2>
        <p className="text-stone text-sm">You signed in with Google. Password management is not available.</p>
      </div>
    )
  }

  function handleSave() {
    setMessage(null)
    startTransition(async () => {
      const result = await changePassword(form)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'Password changed successfully.' })
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    })
  }

  return (
    <div className="border border-charcoal-mid bg-charcoal p-6">
      <h2 className="label-tag text-stone mb-5">Change Password</h2>
      <div className="space-y-4">
        {[
          { key: 'currentPassword', label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent((v) => !v) },
          { key: 'newPassword', label: 'New Password', show: showNew, toggle: () => setShowNew((v) => !v) },
          { key: 'confirmPassword', label: 'Confirm New Password', show: showNew, toggle: () => setShowNew((v) => !v) },
        ].map(({ key, label, show, toggle }) => (
          <div key={key}>
            <label className="label-luxury">{label}</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                className="input-luxury pr-10"
              />
              <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-warm-gray">
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        ))}

        {message && (
          <p className={`text-xs ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {message.text}
          </p>
        )}

        <button onClick={handleSave} disabled={isPending} className="btn-gold px-8 py-2.5 text-xs disabled:opacity-50">
          {isPending ? 'Updating…' : 'Update Password'}
        </button>
      </div>
    </div>
  )
}
