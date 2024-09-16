'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './ui/sonner';
export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </>
  );
}
