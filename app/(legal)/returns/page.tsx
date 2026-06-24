import type { Metadata } from 'next'
import { LegalLayout } from '@/components/layout/LegalLayout'

export const metadata: Metadata = { title: 'Returns & Exchanges' }

export default function ReturnsPage() {
  return (
    <LegalLayout title="Returns & Exchanges" lastUpdated="June 2025">
      <p>
        We stand behind everything we make. If you&apos;re not completely satisfied with your
        purchase, we&apos;re here to help.
      </p>

      <h2>Return Eligibility</h2>
      <p>Items are eligible for return if they are:</p>
      <ul>
        <li>Returned within 30 days of the delivery date</li>
        <li>Unworn and unwashed</li>
        <li>In original condition with all tags attached</li>
        <li>In the original packaging</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <ul>
        <li>Sale or discounted items (final sale)</li>
        <li>Items marked as non-returnable at time of purchase</li>
        <li>Items that show signs of wear, washing, or damage</li>
      </ul>

      <h2>How to Start a Return</h2>
      <ol>
        <li>Email support@ithar.co with your order number and reason for return</li>
        <li>We will send you a return authorization and prepaid shipping label (US only)</li>
        <li>Package your item securely and drop it off at the carrier location</li>
        <li>Once received and inspected, your refund will be processed within 5–7 business days</li>
      </ol>

      <h2>Exchanges</h2>
      <p>
        To exchange for a different size or colorway, follow the same process as a return and indicate
        your desired exchange item. We will ship your exchange as soon as we receive and process your return.
      </p>

      <h2>Refunds</h2>
      <p>
        Refunds are issued to the original payment method. Processing time varies by payment provider
        (typically 5–10 business days to appear on your statement). Original shipping costs are
        non-refundable unless the return is due to our error.
      </p>

      <h2>Damaged or Incorrect Items</h2>
      <p>
        If you receive a damaged or incorrect item, contact us within 7 days of delivery at
        support@ithar.co with your order number and photos. We will resolve this immediately at no
        cost to you.
      </p>

      <h2>International Returns</h2>
      <p>
        International customers are responsible for return shipping costs. We recommend using a
        tracked shipping service, as we cannot be held responsible for lost return packages.
      </p>
    </LegalLayout>
  )
}
