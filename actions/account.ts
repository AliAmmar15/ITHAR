'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
})

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export async function updateProfile(formData: unknown) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const parsed = updateProfileSchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { name: parsed.data.name },
    })
    revalidatePath('/account/settings')
    return { success: true }
  } catch {
    return { error: 'Failed to update profile' }
  }
}

export async function changePassword(formData: unknown) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const parsed = changePasswordSchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    })

    if (!user?.password) {
      return { error: 'Your account uses Google sign-in. Password cannot be changed here.' }
    }

    const isValid = await bcrypt.compare(parsed.data.currentPassword, user.password)
    if (!isValid) return { error: 'Current password is incorrect' }

    const hashed = await bcrypt.hash(parsed.data.newPassword, 12)
    await db.user.update({ where: { id: session.user.id }, data: { password: hashed } })

    return { success: true }
  } catch {
    return { error: 'Failed to change password' }
  }
}
