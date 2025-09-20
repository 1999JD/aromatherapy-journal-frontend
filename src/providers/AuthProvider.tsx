'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// 1. 定義 Context 裡的型別
interface AuthContextType {
  hasLogin: boolean;
  login: (data: string) => void;
  logout: () => void;
}

// 2. 建立 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasLogin, setHasLogin] = useState(false);

  const login = async (token: string) => {
    setHasLogin(true);
    window.localStorage.setItem('accessToken', token)
  };

  const logout = () => {
    // 如果你的 API 有登出 endpoint，可以在此呼叫
    setHasLogin(false);
    window.localStorage.removeItem('accessToken')
  };

  // ✅ 在 client-side 判斷 localStorage
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      setHasLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ hasLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. 自訂 hook 方便取用 context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
