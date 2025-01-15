'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Stock, StockCamel } from '@/type/stock';
import Link from 'next/link';
import { fetchStockData, fetchStockDataChart } from '@/action/stock';
import { Line } from 'react-chartjs-2';
import '@/utils/chartConfig';

export default function StockDetailPage() {
  const { code } = useParams<{ code: string }>();

  const [stock, setStock] = useState<StockCamel | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching stock data for code:', code);
      setIsLoading(true);
      try {
        const data = await fetchStockData(code);
        console.log('Fetched stock data:', data);
        setStock(data);

        // 지지선 데이터 추출
        const { support1, support2, support3 } = data;

        const dataChart = await fetchStockDataChart(code);
        console.log('Fetched stock data dataChart:', dataChart);

        // 차트 데이터 구성
        const chartData = {
          labels: dataChart.map((item: any) => item.Date), // x축 라벨 (날짜)
          datasets: [
            {
              label: `${dataChart[0]?.StockName} 종가`,
              data: dataChart.map((item: any) => parseFloat(item.Close)), // y축 데이터 (종가)
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
              pointRadius: 0.5,
            },
            {
              label: '지지선 1',
              data: Array(dataChart.length).fill(parseFloat(support1)), // 모든 x축 값에 동일한 y값
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 0.5,
              pointRadius: 1,
              fill: false,
            },
            {
              label: '지지선 2',
              data: Array(dataChart.length).fill(parseFloat(support2)),
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 0.5,
              pointRadius: 1,
              fill: false,
            },
            {
              label: '지지선 3',
              data: Array(dataChart.length).fill(parseFloat(support3)),
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 0.5,
              pointRadius: 1,
              fill: false,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [code]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading stock data...</p>
      </div>
    );
  }

  if (!stock || !chartData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No stock data available for code: {code}</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-8 bg-themeGradient">
        {stock.stockname}
      </h1>

      {/* 차트 섹션 */}
      <div className="flex justify-center items-center mb-10">
        <div className="relative w-full max-w-[1000px] min-h-[300px] md:min-h-[600px] bg-gray-800 p-4 rounded-lg shadow-lg">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#d1d5db', // 텍스트 색상
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: '#d1d5db', // x축 텍스트 색상
                    maxTicksLimit: 10,
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                y: {
                  ticks: {
                    color: '#d1d5db', // y축 텍스트 색상
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* 테이블 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-b border-gray-700 md:max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        {/* 첫 번째 열 */}
        <div className="grid grid-cols-2 sm:grid-cols-[30%_70%] gap-y-3">
          <span className="font-midium text-purple-400">현재 가격</span>
          <span>{stock.currentprice.toLocaleString()} 원</span>

          <span className="font-midium text-purple-400">가격 변화</span>
          <span>
            {stock.priceChangeValue} ({stock.priceChangeStatus})
          </span>

          <span className="font-midium text-purple-400">거래량</span>
          <span>{stock.volume.toLocaleString()}</span>

          <span className="font-midium text-purple-400">거래량 변화율</span>
          <span>{stock.volumechangerate}%</span>

          <span className="font-midium text-purple-400">MACD 추세</span>
          <span>{stock.macdTrend}</span>

          <span className="font-midium text-purple-400">RSI 상태</span>
          <span>{stock.rsiStatus}</span>

          <span className="font-midium text-purple-400">볼린저 밴드</span>
          <span>{stock.priceVsBollinger}</span>

          <span className="font-midium text-purple-400">캔들 패턴</span>
          <span>{stock.candlePattern}</span>
        </div>

        {/* 두 번째 열 */}
        <div className="grid grid-cols-2 sm:grid-cols-[30%_70%] gap-y-3">
          <span className="font-midium text-purple-400">저항선 1</span>
          <span>{stock.resistance1}</span>

          <span className="font-midium text-purple-400">저항선 2</span>
          <span>{stock.resistance2}</span>

          <span className="font-midium text-purple-400">저항선 3</span>
          <span>{stock.resistance3}</span>

          <span className="font-midium text-purple-400">지지선 1</span>
          <span>{stock.support1}</span>

          <span className="font-midium text-purple-400">지지선 2</span>
          <span>{stock.support2}</span>

          <span className="font-midium text-purple-400">지지선 3</span>
          <span>{stock.support3}</span>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-end space-x-4 items-center mt-8 md:max-w-4xl mx-auto">
        <Link href="/admin/stocks">
          <button className="flex items-center justify-center w-24 h-10 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition">
            목록
          </button>
        </Link>
      </div>
    </div>
  );
}
