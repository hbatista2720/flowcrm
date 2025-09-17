import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json()
    
    if (!to || !message) {
      return NextResponse.json({
        success: false,
        error: 'Número y mensaje son requeridos'
      }, { status: 400 })
    }

    // Simular envío de mensaje
    console.log(`Enviando mensaje a ${to}: ${message}`)
    
    // En producción aquí iría la lógica real de envío
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({
      success: true,
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error enviando mensaje'
    }, { status: 500 })
  }
}