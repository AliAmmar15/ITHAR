import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, MapPin } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'

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
        <FadeUp>
          <Link href="/account" className="btn-text mb-8 inline-flex">
            <ArrowLeft size={13} /> Account
          </Link>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label-tag text-gold mb-3">Saved Addresses</p>
              <h1 className="font-serif text-display-sm font-light text-off-white">Addresses</h1>
            </div>
            <button className="btn-outline flex items-center gap-2 px-5 py-2.5 text-xs">
              <Plus size={13} /> Add New
            </button>
          </div>
        </FadeUp>

        {addresses.length === 0 ? (
          <FadeUp className="border border-charcoal-mid p-16 text-center">
            <MapPin size={32} className="text-charcoal-light mx-auto mb-4" />
            <p className="text-warm-gray text-sm mb-6">No saved addresses yet.</p>
            <button className="btn-gold px-8 flex items-center gap-2 mx-auto">
              <Plus size={14} /> Add Address
            </button>
          </FadeUp>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <StaggerItem key={address.id}>
                <div className="border border-charcoal-mid bg-charcoal p-6 relative">
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 label-tag text-gold border border-gold/30 px-2 py-0.5">
                      Default
                    </span>
                  )}
                  {address.label && (
                    <p className="label-tag text-warm-gray mb-3">{address.label}</p>
                  )}
                  <p className="text-off-white text-sm font-medium">
                    {address.firstName} {address.lastName}
                  </p>
                  <div className="text-stone text-xs mt-2 space-y-0.5">
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button className="text-xs text-warm-gray hover:text-gold transition-colors">Edit</button>
                    {!address.isDefault && (
                      <>
                        <span className="text-charcoal-light">·</span>
                        <button className="text-xs text-warm-gray hover:text-gold transition-colors">Set Default</button>
                        <span className="text-charcoal-light">·</span>
                        <button className="text-xs text-stone hover:text-red-400 transition-colors">Remove</button>
                      </>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  )
}
