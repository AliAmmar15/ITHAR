import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { AddressManager } from '@/components/account/AddressManager'

export const metadata: Metadata = { title: 'Saved Addresses' }

export default async function AddressesPage() {
  const session = await auth()
  if (!session?.user) redirect('/login?callbackUrl=/account/addresses')

  const addresses = await db.address.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  }).catch(() => [])

  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-12 md:py-16 max-w-3xl">
        <Link href="/account" className="btn-text mb-8 inline-flex">
          <ArrowLeft size={13} /> Account
        </Link>
        <AddressManager addresses={addresses} />
      </div>
    </div>
  )
}
