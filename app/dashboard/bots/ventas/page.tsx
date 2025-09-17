'use client'

import { useState } from 'react'
import { ArrowLeft, Save, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function VentasBot() {
  const [activeTab, setActiveTab] = useState('editor')

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold">Chatbot de Ventas (Leifer)</h1>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar
        </button>
      </header>

      <div className="flex-1 flex">
        <div className="w-64 bg-gray-50 border-r p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'editor' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'whatsapp' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'memory' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              Memoria 24h
            </button>
          </nav>
        </div>

        <div className="flex-1 p-6">
          {activeTab === 'editor' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Bot de Ventas Leifer</h2>
              <p className="text-gray-600 mb-4">Bot especializado en ventas y calificación de leads</p>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Conexión WhatsApp</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Conectar WhatsApp
              </button>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Memoria 24h Activa</h2>
              <p className="text-green-600">Sistema de memoria funcionando correctamente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}