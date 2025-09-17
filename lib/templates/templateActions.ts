import { BotTemplate } from './botTemplates'

export interface CreatedBot {
  id: string
  name: string
  description: string
  flowData: any
  templateId: string
  createdAt: string
}

export async function createBotFromTemplate(template: BotTemplate): Promise<CreatedBot> {
  // Generar ID único para el bot
  const botId = `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // Crear el bot con la configuración de la plantilla
  const newBot: CreatedBot = {
    id: botId,
    name: template.name,
    description: template.description,
    flowData: template.flowData,
    templateId: template.id,
    createdAt: new Date().toISOString()
  }

  // En producción, aquí se guardaría en la base de datos
  // await saveBotToDatabase(newBot)
  
  // Por ahora, guardamos en localStorage para simular persistencia
  const existingBots = JSON.parse(localStorage.getItem('flowcrm-bots') || '[]')
  existingBots.push(newBot)
  localStorage.setItem('flowcrm-bots', JSON.stringify(existingBots))

  return newBot
}

export function getAllUserBots(): CreatedBot[] {
  // En producción, consultaría la base de datos
  return JSON.parse(localStorage.getItem('flowcrm-bots') || '[]')
}

export function getBotById(botId: string): CreatedBot | null {
  const bots = getAllUserBots()
  return bots.find(bot => bot.id === botId) || null
}