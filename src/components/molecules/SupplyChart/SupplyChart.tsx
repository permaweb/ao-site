import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: Array.from({ length: 14 }, (_, i) => i * 16),
  datasets: [
    {
      label: 'Distributed to Community',
      data: [
        0, 5.25, 10.5, 13.125, 15, 16.25, 17.5, 18.125, 18.75, 19.375,
        19.6875, 20, 20.3125, 20.625,
      ],
      fill: true,
      backgroundColor: 'rgba(217, 167, 62, 0.2)',
      borderColor: '#d9a73e',
	  max: 21
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Halvings',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Token Supply (in millions)',
      },
      max: 25, // Adjusting y-axis max value for better visualization
      ticks: {
        callback: function(value) {
          switch(value) {
            case 0:
              return '0';
            case 5.25:
              return '5.25m';
            case 11:
              return '11m';
            case 15.75:
              return '15.75m';
            case 21:
              return '21m';
            default:
              return '';
          }
        }
      }
    },
  },
};

const TokenomicsChart = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TokenomicsChart;
