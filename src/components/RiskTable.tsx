import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { InlineMath, BlockMath } from 'react-katex'
import anovaImage from '../assets/anova_dep_2-1.webp'
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
          <p className="text-lg text-primary-700 max-w-3xl text-center mx-auto">
            Análisis de Odds Ratio (OR) de factores de riesgo asociados a la violencia contra la mujer en Colombia
          </p>
        </motion.div>

        {/* Modelo Logístico: Explicación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-warm-200 p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-primary-900 mb-3">Modelo de Regresión Logística</h2>
          <div className="space-y-4 text-primary-800 text-base md:text-lg leading-relaxed">
            <p>
              Este estudio emplea un modelo de regresión logística para analizar los determinantes del acceso a servicios de salud mental en víctimas de violencia de género en Colombia. A partir de los datos del Sistema Nacional de Vigilancia en Salud Pública (SIVIGILA), se examinan variables relacionadas con la víctima, el agresor, el contexto del hecho y lugar del hecho, con el fin de identificar los principales factores que condicionan la recepción de estos servicios. Los hallazgos obtenidos pueden contribuir a mejorar las estrategias de atención y fortalecer la respuesta institucional.
            </p>
            <p>
              Para analizar los factores que influyen en la atención en salud mental de las víctimas de violencia de género, se utilizó un modelo de regresión logística, el cual es apropiado dada la naturaleza de la variable respuesta, que es binaria. En este caso, se tiene que:
            </p>
            <div className="flex justify-center my-4">
              <BlockMath math={String.raw`Y_i=\begin{cases}1, & \text{víctima } i \text{ recibe atención en salud mental} \\ 0, & \text{en caso contrario}\end{cases}`}/>
            </div>
            <p>
              Tal que <InlineMath math={"Y_i"}/> sigue una distribución de probabilidad de Bernoulli:
            </p>
            <div className="flex justify-center my-4">
              <BlockMath math={String.raw`Y_i \sim \text{Bernoulli-logit}(\theta_i),\quad i = 1,2,\dots,773179`}/>
            </div>
            <p>
              Bajo la parametrización con restricción de suma cero, cada coeficiente expresa cuánto aumenta o disminuye la chance de acceder a servicios de salud mental en comparación con el promedio global, evitando la dependencia de una categoría de referencia específica.
            </p>
          </div>
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

        {/* Imagen ANOVA Departamental */}
        <div className="flex justify-center my-12">
          <div className="bg-white/80 rounded-2xl shadow-lg border border-warm-200 p-4 max-w-3xl w-full flex flex-col items-center">
            <img
              src={anovaImage}
              alt="Resultados ANOVA departamental"
              className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md border border-primary-100"
              style={{ background: 'white' }}
            />
            <span className="mt-2 text-primary-700 text-sm">Figura: Resultado ANOVA Bayesiano con los efectos mas relevantes asociados a la variabilidad de la variable respuesta</span>
          </div>
        </div>

        {/* Interpretación ANOVA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-warm-200 p-6 md:p-8">
            <p className="text-primary-800 text-base md:text-lg leading-relaxed">
              Las mayores contribuciones a la variabilidad están asociadas con el tipo de violencia y con los efectos territoriales (departamento), mientras que la hospitalización y el sexo del agresor también aportan de manera significativa. Esto sugiere que las diferencias en el acceso a atención en salud mental se explican principalmente por la naturaleza del hecho violento y por el contexto territorial donde ocurre. La hospitalización también aparece como un factor relevante, lo que indica que los casos que implican mayor gravedad o mayor contacto con el sistema de salud tienden a activar con mayor frecuencia las rutas de atención psicológica o psiquiátrica. Otros predictores presentan contribuciones comparativamente menores.
            </p>
          </div>
        </motion.div>

        {/* Resultados destacados al final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white via-warm-50 to-accent-50/30 rounded-2xl shadow-2xl border border-warm-200 p-8 md:p-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-2">Resultados Destacados</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
              </div>
              
              <div className="space-y-4 text-primary-800 text-base md:text-lg leading-relaxed">
                <div className="bg-white/60 rounded-lg p-4 border-l-4 border-green-500">
                  <p><strong className="text-green-700">Departamentos con mayor acceso:</strong> Putumayo (OR = 7.83; IC95: 5.69–10.76) y Nariño (OR = 3.29; IC95: 2.74–4.94), seguidos de Casanare (OR = 1.41) y Cauca (OR = 1.48).</p>
                </div>
                
                <div className="bg-white/60 rounded-lg p-4 border-l-4 border-red-500">
                  <p><strong className="text-red-700">Departamentos con menor acceso:</strong> Bogotá D.C. (OR = 0.30), Sucre (OR = 0.33), Córdoba (OR = 0.48), Tolima (OR = 0.48), La Guajira (OR = 0.52), Cesar (OR = 0.56), y otros con OR entre 0.56 y 0.7.</p>
                </div>
                
                <div className="bg-white/60 rounded-lg p-4 border-l-4 border-purple-500">
                  <p><strong className="text-purple-700">Naturaleza de la violencia:</strong> Psicológica (OR = 1.12), Sexual (OR = 2.55), Negligencia o abandono (OR = 0.43).</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4 border-l-4 border-blue-500">
                    <p><strong className="text-blue-700">Convivencia con el agresor:</strong> No convivir (OR = 1.07), convivir (OR = 0.93).</p>
                  </div>
                  
                  <div className="bg-white/60 rounded-lg p-4 border-l-4 border-orange-500">
                    <p><strong className="text-orange-700">Sexo del agresor:</strong> Masculino (OR = 1.13), Femenino (OR = 0.88).</p>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-lg p-4 border-l-4 border-teal-500">
                  <p><strong className="text-teal-700">Hospitalización:</strong> Sí (OR = 1.37), No (OR = 0.73).</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-primary-800 text-base md:text-lg italic text-center">
                  Estos resultados evidencian una marcada heterogeneidad territorial y de factores asociados al acceso a servicios de salud mental, lo que puede orientar estrategias de intervención y políticas públicas más focalizadas.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-primary-600 space-y-1">
              <p className="font-medium">Datos basados en análisis estadístico de violencia contra la mujer en Colombia</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RiskTable
