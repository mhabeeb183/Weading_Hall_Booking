import { NextResponse } from 'next/server'

export async function POST(request) {
  const { password } = await request.json()
  
  // Simple password check for admin portal
  if (password === 'admin123') {
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ success: false }, { status: 401 })
}
