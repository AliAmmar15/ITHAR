import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text,
} from '@react-email/components'

interface WaitlistEmailProps {
  name: string
  position: number
  size?: string | null
}

export function WaitlistEmail({ name, position, size }: WaitlistEmailProps) {
  const isFounder = position <= 313

  return (
    <Html>
      <Head />
      <Preview>{`You're #${position} on the ITHAR Waitlist — The Wilayah Hoodie drops soon.`}</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>ITHAR</Text>
            <Text style={logoArabic}>&#x625;&#x64A;&#x62B;&#x627;&#x631;</Text>
          </Section>

          {/* Position badge */}
          <Section style={badgeSection}>
            <Text style={badgeLabel}>YOUR POSITION</Text>
            <Text style={badgeNumber}>#{position}</Text>
            {isFounder && (
              <Text style={founderTag}>&#x2605; Founding Member</Text>
            )}
          </Section>

          {/* Body */}
          <Section style={content}>
            <Heading style={h1}>You&apos;re in, {name}.</Heading>

            <Text style={paragraph}>
              Welcome to the ITHAR Waitlist. You&apos;re among the first to know when
              The Wilayah Hoodie drops — Season 01 of The Risers Collection.
            </Text>

            {isFounder && (
              <Text style={highlightBox}>
                As one of the first 313 to join, you&apos;re a <strong style={{ color: '#B89A67' }}>Founding Member</strong>.
                You&apos;ll receive priority access before the public drop, along with exclusive founding benefits.
              </Text>
            )}

            {size && (
              <Text style={paragraph}>
                We&apos;ve noted your preferred size: <strong style={{ color: '#EAE2D6' }}>{size}</strong>.
                We&apos;ll do our best to reserve stock for waitlist members.
              </Text>
            )}

            <Hr style={divider} />

            <Text style={arabicQuote} dir="rtl">
              إِنَّ مَعَ الْعُسْرِ يُسْرًا
            </Text>
            <Text style={quoteSource}>Verily, with hardship comes ease. — Quran 94:6</Text>

            <Hr style={divider} />

            <Text style={paragraph}>
              We&apos;ll email you the moment the drop goes live. Until then, follow us on
              Instagram for behind-the-scenes previews.
            </Text>

            <Section style={buttonSection}>
              <Link href="https://instagram.com/ithar_store" style={button}>
                Follow @ithar_store
              </Link>
            </Section>

            <Text style={paragraph}>
              Questions? Reply to this email or reach us at{' '}
              <Link href="mailto:support@ithar.store" style={link}>support@ithar.store</Link>.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>ITHAR — Clothing for the Risers.</Text>
            <Text style={footerSmall}>
              You received this because you joined the waitlist at ithar.store.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const main = { backgroundColor: '#0B0B0B', fontFamily: 'Inter, Arial, sans-serif' }

const container = {
  margin: '0 auto',
  maxWidth: '560px',
  backgroundColor: '#0B0B0B',
}

const header = {
  backgroundColor: '#111111',
  padding: '36px 48px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #1E1E1E',
}

const logoText = {
  color: '#B89A67',
  fontSize: '26px',
  fontWeight: '300',
  letterSpacing: '0.35em',
  margin: '0 0 4px',
  textAlign: 'center' as const,
}

const logoArabic = {
  color: '#B89A67',
  fontSize: '18px',
  margin: '0',
  textAlign: 'center' as const,
  opacity: 0.5,
}

const badgeSection = {
  backgroundColor: '#0F0F0F',
  padding: '40px 48px 32px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #1E1E1E',
}

const badgeLabel = {
  color: '#555',
  fontSize: '9px',
  letterSpacing: '0.25em',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
}

const badgeNumber = {
  color: '#B89A67',
  fontSize: '56px',
  fontWeight: '200',
  letterSpacing: '-2px',
  margin: '0',
  lineHeight: '1',
}

const founderTag = {
  color: '#B89A67',
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  margin: '12px 0 0',
  opacity: 0.8,
}

const content = { padding: '48px' }

const h1 = {
  color: '#EAE2D6',
  fontSize: '26px',
  fontWeight: '300',
  letterSpacing: '-0.3px',
  margin: '0 0 20px',
  lineHeight: '1.3',
}

const paragraph = {
  color: '#9B9189',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 20px',
}

const highlightBox = {
  color: '#9B9189',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '0 0 20px',
  padding: '16px 20px',
  borderLeft: '2px solid #B89A67',
  backgroundColor: '#111111',
}

const divider = { borderColor: '#1E1E1E', margin: '32px 0' }

const arabicQuote = {
  color: '#B89A67',
  fontSize: '20px',
  textAlign: 'center' as const,
  lineHeight: '1.8',
  margin: '0 0 8px',
  opacity: 0.8,
}

const quoteSource = {
  color: '#444',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: '0',
}

const buttonSection = { textAlign: 'center' as const, margin: '32px 0' }

const button = {
  backgroundColor: '#B89A67',
  color: '#0B0B0B',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  padding: '14px 36px',
  display: 'inline-block',
}

const link = { color: '#B89A67', textDecoration: 'underline' }

const footer = {
  backgroundColor: '#080808',
  padding: '28px 48px',
  borderTop: '1px solid #161616',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#444',
  fontSize: '11px',
  letterSpacing: '0.1em',
  margin: '0 0 8px',
}

const footerSmall = {
  color: '#2A2A2A',
  fontSize: '10px',
  margin: '0',
  lineHeight: '1.5',
}
