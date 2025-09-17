'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Minimize2, Maximize2, Play, Book } from 'lucide-react'
import { searchKnowledge, tutorialVideos, KnowledgeItem, TutorialVideo } from '@/lib/tutorial/knowledgeBase'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: string
  suggestions?: string[]
  videos?: TutorialVideo[]
}

const knowledgeBase = {
  'bots': {
    title: 'Creación de Bots',
    content: 'Los bots te permiten automatizar conversaciones. Puedes crear bots desde cero o usar nuestras plantillas predefinidas.',
    suggestions: ['¿Cómo crear un bot?', '¿Qué plantillas hay?', 'Editor de bots']
  },
  'plantillas': {
    title: 'Plantillas de Bots',
    content: 'Tenemos 4 plantillas: Ventas (Leifer), Agendar, Ventas Simple y Asistente Personal. Cada una está optimizada para casos específicos.',
    suggestions: ['Plantilla de ventas', 'Bot de agendar', 'Asistente personal']
  },
  'whatsapp': {
    title: 'Conexión WhatsApp',
    content: 'Conecta tu WhatsApp escaneando el código QR. Una vez conectado, tu bot podrá recibir y enviar mensajes automáticamente.',
    suggestions: ['¿Cómo conectar WhatsApp?', 'Problemas con QR', 'Estado de conexión']
  },
  'pipeline': {
    title: 'Pipeline CRM',
    content: 'El pipeline te permite gestionar leads visualmente. Arrastra las tarjetas entre columnas para cambiar estados.',
    suggestions: ['¿Cómo usar el Kanban?', 'Crear nuevo lead', 'Gestionar leads']
  },
  'inbox': {
    title: 'Inbox Unificado',
    content: 'El inbox centraliza todas tus conversaciones de WhatsApp, email y web. Puedes responder desde un solo lugar.',
    suggestions: ['¿Cómo responder mensajes?', 'Respuestas rápidas', 'Filtrar conversaciones']
  },
  'automatizaciones': {
    title: 'Automatizaciones',
    content: 'Crea flujos automáticos con triggers, acciones y condiciones. Similar a n8n pero más simple.',
    suggestions: ['¿Cómo crear workflow?', 'Tipos de nodos', 'Ejemplos de automatización']
  }
}

export default function TutorialBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! 👋 Soy tu asistente de FlowCRM. Estoy aquí para ayudarte a aprender todas las funcionalidades. ¿Sobre qué te gustaría saber?',
      timestamp: new Date().toISOString(),
      suggestions: ['Crear bots', 'Conectar WhatsApp', 'Gestionar leads', 'Automatizaciones']
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate bot response
    const botResponse = generateBotResponse(message)
    
    const botMessage: Message = {
      id: `bot_${Date.now()}`,
      type: 'bot',
      content: botResponse.content,
      timestamp: new Date().toISOString(),
      suggestions: botResponse.suggestions,
      videos: botResponse.videos
    }

    setMessages(prev => [...prev, botMessage])
    setIsTyping(false)
  }

  const generateBotResponse = (userMessage: string): { content: string, suggestions?: string[], videos?: TutorialVideo[] } => {
    const message = userMessage.toLowerCase()

    // Buscar en la base de conocimiento
    const results = searchKnowledge(userMessage)
    
    if (results.length > 0) {
      const knowledge = results[0]
      const relatedVideos = tutorialVideos.filter(video => 
        knowledge.relatedVideos.includes(video.id)
      )
      
      return {
        content: `📚 **${knowledge.title}**\n\n${knowledge.content}`,
        suggestions: ['Ver más tutoriales', 'Crear mi primer bot', 'Conectar WhatsApp'],
        videos: relatedVideos
      }
    }

    // Respuestas específicas
    if (message.includes('crear') && message.includes('bot')) {
      return {
        content: '🤖 **Crear un Bot**\n\n1. Ve a la pestaña "Bots"\n2. Haz clic en "Plantillas" para usar una plantilla\n3. O clic en "Crear Bot" para empezar desde cero\n4. Usa el editor visual para configurar los pasos\n5. Conecta con WhatsApp cuando esté listo',
        suggestions: ['Ver plantillas', 'Editor de bots', 'Conectar WhatsApp']
      }
    }

    if (message.includes('whatsapp') || message.includes('qr')) {
      return {
        content: '📱 **Conectar WhatsApp**\n\n1. Ve a tu bot y haz clic en "WhatsApp"\n2. Escanea el código QR con tu teléfono\n3. Abre WhatsApp → Dispositivos vinculados\n4. Escanea el código\n5. ¡Listo! Tu bot estará conectado',
        suggestions: ['Problemas con QR', 'Estado de conexión', 'Desconectar WhatsApp']
      }
    }

    if (message.includes('lead') || message.includes('pipeline') || message.includes('kanban')) {
      return {
        content: '📊 **Gestionar Leads**\n\n1. Ve a la pestaña "Pipeline"\n2. Arrastra las tarjetas entre columnas\n3. Haz clic en "Nuevo Lead" para agregar uno\n4. Usa el menú (⋯) para editar o eliminar\n5. Los colores indican prioridad',
        suggestions: ['Crear lead', 'Cambiar prioridad', 'Filtrar leads']
      }
    }

    if (message.includes('automatización') || message.includes('workflow') || message.includes('flujo')) {
      return {
        content: '⚙️ **Automatizaciones**\n\n1. Ve a la pestaña "Flows"\n2. Haz clic en "Nuevo Workflow"\n3. Agrega nodos: Trigger → Acción → Condición\n4. Conecta los nodos arrastrando\n5. Activa el workflow para que funcione',
        suggestions: ['Tipos de nodos', 'Ejemplos de workflows', 'Activar workflow']
      }
    }

    // Respuesta por defecto
    return {
      content: '🤔 Entiendo que preguntas sobre FlowCRM. Te puedo ayudar con:\n\n• **Crear bots** y usar plantillas\n• **Conectar WhatsApp** con código QR\n• **Gestionar leads** en el pipeline\n• **Crear automatizaciones** y workflows\n• **Usar el inbox** para conversaciones\n\n¿Sobre cuál te gustaría saber más?',
      suggestions: ['Crear bots', 'Conectar WhatsApp', 'Gestionar leads', 'Automatizaciones'],
      videos: tutorialVideos.slice(0, 2)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all z-50"
        title="Asistente Tutorial"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-700 z-50 transition-all ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Asistente Tutorial</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Siempre aquí para ayudarte</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-80">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                    
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 dark:bg-gray-600 dark:hover:bg-gray-500 px-2 py-1 rounded"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {message.videos && message.videos.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium mb-2 flex items-center">
                          <Play className="h-3 w-3 mr-1" />
                          Videos relacionados:
                        </p>
                        <div className="space-y-2">
                          {message.videos.map((video) => (
                            <div key={video.id} className="bg-white/10 dark:bg-gray-600/50 rounded p-2">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="text-xs font-medium">{video.title}</h4>
                                  <p className="text-xs opacity-75">{video.duration}</p>
                                </div>
                                <button 
                                  onClick={() => window.open(`https://vimeo.com/${video.vimeoId}`, '_blank')}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center"
                                >
                                  <Play className="h-3 w-3 mr-1" />
                                  Ver
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Pregúntame sobre FlowCRM..."
                className="flex-1 border dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}