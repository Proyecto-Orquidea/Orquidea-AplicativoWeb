import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ChartBarIcon, MapIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import ChartRenderer from './ChartRenderer';

// Importamos los datos de SIVIGILA del componente Map
interface VulnerablePopulation {
  discapacitadas: number;
  desplazadas: number;
  migrantes: number;
  privadas_libertad: number;
  gestantes: number;
  indigenas: number;
  icbf: number;
  madres_comunitarias: number;
  desmovilizadas: number;
  centro_psiquiatrico: number;
  violencia_armada: number;
  otras: number;
  cabeza_familia: number;
  convive_agresor: number;
}

interface Region {
  name: string;
  cases: number;
  vulnerablePopulation: VulnerablePopulation;
}

// Datos de SIVIGILA completos (33 departamentos)
const regionData: Region[] = [
  { 
    name: "Antioquia", 
    cases: 144064, 
    vulnerablePopulation: {
      discapacitadas: 680, desplazadas: 3308, migrantes: 1349, privadas_libertad: 196,
      gestantes: 4884, indigenas: 241, icbf: 778, madres_comunitarias: 128,
      desmovilizadas: 87, centro_psiquiatrico: 402, violencia_armada: 11299,
      otras: 128818, cabeza_familia: 14377, convive_agresor: 60099
    }
  },
  { 
    name: "Bogotá, D.C.", 
    cases: 105554, 
    vulnerablePopulation: {
      discapacitadas: 1098, desplazadas: 522, migrantes: 3753, privadas_libertad: 91,
      gestantes: 9092, indigenas: 422, icbf: 270, madres_comunitarias: 30,
      desmovilizadas: 28, centro_psiquiatrico: 215, violencia_armada: 254,
      otras: 92892, cabeza_familia: 36316, convive_agresor: 61506
    }
  },
  { 
    name: "Valle Del Cauca", 
    cases: 101495, 
    vulnerablePopulation: {
      discapacitadas: 343, desplazadas: 488, migrantes: 1478, privadas_libertad: 187,
      gestantes: 4252, indigenas: 167, icbf: 364, madres_comunitarias: 50,
      desmovilizadas: 57, centro_psiquiatrico: 357, violencia_armada: 1538,
      otras: 94866, cabeza_familia: 11895, convive_agresor: 42116
    }
  },
  { 
    name: "Cundinamarca", 
    cases: 65329, 
    vulnerablePopulation: {
      discapacitadas: 466, desplazadas: 577, migrantes: 1450, privadas_libertad: 98,
      gestantes: 3181, indigenas: 89, icbf: 306, madres_comunitarias: 86,
      desmovilizadas: 77, centro_psiquiatrico: 140, violencia_armada: 1522,
      otras: 59659, cabeza_familia: 10669, convive_agresor: 34724
    }
  },
  { 
    name: "Santander", 
    cases: 42608, 
    vulnerablePopulation: {
      discapacitadas: 218, desplazadas: 158, migrantes: 939, privadas_libertad: 65,
      gestantes: 4526, indigenas: 69, icbf: 196, madres_comunitarias: 33,
      desmovilizadas: 34, centro_psiquiatrico: 120, violencia_armada: 646,
      otras: 38016, cabeza_familia: 2376, convive_agresor: 25517
    }
  },
  { 
    name: "Huila", 
    cases: 39736, 
    vulnerablePopulation: {
      discapacitadas: 255, desplazadas: 835, migrantes: 100, privadas_libertad: 93,
      gestantes: 1680, indigenas: 46, icbf: 472, madres_comunitarias: 43,
      desmovilizadas: 43, centro_psiquiatrico: 29, violencia_armada: 587,
      otras: 36736, cabeza_familia: 4102, convive_agresor: 20007
    }
  },
  { 
    name: "Nariño", 
    cases: 29326, 
    vulnerablePopulation: {
      discapacitadas: 238, desplazadas: 587, migrantes: 213, privadas_libertad: 62,
      gestantes: 1253, indigenas: 34, icbf: 142, madres_comunitarias: 17,
      desmovilizadas: 28, centro_psiquiatrico: 27, violencia_armada: 616,
      otras: 27311, cabeza_familia: 2799, convive_agresor: 13322
    }
  },
  { 
    name: "Atlántico", 
    cases: 27090, 
    vulnerablePopulation: {
      discapacitadas: 130, desplazadas: 49, migrantes: 791, privadas_libertad: 45,
      gestantes: 1620, indigenas: 27, icbf: 87, madres_comunitarias: 20,
      desmovilizadas: 19, centro_psiquiatrico: 63, violencia_armada: 1041,
      otras: 24689, cabeza_familia: 2688, convive_agresor: 13875
    }
  },
  { 
    name: "Boyacá", 
    cases: 26951, 
    vulnerablePopulation: {
      discapacitadas: 230, desplazadas: 60, migrantes: 248, privadas_libertad: 47,
      gestantes: 1096, indigenas: 19, icbf: 90, madres_comunitarias: 55,
      desmovilizadas: 24, centro_psiquiatrico: 44, violencia_armada: 517,
      otras: 25342, cabeza_familia: 3152, convive_agresor: 16057
    }
  },
  { 
    name: "Bolívar", 
    cases: 24176, 
    vulnerablePopulation: {
      discapacitadas: 123, desplazadas: 196, migrantes: 530, privadas_libertad: 42,
      gestantes: 2191, indigenas: 39, icbf: 129, madres_comunitarias: 25,
      desmovilizadas: 20, centro_psiquiatrico: 44, violencia_armada: 476,
      otras: 21586, cabeza_familia: 2101, convive_agresor: 11706
    }
  },
  { 
    name: "Caldas", 
    cases: 21325, 
    vulnerablePopulation: {
      discapacitadas: 120, desplazadas: 236, migrantes: 119, privadas_libertad: 58,
      gestantes: 727, indigenas: 29, icbf: 226, madres_comunitarias: 7,
      desmovilizadas: 10, centro_psiquiatrico: 30, violencia_armada: 526,
      otras: 19854, cabeza_familia: 2535, convive_agresor: 9423
    }
  },
  { 
    name: "Risaralda", 
    cases: 21296, 
    vulnerablePopulation: {
      discapacitadas: 115, desplazadas: 134, migrantes: 250, privadas_libertad: 40,
      gestantes: 1242, indigenas: 50, icbf: 164, madres_comunitarias: 16,
      desmovilizadas: 16, centro_psiquiatrico: 62, violencia_armada: 360,
      otras: 19700, cabeza_familia: 1572, convive_agresor: 10953
    }
  },
  { 
    name: "Córdoba", 
    cases: 22761, 
    vulnerablePopulation: {
      discapacitadas: 111, desplazadas: 341, migrantes: 252, privadas_libertad: 31,
      gestantes: 1839, indigenas: 41, icbf: 140, madres_comunitarias: 76,
      desmovilizadas: 15, centro_psiquiatrico: 30, violencia_armada: 1686,
      otras: 19446, cabeza_familia: 2773, convive_agresor: 10823
    }
  },
  { 
    name: "Norte De Santander", 
    cases: 21569, 
    vulnerablePopulation: {
      discapacitadas: 90, desplazadas: 57, migrantes: 1733, privadas_libertad: 22,
      gestantes: 1482, indigenas: 26, icbf: 66, madres_comunitarias: 8,
      desmovilizadas: 9, centro_psiquiatrico: 14, violencia_armada: 201,
      otras: 18776, cabeza_familia: 1406, convive_agresor: 12354
    }
  },
  { 
    name: "Tolima", 
    cases: 17556, 
    vulnerablePopulation: {
      discapacitadas: 103, desplazadas: 114, migrantes: 100, privadas_libertad: 43,
      gestantes: 879, indigenas: 19, icbf: 144, madres_comunitarias: 11,
      desmovilizadas: 15, centro_psiquiatrico: 28, violencia_armada: 533,
      otras: 16155, cabeza_familia: 1982, convive_agresor: 8672
    }
  },
  { 
    name: "Cesar", 
    cases: 17563, 
    vulnerablePopulation: {
      discapacitadas: 91, desplazadas: 340, migrantes: 336, privadas_libertad: 28,
      gestantes: 1150, indigenas: 21, icbf: 143, madres_comunitarias: 35,
      desmovilizadas: 14, centro_psiquiatrico: 18, violencia_armada: 360,
      otras: 15955, cabeza_familia: 1290, convive_agresor: 9285
    }
  },
  { 
    name: "Quindío", 
    cases: 16110, 
    vulnerablePopulation: {
      discapacitadas: 90, desplazadas: 146, migrantes: 181, privadas_libertad: 38,
      gestantes: 852, indigenas: 45, icbf: 120, madres_comunitarias: 26,
      desmovilizadas: 22, centro_psiquiatrico: 118, violencia_armada: 1217,
      otras: 14098, cabeza_familia: 1827, convive_agresor: 7024
    }
  },
  { 
    name: "Meta", 
    cases: 15551, 
    vulnerablePopulation: {
      discapacitadas: 118, desplazadas: 197, migrantes: 277, privadas_libertad: 31,
      gestantes: 1824, indigenas: 39, icbf: 129, madres_comunitarias: 25,
      desmovilizadas: 15, centro_psiquiatrico: 47, violencia_armada: 667,
      otras: 13160, cabeza_familia: 1119, convive_agresor: 8029
    }
  },
  { 
    name: "Magdalena", 
    cases: 14505, 
    vulnerablePopulation: {
      discapacitadas: 52, desplazadas: 105, migrantes: 401, privadas_libertad: 24,
      gestantes: 1114, indigenas: 17, icbf: 46, madres_comunitarias: 8,
      desmovilizadas: 6, centro_psiquiatrico: 10, violencia_armada: 276,
      otras: 13056, cabeza_familia: 1251, convive_agresor: 6977
    }
  },
  { 
    name: "Cauca", 
    cases: 23574, 
    vulnerablePopulation: {
      discapacitadas: 193, desplazadas: 210, migrantes: 205, privadas_libertad: 44,
      gestantes: 1492, indigenas: 61, icbf: 138, madres_comunitarias: 23,
      desmovilizadas: 17, centro_psiquiatrico: 27, violencia_armada: 942,
      otras: 21471, cabeza_familia: 2241, convive_agresor: 10289
    }
  },
  { 
    name: "Sucre", 
    cases: 13850, 
    vulnerablePopulation: {
      discapacitadas: 77, desplazadas: 237, migrantes: 179, privadas_libertad: 46,
      gestantes: 812, indigenas: 29, icbf: 43, madres_comunitarias: 13,
      desmovilizadas: 13, centro_psiquiatrico: 27, violencia_armada: 258,
      otras: 12778, cabeza_familia: 1620, convive_agresor: 6554
    }
  },
  { 
    name: "Casanare", 
    cases: 9913, 
    vulnerablePopulation: {
      discapacitadas: 79, desplazadas: 61, migrantes: 194, privadas_libertad: 26,
      gestantes: 3037, indigenas: 29, icbf: 70, madres_comunitarias: 9,
      desmovilizadas: 12, centro_psiquiatrico: 12, violencia_armada: 62,
      otras: 7547, cabeza_familia: 688, convive_agresor: 6758
    }
  },
  { 
    name: "Caquetá", 
    cases: 7950, 
    vulnerablePopulation: {
      discapacitadas: 52, desplazadas: 387, migrantes: 17, privadas_libertad: 30,
      gestantes: 624, indigenas: 14, icbf: 51, madres_comunitarias: 7,
      desmovilizadas: 7, centro_psiquiatrico: 15, violencia_armada: 174,
      otras: 7015, cabeza_familia: 678, convive_agresor: 3718
    }
  },
  { 
    name: "La Guajira", 
    cases: 8140, 
    vulnerablePopulation: {
      discapacitadas: 21, desplazadas: 20, migrantes: 989, privadas_libertad: 32,
      gestantes: 575, indigenas: 26, icbf: 80, madres_comunitarias: 7,
      desmovilizadas: 5, centro_psiquiatrico: 5, violencia_armada: 127,
      otras: 6798, cabeza_familia: 650, convive_agresor: 3959
    }
  },
  { 
    name: "Putumayo", 
    cases: 7571, 
    vulnerablePopulation: {
      discapacitadas: 58, desplazadas: 436, migrantes: 217, privadas_libertad: 7,
      gestantes: 534, indigenas: 17, icbf: 79, madres_comunitarias: 8,
      desmovilizadas: 5, centro_psiquiatrico: 10, violencia_armada: 171,
      otras: 6400, cabeza_familia: 612, convive_agresor: 3566
    }
  },
  { 
    name: "Arauca", 
    cases: 4903, 
    vulnerablePopulation: {
      discapacitadas: 47, desplazadas: 181, migrantes: 638, privadas_libertad: 3,
      gestantes: 430, indigenas: 28, icbf: 56, madres_comunitarias: 7,
      desmovilizadas: 4, centro_psiquiatrico: 3, violencia_armada: 66,
      otras: 3836, cabeza_familia: 146, convive_agresor: 2735
    }
  },
  { 
    name: "Amazonas", 
    cases: 3005, 
    vulnerablePopulation: {
      discapacitadas: 20, desplazadas: 13, migrantes: 1, privadas_libertad: 0,
      gestantes: 147, indigenas: 11, icbf: 174, madres_comunitarias: 6,
      desmovilizadas: 0, centro_psiquiatrico: 1, violencia_armada: 55,
      otras: 2728, cabeza_familia: 214, convive_agresor: 1534
    }
  },
  { 
    name: "Chocó", 
    cases: 2463, 
    vulnerablePopulation: {
      discapacitadas: 19, desplazadas: 113, migrantes: 24, privadas_libertad: 1,
      gestantes: 279, indigenas: 8, icbf: 23, madres_comunitarias: 4,
      desmovilizadas: 6, centro_psiquiatrico: 7, violencia_armada: 148,
      otras: 2056, cabeza_familia: 240, convive_agresor: 967
    }
  },
  { 
    name: "Guaviare", 
    cases: 1764, 
    vulnerablePopulation: {
      discapacitadas: 13, desplazadas: 55, migrantes: 51, privadas_libertad: 1,
      gestantes: 183, indigenas: 3, icbf: 19, madres_comunitarias: 0,
      desmovilizadas: 3, centro_psiquiatrico: 1, violencia_armada: 15,
      otras: 1502, cabeza_familia: 138, convive_agresor: 938
    }
  },
  { 
    name: "Vaupés", 
    cases: 1314, 
    vulnerablePopulation: {
      discapacitadas: 6, desplazadas: 7, migrantes: 1, privadas_libertad: 1,
      gestantes: 50, indigenas: 2, icbf: 4, madres_comunitarias: 2,
      desmovilizadas: 1, centro_psiquiatrico: 1, violencia_armada: 8,
      otras: 1263, cabeza_familia: 80, convive_agresor: 861
    }
  },
  { 
    name: "Vichada", 
    cases: 1514, 
    vulnerablePopulation: {
      discapacitadas: 6, desplazadas: 23, migrantes: 186, privadas_libertad: 0,
      gestantes: 116, indigenas: 6, icbf: 16, madres_comunitarias: 7,
      desmovilizadas: 0, centro_psiquiatrico: 1, violencia_armada: 41,
      otras: 1216, cabeza_familia: 168, convive_agresor: 792
    }
  },
  { 
    name: "Guainía", 
    cases: 868, 
    vulnerablePopulation: {
      discapacitadas: 4, desplazadas: 4, migrantes: 95, privadas_libertad: 0,
      gestantes: 39, indigenas: 1, icbf: 3, madres_comunitarias: 1,
      desmovilizadas: 1, centro_psiquiatrico: 0, violencia_armada: 9,
      otras: 727, cabeza_familia: 93, convive_agresor: 418
    }
  },
  { 
    name: "Archipiélago De San Andrés", 
    cases: 801, 
    vulnerablePopulation: {
      discapacitadas: 2, desplazadas: 0, migrantes: 3, privadas_libertad: 5,
      gestantes: 32, indigenas: 0, icbf: 1, madres_comunitarias: 0,
      desmovilizadas: 0, centro_psiquiatrico: 4, violencia_armada: 156,
      otras: 647, cabeza_familia: 78, convive_agresor: 382
    }
  }
];

