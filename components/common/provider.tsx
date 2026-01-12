"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { useAuth } from "@/hooks/auth";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

function Provider({ children }: { children: ReactNode }) {
  const isMounted = useRef(false);
  const { fetchUser } = useAuth();

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;
    fetchUser();
  }, [isMounted.current]);

  if (!isMounted.current) return null;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader showSpinner={false} color="blue" />
          <Toaster />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Provider;
