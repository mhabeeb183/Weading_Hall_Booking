'use client';

export default function Gallery() {
  const images = [
    { src: '/images/mahal-1.jpg', alt: 'Mahal Interior Stage' },
    { src: '/images/mahal-2.jpg', alt: 'Mahal Seating Arrangement' },
    { src: '/images/mahal-3.jpg', alt: 'Mahal Exterior Night' },
    { src: '/images/mahal-4.jpg', alt: 'Mahal Exterior Day' },
  ];

  return (
    <section id="gallery" className="py-8" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <h2 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>Gallery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ 
              borderRadius: '8px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              aspectRatio: '4/3',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', opacity: 0.6, fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
                <p>Image Placeholder</p>
                <p>{img.alt}</p>
                <p style={{ fontSize: '0.7rem' }}>Add {img.src} to the public folder</p>
              </div>
              <img 
                src={img.src} 
                alt={img.alt} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
