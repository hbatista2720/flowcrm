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
import { MessageSquare, Bot, Globe, Zap } from 'lucide-react'

const nodeTypes = {
  message: MessageNode,
  ai: AINode,
  http: HTTPNode,
  trigger: TriggerNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { label: 'Inicio' },
  },
]

const initialEdges: Edge[] = []

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNodeType, setSelectedNodeType] = useState('message')

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: selectedNodeType,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: getNodeLabel(selectedNodeType),
        content: ''
      },
    }
    setNodes((nds) => nds.concat(newNode))
  }, [nodes.length, selectedNodeType, setNodes])

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h3 className="font-semibold mb-4">Nodos Disponibles</h3>
        
        <div className="space-y-2">
          <NodeButton
            type="message"
            icon={MessageSquare}
            label="Mensaje"
            selected={selectedNodeType === 'message'}
            onClick={() => setSelectedNodeType('message')}
          />
          <NodeButton
            type="ai"
            icon={Bot}
            label="IA"
            selected={selectedNodeType === 'ai'}
            onClick={() => setSelectedNodeType('ai')}
          />
          <NodeButton
            type="http"
            icon={Globe}
            label="HTTP"
            selected={selectedNodeType === 'http'}
            onClick={() => setSelectedNodeType('http')}
          />
        </div>

        <button
          onClick={addNode}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Agregar Nodo
        </button>
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

function NodeButton({ type, icon: Icon, label, selected, onClick }: {
  type: string
  icon: any
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 rounded-md border ${
        selected
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{label}</span>
    </button>
  )
}

function MessageNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
        <span className="font-medium text-sm">Mensaje</span>
      </div>
      <textarea
        className="w-full text-sm border rounded p-2 resize-none"
        placeholder="Escribe tu mensaje..."
        rows={3}
        defaultValue={data.content}
      />
    </div>
  )
}

function AINode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <Bot className="h-4 w-4 text-purple-600 mr-2" />
        <span className="font-medium text-sm">IA</span>
      </div>
      <textarea
        className="w-full text-sm border rounded p-2 resize-none"
        placeholder="Prompt para la IA..."
        rows={3}
        defaultValue={data.content}
      />
    </div>
  )
}

function HTTPNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-green-200 rounded-lg p-4 min-w-[200px]">
      <div className="flex items-center mb-2">
        <Globe className="h-4 w-4 text-green-600 mr-2" />
        <span className="font-medium text-sm">HTTP</span>
      </div>
      <input
        className="w-full text-sm border rounded p-2 mb-2"
        placeholder="URL del endpoint"
        defaultValue={data.url}
      />
      <select className="w-full text-sm border rounded p-2">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
      </select>
    </div>
  )
}

function TriggerNode({ data }: { data: any }) {
  return (
    <div className="bg-white border-2 border-yellow-200 rounded-lg p-4 min-w-[150px]">
      <div className="flex items-center justify-center">
        <Zap className="h-4 w-4 text-yellow-600 mr-2" />
        <span className="font-medium text-sm">Inicio</span>
      </div>
    </div>
  )
}

function getNodeLabel(type: string): string {
  const labels = {
    message: 'Nuevo Mensaje',
    ai: 'Respuesta IA',
    http: 'Llamada HTTP',
    trigger: 'Inicio'
  }
  return labels[type as keyof typeof labels] || 'Nodo'
}