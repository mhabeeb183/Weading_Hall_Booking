'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  
  // Form State
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (9 AM - 3 PM)');
  const [description, setDescription] = useState('');

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error("API returned non-array:", data);
          setBookings([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setBookings([]);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ date, timeSlot, description }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      alert('Booking saved!');
      setDate('');
      setDescription('');
      fetchBookings();
    }
  };

  const handleDeleteBooking = async (id) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await fetch(`/api/bookings?id=${id}`, { method: 'DELETE' });
      fetchBookings();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif', color: 'var(--color-royal-blue)' }}>Admin Login</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter admin password"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 className="mb-0">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 16px' }}>Logout</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Add Booking Form */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', alignSelf: 'start' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold)', paddingBottom: '0.5rem' }}>Add New Booking</h3>
            <form onSubmit={handleCreateBooking}>
              <div className="mb-4">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Time Slot</label>
                <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
                  <option value="Morning (9 AM - 3 PM)">Morning (9 AM - 3 PM)</option>
                  <option value="Evening (5 PM - 11 PM)">Evening (5 PM - 11 PM)</option>
                  <option value="Full Day">Full Day</option>
                </select>
              </div>
              <div className="mb-4">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description / Event Name</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  placeholder="e.g., nabi family wedding"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Mark as Booked</button>
            </form>
          </div>

          {/* Bookings List */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-gold)', paddingBottom: '0.5rem' }}>Upcoming Bookings</h3>
            {bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {bookings.map(booking => (
                  <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-royal-blue)' }}>
                        {format(new Date(booking.date + 'T00:00:00'), 'MMMM d, yyyy')}
                      </div>
                      <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.2rem' }}>{booking.timeSlot}</div>
                      {booking.description && (
                        <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#444', backgroundColor: '#f9f9f9', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                          "{booking.description}"
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="btn-secondary" 
                      style={{ backgroundColor: 'var(--color-error)', padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
