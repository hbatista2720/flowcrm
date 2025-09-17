'use client'

import { Check, Star } from 'lucide-react'
import { subscriptionPlans } from '@/lib/subscription/plans'

export default function PricingPlans() {
  const handleSelectPlan = (planId: string) => {
    console.log('Plan seleccionado:', planId)
    // Aquí iría la lógica de Stripe/pago
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Selecciona tu plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 p-6 ${
              plan.popular 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                {plan.price === 0 ? (
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    Gratis
                  </span>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      USD /mes
                    </span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {plan.description}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSelectPlan(plan.id)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {plan.price === 0 ? 'Empezar Gratis' : 'Seleccionar Plan'}
            </button>

            {plan.trialDays && plan.price > 0 && (
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                Prueba gratis por {plan.trialDays} días
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}