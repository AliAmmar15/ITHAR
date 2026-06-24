'use server'

import { db } from '@/lib/db'
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations'
import { sendEmail } from '@/lib/resend'
import { createElement } from 'react'
import { revalidatePath } from 'next/cache'

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

    // Send waitlist confirmation email
    try {
      const { WaitlistEmail } = await import('@/emails/WaitlistEmail')
      await sendEmail({
        to: member.email,
        subject: `You're #${member.position} on the ITHAR Waitlist`,
        react: createElement(WaitlistEmail, {
          name: member.firstName ?? 'Riser',
          position: member.position,
          size: member.size,
        }),
      })
    } catch (emailErr) {
      console.error('[Waitlist email error]', emailErr)
    }

    revalidatePath('/')
    return { success: true, position: member.position }
  } catch (err) {
    console.error('[Waitlist join error]', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
