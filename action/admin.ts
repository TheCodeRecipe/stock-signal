'use server';

import { getAuthToken } from './auth';

const SPRING_BASE_URL = process.env.NEXT_API_SPRING_BASE_URL;

export async function adminDataLoad() {
  const token = await getAuthToken();
  const response = await fetch(`${SPRING_BASE_URL}/api/admin/analysis/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to load user analysis data');
  }

  return response.json();
}

// 주식 데이터 업데이트 함수
export async function updateStocks(): Promise<{
  success: boolean;
  message: string;
}> {
  const token = await getAuthToken();
  try {
    if (!token)
      return {
        success: false,
        message: '업데이트 중 오류가 발생했습니다.',
      };

    const response = await fetch(`${SPRING_BASE_URL}/api/admin/update-stocks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '업데이트 실패');
    }

    return {
      success: true,
      message: '한국 주식 업데이트 완료!',
    };
  } catch (error) {
    console.error('Error updating stocks:', error);
    return {
      success: false,
      message: '업데이트 중 오류가 발생했습니다.',
    };
  }
}
