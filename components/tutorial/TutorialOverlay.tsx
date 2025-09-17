'use client'

import { useEffect, useState } from 'react'
import { X, ArrowLeft, ArrowRight, SkipForward, CheckCircle } from 'lucide-react'
import { useTutorial } from './TutorialProvider'

export default function TutorialOverlay() {
  const { 
    currentModule, 
    currentStep, 
    isActive, 
    modules, 
    nextStep, 
    prevStep, 
    skipTutorial 
  } = useTutorial()

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({})

  const currentModuleData = modules.find(m => m.id === currentModule)
  const currentStepData = currentModuleData?.steps[currentStep]

  useEffect(() => {
    if (!isActive || !currentStepData?.target) {
      setTargetElement(null)
      return
    }

    const element = document.querySelector(currentStepData.target) as HTMLElement
    if (element) {
      setTargetElement(element)
      
      const rect = element.getBoundingClientRect()
      setOverlayStyle({
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
      })

      // Scroll to element
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }, [isActive, currentStepData, currentStep])

  if (!isActive || !currentModuleData || !currentStepData) {
    return null
  }

  const progress = ((currentStep + 1) / currentModuleData.steps.length) * 100

  return (
    <>
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Highlight Target Element */}
      {targetElement && (
        <div
          className="fixed border-4 border-blue-500 rounded-lg z-50 pointer-events-none"
          style={overlayStyle}
        />
      )}

      {/* Tutorial Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 z-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentModuleData.name}
            </h3>
            <p className="text-sm text-gray-500">
              Paso {currentStep + 1} de {currentModuleData.steps.length}
            </p>
          </div>
          <button
            onClick={skipTutorial}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-3">
            {currentStepData.title}
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Action Hint */}
        {currentStepData.action && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 {currentStepData.action === 'click' ? 'Haz clic en el elemento resaltado' : 
                   currentStepData.action === 'hover' ? 'Pasa el mouse sobre el elemento resaltado' : 
                   'Observa el elemento resaltado'}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </button>

          <div className="flex space-x-2">
            <button
              onClick={skipTutorial}
              className="flex items-center px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Saltar
            </button>

            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentStep === currentModuleData.steps.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completar
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}