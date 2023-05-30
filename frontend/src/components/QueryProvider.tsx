"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
  // const queryClient = new QueryClient();
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     {children}
  //     <ReactQueryDevtools initialIsOpen={false} />
  //   </QueryClientProvider>
  // );
}
