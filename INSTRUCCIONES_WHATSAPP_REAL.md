# 📱 Conexión WhatsApp Real - FlowCRM

## 🚨 Importante
Vercel no puede ejecutar Puppeteer, por lo que la conexión real solo funciona en desarrollo local.

## 🔧 Para conectar WhatsApp REAL:

### 1. Ejecutar en desarrollo local:
```bash
npm run dev
```

### 2. Activar cliente real:
En `lib/whatsapp/client.ts` cambiar:
```typescript
// Cambiar esta línea:
export const whatsappClient = new MockWhatsAppClient()

// Por esta:
import { RealWhatsAppClient } from './realClient'
export const whatsappClient = new RealWhatsAppClient()
```

### 3. Acceder a la aplicación:
- URL local: http://localhost:3000
- Login: admin@flowcrm.com / admin123
- Ir a pestaña "WhatsApp"
- Hacer clic en "Conectar WhatsApp"

### 4. Escanear QR real:
- Se abrirá un navegador con WhatsApp Web
- Escanear el QR con tu WhatsApp Business
- ¡Conexión real establecida!

## 🌐 Para producción real:

### Opción 1: VPS con WhatsApp
1. Servidor VPS con Node.js
2. WhatsApp-web.js corriendo 24/7
3. Webhook a Vercel para sincronizar

### Opción 2: WhatsApp Business API
1. Meta Business Account
2. WhatsApp Business API oficial
3. Webhooks para mensajes

## 🧪 Modo actual (Vercel):
- Simulador para demostración
- QR falso pero funcional
- Perfecto para mostrar la interfaz
- No envía mensajes reales

## 📞 ¿Necesitas conexión real en producción?
Contacta para configurar un servidor dedicado con WhatsApp real.