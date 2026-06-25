'use client'

import { useState, useTransition } from 'react'
import { Plus, MapPin, X } from 'lucide-react'
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/actions/addresses'
import { cn } from '@/lib/utils'

interface Address {
  id: string
  label: string | null
  firstName: string
  lastName: string
  company: string | null
  addressLine1: string
  addressLine2: string | null
  city: string
  state: string
  postalCode: string
  country: string
  phone: string | null
  isDefault: boolean
}

const EMPTY_FORM = {
  label: '', firstName: '', lastName: '', company: '',
  addressLine1: '', addressLine2: '', city: '', state: '',
  postalCode: '', country: 'US', phone: '', isDefault: false,
}

export function AddressManager({ addresses: initial }: { addresses: Address[] }) {
  const [addresses, setAddresses] = useState(initial)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function openAdd() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setError(null)
    setModalOpen(true)
  }

  function openEdit(addr: Address) {
    setForm({
      label: addr.label ?? '',
      firstName: addr.firstName,
      lastName: addr.lastName,
      company: addr.company ?? '',
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 ?? '',
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
      phone: addr.phone ?? '',
      isDefault: addr.isDefault,
    })
    setEditingId(addr.id)
    setError(null)
    setModalOpen(true)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const data = {
        ...form,
        label: form.label || undefined,
        company: form.company || undefined,
        addressLine2: form.addressLine2 || undefined,
        phone: form.phone || undefined,
      }
      const result = editingId
        ? await updateAddress(editingId, data)
        : await addAddress(data)

      if (result.error) { setError(result.error); return }
      setModalOpen(false)
      // Refresh: reload page to get fresh server data
      window.location.reload()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Remove this address?')) return
    startTransition(async () => {
      await deleteAddress(id)
      window.location.reload()
    })
  }

  function handleSetDefault(id: string) {
    startTransition(async () => {
      await setDefaultAddress(id)
      window.location.reload()
    })
  }

  const fields = [
    { key: 'label', label: 'Label (optional)', placeholder: 'Home, Work…', col: 2 },
    { key: 'firstName', label: 'First Name', col: 1 },
    { key: 'lastName', label: 'Last Name', col: 1 },
    { key: 'company', label: 'Company (optional)', col: 2 },
    { key: 'addressLine1', label: 'Street Address', col: 2 },
    { key: 'addressLine2', label: 'Apt / Suite (optional)', col: 2 },
    { key: 'city', label: 'City', col: 1 },
    { key: 'state', label: 'State / Province', col: 1 },
    { key: 'postalCode', label: 'Postal Code', col: 1 },
    { key: 'country', label: 'Country', col: 1 },
    { key: 'phone', label: 'Phone (optional)', col: 2 },
  ] as const

  return (
    <>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="label-tag text-gold mb-3">Saved Addresses</p>
          <h1 className="font-serif text-display-sm font-light text-off-white">Addresses</h1>
        </div>
        <button onClick={openAdd} className="btn-outline flex items-center gap-2 px-5 py-2.5 text-xs">
          <Plus size={13} /> Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="border border-charcoal-mid p-16 text-center">
          <MapPin size={32} className="text-charcoal-light mx-auto mb-4" />
          <p className="text-warm-gray text-sm mb-6">No saved addresses yet.</p>
          <button onClick={openAdd} className="btn-gold px-8 flex items-center gap-2 mx-auto">
            <Plus size={14} /> Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border border-charcoal-mid bg-charcoal p-6 relative">
              {address.isDefault && (
                <span className="absolute top-4 right-4 label-tag text-gold border border-gold/30 px-2 py-0.5">Default</span>
              )}
              {address.label && <p className="label-tag text-warm-gray mb-3">{address.label}</p>}
              <p className="text-off-white text-sm font-medium">{address.firstName} {address.lastName}</p>
              <div className="text-stone text-xs mt-2 space-y-0.5">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}, {address.state} {address.postalCode}</p>
                <p>{address.country}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => openEdit(address)} className="text-xs text-warm-gray hover:text-gold transition-colors">Edit</button>
                {!address.isDefault && (
                  <>
                    <span className="text-charcoal-light">·</span>
                    <button onClick={() => handleSetDefault(address.id)} className="text-xs text-warm-gray hover:text-gold transition-colors">Set Default</button>
                    <span className="text-charcoal-light">·</span>
                    <button onClick={() => handleDelete(address.id)} className="text-xs text-stone hover:text-red-400 transition-colors">Remove</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal border border-charcoal-mid w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-charcoal-mid">
              <h2 className="font-serif text-lg font-light text-off-white">
                {editingId ? 'Edit Address' : 'Add Address'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-stone hover:text-off-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
                  <label className="label-luxury">{f.label}</label>
                  <input
                    value={form[f.key] as string}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={'placeholder' in f ? f.placeholder : undefined}
                    className="input-luxury"
                  />
                </div>
              ))}

              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={(e) => setForm((prev) => ({ ...prev, isDefault: e.target.checked }))}
                  className="accent-gold"
                />
                <label htmlFor="isDefault" className="text-warm-gray text-sm">Set as default address</label>
              </div>

              {error && <p className="col-span-2 text-red-400 text-xs">{error}</p>}
            </div>

            <div className="p-6 border-t border-charcoal-mid flex gap-3 justify-end">
              <button onClick={() => setModalOpen(false)} className="btn-ghost px-6 py-2.5 text-xs">Cancel</button>
              <button onClick={handleSave} disabled={isPending} className="btn-gold px-8 py-2.5 text-xs disabled:opacity-50">
                {isPending ? 'Saving…' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
