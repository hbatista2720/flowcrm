#!/bin/bash

echo "🚀 Iniciando FlowCRM con WhatsApp Real..."

# Verificar ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ Instalar ngrok: brew install ngrok"
    exit 1
fi

# Limpiar procesos anteriores
echo "🧹 Limpiando procesos anteriores..."
pkill ngrok 2>/dev/null
pkill node 2>/dev/null
sleep 2

echo "✅ Iniciando servicios..."

# Iniciar app
echo "1️⃣ Iniciando FlowCRM..."
npm run dev &
APP_PID=$!

sleep 8

# Verificar que la app esté corriendo
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ FlowCRM corriendo en http://localhost:3000"
else
    echo "❌ Error: FlowCRM no inició correctamente"
    exit 1
fi

# Iniciar ngrok
echo "2️⃣ Iniciando ngrok..."
ngrok http 3000 &
NGROK_PID=$!

sleep 3

echo ""
echo "🌐 URLs Disponibles:"
echo "📱 Local:   http://localhost:3000"
echo "🌍 Público: Revisar terminal de ngrok para URL https://"
echo ""
echo "📋 Para WhatsApp REAL:"
echo "1. Copiar URL pública de ngrok (ej: https://abc123-def456.ngrok-free.app)"
echo "2. Ir a: URL_PUBLICA/dashboard/bots/1/whatsapp"
echo "3. Conectar WhatsApp (Chrome se abre automáticamente)"
echo "4. Escanear QR con tu móvil"
echo "5. ¡Probar mensajes reales!"
echo ""
echo "⚠️  IMPORTANTE:"
echo "- Usar la URL EXACTA que muestra ngrok"
echo "- No cerrar esta terminal"
echo "- Mantener Chrome abierto"
echo ""
echo "🛑 Para detener: Ctrl+C"

cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $APP_PID $NGROK_PID 2>/dev/null
    echo "✅ Servicios detenidos"
    exit 0
}

trap cleanup SIGINT
wait