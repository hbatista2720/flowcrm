'use client'

import { useState } from 'react'
import { MessageSquare, Phone, Mail, Clock, Search, Filter } from 'lucide-react'

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

const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'Juan Pérez',
    phone: '+52 555 123 4567',
    email: 'juan@email.com',
    lastMessage: 'Hola, me interesa información sobre sus servicios...',
    timestamp: '2024-01-15T10:30:00Z',
    unreadCount: 2,
    status: 'pending',
    source: 'whatsapp',
    messages: [
      {
        id: '1',
        text: 'Hola, me interesa información sobre sus servicios',
        timestamp: '2024-01-15T10:25:00Z',
        isFromUser: true
      },
      {
        id: '2',
        text: '¡Hola! Gracias por contactarnos. ¿En qué tipo de servicio estás interesado?',
        timestamp: '2024-01-15T10:26:00Z',
        isFromUser: false
      },
      {
        id: '3',
        text: 'Me gustaría saber sobre consultoría empresarial',
        timestamp: '2024-01-15T10:30:00Z',
        isFromUser: true
      }
    ]
  },
  {
    id: '2',
    contactName: 'María García',
    phone: '+52 555 987 6543',
    lastMessage: 'Perfecto, ¿cuándo podemos agendar una reunión?',
    timestamp: '2024-01-15T09:15:00Z',
    unreadCount: 0,
    status: 'active',
    source: 'email',
    messages: [
      {
        id: '4',
        text: 'Buenos días, recibí su propuesta por email',
        timestamp: '2024-01-15T09:10:00Z',
        isFromUser: true
      },
      {
        id: '5',
        text: 'Excelente! ¿Tiene alguna pregunta sobre la propuesta?',
        timestamp: '2024-01-15T09:12:00Z',
        isFromUser: false
      },
      {
        id: '6',
        text: 'Perfecto, ¿cuándo podemos agendar una reunión?',
        timestamp: '2024-01-15T09:15:00Z',
        isFromUser: true
      }
    ]
  },
  {
    id: '3',
    contactName: 'Carlos López',
    phone: '+52 555 456 7890',
    lastMessage: 'Gracias por la información, lo voy a revisar',
    timestamp: '2024-01-14T16:45:00Z',
    unreadCount: 0,
    status: 'resolved',
    source: 'whatsapp',
    messages: []
  }
]

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void
  selectedConversationId?: string
}

export default function ConversationList({ onSelectConversation, selectedConversationId }: ConversationListProps) {
  const [conversations] = useState(mockConversations)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'resolved'>('all')

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />
      case 'email': return <Mail className="h-4 w-4 text-blue-600" />
      case 'web': return <Phone className="h-4 w-4 text-purple-600" />
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`
    } else {
      return date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })
    }
  }

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.phone.includes(searchTerm) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="w-80 bg-white border-r flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Conversaciones</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar conversaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="pending">Pendientes</option>
            <option value="resolved">Resueltas</option>
          </select>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedConversationId === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {conversation.contactName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{conversation.contactName}</h3>
                  <p className="text-xs text-gray-500">{conversation.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{formatTime(conversation.timestamp)}</p>
                {conversation.unreadCount > 0 && (
                  <span className="inline-block bg-red-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 truncate mb-2">
              {conversation.lastMessage}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getSourceIcon(conversation.source)}
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.status)}`}>
                  {conversation.status === 'active' ? 'Activa' : 
                   conversation.status === 'pending' ? 'Pendiente' : 'Resuelta'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredConversations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No se encontraron conversaciones</p>
          </div>
        )}
      </div>
    </div>
  )
}