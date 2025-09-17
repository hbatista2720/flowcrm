# 🚀 WHATSAPP REAL EN VERCEL - PASOS EXACTOS

## PASO 1: Instalar servidor WhatsApp
```bash
cd /Users/henrybatista/flowcrm/whatsapp-server
npm install
```

## PASO 2: Ejecutar servidor WhatsApp
```bash
npm start
```

## PASO 3: Ejecutar aplicación principal
```bash
cd /Users/henrybatista/flowcrm
npm run dev
```

## PASO 4: Abrir aplicación
```
http://localhost:3000
```

## PASO 5: Login
- Email: admin@flowcrm.com
- Contraseña: admin123

## PASO 6: Conectar WhatsApp
- Ir a pestaña "WhatsApp"
- Clic en "Conectar WhatsApp"
- Escanear QR con tu teléfono

## PASO 7: Probar agente IA
- Enviar mensaje desde otro teléfono
- El agente responderá automáticamente

## PARA VERCEL (PRODUCCIÓN):

### PASO 8: Deploy servidor en Railway/Heroku
```bash
# Subir whatsapp-server/ a Railway o Heroku
```

### PASO 9: Configurar variable en Vercel
```
WHATSAPP_SERVER_URL=https://tu-servidor.railway.app
```

### PASO 10: Deploy a Vercel
```bash
npx vercel --prod
```

¡WhatsApp real funcionando en Vercel! 🎉