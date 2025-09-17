'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Play, Settings, Bot } from 'lucide-react'
import Link from 'next/link'
import SimpleFlowEditor from '@/components/bot-builder/SimpleFlowEditor'
import AIConfigModal from '@/components/bot-builder/AIConfigModal'

export default function BotEditorPage({ params }: { params: { id: string } }) {
  const [botName, setBotName] = useState('Bot de Ventas')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [showAIConfig, setShowAIConfig] = useState(false)
  const [aiConfig, setAiConfig] = useState({
    enabled: true,
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    systemPrompt: 'Eres un asistente de ventas profesional y amigable. Ayudas a los clientes a encontrar productos, respondes preguntas sobre precios y características, y guías hacia la compra de manera natural sin ser agresivo.',
    temperature: 0.7,
    maxTokens: 500,
    fallbackMessage: 'Lo siento, no pude entender tu consulta. ¿Podrías reformularla o contactar a nuestro equipo de soporte?'
  })

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <input
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="text-xl font-semibold bg-transparent border-none outline-none"
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
          >
            <Play className="h-4 w-4 mr-2" />
            Preview
          </button>
          
          <button
            onClick={() => setShowAIConfig(true)}
            className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300"
          >
            <Bot className="h-4 w-4 mr-2" />
            Configurar IA
          </button>
          
          <Link href={`/dashboard/bots/${params.id}/whatsapp`}>
            <button className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600">
              <Settings className="h-4 w-4 mr-2" />
              WhatsApp
            </button>
          </Link>

          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="flex-1">
        <SimpleFlowEditor />
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Preview del Bot</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 p-4 bg-gray-50">
              <div className="bg-green-500 text-white p-3 rounded-lg mb-4 max-w-[80%]">
                ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?
              </div>
              
              <div className="bg-white p-3 rounded-lg mb-4 max-w-[80%] ml-auto">
                Hola, me interesa información sobre sus servicios
              </div>
              
              <div className="bg-green-500 text-white p-3 rounded-lg mb-4 max-w-[80%]">
                Perfecto! Te puedo ayudar con información sobre nuestros servicios. ¿Qué tipo de servicio te interesa?
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 border rounded-l-lg px-3 py-2"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-r-lg">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Configuration Modal */}
      <AIConfigModal
        isOpen={showAIConfig}
        onClose={() => setShowAIConfig(false)}
        config={aiConfig}
        onSave={(newConfig) => {
          setAiConfig(newConfig)
          console.log('Configuración de IA guardada:', newConfig)
        }}
      />
    </div>
  )
}