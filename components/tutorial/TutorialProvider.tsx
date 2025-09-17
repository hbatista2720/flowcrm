'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface TutorialStep {
  id: string
  title: string
  description: string
  target?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  action?: 'click' | 'hover' | 'none'
}

interface TutorialModule {
  id: string
  name: string
  description: string
  steps: TutorialStep[]
  completed: boolean
}

interface TutorialContextType {
  currentModule: string | null
  currentStep: number
  isActive: boolean
  modules: TutorialModule[]
  startTutorial: (moduleId: string) => void
  nextStep: () => void
  prevStep: () => void
  skipTutorial: () => void
  completeTutorial: () => void
  markModuleCompleted: (moduleId: string) => void
}

const TutorialContext = createContext<TutorialContextType | null>(null)

const tutorialModules: TutorialModule[] = [
  {
    id: 'getting-started',
    name: 'Primeros Pasos',
    description: 'Aprende lo básico de FlowCRM',
    completed: false,
    steps: [
      {
        id: 'welcome',
        title: '¡Bienvenido a FlowCRM!',
        description: 'Te guiaremos paso a paso para que aproveches al máximo la plataforma.',
      },
      {
        id: 'dashboard-overview',
        title: 'Panel Principal',
        description: 'Este es tu dashboard. Aquí puedes ver todas tus herramientas organizadas en pestañas.',
        target: '.dashboard-tabs',
      },
      {
        id: 'navigation',
        title: 'Navegación',
        description: 'Usa estas pestañas para navegar entre Bots, Automatizaciones, Conversaciones y CRM.',
        target: '.tab-buttons',
      }
    ]
  },
  {
    id: 'bot-builder',
    name: 'Creador de Bots',
    description: 'Crea tu primer bot conversacional',
    completed: false,
    steps: [
      {
        id: 'bot-intro',
        title: 'Creador de Bots',
        description: 'Aquí puedes crear bots conversacionales sin código usando nuestro editor visual.',
      },
      {
        id: 'create-bot',
        title: 'Crear Nuevo Bot',
        description: 'Haz clic en el bot existente para abrir el editor visual.',
        target: '.bot-card',
        action: 'click'
      },
      {
        id: 'editor-canvas',
        title: 'Canvas del Editor',
        description: 'Este es el canvas donde diseñas el flujo de tu bot. Arrastra nodos desde la barra lateral.',
        target: '.react-flow',
      },
      {
        id: 'add-nodes',
        title: 'Agregar Nodos',
        description: 'Selecciona un tipo de nodo y haz clic en "Agregar Nodo" para añadirlo al canvas.',
        target: '.node-sidebar',
      }
    ]
  },
  {
    id: 'whatsapp-connection',
    name: 'Conectar WhatsApp',
    description: 'Vincula tu WhatsApp con código QR',
    completed: false,
    steps: [
      {
        id: 'whatsapp-intro',
        title: 'Conexión WhatsApp',
        description: 'Conecta tu WhatsApp para que tu bot pueda recibir y enviar mensajes automáticamente.',
      },
      {
        id: 'qr-scan',
        title: 'Escanear QR',
        description: 'Abre WhatsApp en tu teléfono, ve a Dispositivos vinculados y escanea el código QR.',
        target: '.qr-code-container',
      },
      {
        id: 'connection-status',
        title: 'Estado de Conexión',
        description: 'Una vez conectado, verás el estado "Conectado" y podrás recibir mensajes.',
        target: '.connection-status',
      }
    ]
  },
  {
    id: 'crm-pipeline',
    name: 'Pipeline CRM',
    description: 'Gestiona tus leads visualmente',
    completed: false,
    steps: [
      {
        id: 'crm-intro',
        title: 'CRM Visual',
        description: 'Gestiona tus leads con un pipeline visual tipo Kanban. Arrastra las tarjetas entre columnas.',
      },
      {
        id: 'lead-cards',
        title: 'Tarjetas de Leads',
        description: 'Cada tarjeta representa un lead. Contiene información de contacto y valor estimado.',
        target: '.lead-card',
      },
      {
        id: 'drag-drop',
        title: 'Arrastrar y Soltar',
        description: 'Arrastra las tarjetas entre columnas para cambiar el estado del lead.',
        target: '.kanban-column',
      },
      {
        id: 'add-lead',
        title: 'Nuevo Lead',
        description: 'Haz clic en "Nuevo Lead" para agregar un prospecto manualmente.',
        target: '.add-lead-button',
        action: 'click'
      }
    ]
  },
  {
    id: 'inbox-management',
    name: 'Gestión de Conversaciones',
    description: 'Maneja todas tus conversaciones en un solo lugar',
    completed: false,
    steps: [
      {
        id: 'inbox-intro',
        title: 'Inbox Unificado',
        description: 'Todas tus conversaciones de WhatsApp, email y web en un solo lugar.',
      },
      {
        id: 'conversation-list',
        title: 'Lista de Conversaciones',
        description: 'Aquí ves todas las conversaciones. Haz clic en una para abrirla.',
        target: '.conversation-list',
      },
      {
        id: 'chat-window',
        title: 'Ventana de Chat',
        description: 'Responde mensajes, usa respuestas rápidas y gestiona la conversación.',
        target: '.chat-window',
      },
      {
        id: 'quick-replies',
        title: 'Respuestas Rápidas',
        description: 'Usa estos botones para responder rápidamente con mensajes predefinidos.',
        target: '.quick-replies',
      }
    ]
  },
  {
    id: 'automation-flows',
    name: 'Automatizaciones',
    description: 'Crea flujos automáticos para optimizar tu trabajo',
    completed: false,
    steps: [
      {
        id: 'automation-intro',
        title: 'Automatizaciones',
        description: 'Crea flujos automáticos que se ejecuten cuando ocurran eventos específicos.',
      },
      {
        id: 'workflow-list',
        title: 'Lista de Workflows',
        description: 'Aquí ves todos tus workflows. Puedes activarlos, pausarlos o editarlos.',
        target: '.workflow-list',
      },
      {
        id: 'create-workflow',
        title: 'Crear Workflow',
        description: 'Haz clic en "Nuevo Workflow" para crear una automatización.',
        target: '.new-workflow-button',
        action: 'click'
      },
      {
        id: 'workflow-nodes',
        title: 'Nodos de Workflow',
        description: 'Usa Triggers para iniciar, Acciones para ejecutar tareas y Condiciones para tomar decisiones.',
        target: '.workflow-nodes',
      }
    ]
  }
]

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [currentModule, setCurrentModule] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [modules, setModules] = useState(tutorialModules)

  useEffect(() => {
    // Cargar progreso del tutorial desde localStorage
    const savedProgress = localStorage.getItem('flowcrm-tutorial-progress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setModules(prev => prev.map(module => ({
        ...module,
        completed: progress[module.id] || false
      })))
    }
  }, [])

  const startTutorial = (moduleId: string) => {
    setCurrentModule(moduleId)
    setCurrentStep(0)
    setIsActive(true)
  }

  const nextStep = () => {
    const module = modules.find(m => m.id === currentModule)
    if (module && currentStep < module.steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const skipTutorial = () => {
    setIsActive(false)
    setCurrentModule(null)
    setCurrentStep(0)
  }

  const completeTutorial = () => {
    if (currentModule) {
      markModuleCompleted(currentModule)
    }
    setIsActive(false)
    setCurrentModule(null)
    setCurrentStep(0)
  }

  const markModuleCompleted = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, completed: true } : module
    ))
    
    // Guardar progreso en localStorage
    const progress = modules.reduce((acc, module) => {
      acc[module.id] = module.id === moduleId ? true : module.completed
      return acc
    }, {} as Record<string, boolean>)
    
    localStorage.setItem('flowcrm-tutorial-progress', JSON.stringify(progress))
  }

  return (
    <TutorialContext.Provider value={{
      currentModule,
      currentStep,
      isActive,
      modules,
      startTutorial,
      nextStep,
      prevStep,
      skipTutorial,
      completeTutorial,
      markModuleCompleted
    }}>
      {children}
    </TutorialContext.Provider>
  )
}

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider')
  }
  return context
}