'use server'

import { db } from '@/lib/db'
import { newsletterSchema } from '@/lib/validations'

interface SubscribeInput {
  email: string
  firstName?: string
  source?: string
}

export async function subscribeToNewsletter(input: SubscribeInput) {
  const validated = newsletterSchema.safeParse(input)
  if (!validated.success) {
    return { success: false, error: 'Invalid email address' }
  }

  try {
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: validated.data.email },
    })

    if (existing) {
      return { success: true, message: 'Already subscribed' }
    }

    await db.newsletterSubscriber.create({
      data: {
        email: validated.data.email,
        firstName: input.firstName,
        source: input.source ?? 'footer',
        isConfirmed: true,
      },
    })

    return { success: true }
  } catch (err) {
    console.error('[Newsletter subscribe error]', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
