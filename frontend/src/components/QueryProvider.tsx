"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient();

export default function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
