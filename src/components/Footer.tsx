import { motion } from 'framer-motion'
import VisitorCounter from './VisitorCounter'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-20 bg-gradient-to-br from-primary-700 via-primary-800 to-accent-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          {/* Visitor Counter Section */}
          <VisitorCounter />
          
          {/* Divider */}
          <div className="w-24 h-0.5 bg-white/30 mx-auto" />
          
          <p className="text-sm text-white/80">
            © {currentYear} Análisis de Datos - Violencia de Género en Colombia. 
            Información con fines educativos y de investigación.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
