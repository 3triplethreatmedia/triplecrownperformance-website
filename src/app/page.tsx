import Link from "next/link";

export default function Home() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">UNCOMPROMISING <br/><span className="text-accent">PERFORMANCE.</span></h1>
          <p className="hero-subtitle">
            Premium aftermarket wheels forged for the world's most elite sports cars and rugged trucks.
          </p>
          <div className="hero-actions">
            <Link href="/wheels" className="btn-primary">
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features-preview">
        <div className="container">
          <h2>Engineered for Excellence</h2>
          <p className="features-text">
            Every Triple Crown Performance wheel is meticulously crafted using aerospace-grade aluminum to provide the ultimate balance of strength, weight, and stunning aesthetics.
          </p>
        </div>
      </section>
    </div>
  );
}
