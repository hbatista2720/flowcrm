'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import PricingPlans from '@/components/subscription/PricingPlans'
import ThemeToggle from '@/components/layout/ThemeToggle'

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile')

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />
      case 'subscription':
        return <SubscriptionSection />
      case 'api':
        return <APISection />
      case 'terms':
        return <TermsSection />
      case 'recommendations':
        return <RecommendationsSection />
      case 'theme':
        return <ThemeSection />
      default:
        return <ProfileSection />
    }
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <ProfileSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {getSectionTitle(activeSection)}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles = {
    profile: 'Perfil',
    subscription: 'Suscripción',
    api: 'Administrar API',
    terms: 'Términos y Privacidad',
    recommendations: 'Recomendaciones de Uso',
    theme: 'Configuración de Tema'
  }
  return titles[section as keyof typeof titles] || 'Perfil'
}

function ProfileSection() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Información del Perfil
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="tu@email.com"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}

function SubscriptionSection() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestionar Suscripción
          </h2>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Gestionar suscripción
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>
      <PricingPlans />
    </div>
  )
}

function APISection() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Administrar API
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              API Key
            </label>
            <div className="flex">
              <input
                type="password"
                value="sk-1234567890abcdef"
                readOnly
                className="flex-1 border dark:border-gray-600 rounded-l-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Copiar
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Límites de API</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>• 1,000 llamadas por mes</p>
              <p>• Rate limit: 10 req/min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TermsSection() {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Términos y Privacidad
      </h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Términos de Servicio
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Al usar FlowCRM, aceptas nuestros términos de servicio...
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Política de Privacidad
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tu privacidad es importante para nosotros...
          </p>
        </div>
      </div>
    </div>
  )
}

function RecommendationsSection() {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Recomendaciones de Uso
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🤖 Optimiza tus Bots
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Usa mensajes cortos y claros</li>
            <li>• Incluye opciones de respuesta</li>
            <li>• Prueba regularmente tus flujos</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Gestiona tu Pipeline
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Actualiza estados regularmente</li>
            <li>• Usa tags para categorizar</li>
            <li>• Revisa métricas semanalmente</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ThemeSection() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Configuración de Tema
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Modo de Tema
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Elige entre modo claro, oscuro o automático
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}