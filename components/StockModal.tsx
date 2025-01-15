'use client';

import { UserFavoriteStockList } from '@/action/favorite-stock';
import { useEffect, useState } from 'react';

interface Stock {
  id: number;
  stockCode: string;
  stockName: string;
}

interface Props {
  onClose: () => void;
  onSelect: (stockId: number) => void;
}

export default function StockModal({ onClose, onSelect }: Props) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchStocks = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const data = await UserFavoriteStockList(currentPage);
      setStocks(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(page);
  }, [page]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-gray-800 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden text-white">
        {/* 헤더 */}
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-purple-400">Select Stock</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            ✕
          </button>
        </header>

        {/* 콘텐츠 */}
        <div className="flex items-center justify-center p-4 overflow-y-auto h-[70vh] ">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <img
                src="/loading.gif"
                alt="Loading..."
                className="w-16 h-16 mb-4"
              />
            </div>
          ) : (
            <ul className="divide-y divide-gray-700 w-full">
              {stocks.map(stock => (
                <li
                  key={stock.id}
                  className="flex justify-between items-center py-3"
                >
                  <span className="text-gray-300">
                    {stock.stockName} ({stock.stockCode})
                  </span>
                  <button
                    onClick={() => onSelect(stock.id)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none transition"
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 푸터 */}
        <footer className="flex justify-between items-center p-4 border-t border-gray-700">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none ${
              page === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } transition`}
          >
            Previous
          </button>

          <span className="text-sm text-gray-400">
            Page {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none ${
              page >= totalPages - 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } transition`}
          >
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}
