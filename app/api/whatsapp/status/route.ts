import { NextResponse } from 'next/server'

export async function GET() {
  // Simular estados de conexión para demo
  const statuses = ['disconnected', 'connecting', 'waiting_qr', 'connected']
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  
  return NextResponse.json({
    status: randomStatus,
    connected: randomStatus === 'connected',
    timestamp: new Date().toISOString()
  })
}