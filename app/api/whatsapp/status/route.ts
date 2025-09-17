import { NextRequest, NextResponse } from 'next/server'

// This would connect to the same connections Map from connect route
// For now, simulate status checking
const connections = new Map()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const botId = searchParams.get('botId')
  
  if (!botId) {
    return NextResponse.json({ error: 'Bot ID requerido' }, { status: 400 })
  }

  // Check connection status
  const connected = connections.has(botId)
  
  return NextResponse.json({
    connected,
    botId,
    timestamp: new Date().toISOString()
  })
}