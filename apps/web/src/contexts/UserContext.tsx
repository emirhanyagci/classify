"use client";

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { User } from '@classify/common';
import { refreshAccessToken } from '@/services/auth.service';
import { setAccessTokenGetter } from '@/lib/apollo-client';
import { setAccessTokenGetter as setAxiosAccessTokenGetter } from '@/lib/axios';
import { useGetUserLazyQuery } from '@/graphql';

// Allow partial user fields so we can store tokens before full profile is loaded.
type UserPartial = Partial<User>;

interface UserContextType {
  user: UserPartial | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: (user: UserPartial | null | undefined) => void;
  setAccessToken: (accessToken: string) => void;
  setImageUrl: (imageUrl: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [getUser] = useGetUserLazyQuery();


  const [user, setUser] = useState<UserPartial | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const accessTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const getter = () => accessTokenRef.current;
    setAccessTokenGetter(getter);
    setAxiosAccessTokenGetter(getter);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshAccessToken();
        const { accessToken } = response.data;
        updateAccessToken(accessToken);
        const { data } = await getUser();
        updateUser(data?.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const updateUser = (newUser: UserPartial | null | undefined) => {
    if (newUser?.accessToken) {
      accessTokenRef.current = newUser.accessToken;
    }
    setUser(newUser ?? null);
  };

  const updateAccessToken = (accessToken: string) => {
    accessTokenRef.current = accessToken;
    setUser((prev) => ({ ...(prev ?? {}), accessToken }));
  };

  const updateImageUrl = (imageUrl: string) => {
    setUser((prev) => ({ ...(prev ?? {}), imageUrl }));
  };

  const logout = () => {
    accessTokenRef.current = null;
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser: updateUser,
        setAccessToken: updateAccessToken,
        setImageUrl: updateImageUrl,
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
