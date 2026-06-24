import { Resend } from 'resend'

export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'ITHAR <noreply@ithar.co>'
export const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO ?? 'support@ithar.co'

function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendEmail({
  to,
  subject,
  react,
  text,
}: {
  to: string | string[]
  subject: string
  react: React.ReactElement
  text?: string
}) {
  const resend = getResend()
  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY not set — email skipped')
    return null
  }

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    to: Array.isArray(to) ? to : [to],
    subject,
    react,
    text,
  })

  if (error) {
    console.error('[Resend Error]', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
