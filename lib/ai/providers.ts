export interface AIProvider {
  id: string
  name: string
  description: string
  icon: string
  color: string
  requiresApiKey: boolean
  models: string[]
}

export const aiProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'ChatGPT',
    description: 'OpenAI GPT-3.5 y GPT-4',
    icon: '🤖',
    color: 'bg-green-500',
    requiresApiKey: true,
    models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
  },
  {
    id: 'anthropic',
    name: 'Claude',
    description: 'Anthropic Claude 3',
    icon: '🧠',
    color: 'bg-orange-500',
    requiresApiKey: true,
    models: ['claude-3-haiku', 'claude-3-sonnet', 'claude-3-opus']
  },
  {
    id: 'google',
    name: 'Gemini',
    description: 'Google Gemini Pro',
    icon: '💎',
    color: 'bg-blue-500',
    requiresApiKey: true,
    models: ['gemini-pro', 'gemini-pro-vision']
  },
  {
    id: 'amazon',
    name: 'Amazon Q',
    description: 'Amazon Q Developer',
    icon: '☁️',
    color: 'bg-yellow-500',
    requiresApiKey: true,
    models: ['amazon-q-developer', 'amazon-q-business']
  },
  {
    id: 'local',
    name: 'Simulado',
    description: 'Respuestas simuladas para pruebas',
    icon: '🎭',
    color: 'bg-purple-500',
    requiresApiKey: false,
    models: ['simulado-basico', 'simulado-avanzado']
  }
]

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  provider?: string
  model?: string
}

export interface AIConfig {
  provider: string
  model: string
  apiKey?: string
  systemPrompt: string
  temperature: number
  maxTokens: number
}