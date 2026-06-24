'use server'

import { db } from '@/lib/db'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { sendEmail } from '@/lib/resend'

export async function sendContactMessage(data: ContactFormData) {
  const validated = contactSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: 'Invalid form data' }
  }

  try {
    await db.contactMessage.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        subject: validated.data.subject,
        message: validated.data.message,
      },
    })

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `[ITHAR Contact] ${validated.data.subject}`,
        react: null as any,
        text: `From: ${validated.data.name} <${validated.data.email}>\n\n${validated.data.message}`,
      }).catch(console.error)
    }

    return { success: true }
  } catch (err) {
    console.error('[Contact message error]', err)
    return { success: false, error: 'Failed to send message' }
  }
}
