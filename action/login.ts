'use server';

import { cookies } from 'next/headers';

const SPRING_BASE_URL = process.env.NEXT_API_SPRING_BASE_URL;

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch(`${SPRING_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    console.log(data);

    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }

    // 쿠키 저장
    const cookieStore = await cookies();

    cookieStore.set('accessToken', data.accessToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1시간
    });

    cookieStore.set('refreshToken', data.refreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30일
    });

    return {
      success: true,
      message: '로그인에 성공했습니다.',
      role: data.role,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
