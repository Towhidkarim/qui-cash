'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './ui/sonner';
import { createContext } from 'react';
import { Session, User } from 'lucia';
export const SessionContext = createContext<
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    }
  | null
>(null);
export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session:
    | {
        user: User;
        session: Session;
      }
    | {
        user: null;
        session: null;
      };
}) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionContext.Provider value={session}>
          <Toaster />
          {children}
        </SessionContext.Provider>
      </QueryClientProvider>
    </>
  );
}