// Variables disponibles para análisis
const variableOptions = [
  { key: 'cases', label: 'Total de casos', type: 'general' },
  { key: 'cases_by_year', label: 'Casos por año', type: 'temporal' },
  { key: 'discapacitadas', label: 'Personas con discapacidad', type: 'vulnerable' },
  { key: 'desplazadas', label: 'Personas desplazadas', type: 'vulnerable' },
  { key: 'migrantes', label: 'Migrantes', type: 'vulnerable' },
  { key: 'privadas_libertad', label: 'Privadas de libertad', type: 'vulnerable' },
  { key: 'gestantes', label: 'Gestantes', type: 'vulnerable' },
  { key: 'indigenas', label: 'Indígenas', type: 'vulnerable' },
  { key: 'icbf', label: 'Protección ICBF', type: 'vulnerable' },
  { key: 'madres_comunitarias', label: 'Madres comunitarias', type: 'vulnerable' },
  { key: 'desmovilizadas', label: 'Desmovilizadas', type: 'vulnerable' },
  { key: 'centro_psiquiatrico', label: 'Centro psiquiátrico', type: 'vulnerable' },
  { key: 'violencia_armada', label: 'Víctimas de violencia armada', type: 'vulnerable' },
  { key: 'otras', label: 'Otras poblaciones', type: 'vulnerable' },
  { key: 'cabeza_familia', label: 'Cabeza de familia', type: 'vulnerable' },
  { key: 'convive_agresor', label: 'Convive con el agresor', type: 'vulnerable' }
];

