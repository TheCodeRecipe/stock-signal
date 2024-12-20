'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Stock } from '@/app/type/types/stock';
import Link from 'next/link';
import { fetchStockData } from '@/app/action/api';


export default function StockDetailPage() {
  const { code } = useParams<{ code: string }>(); // URL에서 기업 코드 가져오기
  
  const [stock, setStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 특정 주식 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching stock data for code:", code); // 디버깅
      setIsLoading(true);
      try {
        const data = await fetchStockData(code);
        console.log("Fetched stock data:", data); // 디버깅
        setStock(data.stock);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [code]);


  useEffect(() => {
    console.log('Stock state:', stock); // stock 상태 출력
  }, [stock]);

  if (isLoading) {
    return <p>Loading stock data...</p>;
  }

  if (!stock) {
    return <p>No stock data available for code: {code}</p>;
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        {stock.stockname} 상세 정보
      </h1>


      {/* 테이블 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-b border-gray-300 md:max-w-6xl mx-auto">
        {/* 첫 번째 열 */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-[30%_70%] gap-y-3 py-2">
            <span className="font-semibold text-gray-600 text-left">현재 가격</span>
            <span className="text-left">{stock.currentprice.toLocaleString()} 원</span>

            <span className="font-semibold text-gray-600 text-left">가격 변화</span>
            <span className="text-left">
              {stock.price_change_value.toFixed(2)} ({stock.price_change_status})
            </span>

            <span className="font-semibold text-gray-600 text-left">거래량</span>
            <span className="text-left">{stock.volume.toLocaleString()}</span>

            <span className="font-semibold text-gray-600 text-left">거래량 변화율</span>
            <span className="text-left">{stock.volumechangerate.toFixed(2)}%</span>

            <span className="font-semibold text-gray-600 text-left">MACD 추세</span>
            <span className="text-left">{stock.macd_trend}</span>

            <span className="font-semibold text-gray-600 text-left">RSI 상태</span>
            <span className="text-left">{stock.rsi_status}</span>

            <span className="font-semibold text-gray-600 text-left">볼린저 밴드</span>
            <span className="text-left">{stock.price_vs_bollinger}</span>

            <span className="font-semibold text-gray-600 text-left">캔들 패턴</span>
            <span className="text-left">{stock.candle_pattern}</span>

            <span className="font-semibold text-gray-600 text-left">5일 이평선</span>
            <span className="text-left">{stock.slope_5}</span>

            <span className="font-semibold text-gray-600 text-left">20일 이평선</span>
            <span className="text-left">{stock.slope_20}</span>

            <span className="font-semibold text-gray-600 text-left">60일 이평선</span>
            <span className="text-left">{stock.slope_60}</span>

            <span className="font-semibold text-gray-600 text-left">120일 이평선</span>
            <span className="text-left">{stock.slope_120}</span>
          </div>
        </div>

        {/* 두 번째 열 */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-[30%_70%] gap-y-3 py-2">
            <span className="font-semibold text-gray-600 text-left">저항선 1</span>
            <span className="text-left">{stock.resistance_1}</span>

            <span className="font-semibold text-gray-600 text-left">저항선 2</span>
            <span className="text-left">{stock.resistance_2}</span>

            <span className="font-semibold text-gray-600 text-left">저항선 3</span>
            <span className="text-left">{stock.resistance_3}</span>

            <span className="font-semibold text-gray-600 text-left">지지선 1</span>
            <span className="text-left">{stock.support_1}</span>

            <span className="font-semibold text-gray-600 text-left">지지선 2</span>
            <span className="text-left">{stock.support_2}</span>

            <span className="font-semibold text-gray-600 text-left">지지선 3</span>
            <span className="text-left">{stock.support_3}</span>
          </div>
        </div>

      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-end space-x-4 items-center mb-4 md:max-w-6xl mx-auto">
          {/* 목록 버튼 */}
          <Link href="/stocks">
            <button
              className="px-4 py-2 mt-5 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              목록
            </button>
          </Link>
      </div>

    </div>



  );
}
