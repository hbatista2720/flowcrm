import { WhatsAppMessage } from './client'

// Respuestas automáticas del agente IA
const aiResponses = {
  greeting: "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
  help: "Puedo ayudarte con:\n• Información de productos\n• Soporte técnico\n• Agendar citas\n• Consultas generales",
  goodbye: "¡Gracias por contactarnos! 😊 Que tengas un excelente día.",
  default: "Entiendo tu consulta. Un agente se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?"
}

export function handleIncomingMessage(message: WhatsAppMessage): string {
  const text = message.body.toLowerCase()
  
  // Saludos
  if (text.includes('hola') || text.includes('buenos') || text.includes('buenas')) {
    return aiResponses.greeting
  }
  
  // Ayuda
  if (text.includes('ayuda') || text.includes('help') || text.includes('que puedes hacer')) {
    return aiResponses.help
  }
  
  // Despedida
  if (text.includes('gracias') || text.includes('adios') || text.includes('bye')) {
    return aiResponses.goodbye
  }
  
  // Respuesta por defecto
  return aiResponses.default
}