// Datos adicionales para gráficos específicos - ORDENADOS POR EDAD
const violenceByAge = [
  { age: '0-5', percentage: 10.4, count: 89534, order: 1 },
  { age: '6-11', percentage: 8.5, count: 73595, order: 2 },
  { age: '12-17', percentage: 21.0, count: 181007, order: 3 },
  { age: '18-28', percentage: 26.3, count: 226978, order: 4 },
  { age: '29-59', percentage: 30.1, count: 259919, order: 5 },
  { age: '60-84', percentage: 3.3, count: 28109, order: 6 },
  { age: '85+', percentage: 0.4, count: 3053, order: 7 }
];

const sexualOrientationData = [
  { name: 'Heterosexual', value: 64.4, color: '#475569' },
  { name: 'Sin información', value: 25.4, color: '#94a3b8' },
  { name: 'Otra', value: 6.9, color: '#ea7520' },
  { name: 'OSIEG no hegemónicas', value: 3.3, color: '#f97316' }
];

// Datos de evolución temporal por año
const evolutionData = [
  { year: '2013', cases: 34170 },
  { year: '2014', cases: 46894 },
  { year: '2015', cases: 56725 },
  { year: '2016', cases: 71978 },
  { year: '2017', cases: 74204 },
  { year: '2018', cases: 85704 },
  { year: '2019', cases: 91194 },
  { year: '2020', cases: 78301 },
  { year: '2021', cases: 90694 },
  { year: '2022', cases: 109556 },
  { year: '2023', cases: 122775 }
];

