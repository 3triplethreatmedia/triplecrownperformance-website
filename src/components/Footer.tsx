import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-title">TRIPLE CROWN</span>
          <span className="footer-subtitle">PERFORMANCE</span>
          <p className="footer-description">Premium aftermarket wheels for sports cars and trucks.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Shop</h3>
            <Link href="/wheels/truck">Truck Wheels</Link>
            <Link href="/wheels/sports">Sports Car Wheels</Link>
            <Link href="/accessories">Accessories</Link>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <Link href="/contact">Contact Us</Link>
            <Link href="/shipping">Shipping Policy</Link>
            <Link href="/returns">Returns</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Triple Crown Performance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
