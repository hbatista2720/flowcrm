import { NextRequest, NextResponse } from 'next/server'

// Datos de ejemplo para leads
const mockLeads = [
  {
    id: '1',
    name: 'Juan Pérez',
    phone: '+52 555 123 4567',
    email: 'juan@email.com',
    status: 'NEW',
    value: 2500,
    source: 'whatsapp',
    notes: 'Interesado en servicios de consultoría',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'María García',
    phone: '+52 555 987 6543',
    email: 'maria@email.com',
    status: 'NEW',
    value: 1800,
    source: 'email',
    notes: 'Solicita información sobre precios',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'Carlos López',
    phone: '+52 555 456 7890',
    status: 'CONTACTED',
    value: 3200,
    source: 'whatsapp',
    notes: 'Primera llamada realizada',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T08:30:00Z'
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    leads: mockLeads,
    total: mockLeads.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, value, source, notes } = body

    if (!name || !phone) {
      return NextResponse.json({
        success: false,
        error: 'Nombre y teléfono son requeridos'
      }, { status: 400 })
    }

    const newLead = {
      id: `lead_${Date.now()}`,
      name,
      phone,
      email: email || null,
      status: 'NEW',
      value: value || 0,
      source: source || 'manual',
      notes: notes || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // En producción aquí se guardaría en la base de datos
    mockLeads.push(newLead)

    return NextResponse.json({
      success: true,
      lead: newLead
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error creando lead'
    }, { status: 500 })
  }
}