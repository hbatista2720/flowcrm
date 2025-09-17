import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Auth endpoint' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Simulación de login
  if (body.email === 'admin@flowcrm.com' && body.password === 'admin123') {
    return NextResponse.json({ 
      success: true, 
      user: { id: '1', email: 'admin@flowcrm.com', name: 'Admin' }
    })
  }
  
  return NextResponse.json({ success: false }, { status: 401 })
}