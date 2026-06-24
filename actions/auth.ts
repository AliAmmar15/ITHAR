'use server'

import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { sendEmail } from '@/lib/resend'
import { createElement } from 'react'
import crypto from 'crypto'

export async function registerUser(data: RegisterFormData) {
  const validated = registerSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: 'Invalid form data' }
  }

  try {
    const existing = await db.user.findUnique({ where: { email: validated.data.email } })
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    const hashedPassword = await bcrypt.hash(validated.data.password, 12)

    await db.user.create({
      data: {
        name: `${validated.data.firstName} ${validated.data.lastName}`,
        email: validated.data.email,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (err) {
    console.error('[Register error]', err)
    return { success: false, error: 'Failed to create account. Please try again.' }
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } })

    // Always return success to prevent email enumeration
    if (!user) return { success: true }

    // Delete any existing tokens
    await db.passwordResetToken.deleteMany({ where: { email } })

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await db.passwordResetToken.create({
      data: { email, token, expires },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`

    await sendEmail({
      to: email,
      subject: 'Reset Your ITHAR Password',
      react: null as any,
      text: `Reset your password: ${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, ignore this email.`,
    })

    return { success: true }
  } catch (err) {
    console.error('[Password reset error]', err)
    return { success: false, error: 'Failed to send reset email' }
  }
}
