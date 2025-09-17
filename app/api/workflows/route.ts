import { NextRequest, NextResponse } from 'next/server'

const mockWorkflows = [
  {
    id: '1',
    name: 'WhatsApp → CRM Lead',
    description: 'Crea un lead automáticamente cuando llega un mensaje de WhatsApp',
    isActive: true,
    trigger: {
      type: 'whatsapp_message',
      config: {}
    },
    actions: [
      {
        type: 'create_lead',
        config: {
          source: 'whatsapp'
        }
      }
    ],
    lastRun: '2024-01-15T10:30:00Z',
    executions: 47,
    createdAt: '2024-01-10T08:00:00Z'
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    workflows: mockWorkflows,
    total: mockWorkflows.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, trigger, actions } = body

    if (!name || !trigger) {
      return NextResponse.json({
        success: false,
        error: 'Nombre y trigger son requeridos'
      }, { status: 400 })
    }

    const newWorkflow = {
      id: `workflow_${Date.now()}`,
      name,
      description: description || '',
      isActive: false,
      trigger,
      actions: actions || [],
      lastRun: new Date().toISOString(),
      executions: 0,
      createdAt: new Date().toISOString()
    }

    // En producción aquí se guardaría en la base de datos
    mockWorkflows.push(newWorkflow)

    return NextResponse.json({
      success: true,
      workflow: newWorkflow
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error creando workflow'
    }, { status: 500 })
  }
}