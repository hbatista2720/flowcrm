'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, MessageSquare, Settings, Edit3, Bot, Wifi, WifiOff } from 'lucide-react'
import Link from 'next/link'

export default function DemoBot() {
  const [activeTab, setActiveTab] = useState('editor')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [memoryEnabled, setMemoryEnabled] = useState(true)
  const [botName, setBotName] = useState('Bot de Ejemplo')
  const [botDescription, setBotDescription] = useState('Bot personalizado')
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiProvider, setAiProvider] = useState('openai')
  const [aiModel, setAiModel] = useState('gpt-3.5-turbo')
  const [systemPrompt, setSystemPrompt] = useState('Eres un asistente virtual profesional y amigable.')

  const connectWhatsApp = async () => {
    setIsConnecting(true)
    try {
      const response = await fetch('/api/whatsapp/connect', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        // Simular QR para demo
        setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
        setTimeout(() => {
          setIsConnected(true)
          setQrCode(null)
        }, 5000)
      }
    } catch (error) {
      console.error('Error:', error)
      // Para demo, simular QR
      setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simplificado */}
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
                  isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                  {isConnected ? 'WhatsApp Conectado' : 'WhatsApp Desconectado'}
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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar moderno */}
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

        {/* Contenido principal */}
        <div className="flex-1 p-8">
          {activeTab === 'editor' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuración del Bot</h2>
                <p className="text-gray-600 mb-8">Personaliza la información básica de tu bot</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Nombre del Bot</label>
                      <input
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ej: Bot de Ventas"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Descripción</label>
                      <textarea
                        value={botDescription}
                        onChange={(e) => setBotDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe qué hace tu bot..."
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-4">🚀 Funciones Disponibles</h3>
                    <ul className="space-y-3 text-blue-800">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Editor visual de conversaciones
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Conexión directa a WhatsApp
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Inteligencia artificial avanzada
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        Memoria de conversación 24h
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-green-700">✓ Conexión estable establecida</p>
                      <p className="text-sm text-green-700">✓ Bot activo y funcionando</p>
                    </div>
                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-medium">
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
                          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Código QR</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">El código se renueva automáticamente cada 20 segundos</p>
                        <button 
                          onClick={() => setQrCode(null)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Generar nuevo código
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MessageSquare className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Conectar WhatsApp</h3>
                        <p className="text-gray-600 mb-6">Vincula tu número de WhatsApp a este bot</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <p className="text-sm text-blue-700">Se generará un código QR para vincular tu cuenta de WhatsApp</p>
                        </div>
                        <button 
                          onClick={connectWhatsApp}
                          disabled={isConnecting}
                          className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium text-lg"
                        >
                          {isConnecting ? (
                            <span className="flex items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Iniciando conexión...
                            </span>
                          ) : (
                            'Conectar WhatsApp'
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Inteligencia Artificial</h2>
                <p className="text-gray-600 mb-8">Configura la IA específica para este bot</p>
                
                <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Activar Inteligencia Artificial</h3>
                      <p className="text-gray-600">Habilita respuestas inteligentes y personalizadas</p>
                    </div>
                    <button
                      onClick={() => setAiEnabled(!aiEnabled)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        aiEnabled ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          aiEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {aiEnabled && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">Proveedor de IA</label>
                          <select
                            value={aiProvider}
                            onChange={(e) => setAiProvider(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="openai">OpenAI (GPT)</option>
                            <option value="anthropic">Anthropic (Claude)</option>
                            <option value="google">Google (Gemini)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-3">Modelo</label>
                          <select
                            value={aiModel}
                            onChange={(e) => setAiModel(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Rápido)</option>
                            <option value="gpt-4">GPT-4 (Avanzado)</option>
                            <option value="gpt-4-turbo">GPT-4 Turbo (Premium)</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Personalidad del Bot</label>
                        <textarea
                          value={systemPrompt}
                          onChange={(e) => setSystemPrompt(e.target.value)}
                          rows={6}
                          placeholder="Define cómo debe comportarse la IA para este bot específico..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={`p-6 rounded-xl border ${aiEnabled ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className={`font-semibold mb-2 ${aiEnabled ? 'text-purple-900' : 'text-gray-800'}`}>
                      {aiEnabled ? '🤖 IA Configurada' : '🔒 IA Desactivada'}
                    </h3>
                    <p className={`text-sm ${aiEnabled ? 'text-purple-700' : 'text-gray-600'}`}>
                      {aiEnabled 
                        ? `Este bot usará ${aiProvider.toUpperCase()} ${aiModel} con personalidad personalizada`
                        : 'El bot usará respuestas predefinidas sin inteligencia artificial'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Memoria & Configuración</h2>
                <p className="text-gray-600 mb-8">Configura cómo el bot recuerda a los clientes</p>
                
                <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Sistema de Memoria 24h</h3>
                      <p className="text-gray-600">Evita repetir preguntas a clientes conocidos</p>
                    </div>
                    <button
                      onClick={() => setMemoryEnabled(!memoryEnabled)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        memoryEnabled ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          memoryEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className={`p-6 rounded-xl border ${memoryEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 ${memoryEnabled ? 'text-green-900' : 'text-gray-800'}`}>
                      {memoryEnabled ? '✅ Sistema Activo' : '❌ Sistema Desactivado'}
                    </h3>
                    
                    {memoryEnabled ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm">Cliente nuevo: Bienvenida completa</span>
                          </div>
                          <div className="flex items-center text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm">Cliente existente: Saludo personalizado</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm">Lead calificado: Mensaje directo</span>
                          </div>
                          <div className="flex items-center text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm">Expira automáticamente en 24h</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Todos los clientes recibirán el mensaje de bienvenida completo en cada interacción
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}