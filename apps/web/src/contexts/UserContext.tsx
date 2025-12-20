"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '@classify/common';

// Allow partial user fields so we can store tokens before full profile is loaded.
type AuthUser = Partial<User> & { access_token?: string };

interface UserContextType {
  user: AuthUser | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  //   try {
  //     setLoading(true);
  //     // TODO: Replace with actual API endpoint
  //     const response = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     }

  //     const data = await response.json();
  //     // Store token if provided
  //     if (data.access_token) {
  //       localStorage.setItem('access_token', data.access_token);
  //     }
  //     if (data.refresh_token) {
  //       localStorage.setItem('refresh_token', data.refresh_token);
  //     }

  //     // Fetch user data after successful login
  //     await fetchUser();
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };




  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
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
