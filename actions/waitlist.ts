'use server'

import { db } from '@/lib/db'
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations'
import { sendEmail } from '@/lib/resend'
import { createElement } from 'react'

export async function joinWaitlist(data: WaitlistFormData) {
  const validated = waitlistSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: 'Invalid form data' }
  }

  try {
    const existing = await db.waitlistMember.findUnique({
      where: { email: validated.data.email },
    })

    if (existing) {
      return { success: true, position: existing.position, message: 'Already on waitlist' }
    }

    const member = await db.waitlistMember.create({
      data: {
        email: validated.data.email,
        firstName: validated.data.firstName,
        lastName: validated.data.lastName,
        size: validated.data.size,
      },
    })

    // Send welcome email
    try {
      const { WelcomeEmail } = await import('@/emails/WelcomeEmail')
      await sendEmail({
        to: member.email,
        subject: 'You\'re on the ITHAR Waitlist',
        react: createElement(WelcomeEmail, { name: member.firstName ?? 'Riser' }),
      })
    } catch (emailErr) {
      console.error('[Waitlist email error]', emailErr)
    }

    return { success: true, position: member.position }
  } catch (err) {
    console.error('[Waitlist join error]', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
