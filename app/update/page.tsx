"use client";

import { useState, useEffect } from "react";
import { login, verifyToken } from "../action/auth";
import StockUpdate from "../component/StockUpdate";

export default function UploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await verifyToken();
      setIsAuthenticated(valid);
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    setError(null);
    try {
      await login(password);
      setIsAuthenticated(true); // 로그인 성공
    } catch (e) {
      setError("Invalid password");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
      );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Password Required</h1>
        <input
          type="password"
          className="border rounded p-2 mb-4"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleLogin}
        >
          Submit
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <StockUpdate />
  );
}
