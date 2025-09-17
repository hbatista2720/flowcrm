import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simulación de login
    if (body.email === 'admin@flowcrm.com' && body.password === 'admin123') {
      return NextResponse.json({ 
        success: true, 
        user: { id: '1', email: 'admin@flowcrm.com', name: 'Admin' }
      })
    }
    
    return NextResponse.json({ success: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}