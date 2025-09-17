'use client'

import { useState, useEffect } from 'react'
import { Bot, Send, RotateCcw, Sparkles, Key, Thermometer, Hash } from 'lucide-react'
import { aiProviders, AIConfig, ChatMessage } from '@/lib/ai/providers'

interface AIConfigSectionProps {
  botId: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function AIConfigSection({ botId, enabled, onToggle }: AIConfigSectionProps) {
  const [config, setConfig] = useState<AIConfig>({
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    systemPrompt: 'Eres un asistente virtual profesional y amigable.',
    temperature: 0.7,
    maxTokens: 500,
    apiKey: ''
  })
  
  const [testMessage, setTestMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const systemPromptTemplates = [
    {
      name: 'Ventas',
      prompt: 'Eres un experto en ventas. Ayudas a calificar leads, proporcionar información de productos y cerrar ventas de manera efectiva. Siempre mantén un tono profesional y persuasivo.'
    },
    {
      name: 'Soporte',
      prompt: 'Eres un especialista en soporte técnico. Ayudas a resolver problemas, explicas funcionalidades y guías a los usuarios paso a paso con paciencia y claridad.'
    },
    {
      name: 'Atención',
      prompt: 'Eres un agente de atención al cliente amigable y empático. Resuelves consultas, manejas quejas y brindas excelente servicio siempre con una actitud positiva.'
    }
  ]

  const getCurrentProvider = () => {
    return aiProviders.find(p => p.id === config.provider)
  }

  const handleSendTest = async () => {
    if (!testMessage.trim()) return
    
    setIsLoading(true)
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: testMessage,
      timestamp: new Date().toISOString()
    }
    
    setChatHistory(prev => [...prev, userMessage])
    setTestMessage('')
    
    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Respuesta simulada usando ${getCurrentProvider()?.name} (${config.model}): ${testMessage}`,
        timestamp: new Date().toISOString(),
        provider: config.provider,
        model: config.model
      }
      setChatHistory(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setChatHistory([])
    setTestMessage('')
    // Reset config to defaults
    setConfig({
      provider: 'openai',
      model: 'gpt-3.5-turbo',
      systemPrompt: 'Eres un asistente virtual profesional y amigable.',
      temperature: 0.7,
      maxTokens: 500,
      apiKey: ''
    })
  }

  return (
    <div className="max-w-7xl">
      {/* Header Toggle */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 mb-8">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Inteligencia Artificial</h3>
          <p className="text-gray-600">Configura la IA específica para este bot</p>
        </div>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            enabled ? 'bg-purple-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Configuración</h4>
              <button
                onClick={handleReset}
                className="flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Proveedor de IA
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {aiProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => setConfig({
                        ...config,
                        provider: provider.id,
                        model: provider.models[0]
                      })}
                      className={`flex items-center p-4 rounded-lg border text-left transition-colors ${
                        config.provider === provider.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center mr-4`}>
                        <span className="text-2xl">{provider.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-500">{provider.description}</p>
                      </div>
                      {provider.requiresApiKey && (
                        <Key className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo
                </label>
                <select
                  value={config.model}
                  onChange={(e) => setConfig({...config, model: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {getCurrentProvider()?.models.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* API Key */}
              {getCurrentProvider()?.requiresApiKey && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={config.apiKey || ''}
                      onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                      placeholder="Ingresa tu API key..."
                      className="w-full border rounded-lg px-3 py-2 pr-10"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKey ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              )}

              {/* System Prompt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Prompt del Sistema
                  </label>
                  <Sparkles className="h-4 w-4 text-blue-500" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {systemPromptTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setConfig({...config, systemPrompt: template.prompt})}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200"
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
                
                <textarea
                  value={config.systemPrompt}
                  onChange={(e) => setConfig({...config, systemPrompt: e.target.value})}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Define cómo debe comportarse la IA..."
                />
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="h-4 w-4 inline mr-1" />
                  Creatividad: {config.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => setConfig({...config, temperature: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Preciso</span>
                  <span>Creativo</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="h-4 w-4 inline mr-1" />
                  Máximo Tokens
                </label>
                <input
                  type="number"
                  min="50"
                  max="2000"
                  step="50"
                  value={config.maxTokens}
                  onChange={(e) => setConfig({...config, maxTokens: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Test Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Probar Agente</h4>
              <div className="flex items-center text-sm text-gray-500">
                <div className={`w-3 h-3 ${getCurrentProvider()?.color} rounded-full mr-2`}></div>
                {getCurrentProvider()?.name}
              </div>
            </div>

            {/* Chat History */}
            <div className="h-80 border rounded-lg p-4 mb-4 overflow-y-auto bg-gray-50">
              {chatHistory.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Bot className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Envía un mensaje para probar el agente</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.provider && (
                          <p className="text-xs opacity-70 mt-1">
                            {message.provider} • {message.model}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border rounded-lg px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendTest()}
                placeholder="Escribe un mensaje de prueba..."
                className="flex-1 border rounded-lg px-3 py-2"
                disabled={isLoading}
              />
              <button
                onClick={handleSendTest}
                disabled={isLoading || !testMessage.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}