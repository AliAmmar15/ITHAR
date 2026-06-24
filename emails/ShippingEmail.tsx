import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text,
} from '@react-email/components'

interface ShippingEmailProps {
  orderNumber: string
  customerName: string
  trackingNumber: string
  trackingUrl: string
  carrier: string
  estimatedDelivery: string
}

export function ShippingEmail({
  orderNumber,
  customerName,
  trackingNumber,
  trackingUrl,
  carrier,
  estimatedDelivery,
}: ShippingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your ITHAR order is on its way — {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>ITHAR</Text>
            <Text style={badge}>Your Order Has Shipped</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>On its way, {customerName}.</Heading>
            <Text style={paragraph}>
              Your order <strong style={{ color: '#EAE2D6' }}>{orderNumber}</strong> has shipped
              and is on its way to you.
            </Text>

            <Hr style={divider} />

            <Section style={trackingBox}>
              <Text style={trackingLabel}>Tracking Number</Text>
              <Text style={trackingNumber_}>{trackingNumber}</Text>
              <Text style={trackingCarrier}>{carrier}</Text>
              <Text style={trackingEta}>Estimated Delivery: {estimatedDelivery}</Text>
              <Link href={trackingUrl} style={button}>Track Your Order</Link>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              Once your order arrives, we&apos;d love to see it on you. Tag us{' '}
              <Link href="https://instagram.com/itharclothing" style={link}>@itharclothing</Link>{' '}
              on Instagram.
            </Text>

            <Text style={arabicCta} dir="rtl">
              من كنت مولاه فهذا علي مولاه
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Need help? <Link href="mailto:support@ithar.co" style={link}>support@ithar.co</Link>
            </Text>
            <Text style={footerBrand}>ITHAR — Clothing for the Risers.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#0B0B0B', fontFamily: 'Inter, Arial, sans-serif' }
const container = { margin: '0 auto', maxWidth: '600px', backgroundColor: '#0B0B0B' }
const header = { backgroundColor: '#1A1A1A', padding: '32px 48px', textAlign: 'center' as const, borderBottom: '1px solid #252525' }
const logoText = { color: '#B89A67', fontSize: '22px', fontWeight: '300', letterSpacing: '0.3em', margin: '0 0 8px', textAlign: 'center' as const }
const badge = { color: '#3B82F6', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0', textAlign: 'center' as const }
const content = { padding: '48px' }
const h1 = { color: '#EAE2D6', fontSize: '24px', fontWeight: '300', margin: '0 0 16px' }
const paragraph = { color: '#9B9189', fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px' }
const divider = { borderColor: '#252525', margin: '28px 0' }
const trackingBox = { backgroundColor: '#1A1A1A', padding: '28px', border: '1px solid #252525', textAlign: 'center' as const }
const trackingLabel = { color: '#6B6460', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 8px' }
const trackingNumber_ = { color: '#EAE2D6', fontSize: '18px', fontWeight: '600', fontFamily: 'monospace', letterSpacing: '0.05em', margin: '0 0 4px' }
const trackingCarrier = { color: '#6B6460', fontSize: '11px', margin: '0 0 8px' }
const trackingEta = { color: '#9B9189', fontSize: '13px', margin: '0 0 20px' }
const button = { backgroundColor: '#B89A67', color: '#0B0B0B', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' as const, textDecoration: 'none', padding: '12px 32px', display: 'inline-block' }
const arabicCta = { color: '#B89A67', fontSize: '20px', textAlign: 'center' as const, lineHeight: '1.8', margin: '24px 0 0', opacity: 0.5 }
const footer = { backgroundColor: '#111111', padding: '24px 48px', borderTop: '1px solid #1A1A1A', textAlign: 'center' as const }
const footerText = { color: '#555555', fontSize: '11px', margin: '0 0 8px' }
const footerBrand = { color: '#3A3A3A', fontSize: '10px', letterSpacing: '0.1em', margin: '0' }
const link = { color: '#B89A67', textDecoration: 'none' }
