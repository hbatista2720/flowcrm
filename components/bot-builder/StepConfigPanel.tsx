'use client'

import { useState } from 'react'
import { MessageSquare, Bot, Zap, Clock, Calendar, Webhook, Database, Phone, X } from 'lucide-react'

interface StepConfig {
  id: string
  type: string
  title: string
  content: string
  config?: any
}

interface StepConfigPanelProps {
  step: StepConfig
  onSave: (step: StepConfig) => void
  onClose: () => void
}

export default function StepConfigPanel({ step, onSave, onClose }: StepConfigPanelProps) {
  const [editedStep, setEditedStep] = useState<StepConfig>(step)

  const getStepIcon = (type: string) => {
    const icons = {
      message: MessageSquare,
      ia: Bot,
      condition: Zap,
      delay: Clock,
      agenda: Calendar,
      voice: Phone,
      http: Webhook,
      database: Database
    }
    return icons[type as keyof typeof icons] || MessageSquare
  }

  const getStepColor = (type: string) => {
    const colors = {
      message: 'bg-blue-500',
      ia: 'bg-purple-500',
      condition: 'bg-yellow-500',
      delay: 'bg-orange-500',
      agenda: 'bg-green-500',
      voice: 'bg-indigo-500',
      http: 'bg-red-500',
      database: 'bg-gray-600'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500'
  }

  const renderConfigFields = () => {
    switch (editedStep.type) {
      case 'message':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje a enviar
              </label>
              <textarea
                value={editedStep.content}
                onChange={(e) => setEditedStep({...editedStep, content: e.target.value})}
                rows={4}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Escribe el mensaje que enviará el bot..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Puedes usar emojis y saltos de línea
              </p>
            </div>
          </div>
        )

      case 'ia':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instrucciones para la IA
              </label>
              <textarea
                value={editedStep.content}
                onChange={(e) => setEditedStep({...editedStep, content: e.target.value})}
                rows={4}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Describe cómo debe responder la IA..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Ejemplo: "Responde preguntas sobre productos de manera amigable"
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo de IA
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="gpt-3.5">GPT-3.5 (Rápido)</option>
                <option value="gpt-4">GPT-4 (Más inteligente)</option>
                <option value="claude">Claude (Conversacional)</option>
              </select>
            </div>
          </div>
        )

      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de condición
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="contains">Contiene texto</option>
                <option value="equals">Es igual a</option>
                <option value="starts">Empieza con</option>
                <option value="number">Es un número</option>
                <option value="email">Es un email</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor a comparar
              </label>
              <input
                type="text"
                value={editedStep.content}
                onChange={(e) => setEditedStep({...editedStep, content: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="precio, sí, no, etc."
              />
            </div>
          </div>
        )

      case 'delay':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de espera
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="1"
                  className="border rounded-lg px-3 py-2"
                  placeholder="5"
                />
                <select className="border rounded-lg px-3 py-2">
                  <option value="seconds">Segundos</option>
                  <option value="minutes">Minutos</option>
                  <option value="hours">Horas</option>
                  <option value="days">Días</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'agenda':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cita
              </label>
              <input
                type="text"
                value={editedStep.content}
                onChange={(e) => setEditedStep({...editedStep, content: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Consulta médica, Reunión, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (minutos)
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
                <option value="120">2 horas</option>
              </select>
            </div>
          </div>
        )

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Configuración
            </label>
            <textarea
              value={editedStep.content}
              onChange={(e) => setEditedStep({...editedStep, content: e.target.value})}
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Configuración del paso..."
            />
          </div>
        )
    }
  }

  const StepIcon = getStepIcon(editedStep.type)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 ${getStepColor(editedStep.type)} rounded-lg flex items-center justify-center mr-3`}>
                <StepIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Configurar Paso
                </h3>
                <p className="text-sm text-gray-600">
                  {editedStep.type === 'message' ? 'Mensaje' :
                   editedStep.type === 'ia' ? 'Asistente IA' :
                   editedStep.type === 'condition' ? 'Condición' :
                   editedStep.type === 'delay' ? 'Pausa' :
                   editedStep.type === 'agenda' ? 'Agendar Cita' :
                   'Configuración'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del paso
            </label>
            <input
              type="text"
              value={editedStep.title}
              onChange={(e) => setEditedStep({...editedStep, title: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Nombre descriptivo del paso"
            />
          </div>

          {renderConfigFields()}

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Consejos</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {editedStep.type === 'message' && (
                <>
                  <li>• Usa emojis para hacer el mensaje más amigable</li>
                  <li>• Mantén los mensajes cortos y claros</li>
                </>
              )}
              {editedStep.type === 'ia' && (
                <>
                  <li>• Sé específico en las instrucciones</li>
                  <li>• Define el tono de respuesta (formal, casual, etc.)</li>
                </>
              )}
              {editedStep.type === 'condition' && (
                <>
                  <li>• Usa palabras clave simples</li>
                  <li>• Considera variaciones (sí, si, yes)</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(editedStep)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}