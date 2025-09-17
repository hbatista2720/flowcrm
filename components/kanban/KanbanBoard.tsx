'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, Phone, Mail, MessageSquare, DollarSign, Calendar, MoreVertical } from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  value: number
  source: 'whatsapp' | 'email' | 'web'
  notes?: string
  createdAt: string
}

interface Column {
  id: string
  title: string
  leads: Lead[]
  color: string
}

const initialData: Column[] = [
  {
    id: 'new',
    title: 'Nuevos Leads',
    color: 'bg-gray-100',
    leads: [
      {
        id: '1',
        name: 'Juan Pérez',
        phone: '+52 555 123 4567',
        email: 'juan@email.com',
        value: 2500,
        source: 'whatsapp',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'María García',
        phone: '+52 555 987 6543',
        value: 1800,
        source: 'email',
        createdAt: '2024-01-15T09:15:00Z'
      }
    ]
  },
  {
    id: 'contacted',
    title: 'Contactados',
    color: 'bg-blue-100',
    leads: [
      {
        id: '3',
        name: 'Carlos López',
        phone: '+52 555 456 7890',
        value: 3200,
        source: 'whatsapp',
        createdAt: '2024-01-14T16:45:00Z'
      }
    ]
  },
  {
    id: 'qualified',
    title: 'Calificados',
    color: 'bg-yellow-100',
    leads: [
      {
        id: '4',
        name: 'Ana Martínez',
        phone: '+52 555 321 0987',
        value: 4500,
        source: 'web',
        createdAt: '2024-01-13T14:20:00Z'
      }
    ]
  },
  {
    id: 'proposal',
    title: 'Propuesta',
    color: 'bg-purple-100',
    leads: []
  },
  {
    id: 'closed',
    title: 'Cerrados',
    color: 'bg-green-100',
    leads: []
  }
]

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData)
  const [isAddingLead, setIsAddingLead] = useState(false)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)
    
    if (!sourceColumn || !destColumn) return

    const lead = sourceColumn.leads.find(lead => lead.id === draggableId)
    if (!lead) return

    const newColumns = columns.map(column => {
      if (column.id === source.droppableId) {
        return {
          ...column,
          leads: column.leads.filter(lead => lead.id !== draggableId)
        }
      }
      if (column.id === destination.droppableId) {
        const newLeads = [...column.leads]
        newLeads.splice(destination.index, 0, lead)
        return {
          ...column,
          leads: newLeads
        }
      }
      return column
    })

    setColumns(newColumns)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />
      case 'email': return <Mail className="h-4 w-4 text-blue-600" />
      case 'web': return <Phone className="h-4 w-4 text-purple-600" />
      default: return <Phone className="h-4 w-4 text-gray-600" />
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline de Ventas</h1>
          <p className="text-gray-600">Gestiona tus leads visualmente</p>
        </div>
        <button
          onClick={() => setIsAddingLead(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lead
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={`${column.color} rounded-lg p-4 mb-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <span className="bg-white text-gray-700 text-sm px-2 py-1 rounded-full">
                    {column.leads.length}
                  </span>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? 'bg-blue-50' : ''
                    }`}
                  >
                    {column.leads.map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-lg shadow p-4 border-l-4 border-blue-500 transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{lead.name}</h4>
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-2" />
                                <span>{lead.phone}</span>
                              </div>
                              
                              {lead.email && (
                                <div className="flex items-center">
                                  <Mail className="h-3 w-3 mr-2" />
                                  <span>{lead.email}</span>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {getSourceIcon(lead.source)}
                                  <span className="ml-1 capitalize">{lead.source}</span>
                                </div>
                                <div className="flex items-center text-green-600 font-medium">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {formatCurrency(lead.value)}
                                </div>
                              </div>

                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(lead.createdAt)}
                              </div>
                            </div>

                            <div className="mt-3 flex space-x-2">
                              <button className="flex-1 bg-blue-50 text-blue-700 py-1 px-2 rounded text-xs hover:bg-blue-100">
                                Contactar
                              </button>
                              <button className="flex-1 bg-gray-50 text-gray-700 py-1 px-2 rounded text-xs hover:bg-gray-100">
                                Notas
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Add Lead Modal */}
      {isAddingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6">
            <h3 className="text-lg font-semibold mb-4">Nuevo Lead</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email (opcional)"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Valor estimado"
                className="w-full border rounded-lg px-3 py-2"
              />
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="web">Web</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsAddingLead(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsAddingLead(false)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Crear Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}