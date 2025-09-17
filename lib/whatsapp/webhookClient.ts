// Cliente WhatsApp via webhook externo
import { WhatsAppClient, WhatsAppMessage } from './client'

export class WebhookWhatsAppClient implements WhatsAppClient {
  isReady = false
  qrCode: string | null = null
  private webhookUrl = 'http://localhost:3001'

  async initialize() {
    try {
      const response = await fetch(`${this.webhookUrl}/connect`, { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        this.pollStatus()
      }
    } catch (error) {
      console.error('Error conectando webhook:', error)
    }
  }

  private async pollStatus() {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${this.webhookUrl}/status`)
        const data = await response.json()
        
        if (data.qr && !this.isReady) {
          this.qrCode = data.qr
        }
        
        if (data.connected) {
          this.isReady = true
          this.qrCode = null
          clearInterval(interval)
        }
      } catch (error) {
        console.error('Error polling status:', error)
      }
    }, 2000)
  }

  async disconnect() {
    await fetch(`${this.webhookUrl}/disconnect`, { method: 'POST' })
    this.isReady = false
  }

  async sendMessage(to: string, message: string) {
    await fetch(`${this.webhookUrl}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message })
    })
  }

  onMessage(callback: (message: WhatsAppMessage) => void) {}
  onQR(callback: (qr: string) => void) {}
  onReady(callback: () => void) {}
}