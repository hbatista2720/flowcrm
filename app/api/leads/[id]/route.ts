import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, notes, value } = body

    // En producción aquí se actualizaría en la base de datos
    const updatedLead = {
      id: params.id,
      status,
      notes,
      value,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error actualizando lead'
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
      message: 'Lead eliminado correctamente'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error eliminando lead'
    }, { status: 500 })
  }
}