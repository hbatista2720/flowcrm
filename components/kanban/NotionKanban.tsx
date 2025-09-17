'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus, MoreHorizontal, Phone, Mail, MessageSquare, DollarSign, Calendar, User, Edit, Trash2 } from 'lucide-react'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'

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

interface Column {
  id: string
  title: string
  leads: Lead[]
  color: string
  limit?: number
}

const initialColumns: Column[] = [
  {
    id: 'new',
    title: 'Nuevos Leads',
    color: 'bg-gray-100 border-gray-300',
    leads: [
      {
        id: '1',
        name: 'Juan Pérez',
        phone: '+52 555 123 4567',
        email: 'juan@email.com',
        value: 2500,
        source: 'whatsapp',
        createdAt: '2024-01-15T10:30:00Z',
        priority: 'high',
        tags: ['urgente', 'consultoría']
      },
      {
        id: '2',
        name: 'María García',
        phone: '+52 555 987 6543',
        value: 1800,
        source: 'email',
        createdAt: '2024-01-15T09:15:00Z',
        priority: 'medium',
        tags: ['seguimiento']
      }
    ]
  },
  {
    id: 'contacted',
    title: 'Contactados',
    color: 'bg-blue-50 border-blue-200',
    leads: [
      {
        id: '3',
        name: 'Carlos López',
        phone: '+52 555 456 7890',
        value: 3200,
        source: 'whatsapp',
        createdAt: '2024-01-14T16:45:00Z',
        priority: 'high',
        tags: ['interesado', 'reunión']
      }
    ]
  },
  {
    id: 'qualified',
    title: 'Calificados',
    color: 'bg-yellow-50 border-yellow-200',
    leads: [
      {
        id: '4',
        name: 'Ana Martínez',
        phone: '+52 555 321 0987',
        value: 4500,
        source: 'web',
        createdAt: '2024-01-13T14:20:00Z',
        priority: 'high',
        tags: ['presupuesto', 'decisor']
      }
    ]
  },
  {
    id: 'proposal',
    title: 'Propuesta',
    color: 'bg-purple-50 border-purple-200',
    leads: []
  },
  {
    id: 'closed',
    title: 'Cerrados',
    color: 'bg-green-50 border-green-200',
    leads: []
  }
]

