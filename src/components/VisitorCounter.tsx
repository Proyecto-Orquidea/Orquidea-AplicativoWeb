import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Configuración del contador universal usando counterapi.dev (gratuito)
// Este servicio almacena el conteo globalmente en sus servidores
const COUNTER_NAMESPACE = 'orquidea-concienciamujer'
const COUNTER_NAME = 'visitas'

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Usamos sessionStorage para evitar incrementar en cada recarga de página (hits)
    // Esto lo convierte en un contador de "Visitas" (sesiones) y no solo de "Hits"
    const sessionKey = 'orquidea_session_counted'
    const isNewSession = !sessionStorage.getItem(sessionKey)

    const fetchCount = async () => {
      try {
        // Enpoint base
        let endpoint = https://api.counterapi.dev/v1//
        
        // Si es nueva sesión, usamos /up para incrementar
        // Si no, usamos el endpoint base para solo leer
        if (isNewSession) {
          endpoint += '/up'
        }

        let response = await fetch(endpoint)
        
        // Manejo de errores específicos:
        // Si la API devuelve 400 o 404, significa que el contador no existe.
        // En ese caso, intentamos iniciarlo (haciendo un /up) incluso si no es nueva sesión.
        if (!response.ok && (response.status === 400 || response.status === 404)) {
           console.log('Contador global no encontrado, inicializando...')
           // Forzamos creación
           const initEndpoint = https://api.counterapi.dev/v1///up
           response = await fetch(initEndpoint)
        }

        if (!response.ok) {
          throw new Error(API error: )
        }
        
        const data = await response.json()
        
        if (data.count !== undefined) {
          setCount(data.count)
          setIsOnline(true)
          
          if (isNewSession) {
            sessionStorage.setItem(sessionKey, 'true')
          }
          
          // Guardamos un backup local para robustez
          localStorage.setItem('orquidea_visit_count_backup', data.count.toString())
        } else {
          throw new Error('Respuesta inválida de la API')
        }
      } catch (error) {
        console.warn('API de contador global no disponible, usando modo local:', error)
        setIsOnline(false)
        fallbackToLocalStorage(isNewSession)
      } finally {
        setIsLoading(false)
      }
    }

    const fallbackToLocalStorage = (shouldIncrement: boolean) => {
      try {
        const storageKey = 'orquidea_visit_count_backup'
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
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-sm">
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
          <p className="text-3xl font-bold text-white tabular-nums leading-none">
            {count.toLocaleString('es-CO')}
          </p>
          <p className="text-xs text-white/80 uppercase tracking-wider font-medium mt-1">
            Visitas Globales
          </p>
        </div>
        {/* Indicador de estado */}
        <div 
          className={w-2 h-2 rounded-full mb-auto {isOnline ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' : 'bg-yellow-400'}}
          title={isOnline ? 'Sincronizado globalmente' : 'Modo local (Sin conexión)'}
        />
      </div>
    </motion.div>
  )
}

export default VisitorCounter
