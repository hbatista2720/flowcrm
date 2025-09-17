'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BaileysConnection() {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/whatsapp/connect')
      const data = await response.json()
      setIsConnected(data.connected)
      setQrCode(data.qrCode)
    } catch (error) {
      console.error('Error al verificar estado:', error)
    }
  }

  const startConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/whatsapp/connect', {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.success) {
        // Verificar estado cada 2 segundos
        const interval = setInterval(checkStatus, 2000)
        
        // Limpiar intervalo después de 60 segundos
        setTimeout(() => clearInterval(interval), 60000)
      }
    } catch (error) {
      console.error('Error al iniciar conexión:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Conexión WhatsApp - Baileys</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <div className="text-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-green-600 font-medium">WhatsApp Conectado</p>
          </div>
        ) : (
          <>
            {qrCode ? (
              <div className="text-center">
                <p className="mb-4 text-sm text-gray-600">
                  Escanea este código QR con WhatsApp
                </p>
                <img 
                  src={qrCode} 
                  alt="QR Code" 
                  className="mx-auto border rounded"
                />
              </div>
            ) : (
              <div className="text-center">
                <Button 
                  onClick={startConnection}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Conectando...' : 'Conectar WhatsApp'}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}