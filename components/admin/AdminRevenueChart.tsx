'use client'

import { useEffect, useState } from 'react'

interface DataPoint {
  date: string
  revenue: number
}

export function AdminRevenueChart() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // Generate placeholder data — replace with real API call
    const points: DataPoint[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.floor(Math.random() * 800 + 200),
      }
    })
    setData(points)
  }, [])

  if (data.length === 0) {
    return <div className="h-48 skeleton" />
  }

  const max = Math.max(...data.map((d) => d.revenue))

  return (
    <div className="h-48 flex items-end gap-1">
      {data.map((point, i) => (
        <div
          key={i}
          className="flex-1 flex flex-col items-center gap-1 group relative"
          title={`${point.date}: $${point.revenue}`}
        >
          <div
            className="w-full bg-gold/30 hover:bg-gold transition-colors duration-200 min-h-[2px]"
            style={{ height: `${(point.revenue / max) * 100}%` }}
          />
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal border border-charcoal-mid px-2 py-1 text-[9px] text-off-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            ${point.revenue}
          </div>
        </div>
      ))}
    </div>
  )
}
