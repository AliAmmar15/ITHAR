import {
  Body, Container, Head, Heading, Hr, Html, Img,
  Link, Preview, Section, Text, Row, Column,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ITHAR — Clothing for the Risers.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>ITHAR</Text>
            <Text style={logoArabic}>إيثار</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Welcome, {name}.</Heading>
            <Text style={paragraph}>
              You&apos;re now part of the ITHAR family — a community built on the values of
              loyalty, sacrifice, and devotion.
            </Text>
            <Text style={paragraph}>
              Your account has been created. You now have access to your order history,
              saved addresses, and exclusive member benefits.
            </Text>

            <Hr style={divider} />

            <Text style={arabicQuote} dir="rtl">
              من كنت مولاه فهذا علي مولاه
            </Text>
            <Text style={quoteSource}>— Ghadir Khumm, 10 AH</Text>

            <Hr style={divider} />

            <Section style={buttonSection}>
              <Link href="https://ithar.co/shop" style={button}>
                Explore the Collection
              </Link>
            </Section>

            <Text style={paragraph}>
              If you have any questions, reply to this email or reach us at{' '}
              <Link href="mailto:support@ithar.co" style={link}>support@ithar.co</Link>.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>ITHAR — Clothing for the Risers.</Text>
            <Text style={footerLinks}>
              <Link href="https://ithar.co/shop" style={footerLink}>Shop</Link>
              {' · '}
              <Link href="https://ithar.co/about" style={footerLink}>About</Link>
              {' · '}
              <Link href="https://ithar.co/contact" style={footerLink}>Contact</Link>
            </Text>
            <Text style={footerSmall}>
              You received this email because you created an account at ithar.co.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#0B0B0B', fontFamily: 'Inter, Arial, sans-serif' }

const container = {
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  backgroundColor: '#0B0B0B',
}

const header = {
  backgroundColor: '#1A1A1A',
  padding: '40px 48px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #252525',
}

const logoText = {
  color: '#B89A67',
  fontSize: '28px',
  fontWeight: '300',
  letterSpacing: '0.3em',
  margin: '0 0 4px',
  textAlign: 'center' as const,
}

const logoArabic = {
  color: '#B89A67',
  fontSize: '20px',
  margin: '0',
  textAlign: 'center' as const,
  direction: 'rtl' as const,
  opacity: 0.6,
}

const content = { padding: '48px' }

const h1 = {
  color: '#EAE2D6',
  fontSize: '28px',
  fontWeight: '300',
  letterSpacing: '-0.5px',
  margin: '0 0 24px',
  lineHeight: '1.2',
}

const paragraph = {
  color: '#9B9189',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 20px',
}

const divider = { borderColor: '#252525', margin: '32px 0' }

const arabicQuote = {
  color: '#B89A67',
  fontSize: '22px',
  textAlign: 'center' as const,
  lineHeight: '1.8',
  margin: '0 0 8px',
  direction: 'rtl' as const,
}

const quoteSource = {
  color: '#555555',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: '0',
}

const buttonSection = { textAlign: 'center' as const, margin: '32px 0' }

const button = {
  backgroundColor: '#B89A67',
  color: '#0B0B0B',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  padding: '14px 40px',
  display: 'inline-block',
}

const link = { color: '#B89A67', textDecoration: 'underline' }

const footer = {
  backgroundColor: '#111111',
  padding: '32px 48px',
  borderTop: '1px solid #1A1A1A',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#555555',
  fontSize: '12px',
  letterSpacing: '0.1em',
  margin: '0 0 12px',
}

const footerLinks = { margin: '0 0 16px' }

const footerLink = {
  color: '#555555',
  fontSize: '11px',
  textDecoration: 'none',
}

const footerSmall = {
  color: '#3A3A3A',
  fontSize: '10px',
  margin: '0',
  lineHeight: '1.5',
}
