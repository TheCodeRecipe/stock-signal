"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/utils';
import { fetchLastUpdate } from '../action/api';
import { updateStocks } from '../action/update';

export default function StockUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // 최근 업데이트 시간 가져오기
  useEffect(() => {
    const fetchLastUpdateData  = async () => {
      try {
        const data = await fetchLastUpdate("KR");
        const formattedDate = formatDate(data.last_update); // 변환된 날짜
        setLastUpdate(formattedDate); // 업데이트 시간 설정
      } catch (error) {
        console.error('Error fetching last update:', error);
        setLastUpdate('Failed to fetch data');
      }
    };

    fetchLastUpdateData ();
  }, []);


  const handleStockUpdate = async () => {
    setIsLoading(true);
    try {
      const result = await updateStocks(); // 서버 함수 호출
      console.log("result : "+result);
      if (result.success) {
        alert(result.message); // 성공 메시지

        const data = await fetchLastUpdate("KR");
        const formattedDate = formatDate(data.last_update); // 변환된 날짜
        setLastUpdate(formattedDate); // 업데이트 시간 설정
      } else {
        alert(result.message); // 실패 메시지
      }
    } catch (error) {
      alert("알 수 없는 오류가 발생했습니다."); // 예기치 못한 에러
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
  <h1 className="text-4xl font-bold text-gray-800 mb-8">데이터 업데이트</h1>

  {/* 최근 업데이트 시간 표시 */}
  <div className="mb-6 text-center">
    <p className="text-lg text-gray-700 font-medium">
      최근 업데이트 시간: <span className="text-blue-600">{lastUpdate || 'Loading...'}</span>
    </p>
  </div>

  {/* 위쪽 버튼 */}
  <div className="mb-8">
    <Link href="/stocks">
      <button
        className={`w-64 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={isLoading}
      >
        View Stock Data
      </button>
    </Link>
  </div>

  {isLoading && (
    <p className="mb-8 text-lg text-blue-600 font-medium">
      업데이트 진행 중... 잠시만 기다려 주세요.
    </p>
  )}

  {/* 아래쪽 버튼 */}
  <div>
    <button
      className={`w-64 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all ${
        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
      }`}
      onClick={handleStockUpdate}
      disabled={isLoading}
    >
      {isLoading ? 'Updating...' : '한국 주식 업데이트'}
    </button>
  </div>
</div>

  );
}
