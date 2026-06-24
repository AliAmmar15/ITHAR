import type { Metadata } from 'next'
import { LegalLayout } from '@/components/layout/LegalLayout'

export const metadata: Metadata = { title: 'Shipping Policy' }

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="June 2025">
      <h2>Processing Time</h2>
      <p>
        All orders are processed within 2–3 business days (Monday–Friday, excluding holidays).
        You will receive a shipping confirmation email with tracking information once your order ships.
      </p>

      <h2>Domestic Shipping (United States)</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Estimated Delivery</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Standard</td><td>5–7 business days</td><td>$8.99 (Free over $100)</td></tr>
          <tr><td>Express</td><td>2–3 business days</td><td>$18.99</td></tr>
          <tr><td>Overnight</td><td>1 business day</td><td>$34.99</td></tr>
        </tbody>
      </table>

      <h2>International Shipping</h2>
      <p>We ship to the following countries:</p>
      <ul>
        <li>United Kingdom — 7–14 business days</li>
        <li>Canada — 7–12 business days</li>
        <li>Australia — 10–18 business days</li>
        <li>UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman, Iraq — 10–20 business days</li>
      </ul>
      <p>
        International shipping costs are calculated at checkout based on weight and destination.
        International orders may be subject to customs duties and taxes, which are the
        responsibility of the recipient.
      </p>

      <h2>Order Tracking</h2>
      <p>
        Once your order ships, you will receive a confirmation email with a tracking number.
        You can track your order directly through your account dashboard or the carrier&apos;s website.
      </p>

      <h2>Lost or Damaged Packages</h2>
      <p>
        If your package is lost or arrives damaged, please contact us at support@ithar.co within
        7 days of the expected delivery date. We will work with the carrier to resolve the issue.
      </p>

      <h2>Address Accuracy</h2>
      <p>
        Please ensure your shipping address is accurate at checkout. ITHAR is not responsible for
        orders shipped to incorrect addresses provided by the customer.
      </p>
    </LegalLayout>
  )
}
