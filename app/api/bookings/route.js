import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

// To support local dev without Postgres yet, we optionally fallback (for safety)
export async function GET() {
  try {
    if (!process.env.DATABASE_URL) return NextResponse.json([]); // Fallback during local dev transition
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT * FROM Booking ORDER BY date ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!process.env.DATABASE_URL) throw new Error("No database connected");
    const data = await request.json()
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      INSERT INTO Booking (date, "timeSlot", description, "isBooked") 
      VALUES (${data.date}, ${data.timeSlot}, ${data.description || ''}, true) 
      RETURNING *
    `;
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    if (!process.env.DATABASE_URL) throw new Error("No database connected");
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id'))
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    
    const sql = neon(process.env.DATABASE_URL);
    await sql`DELETE FROM Booking WHERE id = ${id}`;
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}
