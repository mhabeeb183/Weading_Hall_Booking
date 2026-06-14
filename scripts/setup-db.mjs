import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set!');
    process.exit(1);
  }

  console.log('Connecting to cloud DB...');
  const sql = neon(process.env.DATABASE_URL);

  await sql\CREATE TABLE IF NOT EXISTS Booking (
      id SERIAL PRIMARY KEY,
      date TEXT NOT NULL,
      \"timeSlot\" TEXT NOT NULL,
      description TEXT,
      \"isBooked\" BOOLEAN NOT NULL DEFAULT true,
      \"createdAt\" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );\;

  console.log('Success!');
  process.exit(0);
}

main().catch(console.error);
