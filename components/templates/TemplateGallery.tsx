'use client'

import { useState } from 'react'
import { Download, Sparkles, X, CheckCircle } from 'lucide-react'
import { botTemplates, BotTemplate } from '@/lib/templates/botTemplates'

interface TemplateGalleryProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: BotTemplate) => void
  isCreating?: boolean
}

export default function TemplateGallery({ isOpen, onClose, onSelectTemplate, isCreating = false }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<BotTemplate | null>(null)

  const categories = [
    { id: 'all', name: 'Todas', count: botTemplates.length },
    { id: 'ventas', name: 'Ventas', count: botTemplates.filter(t => t.category === 'ventas').length },
    { id: 'agendar', name: 'Agendar', count: botTemplates.filter(t => t.category === 'agendar').length },
    { id: 'asistente', name: 'Asistente', count: botTemplates.filter(t => t.category === 'asistente').length },
    { id: 'soporte', name: 'Soporte', count: botTemplates.filter(t => t.category === 'soporte').length }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? botTemplates 
    : botTemplates.filter(template => template.category === selectedCategory)

  const handleUseTemplate = (template: BotTemplate) => {
    onSelectTemplate(template)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-purple-600" />
                Plantillas de Bots
              </h2>
              <p className="text-gray-600 mt-1">
                Plantillas de bots para inspiración - Elige una para empezar rápidamente
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar Categories */}
          <div className="w-64 border-r bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  {/* Template Image/Icon */}
                  <div className={`h-32 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                    <div className="text-4xl">{template.icon}</div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{template.features.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUseTemplate(template)
                      }}
                      disabled={isCreating}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creando...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Importar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Sparkles className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay plantillas en esta categoría
                </h3>
                <p className="text-gray-500">
                  Pronto agregaremos más plantillas para esta categoría.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-br ${selectedTemplate.gradient} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{selectedTemplate.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedTemplate.name}</h3>
                      <p className="text-white/80">{selectedTemplate.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-96">
                <h4 className="font-semibold text-gray-900 mb-3">Características incluidas:</h4>
                <div className="space-y-2 mb-6">
                  {selectedTemplate.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">💡 ¿Cómo funciona?</h5>
                  <p className="text-sm text-blue-800">
                    Al importar esta plantilla, se creará automáticamente un flujo completo con todos los nodos 
                    y conexiones necesarias. Podrás personalizarlo según tus necesidades.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t bg-gray-50 flex space-x-3">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Usar esta Plantilla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}