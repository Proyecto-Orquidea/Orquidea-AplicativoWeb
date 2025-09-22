import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './components/HomePage'
import GraphicsAnalysis from './components/GraphicsAnalysis'
import './App.css'
import './styles/charts.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                />
                <h1 className="text-3xl font-display font-bold mb-2">Orquídea</h1>
                <p className="text-lg opacity-90">Datos y análisis</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/graficas" element={<GraphicsAnalysis />} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
