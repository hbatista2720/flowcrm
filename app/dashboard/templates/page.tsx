'use client'

import { useState } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TemplateGallery from '@/components/templates/TemplateGallery'
import { BotTemplate } from '@/lib/templates/botTemplates'
import { createBotFromTemplate } from '@/lib/templates/templateActions'

export default function TemplatesPage() {
  const [showGallery, setShowGallery] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdBotName, setCreatedBotName] = useState('')
  const router = useRouter()

  const handleSelectTemplate = async (template: BotTemplate) => {
    setIsCreating(true)
    
    try {
      // Crear el bot desde la plantilla
      const newBot = await createBotFromTemplate(template)
      
      setCreatedBotName(newBot.name)
      setShowSuccess(true)
      
      // Redirigir al editor del bot después de 2 segundos
      setTimeout(() => {
        router.push(`/dashboard/bots/${newBot.id}`)
      }, 2000)
      
    } catch (error) {
      console.error('Error creando bot:', error)
      alert('Error al crear el bot. Inténtalo de nuevo.')
    } finally {
      setIsCreating(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Bot Creado Exitosamente!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            "{createdBotName}" ha sido creado con la configuración de la plantilla.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirigiendo al editor...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Plantillas de Bots
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Plantillas prediseñadas para empezar rápidamente
            </p>
          </div>
        </div>
      </div>

      <TemplateGallery
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onSelectTemplate={handleSelectTemplate}
        isCreating={isCreating}
      />
    </div>
  )
}