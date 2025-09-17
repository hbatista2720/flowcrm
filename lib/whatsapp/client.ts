export interface WhatsAppMessage {
  id: string
  from: string
  body: string
  timestamp: number
  isGroup: boolean
}

export interface WhatsAppClient {
  isReady: boolean
  qrCode: string | null
  initialize: () => Promise<void>
  disconnect: () => Promise<void>
  sendMessage: (to: string, message: string) => Promise<void>
  onMessage: (callback: (message: WhatsAppMessage) => void) => void
  onQR: (callback: (qr: string) => void) => void
  onReady: (callback: () => void) => void
}

class MockWhatsAppClient implements WhatsAppClient {
  isReady = false
  qrCode: string | null = null
  private messageCallback?: (message: WhatsAppMessage) => void
  private qrCallback?: (qr: string) => void
  private readyCallback?: () => void

  async initialize() {
    console.log('Inicializando WhatsApp simulado...')
    
    // Generar QR simulado
    setTimeout(() => {
      const qrData = `2@${Math.random().toString(36).substr(2, 20)},${Date.now()}`
      this.qrCode = qrData
      this.qrCallback?.(qrData)
      console.log('QR generado')
    }, 2000)

    // Simular conexión exitosa
    setTimeout(() => {
      this.isReady = true
      this.qrCode = null
      this.readyCallback?.()
      console.log('WhatsApp conectado (simulado)')
    }, 15000)
  }

  async disconnect() {
    this.isReady = false
    this.qrCode = null
    console.log('WhatsApp desconectado')
  }

  async sendMessage(to: string, message: string) {
    if (!this.isReady) throw new Error('Cliente no está listo')
    console.log(`Mensaje enviado a ${to}: ${message}`)
  }

  onMessage(callback: (message: WhatsAppMessage) => void) {
    this.messageCallback = callback
  }

  onQR(callback: (qr: string) => void) {
    this.qrCallback = callback
  }

  onReady(callback: () => void) {
    this.readyCallback = callback
  }
}

// Cliente simulado (comentado)
// export const whatsappClient = new MockWhatsAppClient()

// Cliente real de WhatsApp
import { RealWhatsAppClient } from './realClient'
export const whatsappClient = new RealWhatsAppClient()