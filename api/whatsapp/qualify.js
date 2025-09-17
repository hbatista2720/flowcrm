export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { phone, leadData } = req.body

  if (!phone) {
    return res.status(400).json({ error: 'Número de teléfono requerido' })
  }

  try {
    // Marcar lead como calificado en memoria
    const memoryResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/whatsapp/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        stage: 'qualified',
        data: {
          ...leadData,
          qualifiedAt: Date.now()
        }
      })
    })

    const { context } = await memoryResponse.json()
    
    return res.json({ 
      success: true, 
      message: 'Lead calificado exitosamente',
      context 
    })
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}