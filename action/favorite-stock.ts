'use server';

import { fetchUsername, getAuthToken } from './auth';

const SPRING_BASE_URL = process.env.NEXT_API_SPRING_BASE_URL;

interface FavoriteStock {
  id?: number;
  stockName: string;
  stockCode: string;
}

// 관심종목 불러오기
export async function fetchFavoriteStocks(): Promise<FavoriteStock[]> {
  const token = await getAuthToken();
  const userName = await fetchUsername();
  const response = await fetch(
    `${SPRING_BASE_URL}/api/userfavorites?username=${userName}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch favorite stocks');
  }

  return response.json();
}

// 관심종목 삭제
export async function deleteFavoriteStock(id: number) {
  const token = await getAuthToken();
  const response = await fetch(`${SPRING_BASE_URL}/api/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// 관심종목 수정
export async function updateFavoriteStock(
  id: number,
  updatedStock: { stockName: string; stockCode: string }
) {
  const token = await getAuthToken();
  console.log('id:', id);
  console.log('updatedStock:', updatedStock);
  const response = await fetch(`${SPRING_BASE_URL}/api/favorites/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedStock),
  });
  console.log('response:', response);
  return response.json();
}

// 관심종목 추가
export async function AddFavoriteStock(newStock: {
  stockName: string;
  stockCode: string;
}) {
  const token = await getAuthToken();
  const response = await fetch(`${SPRING_BASE_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStock),
  });
  return response.json();
}

// 관심종목 추가 리스트
export async function UserFavoriteStockList(page: number) {
  const token = await getAuthToken();
  const userName = await fetchUsername();
  const response = await fetch(
    `${SPRING_BASE_URL}/api/stocks?username=${userName}&page=${page}&size=10`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stocks');
  }

  return response.json();
}

// 유저 관심종목 추가
export async function UserFavoriteAddStock(stockId: number) {
  const token = await getAuthToken();
  const userName = await fetchUsername();
  const response = await fetch(`${SPRING_BASE_URL}/api/userfavorites`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, stockId }),
  });
  console.log('response:', response);
  return response.json();
}

// 유저 관심종목 삭제
export async function UserdeleteFavoriteStock(stockCode: string) {
  const token = await getAuthToken();
  const userName = await fetchUsername();

  const response = await fetch(`${SPRING_BASE_URL}/api/userfavorites/delete`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, stockCode }),
  });

  if (!response.ok) {
    throw new Error('삭제 요청 실패');
  }

  return response.json();
}
