import type { Metadata } from 'next'
import { WaitlistHero } from '@/components/waitlist/WaitlistHero'
import { WaitlistForm } from '@/components/waitlist/WaitlistForm'
import { WaitlistBenefits } from '@/components/waitlist/WaitlistBenefits'
import { WaitlistCountdown } from '@/components/waitlist/WaitlistCountdown'
import { WaitlistFAQ } from '@/components/waitlist/WaitlistFAQ'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Join the Waitlist — The Risers Collection',
  description: 'Be first. Secure your spot for exclusive early access to The Risers Collection — The Wilayah Hoodie and more.',
}

async function getWaitlistCount() {
  try {
    return await db.waitlistMember.count()
  } catch {
    return 0
  }
}

export default async function WaitlistPage() {
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
