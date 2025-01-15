'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../utils/utils';
import { actionPriority } from '../../data/actionPriority';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dataLoad, fetchLastUpdate } from '@/action/stock';

export default function StocksPage() {
  const [filters, setFilters] = useState({
    stockname: '',
    priceChangeValue: '',
    volumechangerate: '',
    volumeTrend: 'all',
    candlePattern: 'all',
    priceChangeStatus: 'all',
    macdTrend: 'all',
    rsiStatus: 'all',
    priceVsBollinger: 'all',
    slope5: 'all',
    slope20: 'all',
    slope60: 'all',
    slope120: 'all',
  });

  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
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

  // React Query로 데이터 가져오기
  const {
    data: stocks = [],
    isError,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stocks'], // Query Key
    queryFn: dataLoad, // Query Function
  });

  const filteredStocks = stocks.filter(stock => {
    return (
      (filters.stockname === '' ||
        stock.stockname.includes(filters.stockname)) &&
      (filters.priceChangeValue === '' ||
        stock.priceChangeValue >= parseFloat(filters.priceChangeValue)) &&
      (filters.volumechangerate === '' ||
        stock.volumechangerate >= parseFloat(filters.volumechangerate)) &&
      (filters.volumeTrend === 'all' ||
        stock.volumeTrend === filters.volumeTrend) &&
      (filters.candlePattern === 'all' ||
        stock.candlePattern === filters.candlePattern) &&
      (filters.priceChangeStatus === 'all' ||
        stock.priceChangeStatus === filters.priceChangeStatus) &&
      (filters.macdTrend === 'all' || stock.macdTrend === filters.macdTrend) &&
      (filters.rsiStatus === 'all' || stock.rsiStatus === filters.rsiStatus) &&
      (filters.priceVsBollinger === 'all' ||
        stock.priceVsBollinger === filters.priceVsBollinger) &&
      (filters.slope5 === 'all' || stock.slope5 === filters.slope5) &&
      (filters.slope20 === 'all' || stock.slope20 === filters.slope20) &&
      (filters.slope60 === 'all' || stock.slope60 === filters.slope60) &&
      (filters.slope120 === 'all' || stock.slope120 === filters.slope120)
    );
  });
  const sortedStocks = filteredStocks.sort((a, b) => {
    const priorityA = actionPriority[a.action] || Infinity;
    const priorityB = actionPriority[b.action] || Infinity;
    return priorityA - priorityB;
  });

  const queryClient = useQueryClient();
  const handleEditClick = () => {
    queryClient.removeQueries({ queryKey: ['stocks'] });
    queryClient.refetchQueries({ queryKey: ['stocks'] });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-900 text-white">
      {/* 버튼 섹션 */}
      <div className="flex justify-between items-center gap-4 mb-8">
        <Link href="/myStocks">
          <button
            className="flex items-center justify-center w-36 h-10 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition"
            onClick={handleEditClick}
          >
            종목 편집
          </button>
        </Link>
        <button
          onClick={() =>
            setFilters({
              stockname: '',
              priceChangeValue: '',
              volumechangerate: '',
              volumeTrend: 'all',
              candlePattern: 'all',
              priceChangeStatus: 'all',
              macdTrend: 'all',
              rsiStatus: 'all',
              priceVsBollinger: 'all',
              slope5: 'all',
              slope20: 'all',
              slope60: 'all',
              slope120: 'all',
            })
          }
          className="flex items-center justify-center w-36 h-10 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition"
        >
          필터 초기화
        </button>
      </div>

      {/* 필터링 옵션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* 주식명 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            주식명
          </label>
          <input
            type="text"
            placeholder="주식명 입력"
            value={filters.stockname}
            onChange={e =>
              setFilters({ ...filters, stockname: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 가격변화율 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            가격변화율
          </label>
          <input
            type="number"
            placeholder="가격변화율 입력"
            value={filters.priceChangeValue}
            onChange={e =>
              setFilters({ ...filters, priceChangeValue: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 거래량 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            거래률
          </label>
          <input
            type="number"
            placeholder="거래률 입력"
            value={filters.volumechangerate}
            onChange={e =>
              setFilters({ ...filters, volumechangerate: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 캔들 패턴 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            캔들 패턴
          </label>
          <select
            value={filters.candlePattern}
            onChange={e =>
              setFilters({ ...filters, candlePattern: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            가격 상태
          </label>
          <select
            value={filters.priceChangeStatus}
            onChange={e =>
              setFilters({ ...filters, priceChangeStatus: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>

        {/* MACD */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            MACD
          </label>
          <select
            value={filters.macdTrend}
            onChange={e =>
              setFilters({ ...filters, macdTrend: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        {/* RSI 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            RSI
          </label>
          <select
            value={filters.rsiStatus}
            onChange={e =>
              setFilters({ ...filters, rsiStatus: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="과매수">과매수</option>
            <option value="중립">중립</option>
            <option value="과매도">과매도</option>
          </select>
        </div>
        {/* 볼린저밴드 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            볼린저 밴드
          </label>
          <select
            value={filters.priceVsBollinger}
            onChange={e =>
              setFilters({ ...filters, priceVsBollinger: e.target.value })
            }
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상단">상단</option>
            <option value="중간">중간</option>
            <option value="하단">하단</option>
          </select>
        </div>
        {/* Slope 5, 20, 60, 120 */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            5일 이평선
          </label>
          <select
            value={filters.slope5}
            onChange={e => setFilters({ ...filters, slope5: e.target.value })}
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            20일 이평선
          </label>
          <select
            value={filters.slope20}
            onChange={e => setFilters({ ...filters, slope20: e.target.value })}
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            60일 이평선
          </label>
          <select
            value={filters.slope60}
            onChange={e => setFilters({ ...filters, slope60: e.target.value })}
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            120일 이평선
          </label>
          <select
            value={filters.slope120}
            onChange={e => setFilters({ ...filters, slope120: e.target.value })}
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">전체</option>
            <option value="상승">상승</option>
            <option value="하락">하락</option>
          </select>
        </div>
      </div>

      {/* 최근 업데이트 시간 표시 */}
      <div className="text-right text-gray-400 mb-8">
        {/* Update */}
        <span className="text-blue-400"> {lastUpdate || 'Loading...'}</span>
      </div>

      {/* 로딩 상태 처리 */}
      {isLoading ? (
        <div className="flex justify-center">
          <img src="/gray_loading.gif" alt="Loading..." className="w-16 h-16" />
        </div>
      ) : sortedStocks.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          검색 결과가 없습니다.
        </p>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full table-auto border-collapse overflow-hidden">
            {/* 테이블 헤더 */}
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm uppercase">
                <th className="min-w-[150px] py-5">주식명</th>
                <th className="min-w-[50px]">코드</th>
                <th className="min-w-[50px]">가격</th>
                <th className="min-w-[100px]">변화률</th>
                <th className="min-w-[80px]">거래량</th>
                <th className="min-w-[50px]">거래률</th>
                <th className="min-w-[300px]">조언</th>
                <th className="min-w-[120px]">캔들패턴</th>
                <th className="min-w-[120px]">MACD</th>
                <th className="min-w-[120px]">RSI</th>
                <th className="min-w-[120px]">볼린저밴드</th>
                <th className="min-w-[120px]">5일 이평선</th>
                <th className="min-w-[120px]">20일 이평선</th>
                <th className="min-w-[120px]">60일 이평선</th>
                <th className="min-w-[120px]">120일 이평선</th>
              </tr>
            </thead>

            {/* 테이블 본문 */}
            <tbody className="text-sm  text-center">
              {filteredStocks.map((stock, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-600 border-b transition duration-300"
                >
                  <td className="px-4 py-5">
                    <Link href={`/userStocks/${stock.stockcode}`}>
                      {stock.stockname}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{stock.stockcode}</td>
                  <td
                    className={`px-4 py-2 text-right ${
                      stock.priceChangeValue !== null &&
                      stock.priceChangeValue > 0
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  >
                    {stock.currentprice ?? 'N/A'}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      stock.priceChangeValue !== null &&
                      stock.priceChangeValue > 0
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  >
                    {stock.priceChangeValue !== null &&
                    stock.priceChangeValue !== undefined
                      ? `${stock.priceChangeValue > 0 ? '▲' : '▼'}${stock.priceChangeValue.toFixed(2)} %`
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {stock.volume !== null && stock.volume !== undefined
                      ? stock.volume.toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {stock.volumechangerate !== null &&
                    stock.volumechangerate !== undefined
                      ? stock.volumechangerate.toFixed(2) + '%'
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{stock.action || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.candlePattern || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.macdTrend || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.rsiStatus || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {stock.priceVsBollinger || 'N/A'}
                  </td>
                  <td className="px-4 py-2">{stock.slope5 || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope20 || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope60 || 'N/A'}</td>
                  <td className="px-4 py-2">{stock.slope120 || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
