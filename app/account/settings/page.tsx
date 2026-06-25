import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { ProfileForm } from '@/components/account/ProfileForm'
import { PasswordForm } from '@/components/account/PasswordForm'

export const metadata: Metadata = { title: 'Account Settings' }

export default async function AccountSettingsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/account/settings')

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, password: true },
  }).catch(() => null)

  const hasPassword = !!user?.password

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-12 md:py-16 max-w-xl">
        <Link href="/account" className="btn-text mb-8 inline-flex">
          <ArrowLeft size={13} /> Account
        </Link>
        <p className="label-tag text-gold mb-3">Preferences</p>
        <h1 className="font-serif text-display-sm font-light text-off-white mb-10">Account Settings</h1>

        <div className="space-y-4">
          <ProfileForm name={user?.name ?? ''} email={user?.email ?? session.user.email ?? ''} />
          <PasswordForm hasPassword={hasPassword} />

          <div className="border border-red-900/40 bg-charcoal p-6">
            <h2 className="label-tag text-red-400/70 mb-3">Danger Zone</h2>
            <p className="text-stone text-xs">
              To delete your account, email us at{' '}
              <a href="mailto:support@ithar.store" className="text-warm-gray hover:text-gold transition-colors">
                support@ithar.store
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
