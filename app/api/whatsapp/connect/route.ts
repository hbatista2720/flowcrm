import { NextRequest, NextResponse } from 'next/server'
import { makeWASocket, DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import QRCode from 'qrcode'
import { Boom } from '@hapi/boom'
import path from 'path'
import fs from 'fs'

// Store active connections
const connections = new Map()
const qrCodes = new Map()

export async function POST(request: NextRequest) {
  try {
    const { botId } = await request.json()
    
    if (!botId) {
      return NextResponse.json({ error: 'Bot ID requerido' }, { status: 400 })
    }

    // Check if already connected
    if (connections.has(botId)) {
      return NextResponse.json({ 
        success: true, 
        connected: true,
        message: 'Bot ya conectado'
      })
    }

    // Create auth directory
    const authDir = path.join(process.cwd(), '.auth', botId)
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true })
    }

    const { state, saveCreds } = await useMultiFileAuthState(authDir)

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      browser: ['FlowCRM Bot', 'Chrome', '1.0.0']
    })

    let qrGenerated = false

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update
      
      if (qr && !qrGenerated) {
        qrGenerated = true
        const qrCode = await QRCode.toDataURL(qr, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        qrCodes.set(botId, qrCode)
      }
      
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
        if (!shouldReconnect) {
          connections.delete(botId)
          qrCodes.delete(botId)
        }
      } else if (connection === 'open') {
        connections.set(botId, sock)
        qrCodes.delete(botId)
        console.log(`Bot ${botId} conectado a WhatsApp`)
      }
    })

    sock.ev.on('creds.update', saveCreds)

    // Wait for QR generation
    await new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 15000)
      
      const checkQR = setInterval(() => {
        if (qrCodes.has(botId) || connections.has(botId)) {
          clearTimeout(timeout)
          clearInterval(checkQR)
          resolve(null)
        }
      }, 500)
    })

    if (qrCodes.has(botId)) {
      return NextResponse.json({ 
        success: true, 
        qr: qrCodes.get(botId),
        message: 'QR generado - escanea con WhatsApp' 
      })
    } else if (connections.has(botId)) {
      return NextResponse.json({ 
        success: true, 
        connected: true,
        message: 'Ya conectado' 
      })
    } else {
      return NextResponse.json({ 
        error: 'No se pudo generar QR' 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error en conexión WhatsApp:', error)
    return NextResponse.json({ 
      error: 'Error interno del servidor' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const botId = searchParams.get('botId')
  
  if (!botId) {
    return NextResponse.json({ error: 'Bot ID requerido' }, { status: 400 })
  }

  return NextResponse.json({
    connected: connections.has(botId),
    qr: qrCodes.get(botId) || null
  })
}