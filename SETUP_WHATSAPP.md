# 🚀 Setup WhatsApp Real con ngrok

## 📋 Requisitos
- ✅ Conexión a internet
- ✅ WhatsApp en tu móvil
- ✅ ngrok instalado
- ✅ Node.js y npm

## 🔧 Instalación Rápida

### 1. Instalar ngrok
```bash
# macOS con Homebrew
brew install ngrok

# O descargar desde: https://ngrok.com/download
```

### 2. Instalar dependencias WhatsApp
```bash
cd /Users/henrybatista/flowcrm
npm install whatsapp-web.js puppeteer qrcode-terminal
```

### 3. Configurar ngrok
```bash
# Registrarse en ngrok.com y obtener token
ngrok config add-authtoken TU_TOKEN_AQUI
```

## 🌐 Ejecutar con Internet

### 1. Iniciar FlowCRM
```bash
npm run dev
# App corriendo en http://localhost:3000
```

### 2. Exponer con ngrok (Nueva terminal)
```bash
ngrok http 3000
# Obtienes: https://abc123.ngrok.io
```

### 3. Configurar Webhooks
```bash
# Tu app ahora es accesible desde internet
# WhatsApp puede enviar webhooks a:
# https://abc123.ngrok.io/api/whatsapp/webhook
```

## 📱 Proceso de Conexión

### 1. Ir a tu app pública
```
https://abc123.ngrok.io/dashboard/bots/1/whatsapp
```

### 2. Conectar WhatsApp
1. Clic en "Conectar WhatsApp"
2. Se abre navegador con WhatsApp Web
3. Escanear QR con tu móvil
4. ¡Conectado!

### 3. Probar mensajes
- Envía mensaje a tu número
- Bot responde automáticamente
- Webhooks funcionan via ngrok

## ⚡ Script de Inicio Rápido

Crear archivo `start-whatsapp.sh`:
```bash
#!/bin/bash
echo "🚀 Iniciando FlowCRM con WhatsApp..."

# Terminal 1: Iniciar app
npm run dev &

# Esperar que inicie
sleep 5

# Terminal 2: Exponer con ngrok
ngrok http 3000 &

echo "✅ App disponible en:"
echo "Local: http://localhost:3000"
echo "Público: Revisar terminal de ngrok"
```

## 🔒 Configuración de Seguridad

### Variables de entorno (.env.local)
```env
# WhatsApp
WHATSAPP_WEBHOOK_SECRET=tu_secreto_aqui
NGROK_DOMAIN=abc123.ngrok.io

# Seguridad
ALLOWED_ORIGINS=https://abc123.ngrok.io,http://localhost:3000
```

## 🐛 Troubleshooting

### Problema: QR no aparece
```bash
# Verificar puppeteer
npm install puppeteer --force
```

### Problema: ngrok no conecta
```bash
# Verificar token
ngrok config check
```

### Problema: WhatsApp se desconecta
```bash
# Mantener navegador abierto
# No cerrar terminal
# Conexión estable requerida
```

## 📊 Monitoreo

### Ver logs en tiempo real
```bash
# Terminal 1: App logs
npm run dev

# Terminal 2: ngrok logs  
ngrok http 3000 --log=stdout

# Terminal 3: WhatsApp logs
tail -f whatsapp.log
```

## 🎯 URLs Importantes

Una vez con ngrok corriendo:
- **App pública**: https://abc123.ngrok.io
- **Dashboard**: https://abc123.ngrok.io/dashboard
- **WhatsApp**: https://abc123.ngrok.io/dashboard/bots/1/whatsapp
- **API**: https://abc123.ngrok.io/api/whatsapp/*

## ✅ Checklist Final

- [ ] ngrok instalado y configurado
- [ ] whatsapp-web.js instalado
- [ ] App corriendo en localhost:3000
- [ ] ngrok exponiendo puerto 3000
- [ ] WhatsApp conectado via QR
- [ ] Mensajes de prueba funcionando
- [ ] Webhooks recibiendo datos

¡Listo para WhatsApp real con internet! 🌐📱