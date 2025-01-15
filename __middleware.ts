import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// 디코딩된 JWT 토큰 타입 정의
interface DecodedToken {
  role: string;
  exp: number; // 토큰 만료 시간 (Unix Timestamp)
}

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken'); // JWT 가져오기
  const { pathname } = req.nextUrl;

  // 로그인 페이지 또는 루트('/')는 항상 접근 가능
  if (pathname === '/' || pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (!accessToken) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // JWT 디코딩
    const decoded = jwtDecode<DecodedToken>(accessToken.value);

    // 토큰 만료 확인 (선택 사항)
    if (decoded.exp * 1000 < Date.now()) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // 어드민 페이지 접근 제어
    if (pathname.startsWith('/admin') && decoded.role !== 'ADMIN') {
      const userStocksUrl = new URL('/userStocks', req.url);
      return NextResponse.redirect(userStocksUrl);
    }
  } catch (err) {
    console.error('JWT 디코딩 오류:', err);
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 기본적으로 요청을 그대로 진행
  return NextResponse.next();
}

// Matcher 설정: 특정 경로에만 미들웨어 적용
export const config = {
  matcher: [
    '/admin/:path*', // admin 경로와 하위 경로
    '/myStocks/:path*', // myStocks 경로와 하위 경로
    '/userStocks/:path*', // userStocks 경로와 하위 경로
  ],
};
