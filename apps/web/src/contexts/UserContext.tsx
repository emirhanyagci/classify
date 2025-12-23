"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { User } from '@classify/common';
import { refreshAccessToken } from '@/services/auth.service';
import { setAccessTokenGetter } from '@/lib/apollo-client';

// Allow partial user fields so we can store tokens before full profile is loaded.
type AuthUser = Partial<User>;

interface UserContextType {
  user: AuthUser | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: (user: AuthUser) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userRef = useRef<AuthUser | null>(null);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    setAccessTokenGetter(() => userRef.current?.accessToken ?? null);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshAccessToken();
        const { accessToken, ...userData } = response.data;
        setUser((prev) => ({ ...(prev ?? {}), accessToken, ...userData }));
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const setAccessToken = (accessToken: string) => {
    setUser((prev) => ({ ...(prev ?? {}), accessToken }))
  }
  const logout = () => {
    setUser(null);
  };




  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
