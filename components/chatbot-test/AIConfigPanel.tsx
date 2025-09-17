'use client'

import { useState } from 'react'
import { X, Key, Thermometer, Hash, FileText, Sparkles } from 'lucide-react'
import { aiProviders, AIConfig } from '@/lib/ai/providers'

interface AIConfigPanelProps {
  config: AIConfig
  onConfigChange: (config: AIConfig) => void
  onClose: () => void
}

export default function AIConfigPanel({ config, onConfigChange, onClose }: AIConfigPanelProps) {
  const [localConfig, setLocalConfig] = useState<AIConfig>(config)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleSave = () => {
    onConfigChange(localConfig)
    onClose()
  }

  const getCurrentProvider = () => {
    return aiProviders.find(p => p.id === localConfig.provider)
  }

  const getAvailableModels = () => {
    return getCurrentProvider()?.models || []
  }

  const systemPromptTemplates = [
    {
      name: 'Asistente CRM',
      prompt: 'Eres un asistente virtual especializado en CRM. Ayudas a los usuarios con gestión de leads, ventas y atención al cliente. Responde de manera profesional y útil.'
    },
    {
      name: 'Soporte Técnico',
      prompt: 'Eres un especialista en soporte técnico. Ayudas a resolver problemas, explicas funcionalidades y guías a los usuarios paso a paso.'
    },
    {
      name: 'Ventas',
      prompt: 'Eres un asistente de ventas experto. Ayudas a calificar leads, proporcionar información de productos y cerrar ventas de manera efectiva.'
    },
    {
      name: 'Atención al Cliente',
      prompt: 'Eres un agente de atención al cliente amigable y empático. Resuelves consultas, manejas quejas y brindas excelente servicio.'
    }
  ]

  return (
    <div className="w-96 bg-white border-l shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Configuración de IA</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Provider Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Proveedor de IA
          </label>
          <div className="space-y-2">
            {aiProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => setLocalConfig({
                  ...localConfig,
                  provider: provider.id,
                  model: provider.models[0]
                })}
                className={`w-full flex items-center p-3 rounded-lg border text-left transition-colors ${
                  localConfig.provider === provider.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 ${provider.color} rounded-lg flex items-center justify-center mr-3`}>
                  <span className="text-xl">{provider.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{provider.name}</h4>
                  <p className="text-xs text-gray-500">{provider.description}</p>
                </div>
                {provider.requiresApiKey && (
                  <Key className="h-4 w-4 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo
          </label>
          <select
            value={localConfig.model}
            onChange={(e) => setLocalConfig({...localConfig, model: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          >
            {getAvailableModels().map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* API Key */}
        {getCurrentProvider()?.requiresApiKey && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={localConfig.apiKey || ''}
                onChange={(e) => setLocalConfig({...localConfig, apiKey: e.target.value})}
                placeholder="Ingresa tu API key..."
                className="w-full border rounded-lg px-3 py-2 pr-10"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tu API key se almacena localmente y no se comparte
            </p>
          </div>
        )}

        {/* System Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Prompt del Sistema
            </label>
            <div className="relative">
              <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Plantillas
              </button>
            </div>
          </div>
          
          {/* Template Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {systemPromptTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => setLocalConfig({...localConfig, systemPrompt: template.prompt})}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
              >
                {template.name}
              </button>
            ))}
          </div>
          
          <textarea
            value={localConfig.systemPrompt}
            onChange={(e) => setLocalConfig({...localConfig, systemPrompt: e.target.value})}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="Define cómo debe comportarse la IA..."
          />
        </div>

        {/* Temperature */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Thermometer className="h-4 w-4 inline mr-1" />
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
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Preciso</span>
            <span>Creativo</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Hash className="h-4 w-4 inline mr-1" />
            Máximo de Tokens
          </label>
          <input
            type="number"
            min="50"
            max="4000"
            step="50"
            value={localConfig.maxTokens}
            onChange={(e) => setLocalConfig({...localConfig, maxTokens: parseInt(e.target.value)})}
            className="w-full border rounded-lg px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Controla la longitud de las respuestas
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}