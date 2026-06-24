'use client'

import { useState, useEffect } from 'react'
import { FadeUp } from '@/components/animations/FadeUp'

const LAUNCH_DATE = new Date('2026-09-10T00:00:00Z')

function getTimeLeft() {
  const now = new Date()
  const diff = LAUNCH_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function WaitlistCountdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <section className="section-padding-sm bg-charcoal border-y border-charcoal-mid">
      <div className="container mx-auto text-center">
        <FadeUp>
          <p className="label-tag text-gold mb-8">Launch Countdown</p>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-start gap-4 md:gap-8">
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-7xl font-light text-off-white tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <p className="label-tag text-stone mt-3">{unit.label}</p>
                </div>
                {i < units.length - 1 && (
                  <span className="font-serif text-4xl text-gold/30 leading-none mt-1">:</span>
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
