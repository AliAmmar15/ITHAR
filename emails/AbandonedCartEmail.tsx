import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text,
} from '@react-email/components'
import { formatPrice } from '@/lib/utils'

interface AbandonedCartEmailProps {
  customerName: string
  items: { name: string; size: string; price: number; imageUrl?: string }[]
  cartUrl: string
  totalValue: number
}

export function AbandonedCartEmail({
  customerName,
  items,
  cartUrl,
  totalValue,
}: AbandonedCartEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You left something behind, {customerName} — your cart is waiting.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>ITHAR</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Your cart is waiting, {customerName}.</Heading>
            <Text style={paragraph}>
              You left something behind. The pieces you selected are ready — and so are we.
            </Text>

            <Hr style={divider} />

            {/* Cart items */}
            {items.map((item, i) => (
              <Section key={i} style={itemRow}>
                <Text style={itemName}>{item.name}</Text>
                <Text style={itemMeta}>Size: {item.size} — {formatPrice(item.price)}</Text>
              </Section>
            ))}

            <Text style={totalText}>Cart Total: <strong style={{ color: '#B89A67' }}>{formatPrice(totalValue)}</strong></Text>

            <Hr style={divider} />

            <Text style={arabicLine} dir="rtl">
              من كنت مولاه فهذا علي مولاه
            </Text>
            <Text style={arabicSource}>— Ghadir Khumm</Text>

            <Hr style={divider} />

            <Text style={paragraph}>
              These pieces carry meaning beyond fabric. When you&apos;re ready to complete your order,
              your cart is right where you left it.
            </Text>

            <Section style={{ textAlign: 'center', margin: '32px 0' }}>
              <Link href={cartUrl} style={button}>Return to Cart</Link>
            </Section>

            <Text style={smallText}>
              If you have questions about sizing or the product,{' '}
              <Link href="mailto:support@ithar.co" style={link}>we&apos;re here to help</Link>.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>ITHAR — Clothing for the Risers.</Text>
            <Text style={footerUnsubscribe}>
              <Link href="{{unsubscribe_url}}" style={footerLink}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#0B0B0B', fontFamily: 'Inter, Arial, sans-serif' }
const container = { margin: '0 auto', maxWidth: '600px', backgroundColor: '#0B0B0B' }
const header = { backgroundColor: '#1A1A1A', padding: '32px 48px', textAlign: 'center' as const, borderBottom: '1px solid #252525' }
const logoText = { color: '#B89A67', fontSize: '22px', fontWeight: '300', letterSpacing: '0.3em', margin: '0', textAlign: 'center' as const }
const content = { padding: '48px' }
const h1 = { color: '#EAE2D6', fontSize: '24px', fontWeight: '300', margin: '0 0 16px' }
const paragraph = { color: '#9B9189', fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px' }
const divider = { borderColor: '#252525', margin: '28px 0' }
const itemRow = { borderBottom: '1px solid #1A1A1A', paddingBottom: '12px', marginBottom: '12px' }
const itemName = { color: '#EAE2D6', fontSize: '14px', margin: '0 0 2px' }
const itemMeta = { color: '#6B6460', fontSize: '12px', margin: '0' }
const totalText = { color: '#9B9189', fontSize: '14px', margin: '16px 0 0' }
const arabicLine = { color: '#B89A67', fontSize: '20px', textAlign: 'center' as const, lineHeight: '1.8', margin: '0 0 8px', opacity: 0.7 }
const arabicSource = { color: '#555555', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, textAlign: 'center' as const, margin: '0' }
const button = { backgroundColor: '#B89A67', color: '#0B0B0B', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' as const, textDecoration: 'none', padding: '14px 40px', display: 'inline-block' }
const smallText = { color: '#6B6460', fontSize: '12px', lineHeight: '1.6', margin: '0' }
const footer = { backgroundColor: '#111111', padding: '24px 48px', borderTop: '1px solid #1A1A1A', textAlign: 'center' as const }
const footerText = { color: '#555555', fontSize: '11px', margin: '0 0 8px' }
const footerUnsubscribe = { margin: '0' }
const footerLink = { color: '#3A3A3A', fontSize: '10px', textDecoration: 'underline' }
const link = { color: '#B89A67', textDecoration: 'none' }
