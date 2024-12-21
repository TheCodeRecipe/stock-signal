'use server';

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_API_BASE_URL || "";

// 주식 데이터 업데이트 함수
export async function updateStocks(): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies(); // 서버에서 쿠키 접근
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return  {
      success: false,
      message: "업데이트 중 오류가 발생했습니다.",
    };

    const response = await fetch(`${API_BASE_URL}/update-stocks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
      },
    });

    console.log("Response status:", response.status); // 응답 상태 코드 확인

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "업데이트 실패");
    }

    return {
      success: true,
      message: "한국 주식 업데이트 완료!",
    };
  } catch (error) {
    console.error('Error updating stocks:', error);
    return {
      success: false,
      message: "업데이트 중 오류가 발생했습니다.",
    };
  }
}
