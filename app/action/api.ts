'use server';

const API_BASE_URL = process.env.NEXT_API_BASE_URL || "";

// 최근 업데이트 시간 가져오기
export async function fetchLastUpdate(marketType: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/last-update?market_type=${marketType}`);
    if (!response.ok) {
      throw new Error("Failed to fetch last update");
    }
    return response.json();
  } catch (error) {
    console.error("Error in fetchLastUpdate:", error);
    throw error;
  }
}


// 데이터 불러오기
export async function dataLoad(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/stocks`);
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      return response.json();
    } catch (error) {
      console.error("Error in dataLoad:", error);
      throw error;
    }
  }


// 특정 주식 데이터를 불러오는 서버사이드 함수
export async function fetchStockData(code: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/stocks/${code}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error in fetchStockData:", error);
      throw error;
    }
  }