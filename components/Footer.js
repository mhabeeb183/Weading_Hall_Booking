export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-royal-blue)', color: 'var(--color-text-light)', padding: '3rem 0', textAlign: 'center', marginTop: '4rem' }}>
      <div className="container">
        <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>Nachiyar Mahal</h3>
        <p>Your premium wedding destination.</p>
        <p style={{ marginTop: '2rem', opacity: 0.7, fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Nachiyar Mahal. All rights reserved.</p>
      </div>
    </footer>
  );
}
