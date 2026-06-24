import type { Metadata } from 'next'
import Link from 'next/link'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FadeUp } from '@/components/animations/FadeUp'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ITHAR, our products, shipping, and returns.',
}

const faqSections = [
  {
    category: 'About ITHAR',
    items: [
      {
        question: 'What does ITHAR mean?',
        answer: 'Ithar (إيثار) is an Arabic word meaning selflessness — the act of preferring others over yourself. It is one of the highest virtues in Islamic ethics, and one that was embodied fully by the Ahlulbayt (ع) throughout history.',
      },
      {
        question: 'Who is ITHAR for?',
        answer: 'ITHAR is for those who understand the meaning behind the name. For those who carry the values of loyalty, justice, courage, patience, sacrifice, hope, and devotion — not just as words, but as a way of life.',
      },
      {
        question: 'What is The Risers Collection?',
        answer: 'The Risers Collection is ITHAR\'s debut collection. Season 01 features the Wilayah Hoodie as the hero piece — a 450 GSM heavyweight French terry garment bearing the declaration of Ghadir Khumm.',
      },
    ],
  },
  {
    category: 'Products & Sizing',
    items: [
      {
        question: 'What sizes do you carry?',
        answer: 'We carry XS through XXL. The Wilayah Hoodie is designed for an oversized fit with dropped shoulders. We recommend sizing down if you prefer a more fitted silhouette.',
      },
      {
        question: 'What is the Wilayah Hoodie made of?',
        answer: '450 GSM heavyweight French terry cotton with a garment-washed finish. Flat black drawstrings, matte black hardware, and antique gold embroidered calligraphy.',
      },
      {
        question: 'Is the calligraphy embroidered or printed?',
        answer: 'The Arabic calligraphy on the back of the Wilayah Hoodie is embroidered — not printed. Each piece is produced with premium embroidery to ensure longevity and precision.',
      },
    ],
  },
  {
    category: 'Orders & Shipping',
    items: [
      {
        question: 'When will my order ship?',
        answer: 'Orders are processed within 2-3 business days. Standard shipping takes 5-7 business days. Express (2-3 days) and overnight options are available at checkout.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes. We ship to the United States, Canada, United Kingdom, Australia, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman, and Iraq. International shipping rates are calculated at checkout.',
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes — free standard shipping on all orders over $100 USD within the United States.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of delivery for unworn, unwashed items with all original tags attached. Items must be in original condition. Sale items are final sale.',
      },
      {
        question: 'How do I start a return?',
        answer: 'Email support@ithar.co with your order number and reason for return. We\'ll provide a prepaid return label for domestic orders.',
      },
      {
        question: 'Can I exchange for a different size?',
        answer: 'Yes. Contact us at support@ithar.co to initiate an exchange. We\'ll ship your new size as soon as we receive the original item.',
      },
    ],
  },
  {
    category: 'Payments & Security',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards, Apple Pay, and Google Pay. All transactions are secured by Stripe with industry-standard SSL encryption.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes. We never store your card details. All payment processing is handled by Stripe, a PCI DSS Level 1 certified payment processor — the highest level of certification available.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-16 md:py-24 max-w-3xl">
        <FadeUp>
          <p className="label-tag text-gold mb-4">Support</p>
          <h1 className="font-serif text-display-lg font-light text-off-white mb-6">FAQ</h1>
          <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-14 max-w-lg">
            Can&apos;t find what you&apos;re looking for? Reach us at{' '}
            <Link href="mailto:support@ithar.co" className="text-gold hover:text-gold-light">
              support@ithar.co
            </Link>
          </p>
        </FadeUp>

        <div className="space-y-14">
          {faqSections.map((section) => (
            <FadeUp key={section.category}>
              <p className="label-tag text-gold mb-6">{section.category}</p>
              <FaqAccordion items={section.items} />
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-16 p-8 border border-charcoal-mid bg-charcoal text-center">
          <p className="text-warm-gray text-sm mb-5">Still have a question?</p>
          <Link href="/contact" className="btn-gold px-10">Contact Us</Link>
        </FadeUp>
      </div>
    </div>
  )
}
