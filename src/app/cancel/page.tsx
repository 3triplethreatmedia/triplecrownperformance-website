import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Cancelled</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Your checkout process was cancelled. Your card has not been charged.
        </p>
        <Link href="/wheels" className="btn-secondary" style={{ display: 'inline-block' }}>
          Return to Store
        </Link>
      </div>
    </div>
  )
}
