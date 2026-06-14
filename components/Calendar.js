'use client';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  
  useEffect(() => {
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
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const getBookingsForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return bookings.filter(b => b.date === formattedDate);
  };

  return (
    <section id="availability" className="py-8 container">
      <h2 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>Check Availability</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Calendar View */}
        <div style={{ flex: '1 1 400px', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button onClick={prevMonth} style={{ background: 'none', color: 'var(--color-royal-blue)' }}><ChevronLeft /></button>
            <h3 style={{ margin: 0 }}>{format(currentDate, 'MMMM yyyy')}</h3>
            <button onClick={nextMonth} style={{ background: 'none', color: 'var(--color-royal-blue)' }}><ChevronRight /></button>
          </div>
          
          <div className="calendar-grid-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map(day => {
              const dayBookings = getBookingsForDate(day);
              const isFullyBooked = dayBookings.length >= 2 || dayBookings.some(b => b.timeSlot === 'Full Day');
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              
              let statusText = 'Free';
              if (isFullyBooked) {
                statusText = 'Full';
              } else if (dayBookings.length === 1) {
                if (dayBookings[0].timeSlot.includes('Morning')) {
                  statusText = 'Eve Free';
                } else if (dayBookings[0].timeSlot.includes('Evening')) {
                  statusText = 'Morn Free';
                }
              }
              
              return (
                <div 
                  key={day.toString()} 
                  onClick={() => setSelectedDate(day)}
                  style={{
                    padding: '10px 0',
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? 'var(--color-gold)' : isFullyBooked ? '#ffebee' : '#f0f8ff',
                    color: isSelected ? '#fff' : isFullyBooked ? 'var(--color-error)' : 'var(--color-text-dark)',
                    border: isSelected ? '2px solid var(--color-royal-blue)' : '2px solid transparent',
                    fontWeight: isSelected || isFullyBooked ? 600 : 400
                  }}
                >
                  <span className="calendar-day-text">{format(day, 'd')}</span>
                  <div className="calendar-status-text" style={{ fontSize: '0.7rem', marginTop: '4px', lineHeight: '1.2' }}>
                    {statusText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details View */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-gold)' }}>
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a Date'}
          </h3>
          
          {selectedDate ? (
            <div>
              {['Morning (9 AM - 3 PM)', 'Evening (5 PM - 11 PM)'].map(slot => {
                const booking = getBookingsForDate(selectedDate).find(b => b.timeSlot === slot);
                return (
                  <div key={slot} style={{ 
                    padding: '1rem', 
                    marginBottom: '1rem', 
                    borderRadius: '4px',
                    borderLeft: `4px solid ${booking ? 'var(--color-error)' : 'var(--color-success)'}`,
                    backgroundColor: booking ? '#fff0f0' : '#f0fff0'
                  }}>
                    <div style={{ fontWeight: 600 }}>{slot}</div>
                    <div style={{ color: booking ? 'var(--color-error)' : 'var(--color-success)', marginTop: '4px' }}>
                      {booking ? 'Booked' : 'Available'}
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff8e1', borderRadius: '8px', border: '1px solid #ffecb3', textAlign: 'center' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#8d6e63' }}>
                  <strong>To book a slot:</strong><br/>Please contact the mahal administration directly.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="https://wa.me/916369404850" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', padding: '10px 20px', borderRadius: '30px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a href="tel:6369404850" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-royal-blue)', color: '#fff', padding: '10px 20px', borderRadius: '30px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(0, 51, 102, 0.3)' }}>
                    <Phone size={20} />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ color: '#666' }}>Click on any date in the calendar to see available time slots.</p>
          )}
        </div>
      </div>
    </section>
  );
}
