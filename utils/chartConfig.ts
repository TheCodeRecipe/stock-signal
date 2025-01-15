import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// 스케일과 플러그인 등록
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
