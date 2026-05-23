import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="account-page container">
      <div className="account-header">
        <h1 className="account-title">Client Portal</h1>
        <p className="account-subtitle">
          Signed in as: <span className="text-accent">{user.email}</span>
        </p>
      </div>

      <div className="order-history glass-panel">
        <h2 className="section-title">Order History</h2>
        <div className="order-list-empty">
          <p>You haven't placed any orders yet.</p>
          <a href="/wheels" className="btn-secondary">Browse Collection</a>
        </div>
      </div>
    </div>
  )
}
