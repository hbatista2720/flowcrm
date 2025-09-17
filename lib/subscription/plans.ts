export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  limits: {
    bots: number
    conversations: number
    automations: number
    apiCalls: number
  }
  popular?: boolean
  trialDays?: number
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'sandbox',
    name: 'Sandbox',
    description: 'Plan gratuito ideal para explorar la plataforma. Perfecto para familiarizarse con todas las funcionalidades básicas sin compromiso.',
    price: 0,
    currency: 'USD',
    interval: 'month',
    trialDays: 7,
    features: [
      'No se requiere tarjeta de crédito',
      '1 chatbot activo por tiempo limitado',
      'Ideal para experimentar',
      'Soporte básico por video tutoriales'
    ],
    limits: {
      bots: 1,
      conversations: 100,
      automations: 3,
      apiCalls: 1000
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Ideal para emprendedores y pequeñas empresas. Automatiza la gestión de WhatsApp eficientemente y maximiza resultados con múltiples chatbots.',
    price: 39.99,
    currency: 'USD',
    interval: 'month',
    trialDays: 7,
    popular: true,
    features: [
      'Hasta 5 chatbots activos',
      'Asistentes con inteligencia artificial',
      'Funciona con WhatsApp, Telegram y Facebook',
      'Chatbots trabajan 24/7',
      'API REST',
      'Todas las funcionalidades del plan inferior'
    ],
    limits: {
      bots: 5,
      conversations: 5000,
      automations: 20,
      apiCalls: 50000
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para negocios en crecimiento. Atención prioritaria y mayor capacidad para gestionar múltiples chatbots con funcionalidades avanzadas.',
    price: 79.99,
    currency: 'USD',
    interval: 'month',
    trialDays: 7,
    features: [
      'Hasta 10 chatbots activos',
      'Asistentes con inteligencia artificial',
      'Acceso anticipado a nuevas funcionalidades',
      'Chatbots trabajan 24/7',
      'API REST',
      'Todas las funcionalidades del plan inferior'
    ],
    limits: {
      bots: 10,
      conversations: 15000,
      automations: 50,
      apiCalls: 150000
    }
  },
  {
    id: 'enterprise',
    name: 'Plan Personalizado',
    description: 'Incluye soporte personalizado, si necesitas más bots contáctanos a través de nuestro correo de soporte.',
    price: 119.85,
    currency: 'USD',
    interval: 'month',
    trialDays: 7,
    features: [
      'Chatbots activos personalizados',
      'Soporte prioritario',
      'Integraciones avanzadas',
      'Todas las funcionalidades del plan inferior'
    ],
    limits: {
      bots: 999,
      conversations: 999999,
      automations: 999,
      apiCalls: 999999
    }
  }
]