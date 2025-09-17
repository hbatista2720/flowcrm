'use client'

import { Download } from 'lucide-react'
import { BotTemplate } from '@/lib/templates/botTemplates'

interface TemplateCardProps {
  template: BotTemplate
  onSelect: (template: BotTemplate) => void
  onUse: (template: BotTemplate) => void
}

export default function TemplateCard({ template, onSelect, onUse }: TemplateCardProps) {
  return (
    <div
      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(template)}
    >
      {/* Template Header with Gradient */}
      <div className={`h-32 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
        <div className="text-4xl">{template.icon}</div>
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {template.category}
          </span>
        </div>
      </div>

      {/* Template Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          {template.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {template.description}
        </p>

        {/* Features Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {template.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {template.features.length > 2 && (
              <span className="text-xs text-gray-500">
                +{template.features.length - 2} más
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onUse(template)
          }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm font-medium transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Importar
        </button>
      </div>
    </div>
  )
}