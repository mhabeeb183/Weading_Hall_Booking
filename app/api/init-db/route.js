import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: 'No DATABASE_URL or POSTGRES_URL found. Please add a Neon Postgres database to your Vercel project first!' }, { status: 400 });
    }

    const sql = neon(dbUrl);

    await sql`CREATE TABLE IF NOT EXISTS Booking (
        id SERIAL PRIMARY KEY,
        date TEXT NOT NULL,
        "timeSlot" TEXT NOT NULL,
        description TEXT,
        "isBooked" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;

    return NextResponse.json({ success: true, message: 'Database table created successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
