'use server';

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_API_BASE_URL || "";
 
// 로그인 함수
export async function login(password: string): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const cookieStore = await cookies(); // 서버에서 쿠키 접근

        // 쿠키 저장 (서버-사이드에서 쿠키 관리)
        cookieStore.set("accessToken", data.access_token, {
          path: "/", // 쿠키가 적용될 경로
          httpOnly: true, // 클라이언트 스크립트 접근 방지
          secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송
          sameSite: "strict", // SameSite 옵션 설정
          maxAge: 300, // 5분 (300초) 동안 유지
        });
  
        console.log("Token set in cookies");
        return data.access_token;
      } else {
        throw new Error("Invalid password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }


  export async function verifyToken(): Promise<boolean> {
    try {
      const cookieStore = await cookies(); // 서버에서 쿠키 접근
      const token = cookieStore.get("accessToken")?.value;
      if (!token) return false;
  
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
        },
      });
      console.log("response : "+response);
      console.log("response.ok : "+response.ok);
      return response.ok;
    } catch (error) {
      console.error("Error verifying token on server:", error);
      return false;
    }
  }