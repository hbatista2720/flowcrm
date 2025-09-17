'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bot } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-16 w-16 text-blue-600 animate-pulse" />
          <span className="ml-3 text-4xl font-bold text-gray-900">FlowCRM</span>
        </div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}