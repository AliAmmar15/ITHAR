export const SITE_NAME = 'ITHAR'
export const SITE_TAGLINE = 'Clothing for the Risers.'
export const SITE_DESCRIPTION =
  'Premium streetwear inspired by timeless principles of loyalty, sacrifice, and devotion. Wear it with intention.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ithar.co'

export const INSTAGRAM_URL = 'https://instagram.com/ithar_store'
export const TWITTER_URL = 'https://twitter.com/itharclothing'

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const
export type SizeOption = (typeof SIZES)[number]

export const SIZE_GUIDE = {
  XS: { chest: '32-34"', waist: '26-28"', hips: '34-36"' },
  S: { chest: '34-36"', waist: '28-30"', hips: '36-38"' },
  M: { chest: '36-38"', waist: '30-32"', hips: '38-40"' },
  L: { chest: '38-40"', waist: '32-34"', hips: '40-42"' },
  XL: { chest: '40-42"', waist: '34-36"', hips: '42-44"' },
  XXL: { chest: '42-44"', waist: '36-38"', hips: '44-46"' },
} as const

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivered in 5-7 business days',
    price: 8.99,
    estimatedDays: '5-7 days',
    freeThreshold: 100,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivered in 2-3 business days',
    price: 18.99,
    estimatedDays: '2-3 days',
    freeThreshold: null,
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Delivered next business day',
    price: 34.99,
    estimatedDays: '1 day',
    freeThreshold: null,
  },
] as const

export const TAX_RATE = 0.08 // 8%

export const FREE_SHIPPING_THRESHOLD = 100

export const BRAND_VALUES = [
  { arabic: 'وفاء', english: 'Loyalty', description: 'Unwavering fidelity to those who matter most.' },
  { arabic: 'عدل', english: 'Justice', description: 'Standing for what is right, regardless of cost.' },
  { arabic: 'شجاعة', english: 'Courage', description: 'The will to rise when others would fall.' },
  { arabic: 'صبر', english: 'Patience', description: 'Endurance as a form of strength, not weakness.' },
  { arabic: 'تضحية', english: 'Sacrifice', description: 'Giving what you have for those who need it more.' },
  { arabic: 'أمل', english: 'Hope', description: 'Carrying light into the darkest of places.' },
  { arabic: 'إخلاص', english: 'Devotion', description: 'Total commitment — in action, not in word alone.' },
] as const

export const FAQ_ITEMS = [
  {
    question: 'When does the Risers Collection drop?',
    answer: 'The Wilayah Hoodie and the full Risers Collection are launching soon. Join the waitlist to be first in line and receive early access before public release.',
  },
  {
    question: 'What does ITHAR mean?',
    answer: 'Ithar (إيثار) is an Arabic word meaning selflessness — the act of preferring others over yourself. It is one of the highest virtues in Islamic ethics, embodied by the Ahlulbayt (ع) throughout history.',
  },
  {
    question: 'What makes the Wilayah Hoodie different?',
    answer: 'Every detail is intentional. 450 GSM heavyweight French terry cotton, garment-washed finish, flat black drawstrings, matte black hardware, and antique gold embroidered calligraphy. This is not a product — it is a statement.',
  },
  {
    question: 'What sizing do you carry?',
    answer: 'We carry XS through XXL. The Wilayah Hoodie is designed for an oversized fit with dropped shoulders. We recommend sizing down if you prefer a more fitted look.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes. We ship to the US, Canada, UK, Australia, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman, and Iraq. International shipping rates calculated at checkout.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached. Sale items are final sale. See our Returns Policy for full details.',
  },
] as const

export const NAV_ITEMS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections/risers-collection' },
  { label: 'The Wilayah Hoodie', href: '/products/wilayah-hoodie' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
] as const
