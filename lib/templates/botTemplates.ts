export interface BotTemplate {
  id: string
  name: string
  description: string
  category: 'ventas' | 'agendar' | 'asistente' | 'soporte'
  icon: string
  gradient: string
  flowData: any
  features: string[]
}

export const botTemplates: BotTemplate[] = [
  {
    id: 'chatbot-ventas-leifer',
    name: 'Chatbot de Ventas (Leifer)',
    description: 'Conoce el feedback del cliente y realiza encuestas de satisfacción.',
    category: 'ventas',
    icon: '💼',
    gradient: 'from-blue-500 to-purple-600',
    features: [
      'Captura de leads automática',
      'Encuestas de satisfacción',
      'Seguimiento de clientes',
      'Integración con CRM'
    ],
    flowData: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 100, y: 100 },
          data: { label: 'Nuevo mensaje', triggerType: 'whatsapp_message' }
        },
        {
          id: '2',
          type: 'action',
          position: { x: 300, y: 100 },
          data: { 
            label: 'Saludo inicial',
            actionType: 'send_message',
            message: '¡Hola! 👋 Soy tu asistente de ventas. ¿En qué puedo ayudarte hoy?'
          }
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 500, y: 100 },
          data: {
            label: 'Interés en producto',
            conditionType: 'contains',
            value: 'producto|precio|información'
          }
        },
        {
          id: '4',
          type: 'action',
          position: { x: 700, y: 50 },
          data: {
            label: 'Enviar catálogo',
            actionType: 'send_message',
            message: '📋 Te envío nuestro catálogo con precios actualizados. ¿Te interesa algún producto en particular?'
          }
        },
        {
          id: '5',
          type: 'action',
          position: { x: 700, y: 150 },
          data: {
            label: 'Crear lead',
            actionType: 'create_lead',
            source: 'whatsapp'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e3-5', source: '3', target: '5' }
      ]
    }
  },
  {
    id: 'chatbot-agendar',
    name: 'Chatbot de Agendar',
    description: 'Conoce el feedback del cliente y realiza encuestas de satisfacción.',
    category: 'agendar',
    icon: '📅',
    gradient: 'from-green-500 to-blue-600',
    features: [
      'Agendamiento automático',
      'Recordatorios de citas',
      'Confirmación de asistencia',
      'Reagendamiento fácil'
    ],
    flowData: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 100, y: 100 },
          data: { label: 'Solicitud de cita', triggerType: 'whatsapp_message' }
        },
        {
          id: '2',
          type: 'action',
          position: { x: 300, y: 100 },
          data: {
            label: 'Opciones de horario',
            actionType: 'send_message',
            message: '📅 ¡Perfecto! Te ayudo a agendar tu cita.\n\n¿Cuál de estos horarios te conviene más?\n\n1️⃣ Mañana (9:00 - 12:00)\n2️⃣ Tarde (14:00 - 17:00)\n3️⃣ Noche (18:00 - 20:00)'
          }
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 500, y: 100 },
          data: {
            label: 'Horario seleccionado',
            conditionType: 'contains',
            value: '1|2|3|mañana|tarde|noche'
          }
        },
        {
          id: '4',
          type: 'action',
          position: { x: 700, y: 100 },
          data: {
            label: 'Confirmar cita',
            actionType: 'send_message',
            message: '✅ ¡Cita agendada exitosamente!\n\n📅 Fecha: [FECHA]\n🕐 Hora: [HORA]\n📍 Lugar: [DIRECCIÓN]\n\nTe enviaré un recordatorio 1 día antes.'
          }
        },
        {
          id: '5',
          type: 'delay',
          position: { x: 900, y: 100 },
          data: {
            label: 'Esperar 1 día',
            delayType: 'days',
            delayValue: 1
          }
        },
        {
          id: '6',
          type: 'action',
          position: { x: 1100, y: 100 },
          data: {
            label: 'Recordatorio',
            actionType: 'send_message',
            message: '🔔 Recordatorio: Tienes una cita mañana a las [HORA]. ¿Confirmas tu asistencia?'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' }
      ]
    }
  },
  {
    id: 'chatbot-ventas-simple',
    name: 'Chatbot de Ventas',
    description: 'Proporciona información sobre pedidos y gestiona devoluciones.',
    category: 'ventas',
    icon: '🛒',
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'Información de productos',
      'Gestión de pedidos',
      'Proceso de compra',
      'Soporte post-venta'
    ],
    flowData: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 100, y: 100 },
          data: { label: 'Consulta de ventas', triggerType: 'whatsapp_message' }
        },
        {
          id: '2',
          type: 'action',
          position: { x: 300, y: 100 },
          data: {
            label: 'Menú principal',
            actionType: 'send_message',
            message: '🛒 ¡Bienvenido a nuestra tienda!\n\n¿Qué te gustaría hacer?\n\n1️⃣ Ver productos\n2️⃣ Hacer pedido\n3️⃣ Consultar pedido\n4️⃣ Hablar con vendedor'
          }
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 500, y: 100 },
          data: {
            label: 'Opción elegida',
            conditionType: 'contains',
            value: '1|productos|catálogo'
          }
        },
        {
          id: '4',
          type: 'action',
          position: { x: 700, y: 50 },
          data: {
            label: 'Mostrar productos',
            actionType: 'send_message',
            message: '📱 Aquí tienes nuestros productos más populares:\n\n🔥 iPhone 15 - $999\n💻 MacBook Air - $1,299\n⌚ Apple Watch - $399\n\n¿Te interesa alguno?'
          }
        },
        {
          id: '5',
          type: 'action',
          position: { x: 700, y: 150 },
          data: {
            label: 'Transferir a vendedor',
            actionType: 'send_message',
            message: '👨‍💼 Te conectaré con uno de nuestros vendedores. En un momento te atenderán.'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e3-5', source: '3', target: '5' }
      ]
    }
  },
  {
    id: 'asistente-personal',
    name: 'Asistente Personal',
    description: 'Dicta notas, recordatorios y tareas pendientes, organizándolas en un flujo.',
    category: 'asistente',
    icon: '🤖',
    gradient: 'from-indigo-500 to-purple-600',
    features: [
      'Gestión de tareas',
      'Recordatorios personalizados',
      'Notas de voz',
      'Organización automática'
    ],
    flowData: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 100, y: 100 },
          data: { label: 'Comando de asistente', triggerType: 'whatsapp_message' }
        },
        {
          id: '2',
          type: 'action',
          position: { x: 300, y: 100 },
          data: {
            label: 'Saludo asistente',
            actionType: 'send_message',
            message: '🤖 ¡Hola! Soy tu asistente personal.\n\n¿En qué puedo ayudarte?\n\n📝 Crear nota\n⏰ Recordatorio\n✅ Ver tareas\n📋 Nueva tarea'
          }
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 500, y: 100 },
          data: {
            label: 'Tipo de solicitud',
            conditionType: 'contains',
            value: 'nota|recordatorio|tarea'
          }
        },
        {
          id: '4',
          type: 'action',
          position: { x: 700, y: 50 },
          data: {
            label: 'Crear nota',
            actionType: 'send_message',
            message: '📝 Perfecto. Dime qué quieres anotar y yo lo guardaré para ti.'
          }
        },
        {
          id: '5',
          type: 'action',
          position: { x: 700, y: 100 },
          data: {
            label: 'Programar recordatorio',
            actionType: 'send_message',
            message: '⏰ ¿Para cuándo quieres el recordatorio?\n\n1️⃣ En 1 hora\n2️⃣ Mañana\n3️⃣ En una semana\n4️⃣ Fecha específica'
          }
        },
        {
          id: '6',
          type: 'action',
          position: { x: 700, y: 150 },
          data: {
            label: 'Gestionar tareas',
            actionType: 'send_message',
            message: '✅ Aquí tienes tus tareas pendientes:\n\n• Llamar al cliente\n• Revisar propuesta\n• Enviar cotización\n\n¿Quieres marcar alguna como completada?'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e3-6', source: '3', target: '6' }
      ]
    }
  }
]

export function getTemplateById(id: string): BotTemplate | undefined {
  return botTemplates.find(template => template.id === id)
}

export function getTemplatesByCategory(category: string): BotTemplate[] {
  return botTemplates.filter(template => template.category === category)
}