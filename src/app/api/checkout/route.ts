import { NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, price, name, image } = body

    // 1. Validate the incoming data
    if (!productId || !price || !name) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 })
    }

    // 2. Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
              images: image ? [image] : [],
            },
            unit_amount: Math.round(price * 100), // Stripe expects amounts in cents
          },
          quantity: 1, // Defaulting to 1 set of wheels for now
        },
      ],
      mode: 'payment',
      // Pass the productId in the metadata so we can write it to the database during the webhook
      metadata: {
        productId: productId,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cancel`,
    })

    // 3. Return the session URL so the frontend can redirect the user
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
