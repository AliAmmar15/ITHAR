import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text, Row, Column,
} from '@react-email/components'
import { formatPrice } from '@/lib/utils'

interface OrderItem {
  name: string
  variantName: string
  size: string
  quantity: number
  price: number
}

interface OrderConfirmationEmailProps {
  orderNumber: string
  customerName: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    addressLine1: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Order confirmed — {orderNumber}. Thank you, {customerName}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>ITHAR</Text>
            <Text style={badge}>Order Confirmed</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Thank you, {customerName}.</Heading>
            <Text style={paragraph}>
              Your order <strong style={{ color: '#EAE2D6' }}>{orderNumber}</strong> has been
              confirmed. We&apos;ll notify you when it ships.
            </Text>

            <Hr style={divider} />

            {/* Items */}
            <Text style={sectionLabel}>Order Summary</Text>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemMeta}>{item.variantName} / {item.size} × {item.quantity}</Text>
                </Column>
                <Column style={{ textAlign: 'right' }}>
                  <Text style={itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
                </Column>
              </Row>
            ))}

            <Hr style={divider} />

            {/* Totals */}
            <Row style={totalsRow}><Column><Text style={totalLabel}>Subtotal</Text></Column><Column style={{ textAlign: 'right' }}><Text style={totalValue}>{formatPrice(subtotal)}</Text></Column></Row>
            <Row style={totalsRow}><Column><Text style={totalLabel}>Shipping</Text></Column><Column style={{ textAlign: 'right' }}><Text style={totalValue}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</Text></Column></Row>
            <Row style={totalsRow}><Column><Text style={totalLabel}>Tax</Text></Column><Column style={{ textAlign: 'right' }}><Text style={totalValue}>{formatPrice(tax)}</Text></Column></Row>
            <Row style={{ ...totalsRow, borderTop: '1px solid #252525', paddingTop: '12px' }}>
              <Column><Text style={{ ...totalLabel, color: '#EAE2D6', fontWeight: '600' }}>Total</Text></Column>
              <Column style={{ textAlign: 'right' }}><Text style={{ ...totalValue, color: '#B89A67', fontWeight: '600' }}>{formatPrice(total)}</Text></Column>
            </Row>

            <Hr style={divider} />

            {/* Shipping address */}
            <Text style={sectionLabel}>Shipping To</Text>
            <Text style={addressText}>
              {shippingAddress.firstName} {shippingAddress.lastName}
              <br />
              {shippingAddress.addressLine1}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
              <br />
              {shippingAddress.country}
            </Text>

            <Hr style={divider} />

            <Section style={{ textAlign: 'center' }}>
              <Link href="https://ithar.co/account/orders" style={button}>
                View Order
              </Link>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={arabicQuote} dir="rtl">إيثار</Text>
            <Text style={footerText}>
              Questions? Reply to this email or contact{' '}
              <Link href="mailto:support@ithar.co" style={link}>support@ithar.co</Link>
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
const logoText = { color: '#B89A67', fontSize: '22px', fontWeight: '300', letterSpacing: '0.3em', margin: '0 0 8px', textAlign: 'center' as const }
const badge = { color: '#27AE60', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0', textAlign: 'center' as const }
const content = { padding: '48px' }
const h1 = { color: '#EAE2D6', fontSize: '24px', fontWeight: '300', margin: '0 0 16px' }
const paragraph = { color: '#9B9189', fontSize: '14px', lineHeight: '1.7', margin: '0 0 16px' }
const divider = { borderColor: '#252525', margin: '28px 0' }
const sectionLabel = { color: '#6B6460', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 12px' }
const itemRow = { marginBottom: '12px' }
const itemName = { color: '#EAE2D6', fontSize: '13px', margin: '0 0 2px' }
const itemMeta = { color: '#6B6460', fontSize: '11px', margin: '0' }
const itemPrice = { color: '#9B9189', fontSize: '13px', margin: '0', textAlign: 'right' as const }
const totalsRow = { marginBottom: '8px' }
const totalLabel = { color: '#9B9189', fontSize: '13px', margin: '0' }
const totalValue = { color: '#9B9189', fontSize: '13px', margin: '0', textAlign: 'right' as const }
const addressText = { color: '#9B9189', fontSize: '13px', lineHeight: '1.6', margin: '0' }
const button = { backgroundColor: '#B89A67', color: '#0B0B0B', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' as const, textDecoration: 'none', padding: '12px 32px', display: 'inline-block' }
const footer = { backgroundColor: '#111111', padding: '24px 48px', borderTop: '1px solid #1A1A1A', textAlign: 'center' as const }
const arabicQuote = { color: '#B89A67', fontSize: '18px', margin: '0 0 12px', opacity: 0.5 }
const footerText = { color: '#555555', fontSize: '11px', margin: '0' }
const link = { color: '#B89A67', textDecoration: 'none' }
