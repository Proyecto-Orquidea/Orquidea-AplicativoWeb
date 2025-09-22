import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface ChartData {
  name: string;
  value: number;
}

interface ChartRendererProps {
  data: ChartData[];
  chartType: 'bar' | 'pie' | 'line' | 'area';
  variableLabel: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ data, chartType, variableLabel }) => {
  const colors = [
    '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444',
    '#EC4899', '#84CC16', '#F97316', '#6366F1', '#14B8A6'
  ];

  const backgroundColors = colors.map(color => color + '80'); // 50% opacity
  const borderColors = colors;

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: variableLabel,
        data: data.map(item => item.value),
        backgroundColor: chartType === 'pie' ? backgroundColors : backgroundColors[0],
        borderColor: chartType === 'pie' ? borderColors : borderColors[0],
        borderWidth: 2,
        fill: chartType === 'area',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: chartType === 'pie',
      },
      title: {
        display: true,
        text: `${variableLabel} por Departamento`,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y || context.parsed;
            return `${context.label}: ${value.toLocaleString()} casos`;
          }
        }
      }
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString();
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    } : undefined,
  };

  const chartHeight = '100%';

  switch (chartType) {
    case 'bar':
      return (
        <div style={{ height: chartHeight, minHeight: '350px' }}>
          <Bar data={chartData} options={options} />
        </div>
      );
    case 'pie':
      return (
        <div style={{ height: chartHeight, minHeight: '350px' }}>
          <Pie data={chartData} options={options} />
        </div>
      );
    case 'line':
    case 'area':
      return (
        <div style={{ height: chartHeight, minHeight: '350px' }}>
          <Line data={chartData} options={options} />
        </div>
      );
    default:
      return <div>Tipo de gráfico no soportado</div>;
  }
};

export default ChartRenderer;