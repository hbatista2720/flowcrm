// Cliente WhatsApp real con whatsapp-web.js
import { Client, LocalAuth, Message } from 'whatsapp-web.js'
import { WhatsAppClient, WhatsAppMessage } from './client'

export class RealWhatsAppClient implements WhatsAppClient {
  private client: Client
  isReady = false
  qrCode: string | null = null
  private messageCallback?: (message: WhatsAppMessage) => void
  private qrCallback?: (qr: string) => void
  private readyCallback?: () => void

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        dataPath: './whatsapp-sessions'
      }),
      puppeteer: {
        headless: true, // Sin navegador visible en producción
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      }
    })

    this.setupEventListeners()
  }

  private setupEventListeners() {
    this.client.on('qr', (qr) => {
      console.log('QR Code recibido')
      this.qrCode = qr
      this.qrCallback?.(qr)
    })

    this.client.on('ready', () => {
      console.log('WhatsApp conectado!')
      this.isReady = true
      this.qrCode = null
      this.readyCallback?.()
    })

    this.client.on('authenticated', () => {
      console.log('WhatsApp autenticado')
    })

    this.client.on('auth_failure', (msg) => {
      console.error('Error de autenticación:', msg)
    })

    this.client.on('disconnected', (reason) => {
      console.log('WhatsApp desconectado:', reason)
      this.isReady = false
    })

    this.client.on('message', async (msg: Message) => {
      if (msg.from !== 'status@broadcast') {
        const whatsappMessage: WhatsAppMessage = {
          id: msg.id._serialized,
          from: msg.from,
          body: msg.body,
          timestamp: msg.timestamp * 1000,
          isGroup: msg.from.includes('@g.us')
        }
        
        this.messageCallback?.(whatsappMessage)
      }
    })
  }

  async initialize(): Promise<void> {
    console.log('Inicializando cliente WhatsApp...')
    await this.client.initialize()
  }

  async disconnect(): Promise<void> {
    console.log('Desconectando WhatsApp...')
    await this.client.destroy()
    this.isReady = false
    this.qrCode = null
  }

  async sendMessage(to: string, message: string): Promise<void> {
    if (!this.isReady) {
      throw new Error('Cliente WhatsApp no está listo')
    }

    // Formatear número si es necesario
    let formattedNumber = to
    if (!to.includes('@')) {
      formattedNumber = to.replace(/\D/g, '') + '@c.us'
    }

    await this.client.sendMessage(formattedNumber, message)
    console.log(`Mensaje enviado a ${formattedNumber}: ${message}`)
  }

  onMessage(callback: (message: WhatsAppMessage) => void): void {
    this.messageCallback = callback
  }

  onQR(callback: (qr: string) => void): void {
    this.qrCallback = callback
  }

  onReady(callback: () => void): void {
    this.readyCallback = callback
  }
}

export const setupRealWhatsApp = () => {
  console.log('Para usar WhatsApp real:')
  console.log('1. npm install whatsapp-web.js puppeteer')
  console.log('2. Descomentar código en realClient.ts')
  console.log('3. Reemplazar export en client.ts')
  console.log('4. Ejecutar con ngrok para internet')
}