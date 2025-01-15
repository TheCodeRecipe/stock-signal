'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../action/login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginUser(username, password);
      if (result.success) {
        if (result.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/userStocks');
        }
      } else {
        setError(result.message || '로그인 실패');
      }
    } catch (err) {
      setError('로그인 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* 로그인 섹션 */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 relative">
        <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleLogin}>
            {/* 이메일 입력 */}
            <div className="mb-6">
              <input
                id="username"
                type="text"
                placeholder="Your id"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="mb-6">
              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-indigo-700"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* 항상 고정된 에러 메시지 영역 */}
        <div className="mt-4 h-10 flex items-center justify-center">
          {error && (
            <p className="text-sm text-gray-300 text-center">{error}</p>
          )}
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
