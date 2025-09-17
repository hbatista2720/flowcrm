import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // En producción aquí se obtendría de la base de datos
    const conversation = {
      id: params.id,
      contactName: 'Juan Pérez',
      phone: '+52 555 123 4567',
      messages: [
        {
          id: '1',
          text: 'Hola, me interesa información sobre sus servicios',
          timestamp: '2024-01-15T10:25:00Z',
          isFromUser: true
        }
      ]
    }

    return NextResponse.json({
      success: true,
      conversation
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error obteniendo conversación'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()

    // En producción aquí se actualizaría en la base de datos
    return NextResponse.json({
      success: true,
      message: 'Conversación actualizada'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error actualizando conversación'
    }, { status: 500 })
  }
}