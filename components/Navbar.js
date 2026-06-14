import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: 'var(--color-royal-blue)', padding: '1rem 0', color: 'var(--color-text-light)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/">
          <h2 style={{ color: 'var(--color-gold)', margin: 0, fontSize: '1.5rem' }}>Nachiyar Mahal</h2>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/">Home</Link>
          <Link href="/#gallery">Gallery</Link>
          <Link href="/#availability">Availability</Link>
          <Link href="/admin" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Admin Login</Link>
        </div>
      </div>
    </nav>
  );
}
