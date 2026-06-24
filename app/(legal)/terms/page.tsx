import type { Metadata } from 'next'
import { LegalLayout } from '@/components/layout/LegalLayout'

export const metadata: Metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 2025">
      <p>
        By accessing or using ithar.co, you agree to be bound by these Terms of Service.
        Please read them carefully before using our website or making a purchase.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using this website, you confirm that you are at least 18 years of age, or have the
        consent of a parent or guardian, and agree to these terms in full.
      </p>

      <h2>2. Products and Pricing</h2>
      <ul>
        <li>All prices are listed in USD unless otherwise stated</li>
        <li>We reserve the right to change prices at any time without notice</li>
        <li>Product descriptions and images are as accurate as possible, but may vary slightly</li>
        <li>We reserve the right to limit quantities and cancel orders at our discretion</li>
      </ul>

      <h2>3. Orders and Payment</h2>
      <p>
        By placing an order, you warrant that the information you provide is accurate and complete.
        All orders are subject to acceptance and availability. Payment is required at time of purchase.
        We use Stripe for secure payment processing.
      </p>

      <h2>4. Shipping and Delivery</h2>
      <p>
        Shipping times are estimates only and are not guaranteed. ITHAR is not responsible for delays
        caused by shipping carriers, customs, or events outside our control.
      </p>

      <h2>5. Returns and Refunds</h2>
      <p>
        Please refer to our <a href="/returns">Returns Policy</a> for full details on returns
        and exchanges.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on ithar.co — including logos, images, text, and design — is the property of
        ITHAR and protected by copyright law. You may not reproduce, distribute, or create
        derivative works without written permission.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        ITHAR shall not be liable for any indirect, incidental, special, or consequential damages
        arising from your use of our website or products. Our liability is limited to the amount
        paid for the product in question.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These terms are governed by and construed in accordance with applicable law.
        Any disputes shall be resolved through good-faith negotiation, and if necessary,
        through binding arbitration.
      </p>

      <h2>9. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the website
        following any changes constitutes acceptance of the new terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions about these terms, contact us at legal@ithar.co.
      </p>
    </LegalLayout>
  )
}
