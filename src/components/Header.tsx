import Link from "next/link";

export default function Header() {
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
          <Link href="/cart" className="cart-link">Cart (0)</Link>
        </div>
      </div>
    </header>
  );
}
