'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Play } from 'lucide-react'
import Link from 'next/link'
import WorkflowEditor from '@/components/workflow-builder/WorkflowEditor'

export default function NewWorkflowPage() {
  const [workflowName, setWorkflowName] = useState('Nuevo Workflow')
  const [workflowDescription, setWorkflowDescription] = useState('')

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none outline-none"
            />
            <input
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              placeholder="Descripción del workflow..."
              className="block text-sm text-gray-600 bg-transparent border-none outline-none mt-1"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50">
            <Play className="h-4 w-4 mr-2" />
            Probar
          </button>

          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="flex-1">
        <WorkflowEditor />
      </div>
    </div>
  )
}