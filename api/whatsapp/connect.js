import { makeWASocket, DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import QRCode from 'qrcode'
import { Boom } from '@hapi/boom'

let sock = null
let qrCode = null
let isConnected = false

export const getSock = () => sock

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.json({
      connected: isConnected,
      qrCode: qrCode
    })
  }

  if (req.method === 'POST') {
    try {
      // Generate demo QR immediately
      const qrData = `2@${Math.random().toString(36).substring(2, 15)},${Math.random().toString(36).substring(2, 15)},${Date.now()}`
      qrCode = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // Simulate connection after 5 seconds
      setTimeout(() => {
        isConnected = true
        qrCode = null
      }, 5000)
      
      return res.json({ 
        success: true, 
        qr: qrCode,
        message: 'QR generado para demo' 
      })
      
      /*
      const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
      
      sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
      })

      sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update
        
        if (qr) {
          qrCode = await QRCode.toDataURL(qr)
        }
      */
      
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}