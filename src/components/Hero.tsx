import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

import orquideaLogo from '../assets/Identificador-Programa-Orquideas.webp'
import unalLogo from '../assets/Logo-UNAL-Photoroom.webp'

const Hero = () => {
  const scrollToNext = useCallback(() => {
    const introductionSection = document.getElementById('introduction')
    if (introductionSection) {
      introductionSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any
      }
    }
  }

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-warm-50 to-warm-100"
    >
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-primary-50/30 to-accent-50/20" />

      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-primary-900 max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-6">
            {/* Logos superiores */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-12 pt-16"
            >
              <div className="flex flex-row items-center justify-center gap-8">
                <img
                  src={unalLogo}
                  alt="Universidad Nacional de Colombia"
                  className="w-56 md:w-64 lg:w-72 h-auto drop-shadow-2xl"
                  loading="eager"
                />
                <img
                  src={orquideaLogo}
                  alt="Programa Orquídea"
                  className="w-48 md:w-60 lg:w-68 h-auto drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </motion.div>

            {/* Título Conciencia Mujer */}
            <div className="flex flex-col items-center mb-6">
              {/* Línea decorativa superior */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent-400" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-500">
                  ✦ plataforma de datos ✦
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent-400" />
              </div>

              {/* Título principal */}
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-none mb-4">
                <span className="text-primary-900">Conciencia</span>
                <span className="relative ml-3 text-accent-600 italic">
                  Mujer
                  <svg
                    className="absolute left-0 w-full"
                    style={{ bottom: '-10px' }}
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,6 Q25,1 50,6 Q75,11 100,6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtítulo con espacio suficiente para la raya */}
              <p className="text-lg md:text-xl text-primary-600 mt-6">
                Análisis de violencia contra la mujer en Colombia
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-semibold leading-tight text-primary-800">
              Datos y análisis sobre{' '}
              <span className="text-accent-600">violencia de género</span>
            </h2>
            <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto leading-relaxed">
              Plataforma de información y estadísticas sobre la situación de la
              mujer en los diferentes departamentos de Colombia.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToNext}
              className="group px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Ver estadísticas
              </span>
            </motion.button>

            <Link to="/graficas">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Generar gráficas
                </span>
              </motion.button>
            </Link>

            <Link to="/riesgos">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 border-2 border-accent-600 text-accent-600 rounded-full font-semibold text-lg hover:bg-accent-600 hover:text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ver Riesgos
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero