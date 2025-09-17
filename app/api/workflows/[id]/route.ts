import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // En producción aquí se obtendría de la base de datos
    const workflow = {
      id: params.id,
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
      executions: 47,
      successRate: 98.5,
      avgExecutionTime: 2.3
    }

    return NextResponse.json({
      success: true,
      workflow
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error obteniendo workflow'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, isActive, trigger, actions } = body

    // En producción aquí se actualizaría en la base de datos
    const updatedWorkflow = {
      id: params.id,
      name,
      description,
      isActive,
      trigger,
      actions,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      workflow: updatedWorkflow
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error actualizando workflow'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // En producción aquí se eliminaría de la base de datos
    
    return NextResponse.json({
      success: true,
      message: 'Workflow eliminado correctamente'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error eliminando workflow'
    }, { status: 500 })
  }
}