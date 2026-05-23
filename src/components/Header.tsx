import Link from "next/link";
import { createClient } from '@/utils/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="header glass-panel">
      <div className="container header-content">
        <Link href="/" className="logo-container">
          <div className="logo-text">
            <span className="logo-title">TRIPLE CROWN</span>
            <span className="logo-subtitle">PERFORMANCE</span>
          </div>
        </Link>
        <nav className="nav-links">
          <Link href="/wheels">Wheels</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="header-actions">
          {user ? (
            <Link href="/account" className="cart-link">Account</Link>
          ) : (
            <Link href="/login" className="cart-link">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
