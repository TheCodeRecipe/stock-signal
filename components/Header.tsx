'use client';

import { useState } from 'react';
import { handleLogout } from '@/action/logout';

export default function Header({ username }: { username: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="w-full bg-transparent border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
        {/* 로고 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Stock Signal
        </h1>

        {/* 네비게이션 */}
        <nav className="hidden sm:flex items-center space-x-4">
          <span className="text-sm sm:text-base text-gray-300">
            Welcome back, <span className="font-semibold">{username}</span>!
          </span>
          <form action={handleLogout}>
            <button
              type="submit"
              className="text-sm sm:text-base text-white hover:text-gray-200"
            >
              Log out
            </button>
          </form>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <div className="sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-200"
          >
            Menu
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`sm:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } bg-gray-800 py-4 px-6 rounded-lg shadow-md w-[90%] mt-2 mb-4 mx-auto`}
      >
        <ul className="space-y-4">
          <li className="text-gray-300 text-base font-medium">
            Welcome back, <span className="font-semibold">{username}</span>!
          </li>
          <li>
            <form action={handleLogout}>
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-400 text-base font-medium"
              >
                Log out
              </button>
            </form>
          </li>
        </ul>
      </div>
    </header>
  );
}
