'use client'

import { useState } from 'react'
import { ArrowLeft, Sparkles, Bot } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TemplateGallery from '@/components/templates/TemplateGallery'
import { BotTemplate } from '@/lib/templates/botTemplates'

export default function CreateBotPage() {
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedOption, setSelectedOption] = useState<'template' | 'scratch' | null>(null)
  const router = useRouter()

  const handleSelectTemplate = (template: BotTemplate) => {
    console.log('Creando bot con plantilla:', template)
    router.push(`/dashboard/bots/1?template=${template.id}`)
  }

  const handleCreateFromScratch = () => {
    router.push('/dashboard/bots/1')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Crear Nuevo Bot</h1>
            <p className="text-sm text-gray-600">Elige cómo quieres empezar</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className={`bg-white rounded-lg shadow-lg p-8 cursor-pointer transition-all hover:shadow-xl border-2 ${
              selectedOption === 'template' ? 'border-purple-500 bg-purple-50' : 'border-transparent'
            }`}
            onClick={() => {
              setSelectedOption('template')
              setShowTemplates(true)
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Usar Plantilla
              </h2>
              
              <p className="text-gray-600 mb-6">
                Comienza con plantillas prediseñadas para casos de uso comunes como ventas, 
                agendamiento y asistencia personal.
              </p>

              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium">
                Ver Plantillas
              </button>
            </div>
          </div>

          <div 
            className={`bg-white rounded-lg shadow-lg p-8 cursor-pointer transition-all hover:shadow-xl border-2 ${
              selectedOption === 'scratch' ? 'border-blue-500 bg-blue-50' : 'border-transparent'
            }`}
            onClick={() => {
              setSelectedOption('scratch')
              handleCreateFromScratch()
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Desde Cero
              </h2>
              
              <p className="text-gray-600 mb-6">
                Crea tu bot completamente personalizado usando nuestro editor visual. 
                Perfecto para casos de uso específicos.
              </p>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Empezar a Crear
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Plantillas Más Populares
          </h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'Ventas', icon: '💼', gradient: 'from-blue-500 to-purple-600' },
              { name: 'Agendar', icon: '📅', gradient: 'from-green-500 to-blue-600' },
              { name: 'Asistente', icon: '🤖', gradient: 'from-indigo-500 to-purple-600' },
              { name: 'Soporte', icon: '🎧', gradient: 'from-orange-500 to-red-600' }
            ].map((template, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowTemplates(true)}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${template.gradient} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-xl">{template.icon}</span>
                </div>
                <h4 className="font-medium text-gray-900">{template.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TemplateGallery 
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  )
}