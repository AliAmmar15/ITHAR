import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function createStripeCheckoutSession({
  lineItems,
  successUrl,
  cancelUrl,
  customerEmail,
  metadata,
  coupon,
}: {
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  metadata?: Record<string, string>
  coupon?: string
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
    metadata,
    discounts: coupon ? [{ coupon }] : undefined,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'AE', 'SA', 'KW', 'QA', 'BH', 'OM', 'IQ'],
    },
    billing_address_collection: 'required',
    payment_intent_data: {
      metadata: metadata ?? {},
    },
    allow_promotion_codes: !coupon,
    phone_number_collection: { enabled: true },
  })

  return session
}

export async function retrieveCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent', 'line_items.data.price.product'],
  })
}

export function constructWebhookEvent(payload: string | Buffer, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}
