# 🚀 FlowCRM - Instrucciones para Probar

## 📋 Pasos para Ejecutar

### 1. Instalar Dependencias
```bash
cd /Users/henrybatista/flowcrm
npm install
```

### 2. Configurar Base de Datos
```bash
# La base de datos SQLite ya está creada
# Si necesitas recrearla:
npx prisma db push
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

### 4. Abrir en el Navegador
```
http://localhost:3000
```

## 🎯 Funcionalidades para Probar

### 1. **Landing Page** (`/`)
- ✅ Página principal con hero y features
- ✅ Botones "Iniciar Sesión" y "Registrarse"

### 2. **Autenticación**
- ✅ **Registro**: `/register` - Crea una cuenta nueva
- ✅ **Login**: `/login` - Inicia sesión
- ✅ **Logout**: Desde el menú de usuario

### 3. **Dashboard** (`/dashboard`)
**Requiere estar logueado**

#### **Bots Tab**
- ✅ Lista de bots
- ✅ Click en "Bot de Ventas" → Editor visual
- ✅ Botón "WhatsApp" → Página de conexión QR

#### **Flows Tab** 
- ✅ Lista de automatizaciones
- ✅ Estadísticas de workflows
- ✅ Botón "Nuevo Workflow" → Editor de flujos

#### **Inbox Tab**
- ✅ Lista de conversaciones (izquierda)
- ✅ Chat window (derecha)
- ✅ Búsqueda y filtros
- ✅ Respuestas rápidas

#### **Pipeline Tab**
- ✅ Estadísticas CRM
- ✅ Kanban drag & drop
- ✅ Modal "Nuevo Lead"

## 🔧 Editores Visuales

### **Bot Builder** (`/dashboard/bots/1`)
- ✅ Canvas drag & drop
- ✅ Nodos: Mensaje, IA, HTTP, Inicio
- ✅ Conexiones entre nodos
- ✅ Preview del bot

### **Workflow Builder** (`/dashboard/workflows/new`)
- ✅ Canvas estilo n8n
- ✅ Nodos: Trigger, Acción, Condición, Espera
- ✅ Plantillas predefinidas

### **WhatsApp QR** (`/dashboard/bots/1/whatsapp`)
- ✅ Simulación de estados de conexión
- ✅ QR code placeholder
- ✅ Instrucciones paso a paso

## 📱 Datos de Prueba

### **Usuario de Prueba**
```
Email: test@flowcrm.com
Password: 123456
```

### **Leads en CRM**
- Juan Pérez - $2,500 - WhatsApp
- María García - $1,800 - Email
- Carlos López - $3,200 - WhatsApp

### **Conversaciones**
- 3 conversaciones activas
- Mensajes de ejemplo
- Estados: Pendiente, Activa, Resuelta

## 🎨 Características Destacadas

- 🎯 **UI/UX Profesional** - Diseño limpio y moderno
- 📱 **Responsive** - Funciona en móvil y desktop
- 🔐 **Autenticación Completa** - Login, registro, sesiones
- 🎨 **Drag & Drop** - Editores visuales interactivos
- 💬 **Chat en Tiempo Real** - Interfaz tipo WhatsApp
- 📊 **Dashboard Completo** - Métricas y estadísticas

## 🚀 Próximos Pasos

1. **Probar todas las funcionalidades**
2. **Deploy a Vercel** para producción
3. **Integrar Stripe** para pagos
4. **WhatsApp API real** para producción

¡Disfruta probando FlowCRM! 🎉