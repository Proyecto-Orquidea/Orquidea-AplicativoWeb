import { useEffect, useState } from 'react'
import Hero from './Hero'
import Introduction from './Introduction'
import Statistics from './Statistics'
import ColombiaMap from './Map'
import Historical from './Historical'
import Footer from './Footer'
import Navigation from './Navigation'
import ScrollProgress from './ScrollProgress'
import FloatingElements from './FloatingElements'
import AnimatedBackground from './AnimatedBackground'

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'introduction', 'statistics', 'map', 'historical']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <ScrollProgress />
      <Navigation activeSection={activeSection} />
      <FloatingElements />
      
      <main className="relative z-10">
        <Hero />
        <Introduction />
        <Statistics />
        <ColombiaMap />
        <Historical />

        {/* Survey Section */}
        <section className="relative z-20 py-16 bg-gradient-to-b from-white to-primary-50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-700 mb-6">
              Tu opinión es importante
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Tu opinión es muy importante para nosotros. Si has utilizado ConcienciaMujer, te invitamos a compartir tu experiencia diligenciando una breve encuesta de evaluación. Tus respuestas nos ayudarán a mejorar esta herramienta interactiva y a fortalecer su utilidad para la investigación y la comprensión de la violencia de género en Colombia.
            </p>
            <a
              href="https://docs.google.com/forms/d/1LDD4ZFOlVLH-D05SUOSCDWUzUP0Yx4Iz0MmIxYymMqs/edit?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Acceder al formulario
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default HomePage