import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simulación de registro
    return NextResponse.json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      user: { 
        id: Date.now().toString(), 
        email: body.email, 
        name: body.name 
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Error en el registro' 
    }, { status: 500 })
  }
}