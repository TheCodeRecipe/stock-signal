'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDate } from './utils/utils';
import { fetchLastUpdate } from './action/api';

export default function Home() {
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


  return (
<div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
  <h1 className="text-4xl font-bold text-gray-800 mb-8">Stock Signal</h1>

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
        className="w-64 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all bg-blue-500 hover:bg-blue-600"
      >
        View Stock Data
      </button>
    </Link>
  </div>
  {/* 아래쪽 버튼 */}
  {/* <div>
    <Link href="/update">
      <button
        className="w-64 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all bg-indigo-500 hover:bg-indigo-600"
      >
        관리자 페이지
      </button>
    </Link>
  </div> */}
</div>

  );
}
