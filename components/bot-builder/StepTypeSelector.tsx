'use client'

import { MessageSquare, Bot, Zap, Clock, Calendar, Webhook, Database, Phone } from 'lucide-react'

interface StepType {
  id: string
  title: string
  description: string
  icon: any
  color: string
  category: 'basic' | 'advanced' | 'integrations'
  examples: string[]
}

const stepTypes: StepType[] = [
  // Básicos
  {
    id: 'message',
    title: 'Mensaje',
    description: 'Envía un mensaje de texto al usuario',
    icon: MessageSquare,
    color: 'bg-blue-500',
    category: 'basic',
    examples: ['¡Hola! ¿En qué puedo ayudarte?', 'Gracias por contactarnos', 'Aquí tienes la información']
  },
  {
    id: 'ia',
    title: 'Asistente IA',
    description: 'Respuesta inteligente usando IA',
    icon: Bot,
    color: 'bg-purple-500',
    category: 'basic',
    examples: ['Responde preguntas sobre productos', 'Ayuda con soporte técnico', 'Asistente personal']
  },
  {
    id: 'condition',
    title: 'Condición',
    description: 'Evalúa el mensaje y toma decisiones',
    icon: Zap,
    color: 'bg-yellow-500',
    category: 'basic',
    examples: ['Si contiene "precio"', 'Si es un número', 'Si dice "sí" o "no"']
  },
  {
    id: 'delay',
    title: 'Pausa',
    description: 'Espera un tiempo antes del siguiente paso',
    icon: Clock,
    color: 'bg-orange-500',
    category: 'basic',
    examples: ['5 segundos', '1 minuto', '1 hora']
  },
  
  // Avanzados
  {
    id: 'agenda',
    title: 'Agendar Cita',
    description: 'Permite al usuario agendar una cita',
    icon: Calendar,
    color: 'bg-green-500',
    category: 'advanced',
    examples: ['Agendar consulta médica', 'Reservar mesa', 'Programar reunión']
  },
  {
    id: 'voice',
    title: 'Nota de Voz',
    description: 'Procesa y responde a notas de voz',
    icon: Phone,
    color: 'bg-indigo-500',
    category: 'advanced',
    examples: ['Transcribir audio', 'Responder a voz', 'Guardar nota de voz']
  },
  
  // Integraciones
  {
    id: 'http',
    title: 'API Externa',
    description: 'Conecta con servicios externos',
    icon: Webhook,
    color: 'bg-red-500',
    category: 'integrations',
    examples: ['Consultar inventario', 'Verificar datos', 'Enviar a CRM']
  },
  {
    id: 'database',
    title: 'Base de Datos',
    description: 'Guarda o consulta información',
    icon: Database,
    color: 'bg-gray-600',
    category: 'integrations',
    examples: ['Guardar lead', 'Consultar historial', 'Actualizar datos']
  }
]

interface StepTypeSelectorProps {
  onSelect: (stepType: StepType) => void
  onClose: () => void
}

export default function StepTypeSelector({ onSelect, onClose }: StepTypeSelectorProps) {
  const categories = [
    { id: 'basic', name: 'Básicos', description: 'Pasos esenciales para tu bot' },
    { id: 'advanced', name: 'Avanzados', description: 'Funcionalidades especializadas' },
    { id: 'integrations', name: 'Integraciones', description: 'Conecta con otros servicios' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Agregar Nuevo Paso
          </h2>
          <p className="text-gray-600">
            Elige el tipo de paso que quieres agregar a tu flujo
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stepTypes
                  .filter(step => step.category === category.id)
                  .map((stepType) => {
                    const Icon = stepType.icon
                    return (
                      <button
                        key={stepType.id}
                        onClick={() => onSelect(stepType)}
                        className="p-4 border rounded-lg hover:shadow-md transition-all text-left hover:border-blue-300"
                      >
                        <div className="flex items-start mb-3">
                          <div className={`w-10 h-10 ${stepType.color} rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1">{stepType.title}</h4>
                            <p className="text-sm text-gray-600">{stepType.description}</p>
                          </div>
                        </div>

                        {/* Examples */}
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">Ejemplos:</p>
                          <div className="space-y-1">
                            {stepType.examples.slice(0, 2).map((example, index) => (
                              <div key={index} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                                {example}
                              </div>
                            ))}
                          </div>
                        </div>
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}