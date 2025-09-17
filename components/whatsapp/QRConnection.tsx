'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Wifi, WifiOff, Loader2, CheckCircle } from 'lucide-react'

interface QRConnectionProps {
  botId: string
}

export default function QRConnection({ botId }: QRConnectionProps) {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'waiting_qr' | 'connected'>('disconnected')
  const [qrCode, setQrCode] = useState<string>('')
  const [error, setError] = useState<string>('')

  const connectWhatsApp = async () => {
    try {
      setStatus('connecting')
      setError('')
      
      const response = await fetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botId })
      })

      const data = await response.json()
      
      if (data.success) {
        setStatus('waiting_qr')
        // Simular QR y conexión
        setTimeout(() => {
          const qrData = `2@${Math.random().toString(36).substr(2, 20)},${Date.now()}`
          setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrData)}`)
          setStatus('waiting_qr')
        }, 2000)
        
        // Simular conexión exitosa
        setTimeout(() => {
          setStatus('connected')
          setQrCode('')
        }, 15000)
      } else {
        setError(data.error)
        setStatus('disconnected')
      }
    } catch (err) {
      setError('Error de conexión')
      setStatus('disconnected')
    }
  }

  const disconnect = async () => {
    setStatus('disconnected')
    setQrCode('')
  }

  const getStatusInfo = () => {
    switch (status) {
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Desconectado',
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        }
      case 'connecting':
        return {
          icon: Loader2,
          text: 'Conectando...',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        }
      case 'waiting_qr':
        return {
          icon: Smartphone,
          text: 'Esperando escaneo QR',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100'
        }
      case 'connected':
        return {
          icon: CheckCircle,
          text: 'Conectado',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Conexión WhatsApp</h3>
        <div className={`flex items-center px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
          <StatusIcon className={`h-4 w-4 mr-2 ${statusInfo.color} ${status === 'connecting' ? 'animate-spin' : ''}`} />
          <span className={`text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
        </div>
      </div>

      {status === 'disconnected' && (
        <div className="text-center">
          <div className="mb-4">
            <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Conecta tu WhatsApp para que el bot pueda recibir y enviar mensajes
            </p>
          </div>
          <button
            onClick={connectWhatsApp}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center mx-auto"
          >
            <Wifi className="h-5 w-5 mr-2" />
            Conectar WhatsApp
          </button>
        </div>
      )}

      {status === 'connecting' && (
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Iniciando conexión con WhatsApp...</p>
        </div>
      )}

      {status === 'waiting_qr' && (
        <div className="text-center">
          <div className="mb-4">
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
              {qrCode ? (
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium">Pasos para conectar:</p>
            <ol className="text-left space-y-1 max-w-md mx-auto">
              <li>1. Abre WhatsApp en tu teléfono</li>
              <li>2. Ve a Configuración → Dispositivos vinculados</li>
              <li>3. Toca "Vincular un dispositivo"</li>
              <li>4. Escanea este código QR</li>
            </ol>
          </div>
          <button
            onClick={disconnect}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
          >
            Cancelar
          </button>
        </div>
      )}

      {status === 'connected' && (
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            ¡WhatsApp conectado exitosamente! Tu bot ya puede recibir mensajes.
          </p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/whatsapp/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      to: 'tu-numero',
                      message: '🤖 ¡Hola! Tu bot de FlowCRM está conectado y funcionando correctamente. ¡Mensaje de prueba exitoso! 🚀'
                    })
                  })
                  
                  if (response.ok) {
                    alert('¡Mensaje de prueba enviado! 📱 Revisa tu WhatsApp.')
                  } else {
                    alert('Error al enviar mensaje. Verifica la conexión.')
                  }
                } catch (error) {
                  alert('Error de conexión. Inténtalo de nuevo.')
                }
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Enviar Prueba
            </button>
            <button
              onClick={disconnect}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Desconectar
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}