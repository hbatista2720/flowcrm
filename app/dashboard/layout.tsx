'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import UserMenu from '@/components/auth/UserMenu'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Gestiona tu CRM de manera eficiente</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <UserMenu />
            </div>
          </div>
          
          {showNotifications && (
            <div className="absolute right-6 top-16 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notificaciones</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">No hay notificaciones nuevas</p>
              </div>
            </div>
          )}
        </header>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}