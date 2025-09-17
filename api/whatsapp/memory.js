// Sistema de memoria de conversaciones
const conversationMemory = new Map()

export function getConversationContext(phoneNumber) {
  const context = conversationMemory.get(phoneNumber)
  
  if (!context) return null
  
  // Verificar si han pasado 24 horas
  const now = Date.now()
  const hoursPassed = (now - context.lastActivity) / (1000 * 60 * 60)
  
  if (hoursPassed > 24) {
    conversationMemory.delete(phoneNumber)
    return null
  }
  
  return context
}

export function saveConversationContext(phoneNumber, data) {
  const context = {
    ...data,
    lastActivity: Date.now(),
    phoneNumber
  }
  
  conversationMemory.set(phoneNumber, context)
  return context
}

export function updateConversationStage(phoneNumber, stage, data = {}) {
  const existing = getConversationContext(phoneNumber) || {}
  
  return saveConversationContext(phoneNumber, {
    ...existing,
    stage,
    ...data
  })
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { phone } = req.query
    const context = getConversationContext(phone)
    return res.json({ context })
  }
  
  if (req.method === 'POST') {
    const { phone, stage, data } = req.body
    const context = updateConversationStage(phone, stage, data)
    return res.json({ context })
  }
  
  return res.status(405).json({ error: 'Método no permitido' })
}