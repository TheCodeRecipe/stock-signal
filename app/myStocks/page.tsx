'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import {
  fetchFavoriteStocks,
  UserFavoriteAddStock,
  UserdeleteFavoriteStock,
} from '../../action/favorite-stock';
import StockModal from '@/components/StockModal';
import { useRouter } from 'next/navigation';

interface FavoriteStock {
  id?: number;
  stockName: string;
  stockCode: string;
}

export default function Home() {
  const [stocks, setStocks] = useState<FavoriteStock[] | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false); // 전체 로딩
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 작업 로딩
  const [isAdding, setIsAdding] = useState(false); // 추가 작업 로딩
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  // 관심종목 불러오기
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setIsGlobalLoading(true); // 로딩 시작
        const data = await fetchFavoriteStocks(); // 관심종목 API 호출
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setIsGlobalLoading(false); // 로딩 종료
      }
    };

    fetchStocks();
  }, []);

  // 관심종목 삭제
  const handleDelete = async (stockCode: string) => {
    if (confirm('이 관심종목을 삭제하시겠습니까?')) {
      try {
        setIsDeleting(true); // 삭제 작업 로딩 시작
        const result = await UserdeleteFavoriteStock(stockCode);
        if (result.success) {
          setStocks(
            prev => prev?.filter(stock => stock.stockCode !== stockCode) ?? null
          ); // 삭제 처리
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('삭제 중 오류가 발생했습니다.');
      } finally {
        setIsDeleting(false); // 삭제 작업 로딩 종료
      }
    }
  };

  // 모달에서 종목 선택
  const handleSelectStock = async (stockId: number) => {
    try {
      setIsModalOpen(false); // 모달 닫기
      setIsAdding(true);

      const data = await UserFavoriteAddStock(stockId);

      if (data.success) {
        const updatedStocks = await fetchFavoriteStocks();
        setStocks(updatedStocks);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      alert('추가 중 오류가 발생했습니다.');
    } finally {
      setIsAdding(false); // 추가 작업 로딩 종료
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4 text-white">
      {isModalOpen && (
        <StockModal
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectStock}
        />
      )}

      {/* 헤더 */}
      <header className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-purple-400 mb-2">
          Manage Your Favorite Stocks
        </h1>
        <p className="text-sm text-gray-400">
          Add and manage stocks you're interested in.
        </p>
      </header>

      {/* 버튼 섹션 */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition"
          >
            + 관심 종목 추가
          </button>

          <button
            onClick={() => router.push('/userStocks')}
            className="bg-gray-700 text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            종목 분석 (전일 종가 기준)
          </button>
        </div>
      </div>

      {/* 관심 종목 리스트 */}
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        {isGlobalLoading ? (
          <div className="flex justify-center">
            <img src="/loading.gif" alt="Loading..." className="w-16 h-16" />
          </div>
        ) : stocks && stocks.length === 0 ? (
          <p className="text-center text-gray-500">
            No favorite stocks added yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {stocks?.map(stock => (
              <li
                key={stock.id}
                className="flex items-center justify-between p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-sm"
              >
                <div>
                  <p className="text-base text-white">{stock.stockName}</p>
                  <p className="text-xs text-gray-400">{stock.stockCode}</p>
                </div>
                <button
                  className="px-4 py-2 text-sm text-white bg-red-700 rounded-md shadow hover:bg-red-800 transition"
                  onClick={() => handleDelete(stock.stockCode)}
                >
                  {isDeleting ? 'Deleting...' : 'Del'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 추가 로딩 중 표시 */}
      {isAdding && (
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-300">추가 중...</p>
        </div>
      )}
    </div>
  );
}
