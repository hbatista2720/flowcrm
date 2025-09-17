'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus, MoreHorizontal } from 'lucide-react'
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

interface KanbanColumnProps {
  column: Column
  onAddLead: (leadData: Partial<Lead>) => void
  onEditLead: (lead: Lead) => void
  onDeleteLead: (leadId: string) => void
}

export default function KanbanColumn({ column, onAddLead, onEditLead, onDeleteLead }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  const totalValue = column.leads.reduce((sum, lead) => sum + lead.value, 0)

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`${column.color} rounded-lg p-4 mb-4 border-2 transition-colors ${
        isOver ? 'border-blue-400 bg-blue-50' : ''
      }`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <div className="flex items-center space-x-2">
            <span className="bg-white text-gray-700 text-sm px-2 py-1 rounded-full font-medium">
              {column.leads.length}
            </span>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Column Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Total: ${totalValue.toLocaleString()}</span>
          {column.limit && (
            <span className={`${column.leads.length >= column.limit ? 'text-red-600' : 'text-gray-500'}`}>
              {column.leads.length}/{column.limit}
            </span>
          )}
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`min-h-[400px] rounded-lg transition-colors ${
          isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : 'bg-transparent'
        }`}
      >
        <SortableContext items={column.leads.map(lead => lead.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {column.leads.map((lead) => (
              <KanbanCard
                key={lead.id}
                lead={lead}
                onEdit={() => onEditLead(lead)}
                onDelete={() => onDeleteLead(lead.id)}
              />
            ))}
          </div>
        </SortableContext>

        {/* Add Lead Button */}
        <button
          onClick={() => onAddLead({})}
          className="w-full mt-3 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Lead
        </button>

        {/* Empty State */}
        {column.leads.length === 0 && !isOver && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm">Arrastra leads aquí</p>
          </div>
        )}
      </div>
    </div>
  )
}