export default function NotionKanban() {
  const [columns, setColumns] = useState(initialColumns)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAddingLead, setIsAddingLead] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const isActiveALead = active.data.current?.type === 'Lead'
    const isOverALead = over.data.current?.type === 'Lead'
    const isOverAColumn = over.data.current?.type === 'Column'

    if (!isActiveALead) return

    // Dropping a Lead over another Lead
    if (isActiveALead && isOverALead) {
      setColumns((columns) => {
        const activeColumn = columns.find((col) =>
          col.leads.find((lead) => lead.id === activeId)
        )
        const overColumn = columns.find((col) =>
          col.leads.find((lead) => lead.id === overId)
        )

        if (!activeColumn || !overColumn) return columns

        const activeIndex = activeColumn.leads.findIndex((lead) => lead.id === activeId)
        const overIndex = overColumn.leads.findIndex((lead) => lead.id === overId)

        if (activeColumn === overColumn) {
          return columns.map((col) => {
            if (col.id === activeColumn.id) {
              return {
                ...col,
                leads: arrayMove(col.leads, activeIndex, overIndex),
              }
            }
            return col
          })
        } else {
          const activeLead = activeColumn.leads[activeIndex]
          return columns.map((col) => {
            if (col.id === activeColumn.id) {
              return {
                ...col,
                leads: col.leads.filter((lead) => lead.id !== activeId),
              }
            } else if (col.id === overColumn.id) {
              return {
                ...col,
                leads: [
                  ...col.leads.slice(0, overIndex),
                  activeLead,
                  ...col.leads.slice(overIndex),
                ],
              }
            }
            return col
          })
        }
      })
    }

    // Dropping a Lead over a Column
    if (isActiveALead && isOverAColumn) {
      setColumns((columns) => {
        const activeColumn = columns.find((col) =>
          col.leads.find((lead) => lead.id === activeId)
        )
        const overColumn = columns.find((col) => col.id === overId)

        if (!activeColumn || !overColumn) return columns

        const activeIndex = activeColumn.leads.findIndex((lead) => lead.id === activeId)
        const activeLead = activeColumn.leads[activeIndex]

        return columns.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              leads: col.leads.filter((lead) => lead.id !== activeId),
            }
          } else if (col.id === overColumn.id) {
            return {
              ...col,
              leads: [...col.leads, activeLead],
            }
          }
          return col
        })
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
  }

  const addLead = (columnId: string, leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: leadData.name || '',
      phone: leadData.phone || '',
      email: leadData.email,
      value: leadData.value || 0,
      source: leadData.source || 'web',
      createdAt: new Date().toISOString(),
      priority: leadData.priority || 'medium',
      tags: leadData.tags || []
    }

    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, leads: [...col.leads, newLead] }
        : col
    ))
  }

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setColumns(columns.map(col => ({
      ...col,
      leads: col.leads.map(lead => 
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    })))
  }

  const deleteLead = (leadId: string) => {
    setColumns(columns.map(col => ({
      ...col,
      leads: col.leads.filter(lead => lead.id !== leadId)
    })))
  }

  const getLeadById = (id: string): Lead | undefined => {
    for (const column of columns) {
      const lead = column.leads.find(lead => lead.id === id)
      if (lead) return lead
    }
    return undefined
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline de Ventas</h1>
          <p className="text-gray-600">Gestiona tus leads con drag & drop estilo Notion</p>
        </div>
        <button
          onClick={() => setIsAddingLead(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lead
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddLead={(leadData) => addLead(column.id, leadData)}
              onEditLead={setEditingLead}
              onDeleteLead={deleteLead}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <KanbanCard
              lead={getLeadById(activeId)!}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add Lead Modal */}
      {isAddingLead && (
        <AddLeadModal
          onClose={() => setIsAddingLead(false)}
          onSave={(leadData) => {
            addLead('new', leadData)
            setIsAddingLead(false)
          }}
        />
      )}

      {/* Edit Lead Modal */}
      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={(updates) => {
            updateLead(editingLead.id, updates)
            setEditingLead(null)
          }}
        />
      )}
    </div>
  )
}

// Add Lead Modal Component
function AddLeadModal({ onClose, onSave }: {
  onClose: () => void
  onSave: (leadData: Partial<Lead>) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    value: '',
    source: 'web' as Lead['source'],
    priority: 'medium' as Lead['priority'],
    tags: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      value: parseFloat(formData.value) || 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-lg font-semibold mb-4">Nuevo Lead</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email (opcional)"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Valor estimado"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <select 
            value={formData.source}
            onChange={(e) => setFormData({...formData, source: e.target.value as Lead['source']})}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="web">Web</option>
          </select>
          <select 
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value as Lead['priority']})}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="low">Prioridad Baja</option>
            <option value="medium">Prioridad Media</option>
            <option value="high">Prioridad Alta</option>
          </select>
          <input
            type="text"
            placeholder="Tags (separados por comas)"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Crear Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Edit Lead Modal Component
function EditLeadModal({ lead, onClose, onSave }: {
  lead: Lead
  onClose: () => void
  onSave: (updates: Partial<Lead>) => void
}) {
  const [formData, setFormData] = useState({
    name: lead.name,
    phone: lead.phone,
    email: lead.email || '',
    value: lead.value.toString(),
    source: lead.source,
    priority: lead.priority,
    tags: lead.tags.join(', ')
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      value: parseFloat(formData.value) || 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <h3 className="text-lg font-semibold mb-4">Editar Lead</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email (opcional)"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Valor estimado"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <select 
            value={formData.source}
            onChange={(e) => setFormData({...formData, source: e.target.value as Lead['source']})}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="web">Web</option>
          </select>
          <select 
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value as Lead['priority']})}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="low">Prioridad Baja</option>
            <option value="medium">Prioridad Media</option>
            <option value="high">Prioridad Alta</option>
          </select>
          <input
            type="text"
            placeholder="Tags (separados por comas)"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}