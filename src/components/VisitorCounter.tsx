import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Configuración del contador universal usando JSONBin.io (gratuito)
// Crea tu bin en https://jsonbin.io y reemplaza estos valores
const JSONBIN_BIN_ID = '67a0f8e8ad19ca34f8f3a2b1' // Reemplazar con tu BIN ID real
const JSONBIN_API_KEY = '$2a$10$YOUR_API_KEY_HERE' // Reemplazar con tu API key

// Alternativa: usar un servicio simple de contador
// Usamos api.counterapi.dev que es gratuito y funcional
const COUNTER_NAMESPACE = 'orquidea-concienciamujer'
const COUNTER_NAME = 'visitas'

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const sessionKey = 'orquidea_session_counted'
    const isNewSession = !sessionStorage.getItem(sessionKey)

    const fetchCount = async () => {
      try {
        // Usamos counterapi.dev - servicio gratuito y activo
        const endpoint = isNewSession 
          ? `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_NAME}/up`
          : `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_NAME}`
        
        const response = await fetch(endpoint, {
          method: isNewSession ? 'GET' : 'GET',
        })
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.count !== undefined) {
          setCount(data.count)
          setIsOnline(true)
          if (isNewSession) {
            sessionStorage.setItem(sessionKey, 'true')
          }
          // Guardar backup
          localStorage.setItem('orquidea_visit_count_backup', data.count.toString())
        } else {
          throw new Error('Respuesta inválida')
        }
      } catch (error) {
        console.warn('API de contador no disponible, usando backup local:', error)
        setIsOnline(false)
        fallbackToLocalStorage(isNewSession)
      } finally {
        setIsLoading(false)
      }
    }

    const fallbackToLocalStorage = (shouldIncrement: boolean) => {
      try {
        const storageKey = 'orquidea_visit_count_backup'
        // Usar el último valor conocido del servidor, o un valor base
        let currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10)
        
        if (shouldIncrement && !sessionStorage.getItem(sessionKey)) {
          currentCount += 1
          localStorage.setItem(storageKey, currentCount.toString())
          sessionStorage.setItem(sessionKey, 'true')
        }
        
        setCount(currentCount)
      } catch (err) {
        console.error('Error con localStorage:', err)
        setCount(null)
      }
    }

    fetchCount()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-primary-600">
        <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Cargando visitas...</span>
      </div>
    )
  }

  if (count === null) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
        <div className="bg-white/20 rounded-full p-2">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-white">
            {count.toLocaleString('es-CO')}
          </p>
          <p className="text-xs text-white/70 uppercase tracking-wider">
            Visitas totales {!isOnline && '(offline)'}
          </p>
        </div>
        {/* Indicador de sincronización */}
        <div 
          className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-yellow-400'}`}
          title={isOnline ? 'Contador sincronizado' : 'Usando datos locales'}
        />
      </div>
    </motion.div>
  )
}

export default VisitorCounter
