import type { Metadata } from 'next'
import { LegalLayout } from '@/components/layout/LegalLayout'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 2025">
      <p>
        ITHAR (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information
        when you visit ithar.co or make a purchase.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us when you:</p>
      <ul>
        <li>Create an account or place an order</li>
        <li>Subscribe to our newsletter or waitlist</li>
        <li>Contact us through our contact form</li>
        <li>Interact with our website</li>
      </ul>
      <p>
        This includes: name, email address, shipping address, phone number, and payment information
        (processed securely by Stripe — we never store card details).
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Send order confirmations and shipping updates</li>
        <li>Respond to your inquiries</li>
        <li>Send marketing communications (with your consent)</li>
        <li>Improve our website and services</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share your information with:
      </p>
      <ul>
        <li>Payment processors (Stripe) to process transactions</li>
        <li>Shipping carriers to fulfill your orders</li>
        <li>Email service providers (Resend) to send communications</li>
        <li>Analytics providers to improve our services</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        We use cookies to maintain your session, remember your cart, and analyze site traffic.
        You can disable cookies in your browser settings, though some features may not function properly.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain your personal data for as long as necessary to fulfill the purposes outlined in this
        policy, unless a longer retention period is required by law.
      </p>

      <h2>6. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>
      <p>To exercise these rights, contact us at privacy@ithar.co.</p>

      <h2>7. Security</h2>
      <p>
        We implement industry-standard security measures to protect your data. All payment processing
        is handled by Stripe (PCI DSS Level 1 compliant). However, no method of transmission over
        the internet is 100% secure.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy-related inquiries, contact us at privacy@ithar.co or through our{' '}
        <a href="/contact">contact form</a>.
      </p>
    </LegalLayout>
  )
}