// Función para generar datos de evolución temporal por departamento
const generateEvolutionData = (multiplier: number) => [
  { year: '2013', cases: Math.round(34170 * multiplier) },
  { year: '2014', cases: Math.round(46894 * multiplier) },
  { year: '2015', cases: Math.round(56725 * multiplier) },
  { year: '2016', cases: Math.round(71978 * multiplier) },
  { year: '2017', cases: Math.round(74204 * multiplier) },
  { year: '2018', cases: Math.round(85704 * multiplier) },
  { year: '2019', cases: Math.round(91194 * multiplier) },
  { year: '2020', cases: Math.round(78301 * multiplier) },
  { year: '2021', cases: Math.round(90694 * multiplier) },
  { year: '2022', cases: Math.round(109556 * multiplier) },
  { year: '2023', cases: Math.round(122775 * multiplier) }
];

// Datos de evolución por departamento usando los casos reales como base
const evolutionByDepartment: Record<string, typeof evolutionData> = {};

// Usar los casos reales de cada departamento para calcular el multiplicador
regionData.forEach(region => {
  const totalNational = regionData.reduce((sum, r) => sum + r.cases, 0);
  const multiplier = region.cases / totalNational;
  evolutionByDepartment[region.name] = generateEvolutionData(multiplier);
});

