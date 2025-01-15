'use server';

import { cookies } from 'next/headers';

const SPRING_BASE_URL = process.env.NEXT_API_SPRING_BASE_URL;

export async function getAuthToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) {
    throw new Error('Authentication token not found in cookies');
  }
  return token;
}

export async function fetchUsername(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await fetch(`${SPRING_BASE_URL}/api/auth/validate`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    console.log('data', data);
    return data.success ? data.username : null;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
}
