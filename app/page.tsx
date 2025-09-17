'use client'

import Link from 'next/link'
import { Bot, MessageCircle, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold">FlowCRM</span>
          </div>
          <nav className="space-x-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Automatiza tu CRM con <span className="text-blue-600">WhatsApp</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Captura leads, gestiona conversaciones y cierra ventas directamente desde WhatsApp. FlowCRM integra la potencia de la IA en tu flujo de trabajo.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/register" className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Comienza Gratis
          </Link>
          <Link href="/dashboard/bots/demo" className="px-8 py-3 text-lg font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200">
            Ver Demo
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Todo lo que necesitas en un solo lugar</h2>
            <p className="text-gray-600 mt-2">Funcionalidades diseñadas para potenciar tus ventas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bots Inteligentes</h3>
              <p className="text-gray-600">Crea flujos de conversación automatizados para calificar leads 24/7.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bandeja de Entrada Centralizada</h3>
              <p className="text-gray-600">Gestiona todas tus conversaciones de WhatsApp en un único lugar.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <Bot className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integración con IA</h3>
              <p className="text-gray-600">Utiliza modelos de lenguaje avanzados para responder a tus clientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} FlowCRM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
