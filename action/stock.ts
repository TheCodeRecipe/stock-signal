'use server';

import { StockCamel } from '@/type/stock';
import { fetchUsername, getAuthToken } from './auth';

const SPRING_BASE_URL = process.env.NEXT_API_SPRING_BASE_URL;

//업데이트시간
export async function fetchLastUpdate(marketType: string): Promise<any> {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${SPRING_BASE_URL}/api/stocks/last-update?market_type=${marketType}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch last update');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchLastUpdate:', error);
    throw error;
  }
}

//주식 데이터 가져오기
export async function dataLoad(): Promise<StockCamel[]> {
  const userName = await fetchUsername();
  const token = await getAuthToken();
  const response = await fetch(
    `${SPRING_BASE_URL}/api/stocks/analysis?username=${userName}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to load user analysis data');
  }

  return data;
}

//주식 개별데이터
export async function fetchStockData(code: string): Promise<any> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${SPRING_BASE_URL}/api/stocks/${code}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('response', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchStockData:', error);
    throw error;
  }
}

//CSV파일에서 차트정보 불러오기
export async function fetchStockDataChart(code: string): Promise<any> {
  const token = await getAuthToken();
  try {
    const response = await fetch(
      `${SPRING_BASE_URL}/api/stocks/chart/${code}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchStockData:', error);
    throw error;
  }
}
