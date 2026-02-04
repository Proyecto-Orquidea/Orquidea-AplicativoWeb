import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Configuración del contador universal
// Usamos CountAPI.xyz - servicio gratuito para contadores
const NAMESPACE = 'orquidea-concienciamujer'
const KEY = 'visitas'

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sessionKey = 'orquidea_session_counted'
    const isNewSession = !sessionStorage.getItem(sessionKey)

    const fetchCount = async () => {
      try {
        // Si es una nueva sesión, incrementamos el contador
        // Si no, solo obtenemos el valor actual
        const endpoint = isNewSession 
          ? `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`
          : `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`
        
        const response = await fetch(endpoint)
        
        if (!response.ok) {
          throw new Error('CountAPI no disponible')
        }
        
        const data = await response.json()
        
        if (data.value !== undefined) {
          setCount(data.value)
          // Marcar esta sesión como contada
          if (isNewSession) {
            sessionStorage.setItem(sessionKey, 'true')
          }
          // Guardar en localStorage como backup
          localStorage.setItem('orquidea_visit_count_backup', data.value.toString())
        } else {
          throw new Error('Respuesta inválida')
        }
      } catch (error) {
        console.error('Error con CountAPI, usando fallback local:', error)
        // Fallback a localStorage si CountAPI falla
        fallbackToLocalStorage(isNewSession)
      } finally {
        setIsLoading(false)
      }
    }

    const fallbackToLocalStorage = (shouldIncrement: boolean) => {
      try {
        const storageKey = 'orquidea_visit_count_backup'
        let currentCount = parseInt(localStorage.getItem(storageKey) || '1000', 10)
        
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
            Visitas totales
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default VisitorCounter
