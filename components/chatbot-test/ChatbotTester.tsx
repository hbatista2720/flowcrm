'use client'

import { useState } from 'react'
import { Send, Bot, Settings, Play, Trash2, Copy, Download } from 'lucide-react'
import { aiProviders, ChatMessage, AIConfig } from '@/lib/ai/providers'
import AIConfigPanel from './AIConfigPanel'

export default function ChatbotTester() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Sistema iniciado. Configura tu agente de IA y comienza a probar.',
      timestamp: new Date().toISOString()
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: 'local',
    model: 'simulado-basico',
    systemPrompt: 'Eres un asistente virtual amigable y útil para un sistema CRM. Ayudas a los usuarios con consultas sobre ventas, leads y gestión de clientes.',
    temperature: 0.7,
    maxTokens: 500
  })

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          config: aiConfig,
          history: messages.filter(m => m.role !== 'system').slice(-10)
        })
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          provider: aiConfig.provider,
          model: aiConfig.model
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || 'Error en la respuesta')
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'system',
      content: 'Chat reiniciado. Configura tu agente de IA y comienza a probar.',
      timestamp: new Date().toISOString()
    }])
  }

  const exportChat = () => {
    const chatData = {
      config: aiConfig,
      messages: messages.filter(m => m.role !== 'system'),
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chatbot-test-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const getCurrentProvider = () => {
    return aiProviders.find(p => p.id === aiConfig.provider)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="h-full flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Probador de Chatbot</h2>
                <p className="text-sm text-gray-600">
                  Usando: {getCurrentProvider()?.name} - {aiConfig.model}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={exportChat}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                title="Exportar chat"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={clearChat}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                title="Limpiar chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                title="Configuración"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.role === 'system'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-white text-gray-900 border shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.provider && (
                          <span className="ml-2">
                            {getCurrentProvider()?.icon} {message.model}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {message.role !== 'system' && (
                      <button
                        onClick={() => copyMessage(message.content)}
                        className={`ml-2 p-1 rounded hover:bg-black/10 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}
                        title="Copiar mensaje"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 border shadow-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">
                      {getCurrentProvider()?.name} está pensando...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Escribe tu mensaje aquí..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                '¿Cómo puedo ayudarte?',
                'Explícame sobre este CRM',
                '¿Qué funciones tienes?',
                'Ayúdame con un lead'
              ].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt)}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <AIConfigPanel
          config={aiConfig}
          onConfigChange={setAiConfig}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  )
}