'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Stock } from '../type/stock';
import { formatDate } from '../utils/utils';
import { dataLoad, fetchLastUpdate } from '../action/api';
import { actionPriority } from '../data/actionPriority';

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filters, setFilters] = useState({
    stockname: '',
    price_change_value: '',
    volumechangerate: '', // 거래량을 위한 텍스트 입력
    volume_trend: 'all',
    candle_pattern: 'all',
    price_change_status: 'all',
    macd_trend: 'all',
    rsi_status: 'all',
    price_vs_bollinger: 'all',
    slope_5: 'all',
    slope_20: 'all',
    slope_60: 'all',
    slope_120: 'all',
  });

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
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

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await dataLoad();
        setStocks(data.stocks || []);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  // 필터링된 데이터
  const filteredStocks = stocks.filter((stock) => {
    return (
      (filters.stockname === '' || stock.stockname.includes(filters.stockname)) &&
      (filters.price_change_value === '' || stock.price_change_value >= parseInt(filters.price_change_value)) &&
      (filters.volumechangerate === '' || stock.volumechangerate >= parseInt(filters.volumechangerate)) &&
      (filters.volume_trend === 'all' || stock.volume_trend === filters.volume_trend) &&
      (filters.candle_pattern === 'all' || stock.candle_pattern === filters.candle_pattern) &&
      (filters.price_change_status === 'all' || stock.price_change_status === filters.price_change_status) &&
      (filters.macd_trend === 'all' || stock.macd_trend === filters.macd_trend) &&
      (filters.rsi_status === 'all' || stock.rsi_status === filters.rsi_status) &&
      (filters.price_vs_bollinger === 'all' ||stock.price_vs_bollinger === filters.price_vs_bollinger) &&
      (filters.slope_5 === 'all' || stock.slope_5 === filters.slope_5) &&
      (filters.slope_20 === 'all' || stock.slope_20 === filters.slope_20) &&
      (filters.slope_60 === 'all' || stock.slope_60 === filters.slope_60) &&
      (filters.slope_120 === 'all' || stock.slope_120 === filters.slope_120)
    );
  });
  const sortedStocks = filteredStocks.sort((a, b) => {
    const priorityA = actionPriority[a.action] || Infinity;
    const priorityB = actionPriority[b.action] || Infinity;
    return priorityA - priorityB;
  });


  return (

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">한국주식 데이터</h1>
    
    {/* 최근 업데이트 시간 표시 */}
    <div className="mb-6 text-center">
      <p className="text-lg text-gray-700 font-medium">
        최근 업데이트 시간: <span className="text-blue-600">{lastUpdate || 'Loading...'}</span>
      </p>
    </div>

    {/* 버튼 섹션 */}
    <div className="flex flex-wrap justify-between items-center mb-6">
      {/* 메인으로 가기 버튼 */}
      <Link href="/">
        <button
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all"
        >
          메인으로 가기
        </button>
      </Link>

      {/* 초기화 버튼 */}
      <button
        onClick={() => setFilters({
          stockname: '',
          price_change_value: '',
          volumechangerate: '',
          volume_trend: 'all',
          candle_pattern: 'all',
          price_change_status: 'all',
          macd_trend: 'all',
          rsi_status: 'all',
          price_vs_bollinger: 'all',
          slope_5: 'all',
          slope_20: 'all',
          slope_60: 'all',
          slope_120: 'all',
        })}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        필터 초기화
      </button>

    </div>


      {/* 필터링 옵션 */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 주식명 필터 */}
        <div>
          <label className="block mb-1 font-semibold">주식명</label>
          <input
            type="text"
            placeholder="주식명 입력"
            value={filters.stockname}
            onChange={(e) => setFilters({ ...filters, stockname: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>


        {/* 가격변화율 필터 */}
        <div>
          <label className="block mb-1 font-semibold">가격변화율</label>
          <input
            type="number"
            placeholder="가격변화율 입력"
            value={filters.price_change_value}
            onChange={(e) => setFilters({ ...filters, price_change_value: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        {/* 거래량 필터 */}
        <div>
          <label className="block mb-1 font-semibold">거래률</label>
          <input
            type="number"
            placeholder="거래률 입력"
            value={filters.volumechangerate}
            onChange={(e) => setFilters({ ...filters, volumechangerate: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        {/* 거래량 */}
        {/* <div>
          <label className="block mb-1 font-semibold">거래낙폭</label>
          <select
            value={filters.volume_trend}
            onChange={(e) => setFilters({ ...filters, volume_trend: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="증가">증가</option>
            <option value="감소">감소</option>
          </select>
        </div> */}

        {/* 캔들 패턴 */}
        <div>
          <label className="block mb-1 font-semibold">캔들 패턴</label>
          <select
            value={filters.candle_pattern}
            onChange={(e) => setFilters({ ...filters, candle_pattern: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="양봉">양봉</option>
            <option value="음봉">음봉</option>
            <option value="장대양봉">장대양봉</option>
            <option value="아랫꼬리 긴 캔들">아랫꼬리 긴 캔들</option>
          </select>
        </div>

        {/* 가격 상태 */}
        <div>
          <label className="block mb-1 font-semibold">가격 상태</label>
          <select
            value={filters.price_change_status}
            onChange={(e) => setFilters({ ...filters, price_change_status: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>

        {/* MACD */}
        <div>
          <label className="block mb-1 font-semibold">MACD</label>
          <select
            value={filters.macd_trend}
            onChange={(e) => setFilters({ ...filters, macd_trend: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        {/* RSI 필터 */}
        <div>
          <label className="block mb-1 font-semibold">RSI</label>
          <select
            value={filters.rsi_status}
            onChange={(e) => setFilters({ ...filters, rsi_status: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="과매수">과매수</option>
            <option value="중립">중립</option>
            <option value="과매도">과매도</option>
          </select>
        </div>
        {/* 볼린저밴드 필터 */}
        <div>
          <label className="block mb-1 font-semibold">볼린저 밴드</label>
          <select
            value={filters.price_vs_bollinger}
            onChange={(e) => setFilters({ ...filters, price_vs_bollinger: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상단">상단</option>
            <option value="중간">중간</option>
            <option value="하단">하단</option>
          </select>
        </div>
        {/* Slope 5, 20, 60, 120 */}
        <div>
          <label className="block mb-1 font-semibold">5일 이평선</label>
          <select
            value={filters.slope_5}
            onChange={(e) => setFilters({ ...filters, slope_5: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">20일 이평선</label>
          <select
            value={filters.slope_20}
            onChange={(e) => setFilters({ ...filters, slope_20: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">60일 이평선</label>
          <select
            value={filters.slope_60}
            onChange={(e) => setFilters({ ...filters, slope_60: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">120일 이평선</label>
          <select
            value={filters.slope_120}
            onChange={(e) => setFilters({ ...filters, slope_120: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>

      </div>


      {/* 로딩 상태 처리 */}
       {isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading stock data...</p>
      ) : sortedStocks.length === 0 ? (
        <p className="text-center text-lg text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse shadow-md">
            {/* 테이블 헤더 */}
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">주식명</th>
                <th className="px-4 py-2 min-w-[50px] whitespace-nowrap">코드</th>
                <th className="px-4 py-2 min-w-[50px] whitespace-nowrap">가격</th>
                <th className="px-4 py-2 min-w-[100px] whitespace-nowrap">변화률</th>
                {/* <th className="px-4 py-2 min-w-[50px] whitespace-nowrap">가격낙폭</th> */}
                <th className="px-4 py-2 min-w-[80px] whitespace-nowrap">거래량</th>
                <th className="px-4 py-2 min-w-[50px] whitespace-nowrap">거래률</th>
                {/* <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">거래낙폭</th> */}
                <th className="px-4 py-2 min-w-[400px] whitespace-nowrap">조언</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">캔들패턴</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">MACD</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">RSI</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">볼린저밴드</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">5일 이평선</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">20일 이평선</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">60일 이평선</th>
                <th className="px-4 py-2 min-w-[150px] whitespace-nowrap">120일 이평선</th>
              </tr>
            </thead>

            {/* 테이블 본문 */}
            <tbody>
              {filteredStocks.map((stock, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b transition duration-300">
                  <td className="px-4 py-2">                  
                    <Link href={`/stocks/${stock.stockcode}`}>
                      {stock.stockname}
                    </Link></td>
                  <td className="px-4 py-2">{stock.stockcode}</td>
                  <td
                    className={`px-4 py-2 text-right ${
                      stock.price_change_value !== null && stock.price_change_value > 0
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  >
                    {stock.currentprice ?? 'N/A'}
                  </td>
                  <td
                    className={`px-4 py-2 text-right ${
                      stock.price_change_value !== null && stock.price_change_value > 0
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  >
                    {stock.price_change_value !== null && stock.price_change_value !== undefined
                      ? stock.price_change_value.toFixed(2) + '%'
                      : 'N/A'}
                  </td>
                  {/* <td
                    className={`px-4 py-2 ${
                      stock.price_change_status === '상승' ? 'text-red-500' : 'text-blue-500'
                    }`}
                  >
                    {stock.price_change_status || 'N/A'}
                  </td> */}
                  <td className="px-4 py-2 text-right">{stock.volume ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-right">
                    {stock.volumechangerate !== null && stock.volumechangerate !== undefined
                      ? stock.volumechangerate.toFixed(2) + '%'
                      : 'N/A'}
                  </td>
                  {/* <td className="px-4 py-2">{stock.volume_trend || 'N/A'}</td> */}
                  <td className="px-4 py-2">{stock.action || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.candle_pattern || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.macd_trend || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.rsi_status || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.price_vs_bollinger || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope_5 || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope_20 || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope_60 || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope_120 || 'N/A'}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
