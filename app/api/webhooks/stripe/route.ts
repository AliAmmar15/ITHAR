import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { db } from '@/lib/db'
import { sendEmail } from '@/lib/resend'
import { createElement } from 'react'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = constructWebhookEvent(body, signature)
  } catch (err) {
    console.error('[Stripe webhook] Invalid signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent
        console.error('[Payment failed]', intent.id, intent.last_payment_error?.message)
        break
      }
    }
  } catch (err) {
    console.error('[Stripe webhook handler error]', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { orderNumber, userId, shippingMethodId } = session.metadata ?? {}

  if (!orderNumber) {
    console.error('[Webhook] Missing orderNumber in metadata')
    return
  }

  // Create order in DB
  const order = await db.order.create({
    data: {
      orderNumber,
      userId: userId || null,
      email: session.customer_email ?? session.customer_details?.email ?? '',
      status: 'CONFIRMED',
      subtotal: (session.amount_subtotal ?? 0) / 100,
      shippingCost: 0,
      tax: (session.total_details?.amount_tax ?? 0) / 100,
      total: (session.amount_total ?? 0) / 100,
      stripeSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id,
    },
  })

  // Create payment record
  await db.payment.create({
    data: {
      orderId: order.id,
      stripeId: typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? session.id,
      amount: (session.amount_total ?? 0) / 100,
      currency: session.currency ?? 'usd',
      status: 'SUCCEEDED',
    },
  })

  // Send order confirmation email
  try {
    const { OrderConfirmationEmail } = await import('@/emails/OrderConfirmationEmail')
    const customerName = session.customer_details?.name ?? 'Valued Customer'
    const addr = session.shipping_details?.address ?? session.customer_details?.address

    await sendEmail({
      to: session.customer_email ?? session.customer_details?.email ?? '',
      subject: `Order Confirmed — ${orderNumber}`,
      react: createElement(OrderConfirmationEmail, {
        orderNumber,
        customerName,
        items: [],
        subtotal: (session.amount_subtotal ?? 0) / 100,
        shipping: 0,
        tax: (session.total_details?.amount_tax ?? 0) / 100,
        total: (session.amount_total ?? 0) / 100,
        shippingAddress: {
          firstName: customerName.split(' ')[0] ?? '',
          lastName: customerName.split(' ').slice(1).join(' ') ?? '',
          addressLine1: addr?.line1 ?? '',
          city: addr?.city ?? '',
          state: addr?.state ?? '',
          postalCode: addr?.postal_code ?? '',
          country: addr?.country ?? '',
        },
      }),
    })
  } catch (err) {
    console.error('[Order confirmation email error]', err)
  }
}
