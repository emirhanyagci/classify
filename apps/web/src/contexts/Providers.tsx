"use client";

import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { apolloClient } from '../lib/apollo-client';
import { UserProvider } from './UserContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        {children}
      </UserProvider>
    </ApolloProvider>
  );
}
