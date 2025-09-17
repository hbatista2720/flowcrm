'use client'

import { useState } from 'react'
import { X, Bot, Sparkles, Save } from 'lucide-react'

interface AIConfig {
  enabled: boolean
  provider: string
  model: string
  systemPrompt: string
  temperature: number
  maxTokens: number
  fallbackMessage: string
}

interface AIConfigModalProps {
  isOpen: boolean
  onClose: () => void
  config: AIConfig
  onSave: (config: AIConfig) => void
}

const promptTemplates = [
  {
    name: 'Asistente de Ventas',
    prompt: `Eres un asistente de ventas profesional y amigable para una empresa. Tu objetivo es:

1. Saludar cordialmente a los clientes
2. Identificar sus necesidades específicas
3. Ofrecer productos/servicios relevantes
4. Responder dudas sobre precios, características y disponibilidad
5. Guiar hacia la compra de manera natural, sin ser agresivo
6. Proporcionar información de contacto cuando sea necesario

Mantén un tono profesional pero cercano. Usa emojis ocasionalmente para ser más amigable. Si no sabes algo específico, deriva al equipo de ventas.`
  },
  {
    name: 'Soporte al Cliente',
    prompt: `Eres un especialista en soporte al cliente empático y eficiente. Tu función es:

1. Escuchar y entender el problema del cliente
2. Ofrecer soluciones paso a paso
3. Ser paciente y comprensivo
4. Proporcionar información clara y precisa
5. Escalar a un humano cuando sea necesario
6. Seguir up para asegurar satisfacción

Siempre mantén un tono empático y profesional. Prioriza resolver el problema del cliente de manera rápida y efectiva.`
  },
  {
    name: 'Recepcionista Virtual',
    prompt: `Eres una recepcionista virtual profesional y organizada. Tus responsabilidades incluyen:

1. Dar la bienvenida a visitantes/clientes
2. Dirigir consultas al departamento correcto
3. Agendar citas y reuniones
4. Proporcionar información general de la empresa
5. Tomar mensajes cuando sea necesario
6. Mantener un registro de interacciones

Sé siempre cortés, eficiente y organizada. Ayuda a los clientes a encontrar exactamente lo que necesitan.`
  }
]

export default function AIConfigModal({ isOpen, onClose, config, onSave }: AIConfigModalProps) {
  const [localConfig, setLocalConfig] = useState<AIConfig>(config)

  const handleSave = () => {
    onSave(localConfig)
    onClose()
  }

  const applyTemplate = (template: typeof promptTemplates[0]) => {
    setLocalConfig({
      ...localConfig,
      systemPrompt: template.prompt
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Configuración de IA
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Personaliza cómo se comporta tu asistente de IA
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Templates */}
          <div className="w-1/3 border-r dark:border-gray-700 p-6 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Plantillas de Prompts
            </h3>
            
            <div className="space-y-3">
              {promptTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="w-full text-left p-3 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {template.prompt.substring(0, 100)}...
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                💡 Consejos para Prompts
              </h4>
              <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Sé específico sobre el rol y objetivos</li>
                <li>• Define el tono de comunicación</li>
                <li>• Incluye ejemplos de respuestas</li>
                <li>• Establece límites y escalaciones</li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Configuration */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Enable AI Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Habilitar Asistente IA
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permite que la IA responda automáticamente
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localConfig.enabled}
                    onChange={(e) => setLocalConfig({...localConfig, enabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {localConfig.enabled && (
                <>
                  {/* Provider Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Proveedor de IA
                    </label>
                    <select
                      value={localConfig.provider}
                      onChange={(e) => setLocalConfig({...localConfig, provider: e.target.value})}
                      className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="openai">OpenAI (ChatGPT)</option>
                      <option value="anthropic">Anthropic (Claude)</option>
                      <option value="google">Google (Gemini)</option>
                      <option value="local">Simulado (Para pruebas)</option>
                    </select>
                  </div>

                  {/* Model Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Modelo
                    </label>
                    <select
                      value={localConfig.model}
                      onChange={(e) => setLocalConfig({...localConfig, model: e.target.value})}
                      className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="gpt-4">GPT-4</option>
                      <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                      <option value="gemini-pro">Gemini Pro</option>
                    </select>
                  </div>

                  {/* System Prompt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prompt del Sistema (Personalidad del Bot)
                    </label>
                    <textarea
                      value={localConfig.systemPrompt}
                      onChange={(e) => setLocalConfig({...localConfig, systemPrompt: e.target.value})}
                      rows={12}
                      className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      placeholder="Describe cómo quieres que se comporte tu asistente de IA..."
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Define la personalidad, tono y comportamiento de tu asistente
                    </p>
                  </div>

                  {/* Advanced Settings */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Creatividad (Temperature): {localConfig.temperature}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={localConfig.temperature}
                        onChange={(e) => setLocalConfig({...localConfig, temperature: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Preciso</span>
                        <span>Creativo</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Máximo de Tokens
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="2000"
                        value={localConfig.maxTokens}
                        onChange={(e) => setLocalConfig({...localConfig, maxTokens: parseInt(e.target.value)})}
                        className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Fallback Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensaje de Respaldo (cuando la IA no puede responder)
                    </label>
                    <input
                      type="text"
                      value={localConfig.fallbackMessage}
                      onChange={(e) => setLocalConfig({...localConfig, fallbackMessage: e.target.value})}
                      className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Lo siento, no pude entender tu consulta. ¿Podrías reformularla?"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  )
}