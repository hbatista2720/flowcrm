import { NextRequest, NextResponse } from 'next/server'

const mockConversations = [
  {
    id: '1',
    contactName: 'Juan Pérez',
    phone: '+52 555 123 4567',
    email: 'juan@email.com',
    lastMessage: 'Hola, me interesa información sobre sus servicios...',
    timestamp: '2024-01-15T10:30:00Z',
    unreadCount: 2,
    status: 'pending',
    source: 'whatsapp',
    messages: [
      {
        id: '1',
        text: 'Hola, me interesa información sobre sus servicios',
        timestamp: '2024-01-15T10:25:00Z',
        isFromUser: true
      },
      {
        id: '2',
        text: '¡Hola! Gracias por contactarnos. ¿En qué tipo de servicio estás interesado?',
        timestamp: '2024-01-15T10:26:00Z',
        isFromUser: false
      }
    ]
  },
  {
    id: '2',
    contactName: 'María García',
    phone: '+52 555 987 6543',
    lastMessage: 'Perfecto, ¿cuándo podemos agendar una reunión?',
    timestamp: '2024-01-15T09:15:00Z',
    unreadCount: 0,
    status: 'active',
    source: 'email',
    messages: []
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    conversations: mockConversations,
    total: mockConversations.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const { conversationId, message } = await request.json()

    if (!conversationId || !message) {
      return NextResponse.json({
        success: false,
        error: 'ID de conversación y mensaje son requeridos'
      }, { status: 400 })
    }

    // Simular envío de mensaje
    const newMessage = {
      id: `msg_${Date.now()}`,
      text: message,
      timestamp: new Date().toISOString(),
      isFromUser: false
    }

    return NextResponse.json({
      success: true,
      message: newMessage
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error enviando mensaje'
    }, { status: 500 })
  }
}