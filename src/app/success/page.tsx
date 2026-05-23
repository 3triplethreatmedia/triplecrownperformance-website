import Link from 'next/link'
import { Stripe } from 'stripe'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  return (
    <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ color: 'var(--accent-primary)', fontSize: '3rem', marginBottom: '1rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Thank you for your purchase. We are processing your order and will send you an email confirmation shortly.
        </p>
        <Link href="/account" className="btn-primary" style={{ display: 'inline-block' }}>
          View Order in Account
        </Link>
      </div>
    </div>
  )
}
