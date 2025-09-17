# 🚀 Guía Completa para Probar FlowCRM

## 📋 Pasos para Ejecutar

### 1. Abrir Terminal y Navegar al Proyecto
```bash
cd /Users/henrybatista/flowcrm
```

### 2. Instalar Dependencias (si no está hecho)
```bash
npm install
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

### 4. Abrir en el Navegador
```
http://localhost:3000
```

---

## 🎯 Funcionalidades para Probar

### 🏠 **1. Landing Page** (`http://localhost:3000`)
- ✅ Página principal con hero
- ✅ Secciones de características
- ✅ Botones "Iniciar Sesión" y "Registrarse"

### 🔐 **2. Sistema de Autenticación**

#### **Registrarse** (`/register`)
1. Hacer clic en "Registrarse"
2. Llenar el formulario:
   - **Nombre**: Tu nombre
   - **Email**: tu@email.com
   - **Contraseña**: 123456
3. Hacer clic en "Crear Cuenta"
4. Te redirigirá automáticamente al dashboard

#### **Iniciar Sesión** (`/login`)
- **Email**: tu@email.com
- **Contraseña**: 123456

---

## 🎛️ **3. Dashboard Principal** (`/dashboard`)

### **Pestaña: Bots** 🤖
1. **Ver bot existente**: "Bot de Ventas"
2. **Crear nuevo bot**:
   - Clic en "Plantillas" (botón morado)
   - Explorar 4 plantillas predefinidas
   - Importar cualquier plantilla
3. **Editor de bots**:
   - Clic en "Bot de Ventas"
   - Ver editor secuencial simple
   - Agregar pasos con "Agregar Paso"
   - Configurar cada paso

### **Pestaña: Flows** ⚙️
1. **Ver automatizaciones** existentes
2. **Crear nuevo workflow**:
   - Clic en "Nuevo Workflow"
   - Editor visual estilo n8n
   - Agregar nodos: Trigger, Acción, Condición
3. **Estadísticas** de workflows

### **Pestaña: Inbox** 💬
1. **Lista de conversaciones** (izquierda)
2. **Chat window** (derecha)
3. **Funcionalidades**:
   - Seleccionar conversación
   - Enviar mensajes
   - Respuestas rápidas
   - Búsqueda y filtros

### **Pestaña: Pipeline** 📊
1. **Estadísticas CRM** (arriba)
2. **Kanban Board** (abajo):
   - Arrastrar tarjetas entre columnas
   - Crear nuevo lead
   - Ver información de leads

---

## 🎓 **4. Sistema de Tutorial**

### **Modal de Bienvenida**
- Se abre automáticamente para nuevos usuarios
- Opción de iniciar tutorial o explorar

### **Botón de Ayuda** (esquina inferior derecha)
- 6 tutoriales interactivos disponibles:
  1. **Primeros Pasos** - Navegación básica
  2. **Bot Builder** - Editor visual
  3. **WhatsApp** - Conexión QR
  4. **CRM Pipeline** - Kanban
  5. **Inbox** - Conversaciones
  6. **Automatizaciones** - Workflows

### **Cómo usar el tutorial**:
1. Clic en botón de ayuda (🔵 con ?)
2. Elegir tutorial
3. Seguir pasos interactivos
4. Progreso se guarda automáticamente

---

## 🎨 **5. Plantillas de Bots**

### **Acceder a Plantillas**:
1. Dashboard → Pestaña "Bots"
2. Clic en "Plantillas" (botón morado)
3. Explorar categorías:
   - **Ventas** - Captura de leads
   - **Agendar** - Sistema de citas
   - **Asistente** - Tareas personales

### **Plantillas Disponibles**:
- 💼 **Chatbot de Ventas (Leifer)** - Feedback y encuestas
- 📅 **Chatbot de Agendar** - Sistema de citas automático
- 🛒 **Chatbot de Ventas Simple** - Catálogo y pedidos
- 🤖 **Asistente Personal** - Notas y recordatorios

---

## 🔧 **6. Editor de Bots Simplificado**

### **Acceder al Editor**:
1. Dashboard → Bots → "Bot de Ventas"
2. Ver editor secuencial (como BuilderBot)

### **Funcionalidades**:
- ✅ **Pasos numerados** verticalmente
- ✅ **Agregar paso** con un clic
- ✅ **Tipos disponibles**:
  - 💬 Mensaje
  - 🤖 Asistente IA
  - ⚡ Condición
  - ⏰ Pausa
  - 📅 Agendar
  - 🎤 Nota de Voz
  - 🔗 API Externa
  - 💾 Base de Datos

### **Configurar Pasos**:
1. Clic en ícono de editar (✏️)
2. Configurar según el tipo
3. Guardar cambios

---

## 🎯 **7. Funcionalidades Destacadas**

### **WhatsApp QR** (`/dashboard/bots/1/whatsapp`)
- Simulación de conexión
- Estados: Desconectado → Conectando → Conectado
- QR code placeholder

### **Workflow Builder** (`/dashboard/workflows/new`)
- Editor visual estilo n8n
- Nodos drag & drop
- Plantillas predefinidas

### **Responsive Design**
- Funciona en móvil y desktop
- Interfaz adaptativa

---

## 🚨 **Solución de Problemas**

### **Si no carga**:
```bash
# Limpiar caché
rm -rf .next
npm run build
npm run dev
```

### **Si hay errores de base de datos**:
```bash
npx prisma db push
```

### **Si faltan dependencias**:
```bash
npm install
```

---

## 🎉 **¡Listo para Probar!**

**Orden recomendado de prueba**:
1. 🏠 Landing page
2. 🔐 Registro/Login
3. 🎓 Tutorial de bienvenida
4. 🤖 Crear bot con plantilla
5. ⚙️ Explorar automatizaciones
6. 💬 Probar inbox
7. 📊 Usar CRM Kanban

**¡Disfruta explorando FlowCRM!** 🚀