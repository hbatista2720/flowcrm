# FlowCRM - Bot Builder & CRM Platform

Plataforma todo-en-uno que combina **BuilderBot** + **n8n** + **Chatwoot** + **CRM Kanban** para PYMEs.

## 🚀 Características

- **Bot Builder**: Editor visual drag & drop para chatbots
- **WhatsApp QR**: Conexión fácil sin APIs complejas  
- **CRM Kanban**: Pipeline visual de ventas
- **Inbox Unificado**: Conversaciones centralizadas
- **Automatizaciones**: Flujos entre apps como n8n

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Prisma + PostgreSQL
- **WhatsApp**: whatsapp-web.js (conexión QR)
- **UI**: Lucide React + React Flow + React Beautiful DnD

## 📦 Instalación

```bash
# Clonar el proyecto
git clone <repo-url>
cd flowcrm

# Instalar dependencias
npm install

# Configurar base de datos
cp .env.example .env
# Editar .env con tu DATABASE_URL

# Ejecutar migraciones
npx prisma db push

# Iniciar desarrollo
npm run dev
```

## 🗄️ Base de Datos

```bash
# Ver base de datos
npx prisma studio

# Reset base de datos
npx prisma db push --force-reset
```

## 🚀 Despliegue en Vercel

1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático

## 📋 Roadmap

### Fase 1 ✅
- [x] Estructura base del proyecto
- [x] Landing page
- [x] Dashboard con navegación
- [x] Esquema de base de datos
- [ ] Bot builder básico
- [ ] Conexión WhatsApp QR

### Fase 2
- [ ] CRM Kanban funcional
- [ ] Inbox de conversaciones
- [ ] Automatizaciones básicas

### Fase 3
- [ ] Editor de flujos visual
- [ ] Integraciones externas
- [ ] IA y respuestas automáticas

## 💰 Modelo de Negocio

- **Starter**: $29/mes - 1 bot, 500 conversaciones
- **Professional**: $79/mes - 3 bots, 2K conversaciones  
- **Enterprise**: $199/mes - Ilimitado + API oficial

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request