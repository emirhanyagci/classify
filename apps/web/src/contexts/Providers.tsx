"use client";

import { ReactNode } from 'react';
import { UserProvider } from './UserContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
