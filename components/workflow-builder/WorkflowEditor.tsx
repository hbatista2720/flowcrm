'use client'

import { useCallback, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'react-flow-renderer'
import { Zap, MessageSquare, Mail, Database, Webhook, Clock, Filter } from 'lucide-react'

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Nuevo mensaje WhatsApp',
      triggerType: 'whatsapp_message'
    },
  },
]

const initialEdges: Edge[] = []

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNodeType, setSelectedNodeType] = useState('action')

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: selectedNodeType,
      position: { x: Math.random() * 400 + 200, y: Math.random() * 400 + 200 },
      data: { 
        label: getNodeLabel(selectedNodeType),
        nodeType: selectedNodeType
      },
    }
    setNodes((nds) => nds.concat(newNode))
  }, [nodes.length, selectedNodeType, setNodes])

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h3 className="font-semibold mb-4">Nodos de Automatización</h3>
        
        <div className="space-y-2">
          <NodeButton
            type="trigger"
            icon={Zap}
            label="Trigger"
            description="Inicia el flujo"
            selected={selectedNodeType === 'trigger'}
            onClick={() => setSelectedNodeType('trigger')}
          />
          <NodeButton
            type="action"
            icon={MessageSquare}
            label="Acción"
            description="Ejecuta una tarea"
            selected={selectedNodeType === 'action'}
            onClick={() => setSelectedNodeType('action')}
          />
          <NodeButton
            type="condition"
            icon={Filter}
            label="Condición"
            description="Evalúa una condición"
            selected={selectedNodeType === 'condition'}
            onClick={() => setSelectedNodeType('condition')}
          />
          <NodeButton
            type="delay"
            icon={Clock}
            label="Espera"
            description="Pausa el flujo"
            selected={selectedNodeType === 'delay'}
            onClick={() => setSelectedNodeType('delay')}
          />
        </div>

        <button
          onClick={addNode}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Agregar Nodo
        </button>

        {/* Templates */}
        <div className="mt-8">
          <h4 className="font-medium mb-3">Plantillas</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-sm bg-gray-50 rounded hover:bg-gray-100">
              📱 WhatsApp → CRM
            </button>
            <button className="w-full text-left p-2 text-sm bg-gray-50 rounded hover:bg-gray-100">
              📧 Email → Lead
            </button>
            <button className="w-full text-left p-2 text-sm bg-gray-50 rounded hover:bg-gray-100">
              🔔 Recordatorio
            </button>
          </div>
        </div>
      </div>

      {/* Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
}

function NodeButton({ type, icon: Icon, label, description, selected, onClick }: {
  type: string
  icon: any
  label: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start p-3 rounded-md border text-left ${
        selected
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </button>
  )
}

function TriggerNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-yellow-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <Zap className="h-4 w-4 text-yellow-600 mr-2" />
        <span className="font-medium text-sm">Trigger</span>
      </div>
      <select className="w-full text-sm border rounded p-2">
        <option value="whatsapp_message">Nuevo mensaje WhatsApp</option>
        <option value="email_received">Email recibido</option>
        <option value="lead_created">Lead creado</option>
        <option value="schedule">Programado</option>
      </select>
    </div>
  )
}

function ActionNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
        <span className="font-medium text-sm">Acción</span>
      </div>
      <select className="w-full text-sm border rounded p-2 mb-2">
        <option value="send_message">Enviar mensaje</option>
        <option value="create_lead">Crear lead</option>
        <option value="send_email">Enviar email</option>
        <option value="update_crm">Actualizar CRM</option>
        <option value="webhook">Llamar webhook</option>
      </select>
      <textarea
        className="w-full text-sm border rounded p-2 resize-none"
        placeholder="Configuración de la acción..."
        rows={2}
      />
    </div>
  )
}

function ConditionNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <Filter className="h-4 w-4 text-purple-600 mr-2" />
        <span className="font-medium text-sm">Condición</span>
      </div>
      <select className="w-full text-sm border rounded p-2 mb-2">
        <option value="contains">Contiene texto</option>
        <option value="equals">Es igual a</option>
        <option value="greater">Mayor que</option>
        <option value="exists">Campo existe</option>
      </select>
      <input
        className="w-full text-sm border rounded p-2"
        placeholder="Valor a comparar"
      />
    </div>
  )
}

function DelayNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-orange-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <Clock className="h-4 w-4 text-orange-600 mr-2" />
        <span className="font-medium text-sm">Espera</span>
      </div>
      <div className="flex space-x-2">
        <input
          type="number"
          className="flex-1 text-sm border rounded p-2"
          placeholder="5"
          min="1"
        />
        <select className="text-sm border rounded p-2">
          <option value="minutes">min</option>
          <option value="hours">hrs</option>
          <option value="days">días</option>
        </select>
      </div>
    </div>
  )
}

function getNodeLabel(type: string): string {
  const labels = {
    trigger: 'Nuevo Trigger',
    action: 'Nueva Acción',
    condition: 'Nueva Condición',
    delay: 'Nueva Espera'
  }
  return labels[type as keyof typeof labels] || 'Nuevo Nodo'
}