'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { 
  User, 
  CreditCard, 
  Key, 
  FileText, 
  Lightbulb, 
  Palette, 
  LogOut,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '@/lib/themes/ThemeProvider'

interface ProfileSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'subscription', label: 'Suscripción', icon: CreditCard },
  { id: 'api', label: 'API', icon: Key },
  { id: 'terms', label: 'Términos y privacidad', icon: FileText },
  { id: 'recommendations', label: 'Recomendaciones de uso', icon: Lightbulb },
  { id: 'theme', label: 'Tema', icon: Palette }
]

export default function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
  const { data: session } = useSession()
  const { theme } = useTheme()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-full">
      {/* User Info */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex items-center">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || ''}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {getInitials(session?.user?.name || 'U')}
              </span>
            </div>
          )}
          <div className="ml-3">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {session?.user?.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Activos
            </span>
            <span className="text-xs text-gray-900 dark:text-white">
              1 / 1
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              15 bots
            </span>
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              45 bots
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t dark:border-gray-700">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar sesión
        </button>
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>FlowCRM v1.0.0</p>
          <p>© 2024 FlowCRM</p>
        </div>
      </div>
    </div>
  )
}