'use client'

import { useState, useEffect } from 'react'
import { Bot, MessageSquare, Users, BarChart3, Plus, Settings, Bell, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bots')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-full flex items-center justify-center">Cargando...</div>
  }

  return (
    <div className="h-full">
      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'bots', label: 'Bots', icon: Bot },
            { id: 'flows', label: 'Automatizaciones', icon: BarChart3 },
            { id: 'inbox', label: 'Inbox', icon: MessageSquare },
            { id: 'pipeline', label: 'Pipeline', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content Area */}
      <div className="h-full">
        {activeTab === 'bots' && <BotsSection />}
        {activeTab === 'flows' && <FlowsSection />}
        {activeTab === 'inbox' && <InboxSection />}
        {activeTab === 'pipeline' && <PipelineSection />}
      </div>
      

    </div>
  )
}

function BotsSection() {
  const [showTemplates, setShowTemplates] = useState(false)
  const [userBots, setUserBots] = useState<any[]>([])

  useEffect(() => {
    // Cargar bots del localStorage
    const savedBots = localStorage.getItem('userBots')
    if (savedBots) {
      setUserBots(JSON.parse(savedBots))
    }
  }, [])

  useEffect(() => {
    // Guardar bots en localStorage
    localStorage.setItem('userBots', JSON.stringify(userBots))
  }, [userBots])

  const handleSelectTemplate = async (template: any) => {
    try {
      const newBot = {
        id: Date.now().toString(),
        name: template.name || 'Nuevo Bot',
        description: template.description || 'Bot creado desde plantilla',
        template: template.id,
        whatsappConnected: false,
        status: 'offline',
        aiEnabled: true
      }
      
      setUserBots(prev => [...prev, newBot])
      setShowTemplates(false)
      alert(`Bot "${template.name}" creado exitosamente`)
    } catch (error) {
      console.error('Error creando bot:', error)
      alert('Error al crear el bot')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Bots</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowTemplates(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Plantillas
          </button>
          <button 
            onClick={() => {
              const newBot = {
                id: Date.now().toString(),
                name: 'Nuevo Bot',
                description: 'Bot personalizado',
                template: 'custom',
                whatsappConnected: false,
                status: 'offline',
                aiEnabled: true
              }
              setUserBots(prev => [...prev, newBot])
              alert('Bot creado exitosamente')
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Bot
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bots creados por el usuario */}
        {userBots.map((bot) => (
          <Link key={bot.id} href={`/dashboard/bots/${bot.id}`} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow bot-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bot.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  bot.whatsappConnected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {bot.whatsappConnected ? 'Conectado' : 'Offline'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{bot.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Bot className="h-4 w-4 mr-1" />
                <span>Creado desde plantilla</span>
              </div>
            </div>
          </Link>
        ))}
        
        {/* Bot de ejemplo si no hay bots creados */}
        {userBots.length === 0 && (
          <Link href="/dashboard/bots/demo" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow bot-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bot de Ejemplo</h3>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Demo
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Bot de demostración para probar el editor</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>Editor visual</span>
              </div>
            </div>
          </Link>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-center">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Crear nuevo bot</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Comienza con una plantilla o desde cero</p>
            <div className="space-y-2">
              <button 
                onClick={() => setShowTemplates(true)}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center justify-center"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Usar Plantilla
              </button>
              <button 
                onClick={() => {
                  const newBot = {
                    id: Date.now().toString(),
                    name: 'Nuevo Bot',
                    description: 'Bot creado desde cero',
                    template: 'custom',
                    whatsappConnected: false,
                    status: 'offline',
                    aiEnabled: true
                  }
                  setUserBots(prev => [...prev, newBot])
                  alert('Bot creado exitosamente')
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Desde Cero
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Plantillas Disponibles</h3>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  handleSelectTemplate({ id: 'ventas', name: 'Bot de Ventas', description: 'Bot especializado en ventas' })
                }}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="font-medium">Bot de Ventas</div>
                <div className="text-sm text-gray-600">Especializado en calificación de leads</div>
              </button>
              <button 
                onClick={() => {
                  handleSelectTemplate({ id: 'soporte', name: 'Bot de Soporte', description: 'Bot de atención al cliente' })
                }}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="font-medium">Bot de Soporte</div>
                <div className="text-sm text-gray-600">Atención al cliente 24/7</div>
              </button>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowTemplates(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FlowsSection() {
  return (
    <div className="h-full">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Automatizaciones</h2>
        <p className="text-gray-600">Sección en construcción...</p>
      </div>
    </div>
  )
}

function InboxSection() {
  return (
    <div className="h-full">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Inbox</h2>
        <p className="text-gray-600">Sección en construcción...</p>
      </div>
    </div>
  )
}

function PipelineSection() {
  return (
    <div className="h-full">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Pipeline</h2>
        <p className="text-gray-600">Sección en construcción...</p>
      </div>
    </div>
  )
}

