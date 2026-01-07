import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const RiskTable = () => {
  const riskData = [
    { parameter: "Ciclo vital : Juventud", orMedia: "1,0532", sd: "0,0183", or25: "1,016", or975: "1,0909" },
    { parameter: "Ciclo vital : Niñez y adolescencia", orMedia: "0,9138", sd: "0,0209", or25: "0,8772", or975: "0,9516" },
    { parameter: "Convivencia agresor: No", orMedia: "1,0733", sd: "0,0088", or25: "1,0549", or975: "1,0919" },
    { parameter: "Convivencia agresor: Sí", orMedia: "0,9317", sd: "0,0088", or25: "0,9159", or975: "0,9479" },
    { parameter: "Antioquia", orMedia: "0,5679", sd: "0,1258", or25: "0,4427", or975: "0,7238" },
    { parameter: "Casanare", orMedia: "1,4182", sd: "0,0875", or25: "1,1969", or975: "1,6806" },
    { parameter: "Cauca", orMedia: "1,4894", sd: "0,0792", or25: "1,2747", or975: "1,74" },
    { parameter: "Cesar", orMedia: "0,5621", sd: "0,077", or25: "0,4845", or975: "0,6525" },
    { parameter: "Córdoba", orMedia: "0,4852", sd: "0,074", or25: "0,4191", or975: "0,5603" },
    { parameter: "Cundinamarca", orMedia: "0,5621", sd: "0,1216", or25: "0,4412", or975: "0,7108" },
    { parameter: "Huila", orMedia: "1,2076", sd: "0,0848", or25: "1,0221", or975: "1,4263" },
    { parameter: "La Guajira", orMedia: "0,5254", sd: "0,0853", or25: "0,4456", or975: "0,6219" },
    { parameter: "Magdalena", orMedia: "0,6662", sd: "0,0786", or25: "0,5729", or975: "0,7774" },
    { parameter: "Meta", orMedia: "0,73", sd: "0,0932", or25: "0,6084", or975: "0,8733" },
    { parameter: "Nariño", orMedia: "3,2881", sd: "0,0911", or25: "2,7484", or975: "3,9359" },
    { parameter: "Norte De Santander", orMedia: "0,6282", sd: "0,0869", or25: "0,5294", or975: "0,7433" },
    { parameter: "Putumayo", orMedia: "7,8314", sd: "0,1645", or25: "5,6944", or975: "10,7577" },
    { parameter: "Quindío", orMedia: "0,8214", sd: "0,087", or25: "0,6924", or975: "0,9734" },
    { parameter: "Risaralda", orMedia: "0,6905", sd: "0,0975", or25: "0,5699", or975: "0,8351" },
    { parameter: "Santander", orMedia: "0,5497", sd: "0,1109", or25: "0,4409", or975: "0,6823" },
    { parameter: "Sucre", orMedia: "0,3786", sd: "0,0968", or25: "0,3138", or975: "0,4584" },
    { parameter: "Tolima", orMedia: "0,4791", sd: "0,0974", or25: "0,3965", or975: "0,5794" },
    { parameter: "Vaupés", orMedia: "2,946", sd: "0,4522", or25: "1,225", or975: "7,1746" },
    { parameter: "Bogotá, D.C.", orMedia: "0,3316", sd: "0,1242", or25: "0,2596", or975: "0,4211" },
    { parameter: "Bolívar", orMedia: "0,7049", sd: "0,0864", or25: "0,5961", or975: "0,8347" },
    { parameter: "Caldas", orMedia: "1,2045", sd: "0,0811", or25: "1,0294", or975: "1,412" },
    { parameter: "Escenario: Espacio público y social", orMedia: "0,9394", sd: "0,0155", or25: "0,9118", or975: "0,9688" },
    { parameter: "Escenario: Vivienda", orMedia: "1,0645", sd: "0,0155", or25: "1,0322", or975: "1,0968" },
    { parameter: "Mujer CABF: No", orMedia: "1,0391", sd: "0,0181", or25: "1,0026", or975: "1,0764" },
    { parameter: "Mujer CABF: Sí", orMedia: "0,9624", sd: "0,0181", or25: "0,929", or975: "0,9974" },
    { parameter: "Naturaleza: Física", orMedia: "0,8044", sd: "0,0173", or25: "0,7774", or975: "0,8315" },
    { parameter: "Naturaleza: Psicológica", orMedia: "1,1243", sd: "0,0149", or25: "1,0923", or975: "1,1575" },
    { parameter: "Naturaleza: Sexual", orMedia: "2,5599", sd: "0,0091", or25: "2,5149", or975: "2,6061" },
    { parameter: "Naturaleza: Negligencia y abandono", orMedia: "0,4319", sd: "0,0167", or25: "0,4179", or975: "0,4463" },
    { parameter: "Paciente hospitalizado: No", orMedia: "0,7281", sd: "0,023", or25: "0,6949", or975: "0,7609" },
    { parameter: "Paciente hospitalizado: Sí", orMedia: "1,3735", sd: "0,023", or25: "1,3143", or975: "1,439" },
    { parameter: "Sexo agresor: Masculino", orMedia: "1,1316", sd: "0,0176", or25: "1,0931", or975: "1,1701" },
    { parameter: "Sexo agresor: Femenino", orMedia: "0,8837", sd: "0,0176", or25: "0,8546", or975: "0,9148" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors mb-4"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-900 mb-4">
            Tabla de Riesgos
          </h1>
          <p className="text-lg text-primary-700 max-w-3xl">
            Análisis de Odds Ratio (OR) de factores de riesgo asociados a la violencia contra la mujer en Colombia
          </p>
        </motion.div>

        {/* Leyenda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-primary-900 mb-3">Interpretación</h2>
          <ul className="space-y-2 text-primary-700">
            <li><strong>OR Media:</strong> Odds Ratio promedio (valor promedio del riesgo)</li>
            <li><strong>SD:</strong> Desviación estándar</li>
            <li><strong>OR 2.5% - OR 97.5%:</strong> Intervalo de confianza al 95%</li>
            <li className="pt-2 border-t border-primary-200">
              <strong>Nota:</strong> Un OR mayor a 1 indica mayor riesgo, menor a 1 indica menor riesgo
            </li>
          </ul>
        </motion.div>

        {/* Formulación del Modelo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-primary-900 mb-4">Formulación del Modelo</h2>
          <div className="text-primary-800 space-y-4">
            <p className="mb-4">El modelo y predictor lineal están dados por:</p>
            <div className="bg-white p-6 rounded-lg shadow-inner overflow-x-auto">
              <div className="text-center space-y-6">
                <div className="text-lg">
                  <BlockMath math="Logit(\theta_i) = \ln\left(\frac{\theta_i}{1-\theta_i}\right) = \eta_i" />
                </div>
                <div className="text-lg">
                  <BlockMath math="\eta_i = \boldsymbol{\beta}\mathbf{X}_{[i]} + \sum_{j} \gamma_{k,j,[i]}" />
                </div>
                <div className="text-lg">
                  <BlockMath math="\theta_i = \frac{1}{1+e^{-\eta_i}}" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-primary-700">
              <p><strong>Donde:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><InlineMath math="\theta_i" /> representa la probabilidad de ocurrencia del evento</li>
                <li><InlineMath math="\boldsymbol{\beta}" /> son los coeficientes del modelo (log-odds ratios)</li>
                <li><InlineMath math="\mathbf{X}_{[i]}" /> son las variables predictoras</li>
                <li><InlineMath math="\gamma_{k,j,[i]}" /> son los efectos aleatorios</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Tabla */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Parámetro
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    OR Media
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    SD
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    OR 2.5%
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    OR 97.5%
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100">
                {riskData.map((row, index) => {
                  const orValue = parseFloat(row.orMedia.replace(',', '.'))
                  const isHighRisk = orValue > 1.5
                  const isMediumRisk = orValue >= 1 && orValue <= 1.5
                  
                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.02 }}
                      className={`hover:bg-primary-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-warm-50'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-primary-900 font-medium">
                        {row.parameter}
                        {isHighRisk && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Alto riesgo
                          </span>
                        )}
                        {isMediumRisk && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Riesgo moderado
                          </span>
                        )}
                      </td>
                      <td className={`px-6 py-4 text-sm text-center font-semibold ${
                        isHighRisk ? 'text-red-600' : 
                        isMediumRisk ? 'text-yellow-600' : 
                        'text-primary-700'
                      }`}>
                        {row.orMedia}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-primary-700">
                        {row.sd}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-primary-700">
                        {row.or25}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-primary-700">
                        {row.or975}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer información adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-primary-600"
        >
          <p>Datos basados en análisis estadístico de violencia contra la mujer en Colombia</p>
          <p className="mt-2">Fuente: Programa Orquídea - Universidad Nacional de Colombia</p>
        </motion.div>
      </div>
    </div>
  )
}

export default RiskTable
