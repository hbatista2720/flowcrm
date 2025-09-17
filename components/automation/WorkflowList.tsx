'use client'

import { useState } from 'react'
import { Play, Pause, Edit, Trash2, Plus, Zap, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Workflow {
  id: string
  name: string
  description: string
  isActive: boolean
  trigger: string
  lastRun?: string
  executions: number
  createdAt: string
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'WhatsApp → CRM Lead',
    description: 'Crea un lead automáticamente cuando llega un mensaje de WhatsApp',
    isActive: true,
    trigger: 'Nuevo mensaje WhatsApp',
    lastRun: '2024-01-15T10:30:00Z',
    executions: 47,
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Email de Bienvenida',
    description: 'Envía email de bienvenida cuando se crea un nuevo lead',
    isActive: true,
    trigger: 'Lead creado',
    lastRun: '2024-01-15T09:15:00Z',
    executions: 23,
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '3',
    name: 'Recordatorio de Seguimiento',
    description: 'Envía recordatorio después de 24h sin respuesta',
    isActive: false,
    trigger: 'Programado',
    executions: 12,
    createdAt: '2024-01-14T16:45:00Z'
  }
]

export default function WorkflowList() {
  const [workflows, setWorkflows] = useState(mockWorkflows)

  const toggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600' : 'text-gray-400'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automatizaciones</h1>
          <p className="text-gray-600">Crea flujos automáticos para optimizar tu trabajo</p>
        </div>
        <Link href="/dashboard/workflows/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Workflow
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Workflows Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.filter(w => w.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ejecuciones Hoy</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.reduce((sum, w) => sum + w.executions, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tiempo Ahorrado</p>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Mis Workflows</h3>
        </div>

        <div className="divide-y">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-lg font-medium text-gray-900 mr-3">
                      {workflow.name}
                    </h4>
                    <span className={`flex items-center text-sm ${getStatusColor(workflow.isActive)}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        workflow.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      {workflow.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{workflow.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      <span>{workflow.trigger}</span>
                    </div>
                    <div>
                      <span className="font-medium">{workflow.executions}</span> ejecuciones
                    </div>
                    {workflow.lastRun && (
                      <div>
                        Última: {formatDate(workflow.lastRun)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    className={`p-2 rounded-lg ${
                      workflow.isActive
                        ? 'text-orange-600 hover:bg-orange-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={workflow.isActive ? 'Pausar' : 'Activar'}
                  >
                    {workflow.isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  
                  <Link href={`/dashboard/workflows/${workflow.id}`}>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Editar">
                      <Edit className="h-5 w-5" />
                    </button>
                  </Link>
                  
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Eliminar">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {workflows.length === 0 && (
          <div className="p-12 text-center">
            <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes workflows aún
            </h3>
            <p className="text-gray-500 mb-6">
              Crea tu primer workflow para automatizar tareas repetitivas
            </p>
            <Link href="/dashboard/workflows/new">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Crear Primer Workflow
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}