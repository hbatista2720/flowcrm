import { NextRequest, NextResponse } from 'next/server'
import { whatsappClient } from '@/lib/whatsapp/client'

export async function POST(request: NextRequest) {
  try {
    if (whatsappClient.isReady) {
      await whatsappClient.disconnect()
    }
    
    // Inicializar cliente
    await whatsappClient.initialize()

    return NextResponse.json({ 
      success: true, 
      message: 'WhatsApp inicializado' 
    })
  } catch (error) {
    console.error('Error conectando WhatsApp:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Error al conectar WhatsApp' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    connected: whatsappClient.isReady,
    status: whatsappClient.isReady ? 'connected' : 'disconnected'
  })
}