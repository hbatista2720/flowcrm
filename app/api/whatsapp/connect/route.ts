import { NextRequest, NextResponse } from 'next/server'
import { whatsappClient } from '@/lib/whatsapp/client'
import { handleIncomingMessage } from '@/lib/whatsapp/messageHandler'

export async function POST(request: NextRequest) {
  try {
    if (whatsappClient.isReady) {
      await whatsappClient.disconnect()
    }
    
    // Configurar manejo de mensajes entrantes
    whatsappClient.onMessage(async (message) => {
      console.log('Mensaje recibido:', message.body)
      
      // Generar respuesta del agente IA
      const response = handleIncomingMessage(message)
      
      // Enviar respuesta automática
      try {
        await whatsappClient.sendMessage(message.from, response)
        console.log('Respuesta enviada:', response)
      } catch (error) {
        console.error('Error enviando respuesta:', error)
      }
    })
    
    // Inicializar cliente
    await whatsappClient.initialize()

    return NextResponse.json({ 
      success: true, 
      message: 'WhatsApp inicializado con agente IA' 
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