# 🌸 Proyecto Orquídea - Análisis de Violencia de Género en Colombia

> Una plataforma web interactiva para la visualización y análisis de datos sobre violencia contra las mujeres en Colombia.

## 📋 Descripción del Proyecto

**Proyecto Orquídea** es una aplicación web desarrollada para presentar de manera clara y profesional datos estadísticos sobre la violencia de género en Colombia. El proyecto está enfocado en la educación, investigación y concienciación social a través de visualizaciones de datos interactivas.

### Objetivos

- **Visualización de Datos**: Presentar estadísticas actualizadas sobre violencia de género por departamentos
- **Análisis Geográfico**: Mapas interactivos con distribución territorial de casos
- **Acceso a la Información**: Datos presentados de forma clara y accesible

## 🚀 Tecnologías Utilizadas

### Frontend Core

- **React 19** - Framework de JavaScript con hooks modernos
- **TypeScript** - Tipado estático para desarrollo robusto
- **Vite 7** - Herramienta de build ultra-rápida con HMR
- **React Router DOM** - Navegación SPA con soporte para GitHub Pages

### Estilos y UI

- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Animaciones fluidas y transiciones avanzadas
- **Heroicons** - Iconografía SVG optimizada
- **Headless UI** - Componentes accesibles sin estilos

### Visualización de Datos

- **Chart.js + react-chartjs-2** - Gráficos interactivos (barras, líneas, pie)
- **Recharts** - Gráficos nativos para React
- **D3.js (d3-geo)** - Procesamiento y proyección de mapas geográficos
- **Shapefile.js** - Procesamiento de archivos geoespaciales (.shp, .dbf, .shx)

### Datos Geográficos

- **GeoJSON** - Formato de datos geográficos
- **TopoJSON Client** - Optimización de datos topológicos
- **Proyecciones Mercator** - Transformación de coordenadas para Colombia
- **SVG Rendering** - Mapas vectoriales escalables

### Deployment y CI/CD

- **GitHub Actions** - Integración continua automatizada
- **GitHub Pages** - Hosting estático con configuración SPA
- **Vite Build Optimization** - Code splitting y tree-shaking automático

## Estructura del Proyecto

```bash
src/
├── components/
│   ├── AnimatedBackground.tsx   # Fondo animado
│   ├── FloatingElements.tsx     # Elementos flotantes decorativos
│   ├── Footer.tsx              # Pie de página
│   ├── Hero.tsx                # Página principal con hero section
│   ├── Historical.tsx          # Línea de tiempo histórica
│   ├── Map.tsx                 # Mapa interactivo de Colombia con D3.js
│   ├── Navigation.tsx          # Barra de navegación
│   ├── Prevention.tsx          # Sección de prevención
│   ├── Resources.tsx           # Recursos y enlaces
│   ├── ScrollProgress.tsx      # Indicador de progreso de scroll
│   ├── Statistics.tsx          # Gráficos estadísticos fijos
│   ├── Stories.tsx            # Historias y testimonios
│   └── GraphicsAnalysis.tsx    # Generador dinámico de gráficos
├── styles/
│   └── charts.css             # Estilos específicos para gráficos
├── assets/                    # Recursos estáticos
├── App.tsx                    # Componente principal con routing
└── main.tsx                   # Punto de entrada de la aplicación
```

## 📊 Características Principales

### 1. **Generador Dinámico de Gráficos**

- **Filtros interactivos**: Selección por departamentos (Top 5, Top 10, manual)
- **Variables múltiples**: Casos totales, población vulnerable, distribución etaria
- **Análisis temporal**: Visualización de casos por año (2013-2023)
- **Botones de selección masiva**: Seleccionar/deseleccionar todos los departamentos
- **Tipos de gráficos**: Barras, líneas y gráficos circulares (pie charts)

### 2. **Mapa Interactivo de Colombia**

- **Visualización geográfica**: Distribución por los 33 departamentos
- **Códigos de color**: Gradiente cálido según nivel de incidencia
- **Mapa inset especializado**: Zoom dedicado para el Archipiélago de San Andrés
- **Interactividad completa**: Hover effects, tooltips y selección por clic
- **Datos geoespaciales**: Procesamiento de Shapefiles y GeoJSON

### 3. **Dashboard de Estadísticas Fijas**

- **Indicadores clave**: Total de casos, departamentos afectados, población en riesgo
- **Top 10 departamentos**: Ranking visual de los más afectados
- **Gráficos de distribución**: Casos por tipo de violencia y grupos vulnerables
- **Tendencias temporales**: Evolución histórica de casos

### 4. **Arquitectura Técnica Avanzada**

- **Navegación SPA**: Routing con React Router DOM
- **Optimización de performance**: Code splitting y lazy loading
- **Procesamiento de datos**: Filtrado en tiempo real y memoización
- **Deployment automatizado**: CI/CD con GitHub Actions
- Optimizado para dispositivos móviles
- Navegación intuitiva
- Colores neutros y profesionales

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/torodriguezt/OrquideaProyectWeb.git

# 2. Navegar al directorio del proyecto
cd OrquideaProyectWeb

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# La aplicación estará disponible en http://localhost:3000/OrquideaProyectWeb/
```

### Scripts Disponibles

```bash
npm run dev         # Servidor de desarrollo
npm run build       # Construcción para producción
npm run preview     # Vista previa de la construcción
npm run lint        # Verificación de código
```

## 📈 Fuentes de Información

- Instituto Nacional de Medicina Legal y Ciencias Forenses
- Observatorio de Violencia de Género
- DANE (Departamento Administrativo Nacional de Estadística)
- MinSalud - Ministerio de Salud y Protección Social

## 🚀 Despliegue

### GitHub Pages

El proyecto se despliega automáticamente en GitHub Pages:

```
URL: https://torodriguezt.github.io/OrquideaProyectWeb/
```

### Configuración de Despliegue

El archivo `vite.config.ts` está configurado para GitHub Pages:

```typescript
export default defineConfig({
  base: '/OrquideaProyectWeb/',
  // ... otras configuraciones
})
```
