export default function HelpPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Centro de Ayuda
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🤖 Tutorial Bot
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Usa nuestro chatbot tutorial para obtener ayuda instantánea.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Abrir Tutorial Bot
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📧 Contacto
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            ¿Necesitas ayuda personalizada? Contáctanos directamente.
          </p>
        </div>
      </div>
    </div>
  )
}