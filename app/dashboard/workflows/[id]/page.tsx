'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Play, Pause, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import WorkflowEditor from '@/components/workflow-builder/WorkflowEditor'

export default function EditWorkflowPage({ params }: { params: { id: string } }) {
  const [workflowName, setWorkflowName] = useState('WhatsApp → CRM Lead')
  const [workflowDescription, setWorkflowDescription] = useState('Crea un lead automáticamente cuando llega un mensaje de WhatsApp')
  const [isActive, setIsActive] = useState(true)
  const [showStats, setShowStats] = useState(false)

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <div className="flex items-center">
              <input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-none outline-none"
              />
              <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <input
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              placeholder="Descripción del workflow..."
              className="block text-sm text-gray-600 bg-transparent border-none outline-none mt-1"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Estadísticas
          </button>

          <button className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50">
            <Play className="h-4 w-4 mr-2" />
            Probar
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              isActive
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isActive ? 'Pausar' : 'Activar'}
          </button>

          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </button>
        </div>
      </header>

      {/* Stats Panel */}
      {showStats && (
        <div className="bg-gray-50 border-b px-6 py-4">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Ejecuciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Éxito</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3s</div>
              <div className="text-sm text-gray-600">Tiempo promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5 min</div>
              <div className="text-sm text-gray-600">Última ejecución</div>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1">
        <WorkflowEditor />
      </div>
    </div>
  )
}