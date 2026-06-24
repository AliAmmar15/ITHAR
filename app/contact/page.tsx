import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { FadeUp } from '@/components/animations/FadeUp'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the ITHAR team.',
}

const contactInfo = [
  { label: 'General Inquiries', value: 'hello@ithar.co' },
  { label: 'Order Support', value: 'support@ithar.co' },
  { label: 'Press & Wholesale', value: 'press@ithar.co' },
  { label: 'Response Time', value: '24–48 hours' },
]

export default function ContactPage() {
  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <FadeUp>
            <p className="label-tag text-gold mb-4">Get in Touch</p>
            <h1 className="font-serif text-display-lg font-light text-off-white mb-8 leading-tight">
              Contact Us
            </h1>
            <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-12 max-w-md">
              Have a question about an order, a collaboration inquiry, or just want to connect?
              We&apos;re here. Reach out through the form or directly via email below.
            </p>

            <div className="space-y-0 divide-y divide-charcoal-mid border-t border-charcoal-mid">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center justify-between py-4">
                  <span className="label-tag text-stone">{info.label}</span>
                  <span className="text-off-white text-sm">{info.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border border-charcoal-mid bg-charcoal">
              <p className="label-tag text-gold mb-3">Note</p>
              <p className="text-warm-gray text-sm leading-relaxed">
                For order issues or tracking inquiries, please include your order number in the message
                to help us assist you faster.
              </p>
            </div>
          </FadeUp>

          {/* Right — Form */}
          <FadeUp delay={0.15}>
            <ContactForm />
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
