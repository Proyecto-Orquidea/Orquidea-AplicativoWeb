import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpenIcon, AcademicCapIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const Introduction = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section id="introduction" className="py-20 bg-gradient-to-b from-warm-100 to-warm-50 relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Encabezado */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <BookOpenIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-4">
              Acerca del <span className="gradient-text">Proyecto</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-warm-200"
          >
            <div className="space-y-6 text-primary-700 leading-relaxed">
              <p className="text-base md:text-lg">
                La <span className="font-semibold text-primary-800">violencia de género en Colombia</span> constituye un problema estructural y persistente que afecta de manera profunda el bienestar y la salud mental de mujeres y niñas. A pesar de los avances normativos y de la existencia de sistemas oficiales de reporte, persisten limitaciones en la comprensión integral del fenómeno y en la capacidad institucional para transformar la información disponible en insumos analíticos que orienten la toma de decisiones. En particular, el acceso efectivo a servicios de atención en salud mental continúa siendo un desafío, influenciado por factores individuales, contextuales e institucionales.
              </p>

              <p className="text-base md:text-lg">
                En este contexto, el presente aplicativo web se desarrolla en el marco del proyecto <span className="font-semibold text-accent-700">"Implementación de herramientas analíticas para el estudio de la violencia de género y su influencia en la salud mental de mujeres y niñas en Colombia"</span>, liderado desde la <span className="font-semibold text-primary-800">Universidad Nacional de Colombia – Sede Medellín</span> y financiado a través de la convocatoria <span className="font-semibold text-accent-600">Orquídeas: Mujeres en la Ciencia 2024</span> del Ministerio de Ciencia, Tecnología e Innovación (MinCiencias).
              </p>

              <p className="text-base md:text-lg">
                A partir de los registros del <span className="font-semibold text-primary-800">Sistema Nacional de Vigilancia en Salud Pública (SIVIGILA)</span>, se implementaron análisis estadísticos descriptivos y modelos estadísticos bayesianos, entre ellos un modelo de regresión logística bayesiana orientado a identificar los factores asociados al acceso a servicios de salud mental por parte de las víctimas de violencia de género. Este modelo integra variables relacionadas con las características de la víctima, del agresor y del contexto del hecho, permitiendo una comprensión más precisa de los determinantes de la atención en salud mental.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Introduction
