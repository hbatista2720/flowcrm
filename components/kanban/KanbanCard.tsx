'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Phone, Mail, MessageSquare, DollarSign, Calendar, MoreVertical, Edit, Trash2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  value: number
  source: 'whatsapp' | 'email' | 'web'
  notes?: string
  createdAt: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

interface KanbanCardProps {
  lead: Lead
  onEdit: () => void
  onDelete: () => void
  isDragging?: boolean
}

export default function KanbanCard({ lead, onEdit, onDelete, isDragging = false }: KanbanCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: 'Lead',
      lead,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp': return <MessageSquare className="h-3 w-3 text-green-600" />
      case 'email': return <Mail className="h-3 w-3 text-blue-600" />
      case 'web': return <Phone className="h-3 w-3 text-purple-600" />
      default: return <Phone className="h-3 w-3 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <AlertCircle className="h-3 w-3 text-red-600" />
    }
    return null
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (isDragging) {
    return (
      <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-blue-500 p-4 opacity-50 rotate-3 transform">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-gray-900 text-sm">{lead.name}</h4>
        </div>
        <div className="text-xs text-gray-500">Arrastrando...</div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-sm border-l-4 p-4 transition-all cursor-grab active:cursor-grabbing hover:shadow-md ${
        getPriorityColor(lead.priority)
      } ${isSortableDragging ? 'opacity-50 rotate-3 scale-105' : ''}`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <h4 className="font-medium text-gray-900 text-sm truncate">{lead.name}</h4>
            {getPriorityIcon(lead.priority)}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Phone className="h-3 w-3 mr-1" />
            <span className="truncate">{lead.phone}</span>
          </div>
        </div>
        
        <div className="relative ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border py-1 z-20 min-w-[120px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="h-3 w-3 mr-2" />
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Email */}
      {lead.email && (
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Mail className="h-3 w-3 mr-1" />
          <span className="truncate">{lead.email}</span>
        </div>
      )}

      {/* Tags */}
      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {lead.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {lead.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{lead.tags.length - 2}</span>
          )}
        </div>
      )}

      {/* Value and Source */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-green-600 font-medium text-sm">
          <DollarSign className="h-3 w-3 mr-1" />
          {formatCurrency(lead.value)}
        </div>
        <div className="flex items-center">
          {getSourceIcon(lead.source)}
          <span className="ml-1 text-xs text-gray-500 capitalize">{lead.source}</span>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center text-xs text-gray-500">
        <Calendar className="h-3 w-3 mr-1" />
        {formatDate(lead.createdAt)}
      </div>

      {/* Quick Actions */}
      <div className="mt-3 flex space-x-1">
        <button className="flex-1 bg-blue-50 text-blue-700 py-1 px-2 rounded text-xs hover:bg-blue-100 transition-colors">
          Contactar
        </button>
        <button className="flex-1 bg-gray-50 text-gray-700 py-1 px-2 rounded text-xs hover:bg-gray-100 transition-colors">
          Notas
        </button>
      </div>
    </div>
  )
}