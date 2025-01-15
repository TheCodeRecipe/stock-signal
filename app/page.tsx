'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* 상단 헤더 */}
      <header className="w-full bg-transparent border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Stock Signal
          </h1>
          <nav className="flex space-x-4 sm:space-x-6">
            <a className="text-base sm:text-lg font-medium text-gray-300 hover:text-white">
              Home
            </a>
            <a className="text-base sm:text-lg font-medium text-gray-300 hover:text-white">
              About
            </a>
            <a className="text-base sm:text-lg font-medium text-gray-300 hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* 메인 섹션 */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-5xl leading-snug font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4">
            What is Stock Signal
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6">
            Stock Signal analyzes support and resistance levels based on the
            previous day's closing data. It provides insights into buy and sell
            timings using technical indicators such as MACD and RSI.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login" legacyBehavior>
              <a className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-indigo-700">
                Login
              </a>
            </Link>
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 rounded-lg text-white font-bold text-base sm:text-lg hover:bg-gray-700">
              Explore Docs
            </button>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-black py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">
            &copy; 2024 Stock Signal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