// Función para generar datos de edad ordenados con variaciones realistas
const generateAgeData = (baseMultiplier = 1) => [
  { age: '0-5', percentage: Math.round((10.4 * baseMultiplier + Math.random() * 2 - 1) * 10) / 10, count: Math.round(89534 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 1 },
  { age: '6-11', percentage: Math.round((8.5 * baseMultiplier + Math.random() * 2 - 1) * 10) / 10, count: Math.round(73595 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 2 },
  { age: '12-17', percentage: Math.round((21.0 * baseMultiplier + Math.random() * 3 - 1.5) * 10) / 10, count: Math.round(181007 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 3 },
  { age: '18-28', percentage: Math.round((26.3 * baseMultiplier + Math.random() * 3 - 1.5) * 10) / 10, count: Math.round(226978 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 4 },
  { age: '29-59', percentage: Math.round((30.1 * baseMultiplier + Math.random() * 3 - 1.5) * 10) / 10, count: Math.round(259919 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 5 },
  { age: '60-84', percentage: Math.round((3.3 * baseMultiplier + Math.random() * 1 - 0.5) * 10) / 10, count: Math.round(28109 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 6 },
  { age: '85+', percentage: Math.round((0.4 * baseMultiplier + Math.random() * 0.3 - 0.1) * 10) / 10, count: Math.round(3053 * baseMultiplier * (0.8 + Math.random() * 0.4)), order: 7 }
];

// Datos simulados por departamento para grupo etario (todos los 32 departamentos)
const ageByDepartment: Record<string, typeof violenceByAge> = {
  'Antioquia': generateAgeData(1.2),
  'Bogotá, D.C.': generateAgeData(1.0),
  'Valle Del Cauca': generateAgeData(1.1),
  'Cundinamarca': generateAgeData(0.9),
  'Santander': generateAgeData(0.8),
  'Atlántico': generateAgeData(0.7),
  'Nariño': generateAgeData(0.6),
  'Córdoba': generateAgeData(0.5),
  'Bolívar': generateAgeData(0.6),
  'Cauca': generateAgeData(0.5),
  'Norte De Santander': generateAgeData(0.7),
  'Huila': generateAgeData(0.4),
  'Tolima': generateAgeData(0.5),
  'Meta': generateAgeData(0.3),
  'Cesar': generateAgeData(0.4),
  'Boyacá': generateAgeData(0.3),
  'Magdalena': generateAgeData(0.3),
  'La Guajira': generateAgeData(0.2),
  'Risaralda': generateAgeData(0.2),
  'Sucre': generateAgeData(0.3),
  'Quindío': generateAgeData(0.1),
  'Caldas': generateAgeData(0.2),
  'Casanare': generateAgeData(0.2),
  'Caquetá': generateAgeData(0.2),
  'Putumayo': generateAgeData(0.2),
  'Arauca': generateAgeData(0.1),
  'Chocó': generateAgeData(0.1),
  'Guaviare': generateAgeData(0.05),
  'Amazonas': generateAgeData(0.05),
  'Vaupés': generateAgeData(0.03),
  'Vichada': generateAgeData(0.03),
  'Guainía': generateAgeData(0.02),
  'Archipiélago De San Andrés': generateAgeData(0.02)
};

// Función para generar datos de orientación sexual con variaciones realistas
const generateOrientationData = () => [
  { name: 'Heterosexual', value: Math.round((64.4 + Math.random() * 6 - 3) * 10) / 10, color: '#475569' },
  { name: 'Sin información', value: Math.round((25.4 + Math.random() * 4 - 2) * 10) / 10, color: '#94a3b8' },
  { name: 'Otra', value: Math.round((6.9 + Math.random() * 3 - 1.5) * 10) / 10, color: '#ea7520' },
  { name: 'OSIEG no hegemónicas', value: Math.round((3.3 + Math.random() * 2 - 1) * 10) / 10, color: '#f97316' }
];

// Datos simulados por departamento para orientación sexual (todos los 32 departamentos)
const orientationByDepartment: Record<string, typeof sexualOrientationData> = {};

// Generar datos para todos los departamentos
const departmentNames = [
  'Antioquia', 'Bogotá, D.C.', 'Valle Del Cauca', 'Cundinamarca', 'Santander', 
  'Atlántico', 'Nariño', 'Córdoba', 'Bolívar', 'Cauca', 'Norte De Santander', 
  'Huila', 'Tolima', 'Meta', 'Cesar', 'Boyacá', 'Magdalena', 'La Guajira', 
  'Risaralda', 'Sucre', 'Quindío', 'Caldas', 'Casanare', 'Caquetá', 'Putumayo', 
  'Arauca', 'Chocó', 'Guaviare', 'Amazonas', 'Vaupés', 'Vichada', 'Guainía', 
  'Archipiélago De San Andrés'
];

departmentNames.forEach(dept => {
  orientationByDepartment[dept] = generateOrientationData();
});

type ChartType = 'bar' | 'pie' | 'line' | 'area';
type TopFilter = 'all' | 'top5' | 'top10';

const GraphicsAnalysis: React.FC = () => {
  const [selectedVariable, setSelectedVariable] = useState<string>('cases');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [topFilter, setTopFilter] = useState<TopFilter>('all');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [showDataTable, setShowDataTable] = useState<boolean>(false);
  
  // Estados para gráficos adicionales
  const [ageChartDepartment, setAgeChartDepartment] = useState<string>('General');
  const [orientationChartDepartment, setOrientationChartDepartment] = useState<string>('General');
  const [evolutionChartDepartment, setEvolutionChartDepartment] = useState<string>('General');
  const [selectedYears, setSelectedYears] = useState<string[]>(['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']);
  const [startYear, setStartYear] = useState<string>('2013');
  const [endYear, setEndYear] = useState<string>('2023');

  // Función para obtener el valor de una variable específica
  const getVariableValue = (region: Region, variable: string): number => {
    if (variable === 'cases') return region.cases;
    if (variable === 'cases_by_year') {
      // Simulamos datos por año para cada departamento basados en el total
      const yearlyDistribution = [0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.12, 0.11]; // Últimos 9 años
      const baseValue = region.cases / yearlyDistribution.reduce((a, b) => a + b, 0);
      return Math.round(baseValue * yearlyDistribution[Math.floor(Math.random() * yearlyDistribution.length)]);
    }
    return (region.vulnerablePopulation as any)[variable] || 0;
  };

  // Filtrar y ordenar datos según las selecciones
  const processedData = useMemo(() => {
    // Si seleccionamos casos por año, devolvemos datos temporales
    if (selectedVariable === 'cases_by_year') {
      return evolutionData
        .filter(item => selectedYears.includes(item.year))
        .map(item => ({
          name: item.year,
          value: item.cases
        }));
    }

    let filteredData = [...regionData];

    // Aplicar filtro de top N departamentos
    if (topFilter !== 'all') {
      const topCount = topFilter === 'top5' ? 5 : 10;
      filteredData = filteredData
        .sort((a, b) => getVariableValue(b, selectedVariable) - getVariableValue(a, selectedVariable))
        .slice(0, topCount);
    }

    // Aplicar filtro de departamentos específicos si están seleccionados
    if (selectedDepartments.length > 0 && topFilter === 'all') {
      filteredData = filteredData.filter(region => 
        selectedDepartments.includes(region.name)
      );
    }

    return filteredData.map(region => ({
      name: region.name,
      value: getVariableValue(region, selectedVariable)
    }));
  }, [selectedVariable, selectedDepartments, topFilter, selectedYears]);

  const handleDepartmentToggle = (departmentName: string) => {
    setSelectedDepartments(prev => 
      prev.includes(departmentName) 
        ? prev.filter(name => name !== departmentName)
        : [...prev, departmentName]
    );
  };

  // Función para aplicar intervalo de años personalizado
  const applyYearRange = () => {
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    const availableYears = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
    
    const filteredYears = availableYears.filter(year => {
      const yearNum = parseInt(year);
      return yearNum >= start && yearNum <= end;
    });
    
    setSelectedYears(filteredYears);
  };

  const generateChart = () => {
    // La lógica de generación está ahora en el useMemo de processedData
    // y se renderiza automáticamente
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-16">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Volver
            </button>
            <h1 className="text-xl font-bold text-primary-900">Generador de Gráficas</h1>
            <div className="w-16" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panel de controles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-primary-600" />
                Configuración del Gráfico
              </h2>

              {/* Selección de variable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variable a analizar
                </label>
                <select
                  value={selectedVariable}
                  onChange={(e) => setSelectedVariable(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <optgroup label="General">
                    {variableOptions.filter(v => v.type === 'general').map(variable => (
                      <option key={variable.key} value={variable.key}>
                        {variable.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Temporal">
                    {variableOptions.filter(v => v.type === 'temporal').map(variable => (
                      <option key={variable.key} value={variable.key}>
                        {variable.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Poblaciones Vulnerables">
                    {variableOptions.filter(v => v.type === 'vulnerable').map(variable => (
                      <option key={variable.key} value={variable.key}>
                        {variable.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Control de años (solo para casos por año) */}
              {selectedVariable === 'cases_by_year' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Años a incluir ({selectedYears.length} seleccionados)
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {evolutionData.map(item => (
                      <label key={item.year} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedYears.includes(item.year)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedYears([...selectedYears, item.year]);
                            } else {
                              setSelectedYears(selectedYears.filter(y => y !== item.year));
                            }
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span>{item.year}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtro de departamentos (no para casos por año) */}
              {selectedVariable !== 'cases_by_year' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filtro de departamentos
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTopFilter('all')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          topFilter === 'all' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Selección manual
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTopFilter('top5')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          topFilter === 'top5' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Top 5
                      </button>
                      <button
                        onClick={() => setTopFilter('top10')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          topFilter === 'top10' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Top 10
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de departamentos (solo si está en modo manual y no es casos por año) */}
              {topFilter === 'all' && selectedVariable !== 'cases_by_year' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamentos ({selectedDepartments.length} seleccionados)
                  </label>
                  
                  {/* Botones para seleccionar/deseleccionar todos */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setSelectedDepartments(regionData.map(r => r.name))}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                    >
                      Seleccionar todos
                    </button>
                    <button
                      onClick={() => setSelectedDepartments([])}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
                    >
                      Deseleccionar todos
                    </button>
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {regionData.map(region => (
                      <label key={region.name} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={selectedDepartments.includes(region.name)}
                          onChange={() => handleDepartmentToggle(region.name)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm">{region.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Tipo de gráfico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de gráfico
                </label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value as ChartType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="bar">Barras</option>
                  <option value="pie">Circular</option>
                  <option value="line">Líneas</option>
                  <option value="area">Área</option>
                </select>
              </div>

              {/* Botón generar */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateChart}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors"
              >
                Generar Gráfico
              </motion.button>
            </div>
          </div>

          {/* Área de visualización */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Vista Previa del Gráfico
              </h3>
              
              {processedData.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Mostrando: {variableOptions.find(v => v.key === selectedVariable)?.label}
                      {topFilter !== 'all' && ` - ${topFilter === 'top5' ? 'Top 5' : 'Top 10'} departamentos`}
                    </p>
                    <div className="text-sm text-gray-500">
                      {processedData.length} departamento{processedData.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  {/* Gráfico */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
                    <div className="h-96">
                      <ChartRenderer
                        data={processedData}
                        chartType={chartType}
                        variableLabel={variableOptions.find(v => v.key === selectedVariable)?.label || 'Casos'}
                      />
                    </div>
                  </div>
                  
                  {/* Resumen estadístico rápido */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {processedData.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-700">Total casos</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {processedData.length}
                      </div>
                      <div className="text-sm text-green-700">Departamentos</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {processedData.length > 0 ? Math.max(...processedData.map(d => d.value)).toLocaleString() : '0'}
                      </div>
                      <div className="text-sm text-orange-700">Valor máximo</div>
                    </div>
                  </div>

                  {/* Tabla de datos colapsable */}
                  <div className="mt-6">
                    <button
                      onClick={() => setShowDataTable(!showDataTable)}
                      className="flex items-center justify-between w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <h4 className="text-md font-semibold text-gray-900">
                        Datos detallados ({processedData.length} departamentos)
                      </h4>
                      {showDataTable ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    
                    {showDataTable && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <div className="max-h-64 overflow-y-auto bg-white rounded-lg border">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Departamento
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Casos
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Porcentaje
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {processedData.map((item, index) => {
                                const total = processedData.reduce((sum, d) => sum + d.value, 0);
                                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
                                
                                return (
                                  <tr key={item.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {item.name}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {item.value.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {percentage}%
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MapIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Selecciona los parámetros para generar un gráfico</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gráficos Fijos Adicionales con Controles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 mb-12">
          {/* Gráfico de Violencia por Grupo Etario */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-semibold text-primary-900 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-primary-600" />
                Violencia por Grupo Etario
              </h3>
              <select
                value={ageChartDepartment}
                onChange={(e) => setAgeChartDepartment(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="General">General</option>
                {departmentNames.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="h-96 pb-4">
              <ChartRenderer
                data={(ageChartDepartment === 'General' ? violenceByAge : ageByDepartment[ageChartDepartment] || violenceByAge)
                  .sort((a, b) => a.order - b.order)
                  .map(item => ({ name: item.age, value: item.percentage }))}
                chartType="bar"
                variableLabel="Porcentaje (%)"
              />
            </div>
          </motion.div>

          {/* Gráfico de Orientación Sexual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-semibold text-primary-900 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-primary-600" />
                Distribución por Orientación Sexual
              </h3>
              <select
                value={orientationChartDepartment}
                onChange={(e) => setOrientationChartDepartment(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="General">General</option>
                {departmentNames.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="h-96 pb-4">
              <ChartRenderer
                data={orientationChartDepartment === 'General' ? sexualOrientationData : orientationByDepartment[orientationChartDepartment] || sexualOrientationData}
                chartType="pie"
                variableLabel="Porcentaje (%)"
              />
            </div>
          </motion.div>
        </div>

        {/* Gráfico de Evolución Temporal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6 mt-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-display font-semibold text-primary-900 flex items-center gap-2 mb-4 sm:mb-0">
              <ChartBarIcon className="w-5 h-5 text-primary-600" />
              Evolución de la Violencia de Género en Colombia (2013-2023)
            </h3>
            <div className="flex flex-col gap-4">
              {/* Primera fila: Selector de departamento */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Departamento:</span>
                <select
                  value={evolutionChartDepartment}
                  onChange={(e) => setEvolutionChartDepartment(e.target.value)}
                  className="w-64 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="General">General</option>
                  {departmentNames.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              {/* Segunda fila: Selector de intervalo de años */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Intervalo:</span>
                <span className="text-sm text-gray-600">Desde:</span>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">Hasta:</span>
                <select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'].map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <button
                  onClick={applyYearRange}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Aplicar
                </button>
              </div>
              
              {/* Tercera fila: Botones de filtro rápido */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Filtros rápidos:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedYears(['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'])}
                    className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Todos los años
                  </button>
                  <button
                    onClick={() => setSelectedYears(['2019', '2020', '2021', '2022', '2023'])}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Últimos 5 años
                  </button>
                  <button
                    onClick={() => setSelectedYears(['2021', '2022', '2023'])}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Últimos 3 años
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicador del período seleccionado */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 font-medium">
                Período analizado: {selectedYears.length > 0 ? `${Math.min(...selectedYears.map(y => parseInt(y)))} - ${Math.max(...selectedYears.map(y => parseInt(y)))}` : 'Ningún año seleccionado'}
              </span>
              <span className="text-blue-600">
                {selectedYears.length} año{selectedYears.length !== 1 ? 's' : ''} seleccionado{selectedYears.length !== 1 ? 's' : ''}
                {evolutionChartDepartment !== 'General' && ` | ${evolutionChartDepartment}`}
              </span>
            </div>
          </div>
          
          <div className="h-96 pb-4">
            <ChartRenderer
              data={(evolutionChartDepartment === 'General' ? evolutionData : evolutionByDepartment[evolutionChartDepartment] || evolutionData)
                .filter(item => selectedYears.includes(item.year))
                .map(item => ({ name: item.year, value: item.cases }))}
              chartType="line"
              variableLabel="Casos registrados"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GraphicsAnalysis;