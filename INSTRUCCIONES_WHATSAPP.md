# 📱 Conectar WhatsApp Real con Internet

## 🚀 Pasos Rápidos

### 1. Instalar ngrok
```bash
# macOS
brew install ngrok

# Registrarse en ngrok.com y obtener token
ngrok config add-authtoken TU_TOKEN
```

### 2. Ejecutar con Internet
```bash
# Opción A: Script automático
./scripts/start-whatsapp.sh

# Opción B: Manual
npm run dev &
ngrok http 3000
```

### 3. Conectar WhatsApp
1. Ir a URL de ngrok: `https://abc123.ngrok.io`
2. Dashboard → Bots → WhatsApp
3. Conectar y escanear QR
4. ¡Listo!

## 🔧 Para WhatsApp Real (Opcional)

### Instalar dependencias:
```bash
npm install whatsapp-web.js puppeteer
```

### Activar cliente real:
1. Editar `/lib/whatsapp/realClient.ts`
2. Descomentar todo el código
3. En `/lib/whatsapp/client.ts` cambiar:
```javascript
// Cambiar esta línea:
export const whatsappClient = new MockWhatsAppClient()

// Por esta:
export const whatsappClient = new RealWhatsAppClient()
```

## ✅ URLs con ngrok

Una vez corriendo:
- **Local**: http://localhost:3000
- **Público**: https://abc123.ngrok.io
- **WhatsApp**: https://abc123.ngrok.io/dashboard/bots/1/whatsapp

## 🎯 Probar Conexión

1. **Simulada** (actual): Funciona sin internet
2. **Real** (con ngrok): Requiere internet y móvil

¡Listo para probar WhatsApp real! 🌐📱