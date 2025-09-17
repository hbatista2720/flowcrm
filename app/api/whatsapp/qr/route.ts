import { NextRequest, NextResponse } from 'next/server'
import { whatsappClient } from '@/lib/whatsapp/client'
import QRCode from 'qrcode'

export async function GET() {
  try {
    if (!whatsappClient.qrCode) {
      return NextResponse.json({ 
        success: false, 
        message: 'No hay QR disponible' 
      })
    }

    // Generar imagen QR
    const qrImage = await QRCode.toDataURL(whatsappClient.qrCode)
    
    return NextResponse.json({
      success: true,
      qrCode: whatsappClient.qrCode,
      qrImage: qrImage
    })
  } catch (error) {
    console.error('Error generando QR:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Error al generar QR' 
    }, { status: 500 })
  }
}