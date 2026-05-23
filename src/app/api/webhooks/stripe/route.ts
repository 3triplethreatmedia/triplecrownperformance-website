import { NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// We use the Service Role key here because webhooks operate entirely on the backend
// and bypass Row Level Security to securely write the order data.
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('Stripe-Signature') as string

  let event

  try {
    // 1. Verify the webhook signature to ensure it actually came from Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // 2. Handle the successful checkout event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any

    const productId = session.metadata?.productId
    const customerEmail = session.customer_details?.email
    const amountTotal = session.amount_total ? session.amount_total / 100 : 0
    const stripeCheckoutSessionId = session.id

    // We will attempt to find a user with this email to link the order
    let userId = null
    if (customerEmail) {
      const { data: users, error: userError } = await supabase.auth.admin.listUsers()
      if (!userError && users) {
         const user = users.users.find(u => u.email === customerEmail)
         if (user) userId = user.id
      }
    }

    try {
      // 3. Inject the order into the Supabase 'orders' table
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId, // Null if guest checkout
          status: 'pending',
          total_amount: amountTotal,
          stripe_checkout_session_id: stripeCheckoutSessionId,
          shipping_address: session.shipping_details?.address || {},
        })
        .select()
        .single()

      if (orderError) throw new Error(`Failed to create order: ${orderError.message}`)

      // 4. Inject the line items into 'order_items' table
      if (productId) {
        const { error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: productId,
            quantity: 1,
            unit_price: amountTotal,
          })

        if (itemError) throw new Error(`Failed to create order item: ${itemError.message}`)
      }

      console.log(`Successfully processed order ${order.id} for ${customerEmail}`)
    } catch (err: any) {
      console.error('Database injection failed:', err.message)
      return new NextResponse(`Database Error: ${err.message}`, { status: 500 })
    }
  }

  // 5. Acknowledge receipt of the event
  return new NextResponse('Webhook processed successfully', { status: 200 })
}
