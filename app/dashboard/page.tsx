'use client'

import { useState, useEffect } from 'react'
import { Bot, MessageSquare, Users, BarChart3, Plus, Settings, Bell, Sparkles } from 'lucide-react'
import Link from 'next/link'
import NotionKanban from '@/components/kanban/NotionKanban'
import LeadStats from '@/components/crm/LeadStats'
import InboxLayout from '@/components/inbox/InboxLayout'
import WorkflowList from '@/components/automation/WorkflowList'
import UserMenu from '@/components/auth/UserMenu'
import WelcomeModal from '@/components/onboarding/WelcomeModal'
import TemplateGallery from '@/components/templates/TemplateGallery'
import ChatbotTester from '@/components/chatbot-test/ChatbotTester'
import QRConnection from '@/components/whatsapp/QRConnection'
import { getAllUserBots, createBotFromTemplate } from '@/lib/templates/templateActions'

export default function DashboardPage({ searchParams }: { searchParams: { tab?: string } }) {
  const [activeTab, setActiveTab] = useState(searchParams.tab || 'bots')

  return (
    <div className="h-full">
      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {[
            { id: 'bots', label: 'Bots', icon: Bot },
            { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
            { id: 'flows', label: 'Automatizaciones', icon: BarChart3 },
            { id: 'inbox', label: 'Inbox', icon: MessageSquare },
            { id: 'pipeline', label: 'Pipeline', icon: Users },
            { id: 'test', label: 'Probar IA', icon: Settings }
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
        {activeTab === 'whatsapp' && <WhatsAppSection />}
        {activeTab === 'flows' && <FlowsSection />}
        {activeTab === 'inbox' && <InboxSection />}
        {activeTab === 'pipeline' && <PipelineSection />}
        {activeTab === 'test' && <TestSection />}
      </div>
      
      <WelcomeModal />
    </div>
  )
}

function BotsSection() {
  const [showTemplates, setShowTemplates] = useState(false)
  const [userBots, setUserBots] = useState<any[]>([])

  useEffect(() => {
    // Cargar bots del usuario
    const bots = getAllUserBots()
    setUserBots(bots)
  }, [])

  const handleSelectTemplate = async (template: any) => {
    try {
      const newBot = await createBotFromTemplate(template)
      // Actualizar la lista de bots
      setUserBots(prev => [...prev, newBot])
      setShowTemplates(false)
    } catch (error) {
      console.error('Error creando bot:', error)
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
          <Link href="/dashboard/bots/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Crear Bot
            </button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bots creados por el usuario */}
        {userBots.map((bot) => (
          <Link key={bot.id} href={`/dashboard/bots/${bot.id}`} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition-shadow bot-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bot.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Activo
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
          <Link href="/dashboard/bots/1" className="block">
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
              <Link href="/dashboard/bots/create" className="block">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Desde Cero
                </button>
              </Link>
            </div>
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

function FlowsSection() {
  return (
    <div className="h-full">
      <WorkflowList />
    </div>
  )
}

function InboxSection() {
  return (
    <div className="h-full">
      <InboxLayout />
    </div>
  )
}

function PipelineSection() {
  return (
    <div className="h-full">
      <LeadStats />
      <NotionKanban />
    </div>
  )
}

function WhatsAppSection() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Conexión WhatsApp</h1>
        <p className="text-gray-600">Conecta tu WhatsApp Business para recibir y enviar mensajes reales</p>
      </div>
      <QRConnection botId="main" />
    </div>
  )
}

function TestSection() {
  return (
    <div className="h-full">
      <ChatbotTester />
    </div>
  )
}