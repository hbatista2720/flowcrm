'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import QRConnection from '@/components/whatsapp/QRConnection'

export default function WhatsAppConnectionPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center">
          <Link href={`/dashboard/bots/${params.id}`} className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Conectar WhatsApp</h1>
            <p className="text-sm text-gray-600">Vincula tu WhatsApp para activar el bot</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        <QRConnection botId={params.id} />

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3 text-green-700">✅ Ventajas del QR</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Sin verificación de Meta</li>
              <li>• Sin costos por mensaje</li>
              <li>• Setup inmediato</li>
              <li>• Perfecto para PYMEs</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-3 text-blue-700">ℹ️ Importante</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Mantén tu teléfono conectado</li>
              <li>• WhatsApp debe estar activo</li>
              <li>• Conexión estable requerida</li>
              <li>• Ideal para volumen medio</li>
            </ul>
          </div>
        </div>

        {/* Upgrade Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">💼</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-blue-900">¿Necesitas más estabilidad?</h4>
              <p className="text-blue-700 text-sm mt-1">
                Para empresas con alto volumen, considera actualizar a WhatsApp Business API oficial.
              </p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Ver Planes Enterprise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}