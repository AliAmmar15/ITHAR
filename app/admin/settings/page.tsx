import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Settings' }

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label-tag text-gold mb-1">Configuration</p>
        <h1 className="font-serif text-2xl font-light text-off-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Store Information', desc: 'Name, email, currency, timezone' },
          { title: 'Shipping & Fulfillment', desc: 'Rates, zones, carriers' },
          { title: 'Payment Methods', desc: 'Stripe configuration' },
          { title: 'Email Notifications', desc: 'Order confirmations, shipping alerts' },
          { title: 'SEO & Metadata', desc: 'Default titles, descriptions, OG images' },
        ].map((section) => (
          <div key={section.title} className="border border-charcoal-mid bg-charcoal p-6 flex items-center justify-between">
            <div>
              <p className="text-off-white text-sm font-medium">{section.title}</p>
              <p className="text-stone text-xs mt-0.5">{section.desc}</p>
            </div>
            <span className="text-[10px] uppercase tracking-wide border border-stone/30 text-stone px-2 py-0.5">
              Coming Soon
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
