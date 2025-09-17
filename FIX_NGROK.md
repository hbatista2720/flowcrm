# 🔧 Solucionar ERR_NGROK_3200

## ❌ Error: "The endpoint abc123.ngrok.io is offline"

### 🚀 Solución Paso a Paso

#### 1. Verificar ngrok
```bash
# Ver si ngrok está corriendo
ps aux | grep ngrok

# Matar procesos ngrok anteriores
pkill ngrok
```

#### 2. Iniciar Correctamente
```bash
# Terminal 1: App
cd /Users/henrybatista/flowcrm
npm run dev

# Terminal 2: ngrok (NUEVA terminal)
ngrok http 3000
```

#### 3. Usar URL Correcta
```bash
# ngrok muestra:
# Forwarding https://abc123-def456.ngrok-free.app -> http://localhost:3000
#                  ↑ USAR ESTA URL ↑
```

#### 4. Probar Conexión
```bash
# Ir a la URL que muestra ngrok:
https://abc123-def456.ngrok-free.app/dashboard
```

## 🎯 Script Automático

```bash
#!/bin/bash
echo "🔧 Solucionando ngrok..."

# Matar procesos anteriores
pkill ngrok
pkill node

# Esperar
sleep 2

# Iniciar app
npm run dev &
sleep 5

# Iniciar ngrok
ngrok http 3000 &

echo "✅ Servicios iniciados"
echo "📋 Revisar terminal para URL de ngrok"
```

## ⚠️ Problemas Comunes

### ngrok no instalado:
```bash
brew install ngrok
```

### Token no configurado:
```bash
ngrok config add-authtoken TU_TOKEN
```

### Puerto ocupado:
```bash
lsof -ti:3000 | xargs kill -9
```

### URL incorrecta:
- ❌ `abc123.ngrok.io` (formato viejo)
- ✅ `abc123-def456.ngrok-free.app` (formato nuevo)

## ✅ Verificar que Funciona

1. App local: http://localhost:3000 ✅
2. ngrok corriendo: Ver terminal ✅  
3. URL pública: https://abc123-def456.ngrok-free.app ✅
4. WhatsApp: URL_PUBLICA/dashboard/bots/1/whatsapp ✅