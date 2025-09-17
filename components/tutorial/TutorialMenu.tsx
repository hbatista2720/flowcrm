'use client'

import { useState } from 'react'
import { HelpCircle, BookOpen, CheckCircle, Play, X } from 'lucide-react'
import { useTutorial } from './TutorialProvider'

export default function TutorialMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { modules, startTutorial } = useTutorial()

  const completedCount = modules.filter(m => m.completed).length
  const totalCount = modules.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <>
      {/* Tutorial Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30"
        title="Ayuda y Tutoriales"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      {/* Tutorial Menu Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                    Centro de Ayuda
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Aprende a usar FlowCRM paso a paso
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Progress Overview */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progreso General
                  </span>
                  <span className="text-sm text-gray-500">
                    {completedCount} de {totalCount} completados
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tutorial Modules */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      module.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            module.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {module.completed ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <span className="text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {module.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {module.steps.length} pasos
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm ml-11">
                          {module.description}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          startTutorial(module.id)
                          setIsOpen(false)
                        }}
                        className={`ml-4 flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          module.completed
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {module.completed ? 'Repasar' : 'Iniciar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  💡 Tip: Puedes acceder a estos tutoriales en cualquier momento
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}