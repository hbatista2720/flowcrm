export interface TutorialVideo {
  id: string
  title: string
  description: string
  vimeoId: string
  duration: string
  category: string
  tags: string[]
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  category: string
  keywords: string[]
  relatedVideos: string[]
  lastUpdated: string
}

export const tutorialVideos: TutorialVideo[] = [
  {
    id: 'intro-flowcrm',
    title: 'Introducción a FlowCRM',
    description: 'Conoce las funcionalidades principales de FlowCRM en 5 minutos',
    vimeoId: '123456789',
    duration: '5:30',
    category: 'primeros-pasos',
    tags: ['introducción', 'overview', 'básico']
  },
  {
    id: 'crear-bot',
    title: 'Cómo Crear tu Primer Bot',
    description: 'Tutorial paso a paso para crear un bot desde cero',
    vimeoId: '987654321',
    duration: '8:45',
    category: 'bots',
    tags: ['bot', 'crear', 'editor', 'flujo']
  },
  {
    id: 'plantillas-bot',
    title: 'Usando Plantillas de Bots',
    description: 'Aprende a usar plantillas predefinidas para crear bots rápidamente',
    vimeoId: '456789123',
    duration: '6:20',
    category: 'bots',
    tags: ['plantillas', 'templates', 'rápido']
  }
]

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: 'crear-primer-bot',
    title: 'Crear mi primer bot',
    content: 'Para crear tu primer bot: 1) Ve a la sección Bots, 2) Haz clic en "Crear Bot" o "Usar Plantilla", 3) Configura los pasos en el editor visual, 4) Conecta con WhatsApp, 5) ¡Prueba tu bot!',
    category: 'bots',
    keywords: ['crear', 'bot', 'primer', 'pasos', 'editor'],
    relatedVideos: ['crear-bot', 'plantillas-bot'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'conectar-whatsapp',
    title: 'Conectar WhatsApp',
    content: 'Para conectar WhatsApp: 1) Ve a tu bot y haz clic en "WhatsApp", 2) Escanea el código QR con tu teléfono, 3) Abre WhatsApp → Dispositivos vinculados, 4) Escanea el código, 5) ¡Listo!',
    category: 'whatsapp',
    keywords: ['whatsapp', 'conectar', 'qr', 'código', 'vincular'],
    relatedVideos: ['intro-flowcrm'],
    lastUpdated: '2024-01-15'
  }
]

export function searchKnowledge(query: string): KnowledgeItem[] {
  const searchTerms = query.toLowerCase().split(' ')
  
  return knowledgeBase.filter(item => {
    const searchableText = `${item.title} ${item.content} ${item.keywords.join(' ')}`.toLowerCase()
    return searchTerms.some(term => searchableText.includes(term))
  })
}