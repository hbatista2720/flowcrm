'use client'

import { useState } from 'react'
import { Plus, MessageSquare, Bot, Zap, Clock, Settings, Trash2, Edit3 } from 'lucide-react'

interface FlowStep {
  id: string
  type: 'message' | 'ia' | 'condition' | 'delay' | 'action'
  title: string
  content: string
  config?: any
}

const stepTypes = [
  {
    type: 'message',
    icon: MessageSquare,
    title: 'Mensaje',
    description: 'Envía un mensaje de texto',
    color: 'bg-blue-500'
  },
  {
    type: 'ia',
    icon: Bot,
    title: 'Asistente IA',
    description: 'Respuesta inteligente con IA',
    color: 'bg-purple-500'
  },
  {
    type: 'condition',
    icon: Zap,
    title: 'Condición',
    description: 'Evalúa una condición',
    color: 'bg-yellow-500'
  },
  {
    type: 'delay',
    icon: Clock,
    title: 'Pausa',
    description: 'Espera un tiempo',
    color: 'bg-orange-500'
  }
]

export default function SimpleFlowEditor() {
  const [steps, setSteps] = useState<FlowStep[]>([
    {
      id: '1',
      type: 'message',
      title: 'Mensaje de Bienvenida',
      content: '¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte?'
    }
  ])
  
  const [editingStep, setEditingStep] = useState<FlowStep | null>(null)
  const [showStepTypes, setShowStepTypes] = useState(false)

  const addStep = (type: string) => {
    const newStep: FlowStep = {
      id: Date.now().toString(),
      type: type as any,
      title: getStepTitle(type),
      content: getDefaultContent(type)
    }
    
    setSteps([...steps, newStep])
    setShowStepTypes(false)
    setEditingStep(newStep)
  }

  const updateStep = (stepId: string, updates: Partial<FlowStep>) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ))
  }

  const deleteStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId))
  }

  const getStepTitle = (type: string) => {
    const titles = {
      message: 'Nuevo Mensaje',
      ia: 'Asistente IA',
      condition: 'Nueva Condición',
      delay: 'Pausa'
    }
    return titles[type as keyof typeof titles] || 'Nuevo Paso'
  }

  const getDefaultContent = (type: string) => {
    const defaults = {
      message: 'Escribe tu mensaje aquí...',
      ia: 'Responde de manera útil y amigable',
      condition: 'Si el mensaje contiene...',
      delay: '5 segundos'
    }
    return defaults[type as keyof typeof defaults] || ''
  }

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(t => t.type === type)
    return stepType ? stepType.icon : MessageSquare
  }

  const getStepColor = (type: string) => {
    const stepType = stepTypes.find(t => t.type === type)
    return stepType ? stepType.color : 'bg-gray-500'
  }

  return (
    <div className="h-full flex">
      {/* Main Flow Area */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Flujo de Conversación
            </h2>
            <p className="text-gray-600">
              Configura paso a paso cómo responderá tu bot
            </p>
          </div>

          {/* Flow Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const StepIcon = getStepIcon(step.type)
              
              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0 mr-4">
                        <div className={`w-10 h-10 ${getStepColor(step.type)} rounded-lg flex items-center justify-center`}>
                          <StepIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-center mt-1">
                          <span className="text-xs text-gray-500">{index + 1}</span>
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{step.title}</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingStep(step)}
                              className="text-gray-400 hover:text-blue-600"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteStep(step.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-sm text-gray-700">{step.content}</p>
                        </div>

                        {/* Step Type Badge */}
                        <div className="mt-2 flex items-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            {stepTypes.find(t => t.type === step.type)?.title}
                          </span>
                          {step.type === 'ia' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-600 ml-2">
                              <Bot className="h-3 w-3 mr-1" />
                              IA
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next step */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-0.5 h-6 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Add Step Button */}
            <div className="text-center py-4">
              <button
                onClick={() => setShowStepTypes(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Paso
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step Types Modal */}
      {showStepTypes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Paso</h3>
              
              <div className="space-y-3">
                {stepTypes.map((stepType) => {
                  const Icon = stepType.icon
                  return (
                    <button
                      key={stepType.type}
                      onClick={() => addStep(stepType.type)}
                      className="w-full flex items-center p-3 rounded-lg border hover:bg-gray-50 text-left"
                    >
                      <div className={`w-10 h-10 ${stepType.color} rounded-lg flex items-center justify-center mr-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{stepType.title}</h4>
                        <p className="text-sm text-gray-500">{stepType.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowStepTypes(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Step Modal */}
      {editingStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Editar {stepTypes.find(t => t.type === editingStep.type)?.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del paso
                  </label>
                  <input
                    type="text"
                    value={editingStep.title}
                    onChange={(e) => setEditingStep({...editingStep, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {editingStep.type === 'message' ? 'Mensaje' : 
                     editingStep.type === 'ia' ? 'Instrucciones para la IA' :
                     editingStep.type === 'condition' ? 'Condición' : 'Configuración'}
                  </label>
                  <textarea
                    value={editingStep.content}
                    onChange={(e) => setEditingStep({...editingStep, content: e.target.value})}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder={
                      editingStep.type === 'message' ? 'Escribe el mensaje que enviará el bot...' :
                      editingStep.type === 'ia' ? 'Describe cómo debe responder la IA...' :
                      editingStep.type === 'condition' ? 'Describe la condición a evaluar...' :
                      'Configuración del paso...'
                    }
                  />
                </div>

                {/* Configuraciones específicas por tipo */}
                {editingStep.type === 'delay' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de espera
                    </label>
                    <select 
                      className="w-full border rounded-lg px-3 py-2"
                      onChange={(e) => setEditingStep({...editingStep, content: e.target.value})}
                    >
                      <option value="5 segundos">5 segundos</option>
                      <option value="10 segundos">10 segundos</option>
                      <option value="30 segundos">30 segundos</option>
                      <option value="1 minuto">1 minuto</option>
                      <option value="5 minutos">5 minutos</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingStep(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    updateStep(editingStep.id, editingStep)
                    setEditingStep(null)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}