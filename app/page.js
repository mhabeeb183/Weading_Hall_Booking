import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Calendar from '@/components/Calendar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(rgba(10, 25, 47, 0.7), rgba(10, 25, 47, 0.7)), url("/images/mahal-4.jpg") center/cover no-repeat',
        backgroundColor: 'var(--color-royal-blue)', /* Fallback if image not found */
        color: 'var(--color-text-light)',
        padding: '0 20px'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--color-gold)', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Nachiyar Mahal
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            A premium destination for your dream wedding. Experience elegance, spacious seating, and world-class amenities.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="#availability" className="btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
              Check Availability
            </Link>
            <Link href="#gallery" className="btn-secondary" style={{ padding: '12px 32px', fontSize: '1.1rem', backgroundColor: 'transparent', border: '2px solid var(--color-gold)', color: 'var(--color-gold)' }}>
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <Gallery />
      
      <div style={{ backgroundColor: '#f9f9f9' }}>
        <Calendar />
      </div>
      
      <Footer />
    </>
  );
}
