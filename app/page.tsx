import type { Metadata } from 'next'
import { WaitlistHero } from '@/components/waitlist/WaitlistHero'
import { WaitlistCountdown } from '@/components/waitlist/WaitlistCountdown'
import { WaitlistBenefits } from '@/components/waitlist/WaitlistBenefits'
import { WaitlistForm } from '@/components/waitlist/WaitlistForm'
import { WaitlistFAQ } from '@/components/waitlist/WaitlistFAQ'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ITHAR — The Wilayah Hoodie',
  description: 'Be among the first. Join the waitlist for The Wilayah Hoodie — The Risers Collection, Season 01 by ITHAR.',
}

async function getWaitlistCount() {
  try {
    return await db.waitlistMember.count()
  } catch {
    return 0
  }
}

export default async function HomePage() {
  const waitlistCount = await getWaitlistCount()

  return (
    <div className="bg-black">
      <WaitlistHero waitlistCount={waitlistCount} />
      <WaitlistCountdown />
      <WaitlistBenefits />
      <WaitlistForm />
      <WaitlistFAQ />
    </div>
  )
}
