'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Bot, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Sparkles,
  Zap,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const menuItems = [
  {
    section: 'CREAR',
    items: [
      { id: 'bots', label: 'Bots', icon: Bot, href: '/dashboard' },
      { id: 'templates', label: 'Plantillas', icon: Sparkles, href: '/dashboard/templates' }
    ]
  },
  {
    section: 'GESTIÓN',
    items: [
      { id: 'inbox', label: 'Inbox', icon: MessageSquare, href: '/dashboard?tab=inbox' },
      { id: 'pipeline', label: 'Pipeline', icon: Users, href: '/dashboard?tab=pipeline' },
      { id: 'flows', label: 'Automatizaciones', icon: Zap, href: '/dashboard?tab=flows' }
    ]
  },
  {
    section: 'HERRAMIENTAS',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
      { id: 'calendar', label: 'Calendario', icon: Calendar, href: '/dashboard/calendar' }
    ]
  },
  {
    section: 'SOPORTE',
    items: [
      { id: 'docs', label: 'Documentación', icon: FileText, href: '/dashboard/docs' },
      { id: 'help', label: 'Ayuda', icon: HelpCircle, href: '/dashboard/help' },
      { id: 'profile', label: 'Perfil', icon: User, href: '/dashboard/profile' }
    ]
  }
]

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('bots')

  const isActive = (href: string) => {
    if (href.includes('?tab=')) {
      const tab = href.split('tab=')[1]
      return pathname === '/dashboard' && activeTab === tab
    }
    return pathname === href
  }

  return (
    <div className={`bg-gray-900 dark:bg-gray-950 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">FlowCRM</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            {!isCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section.section}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      if (item.href.includes('?tab=')) {
                        const tab = item.href.split('tab=')[1]
                        setActiveTab(tab)
                      }
                    }}
                    className={`flex items-center px-4 py-3 text-sm transition-colors ${
                      active
                        ? 'bg-blue-600 text-white border-r-2 border-blue-400'
                        : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 dark:border-gray-700">
        {!isCollapsed && (
          <div className="text-xs text-gray-400">
            <p>FlowCRM v1.0.0</p>
            <p>© 2024 FlowCRM</p>
          </div>
        )}
      </div>
    </div>
  )
}