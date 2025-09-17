'use client'

import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

export default function LeadStats() {
  const stats = [
    {
      title: 'Total Leads',
      value: '47',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Valor Pipeline',
      value: '$24,500',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Tasa Conversión',
      value: '18.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      title: 'Crecimiento',
      value: '+23%',
      change: 'vs mes anterior',
      changeType: 'neutral',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}