import { useEffect, useState } from 'react'
import Hero from './Hero'
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
      const sections = ['hero', 'statistics', 'map', 'historical']
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
        <Statistics />
        <ColombiaMap />
        <Historical />
      </main>
      
      <Footer />
    </div>
  )
}

export default HomePage