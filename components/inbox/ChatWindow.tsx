'use client'

import { useState } from 'react'
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  timestamp: string
  isFromUser: boolean
}

interface Conversation {
  id: string
  contactName: string
  phone: string
  email?: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  status: 'active' | 'pending' | 'resolved'
  source: 'whatsapp' | 'email' | 'web'
  messages: Message[]
}

interface ChatWindowProps {
  conversation: Conversation | null
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(conversation?.messages || [])

  const sendMessage = () => {
    if (!newMessage.trim() || !conversation) return

    const message: Message = {
      id: `msg_${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isFromUser: false
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simular respuesta automática
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg_${Date.now() + 1}`,
        text: 'Mensaje recibido. Te responderemos pronto.',
        timestamp: new Date().toISOString(),
        isFromUser: true
      }
      setMessages(prev => [...prev, autoReply])
    }, 1000)
  }

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selecciona una conversación
          </h3>
          <p className="text-gray-500">
            Elige una conversación de la lista para comenzar a chatear
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {conversation.contactName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">{conversation.contactName}</h3>
              <p className="text-sm text-gray-500">{conversation.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isFromUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isFromUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Paperclip className="h-5 w-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe un mensaje..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Replies */}
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => setNewMessage('¡Hola! ¿En qué puedo ayudarte?')}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            Saludo
          </button>
          <button
            onClick={() => setNewMessage('Gracias por contactarnos. Te responderemos pronto.')}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            Agradecimiento
          </button>
          <button
            onClick={() => setNewMessage('¿Podrías proporcionarme más información?')}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            Más info
          </button>
        </div>
      </div>
    </div>
  )
}