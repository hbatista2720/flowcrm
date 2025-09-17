'use client'

import { useState, useEffect } from 'react'
import { Rocket, CheckCircle, ArrowRight, X } from 'lucide-react'
import { useTutorial } from '../tutorial/TutorialProvider'

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { startTutorial } = useTutorial()

  useEffect(() => {
    // Mostrar modal de bienvenida solo para nuevos usuarios
    const hasSeenWelcome = localStorage.getItem('flowcrm-welcome-seen')
    if (!hasSeenWelcome) {
      setIsOpen(true)
    }
  }, [])

  const handleStartTutorial = () => {
    localStorage.setItem('flowcrm-welcome-seen', 'true')
    startTutorial('getting-started')
    setIsOpen(false)
  }

  const handleSkip = () => {
    localStorage.setItem('flowcrm-welcome-seen', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="p-6 text-center border-b">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido a FlowCRM!
          </h2>
          <p className="text-gray-600">
            Tu plataforma todo-en-uno para automatizar conversaciones y gestionar leads
          </p>
        </div>

        {/* Features */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Crea Bots Sin Código</h3>
                <p className="text-sm text-gray-600">Editor visual drag & drop para crear bots conversacionales</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">WhatsApp Integrado</h3>
                <p className="text-sm text-gray-600">Conecta tu WhatsApp con código QR en segundos</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">CRM Visual</h3>
                <p className="text-sm text-gray-600">Pipeline Kanban para gestionar leads eficientemente</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Automatizaciones</h3>
                <p className="text-sm text-gray-600">Flujos automáticos para optimizar tu trabajo</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">🎯 Tutorial Interactivo</h4>
            <p className="text-sm text-blue-800">
              Te guiaremos paso a paso para que aproveches al máximo todas las funcionalidades.
              ¡Solo toma 5 minutos!
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t bg-gray-50 flex space-x-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Explorar por mi cuenta
          </button>
          <button
            onClick={handleStartTutorial}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
          >
            Iniciar Tutorial
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}