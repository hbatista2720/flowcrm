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
        
        if (connection === 'close') {
          const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut
          
          if (shouldReconnect) {
            setTimeout(() => {
              handler(req, res)
            }, 3000)
          } else {
            isConnected = false
            qrCode = null
          }
        } else if (connection === 'open') {
          isConnected = true
          qrCode = null
        }
      })

      sock.ev.on('creds.update', saveCreds)

      sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0]
        if (!message.key.fromMe && m.type === 'notify') {
          console.log('Nuevo mensaje:', message)
        }
      })

      return res.json({ success: true, message: 'Conexión iniciada' })
      
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}