import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface AIConfig {
  provider: string
  model: string
  apiKey?: string
  systemPrompt: string
  temperature: number
  maxTokens: number
}

export async function POST(request: NextRequest) {
  try {
    const { message, config, history } = await request.json()

    if (!message || !config) {
      return NextResponse.json({
        success: false,
        error: 'Mensaje y configuración son requeridos'
      }, { status: 400 })
    }

    let response: string

    switch (config.provider) {
      case 'openai':
        response = await handleOpenAI(message, config, history)
        break
      case 'anthropic':
        response = await handleAnthropic(message, config, history)
        break
      case 'google':
        response = await handleGoogle(message, config, history)
        break
      case 'amazon':
        response = await handleAmazon(message, config, history)
        break
      case 'local':
      default:
        response = await handleLocal(message, config, history)
        break
    }

    return NextResponse.json({
      success: true,
      response,
      provider: config.provider,
      model: config.model
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error interno del servidor'
    }, { status: 500 })
  }
}

async function handleOpenAI(message: string, config: AIConfig, history: ChatMessage[]): Promise<string> {
  if (!config.apiKey) {
    throw new Error('API Key de OpenAI requerida')
  }

  const messages = [
    { role: 'system', content: config.systemPrompt },
    ...history,
    { role: 'user', content: message }
  ]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API Error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'Sin respuesta'
}

async function handleLocal(message: string, config: AIConfig, history: ChatMessage[]): Promise<string> {
  const responses = [
    `¡Hola! Soy tu asistente de FlowCRM. Entiendo que preguntas sobre: "${message}". ¿En qué más puedo ayudarte?`,
    `Perfecto, puedo ayudarte con eso. En FlowCRM tenemos herramientas para gestionar leads, automatizar conversaciones y mucho más.`,
    `Excelente pregunta. Como asistente especializado en CRM, te recomiendo revisar la sección de Pipeline para gestionar tus leads de manera eficiente.`,
    `¡Claro! FlowCRM te permite crear bots conversacionales, gestionar leads en un Kanban visual y automatizar flujos de trabajo. ¿Te interesa alguna funcionalidad específica?`
  ]

  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  
  if (config.model === 'simulado-avanzado') {
    return `${randomResponse}\n\n💡 **Sugerencia avanzada**: Basándome en tu mensaje, podrías beneficiarte de usar nuestras automatizaciones para optimizar este proceso.`
  }
  
  return randomResponse
}

async function handleAnthropic(message: string, config: AIConfig, history: ChatMessage[]): Promise<string> {
  return `[Claude] Esta es una respuesta simulada para: "${message}". Para usar Claude real, configura tu API key de Anthropic.`
}

async function handleGoogle(message: string, config: AIConfig, history: ChatMessage[]): Promise<string> {
  return `[Gemini] Esta es una respuesta simulada para: "${message}". Para usar Gemini real, configura tu API key de Google.`
}

async function handleAmazon(message: string, config: AIConfig, history: ChatMessage[]): Promise<string> {
  return `[Amazon Q] Esta es una respuesta simulada para: "${message}". Para usar Amazon Q real, configura las credenciales de AWS.`
}