'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
}

// Simple event-driven toast system
type ToastHandler = (toast: Omit<Toast, 'id'>) => void
let handler: ToastHandler | null = null

export function toast(t: Omit<Toast, 'id'>) {
  handler?.(t)
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    handler = (t) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { ...t, id }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 4000)
    }
    return () => { handler = null }
  }, [])

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const icons = { success: CheckCircle, error: XCircle, info: Info }
  const colors = {
    success: 'border-emerald-500/30 text-emerald-400',
    error: 'border-red-500/30 text-red-400',
    info: 'border-gold/30 text-gold',
  }

  return (
    <div className="fixed bottom-6 right-6 z-70 flex flex-col gap-3 max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.type]
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-charcoal border border-charcoal-mid shadow-2xl p-4 flex items-start gap-3"
            >
              <Icon size={16} className={cn('flex-shrink-0 mt-0.5', colors[t.type])} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-off-white">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-stone mt-0.5 leading-relaxed">{t.description}</p>
                )}
              </div>
              <button onClick={() => remove(t.id)} className="text-stone hover:text-warm-gray flex-shrink-0">
                <X size={14} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
