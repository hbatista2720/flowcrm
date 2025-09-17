'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewBotPage() {
  const searchParams = useSearchParams()
  const template = searchParams.get('template')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (template) {
      console.log('Creating bot from template:', template)
    }
    setIsLoading(false)
  }, [template])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Bot</h1>
      {template && (
        <p>Creando bot desde plantilla: {template}</p>
      )}
    </div>
  )
}