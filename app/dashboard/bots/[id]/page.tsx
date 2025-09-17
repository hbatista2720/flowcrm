'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, MessageSquare, Settings, Edit3, Bot, Wifi, WifiOff } from 'lucide-react'
import Link from 'next/link'
import AIConfigSection from '@/components/bot-builder/AIConfigSection'

export default function BotEditor({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('editor')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [memoryEnabled, setMemoryEnabled] = useState(true)
  const [botName, setBotName] = useState('Bot Personalizado')
  const [botDescription, setBotDescription] = useState('Bot creado dinámicamente')
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiProvider, setAiProvider] = useState('openai')
  const [aiModel, setAiModel] = useState('gpt-3.5-turbo')
  const [systemPrompt, setSystemPrompt] = useState('Eres un asistente virtual profesional y amigable.')

  useEffect(() => {
    // Cargar datos del bot específico
    const savedBots = localStorage.getItem('userBots')
    if (savedBots) {
      const bots = JSON.parse(savedBots)
      const currentBot = bots.find((bot: any) => bot.id === params.id)
      if (currentBot) {
        setBotName(currentBot.name)
        setBotDescription(currentBot.description)
        setIsConnected(currentBot.whatsappConnected || false)
      }
    }
  }, [params.id])

  const connectWhatsApp = async () => {
    setIsConnecting(true)
    try {
      const response = await fetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botId: params.id })
      })
      
      const data = await response.json()
      
      if (data.qr) {
        setQrCode(data.qr)
        
        // Poll for connection status
        const checkConnection = setInterval(async () => {
          const statusResponse = await fetch(`/api/whatsapp/status?botId=${params.id}`)
          const statusData = await statusResponse.json()
          
          if (statusData.connected) {
            setIsConnected(true)
            setQrCode(null)
            clearInterval(checkConnection)
            
            // Update localStorage
            const savedBots = localStorage.getItem('userBots')
            if (savedBots) {
              const bots = JSON.parse(savedBots)
              const updatedBots = bots.map((bot: any) => 
                bot.id === params.id 
                  ? { ...bot, whatsappConnected: true, status: 'online' }
                  : bot
              )
              localStorage.setItem('userBots', JSON.stringify(updatedBots))
            }
          }
        }, 2000)
        
        // Stop polling after 2 minutes
        setTimeout(() => clearInterval(checkConnection), 120000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </Link>
            <div>
              <input
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-none outline-none"
              />
              <div className="flex items-center space-x-4 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                  {isConnected ? 'WhatsApp Conectado' : 'WhatsApp Offline'}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  aiEnabled ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <Bot className="h-3 w-3 mr-1" />
                  {aiEnabled ? 'IA Activa' : 'IA Inactiva'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              // Save bot changes to localStorage
              const savedBots = localStorage.getItem('userBots')
              if (savedBots) {
                const bots = JSON.parse(savedBots)
                const updatedBots = bots.map((bot: any) => 
                  bot.id === params.id 
                    ? { ...bot, name: botName, description: botDescription, aiEnabled, aiProvider, aiModel, systemPrompt }
                    : bot
                )
                localStorage.setItem('userBots', JSON.stringify(updatedBots))
                alert('Cambios guardados correctamente')
              }
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('editor')}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'editor' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Edit3 className="h-5 w-5 mr-3" />
                Editor del Bot
              </button>
              
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'whatsapp' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                WhatsApp
                {isConnected && <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>}
              </button>
              
              <button
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'ai' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Bot className="h-5 w-5 mr-3" />
                Inteligencia Artificial
                {aiEnabled && <div className="w-2 h-2 bg-purple-500 rounded-full ml-auto"></div>}
              </button>
              
              <button
                onClick={() => setActiveTab('memory')}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'memory' 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Memoria & Configuración
                {memoryEnabled && <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>}
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1 p-8">
          {activeTab === 'whatsapp' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Conexión WhatsApp</h2>
                <p className="text-gray-600 mb-8">Conecta este bot a tu número de WhatsApp</p>
                
                {isConnected ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">¡WhatsApp Conectado!</h3>
                    <p className="text-green-600 mb-6">Tu bot está listo para recibir y enviar mensajes</p>
                    <button 
                      onClick={() => {
                        setIsConnected(false)
                        // Actualizar localStorage
                        const savedBots = localStorage.getItem('userBots')
                        if (savedBots) {
                          const bots = JSON.parse(savedBots)
                          const updatedBots = bots.map((bot: any) => 
                            bot.id === params.id 
                              ? { ...bot, whatsappConnected: false, status: 'offline' }
                              : bot
                          )
                          localStorage.setItem('userBots', JSON.stringify(updatedBots))
                        }
                      }}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-medium"
                    >
                      Desconectar WhatsApp
                    </button>
                  </div>
                ) : (
                  <>
                    {qrCode ? (
                      <div className="text-center py-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Escanea el Código QR</h3>
                        <p className="text-gray-600 mb-6">Abre WhatsApp en tu teléfono y escanea este código</p>
                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 inline-block mb-6">
                          <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                            {qrCode && qrCode !== 'demo-qr-code' ? (
                              <img 
                                src={qrCode} 
                                alt="QR Code" 
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="text-center">
                                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Generando QR...</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Conectando automáticamente...</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MessageSquare className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Conectar WhatsApp</h3>
                        <p className="text-gray-600 mb-6">Vincula tu número de WhatsApp a este bot</p>
                        <button 
                          onClick={connectWhatsApp}
                          disabled={isConnecting}
                          className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium text-lg"
                        >
                          {isConnecting ? 'Generando QR...' : 'Conectar WhatsApp'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuración del Bot</h2>
                <p className="text-gray-600 mb-8">Bot ID: {params.id}</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Nombre del Bot</label>
                    <input
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Descripción</label>
                    <textarea
                      value={botDescription}
                      onChange={(e) => setBotDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <AIConfigSection 
              botId={params.id}
              enabled={aiEnabled}
              onToggle={setAiEnabled}
            />
          )}

          {activeTab === 'memory' && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Memoria 24h</h2>
                <p className="text-gray-600 mb-8">Sistema de memoria activado</p>
                
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Sistema Activo</h3>
                  <p className="text-green-700">El bot recordará a los clientes por 24 horas</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}