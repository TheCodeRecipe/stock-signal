'use client';

import { updateStocks } from '@/action/admin';
import { fetchLastUpdate } from '@/action/stock';
import { formatDate } from '@/utils/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StockUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // 최근 업데이트 시간 가져오기
  useEffect(() => {
    const fetchLastUpdateData = async () => {
      try {
        const data = await fetchLastUpdate('KR');
        const formattedDate = formatDate(data.last_update);
        setLastUpdate(formattedDate);
      } catch (error) {
        console.error('Error fetching last update:', error);
        setLastUpdate('Failed to fetch data');
      }
    };

    fetchLastUpdateData();
  }, []);

  const handleStockUpdate = async () => {
    setIsLoading(true);
    try {
      const result = await updateStocks();
      console.log('result : ' + result);
      if (result.success) {
        alert(result.message);

        const data = await fetchLastUpdate('KR');
        const formattedDate = formatDate(data.last_update);
        setLastUpdate(formattedDate);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
        Data Update
      </h1>

      <div className="mb-10 w-full max-w-lg bg-gray-800 border border-gray-700 rounded-xl p-6">
        <p className="text-lg text-gray-300 font-semibold text-center">
          Last Updated
          <span className="text-indigo-400"> {lastUpdate || 'Loading...'}</span>
        </p>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex flex-row items-center justify-center space-x-6">
        <Link href="/admin/stocks">
          <button className="px-4 py-2 sm:px-6 sm:py-3 font-bold text-base sm:text-lg text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all">
            View All Data
          </button>
        </Link>

        <button
          onClick={handleStockUpdate}
          disabled={isLoading}
          className={`px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 rounded-lg text-white font-bold text-base sm:text-lg hover:bg-gray-700 transition-all ${
            isLoading && 'cursor-not-allowed bg-gray-600'
          }`}
        >
          {isLoading ? 'Updating...' : 'Update Stocks'}
        </button>
      </div>
    </div>
  );
}
