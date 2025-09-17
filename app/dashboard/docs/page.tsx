'use client'

import { useState } from 'react'
import { Play, Book, Upload, Plus, X } from 'lucide-react'
import { tutorialVideos, knowledgeBase } from '@/lib/tutorial/knowledgeBase'

export default function DocsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', vimeoId: '', description: '', category: '' })

  const handleAddVideo = () => {
    console.log('Nuevo video:', newVideo)
    setShowUploadModal(false)
    setNewVideo({ title: '', vimeoId: '', description: '', category: '' })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Documentación y Tutoriales
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Guías, videos y base de conocimiento de FlowCRM
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Video
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Videos Tutoriales */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Play className="h-5 w-5 mr-2" />
            Videos Tutoriales
          </h2>
          <div className="space-y-4">
            {tutorialVideos.map((video) => (
              <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {video.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2">
                        {video.category}
                      </span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(`https://vimeo.com/${video.vimeoId}`, '_blank')}
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center ml-4"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Base de Conocimiento */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Base de Conocimiento
          </h2>
          <div className="space-y-4">
            {knowledgeBase.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.content}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para agregar video */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Agregar Video Tutorial
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título del video
                  </label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                    className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: Cómo crear un bot"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ID de Vimeo
                  </label>
                  <input
                    type="text"
                    value={newVideo.vimeoId}
                    onChange={(e) => setNewVideo({...newVideo, vimeoId: e.target.value})}
                    className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="123456789"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Encuentra el ID en la URL de Vimeo: vimeo.com/[ID]
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                    rows={3}
                    className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Descripción del contenido del video"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoría
                  </label>
                  <select
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                    className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="primeros-pasos">Primeros Pasos</option>
                    <option value="bots">Bots</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="crm">CRM</option>
                    <option value="automatizaciones">Automatizaciones</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddVideo}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Agregar Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}