/** @format */
"use client";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useReportWebVitals } from "next/web-vitals";
import { SessionProvider } from "next-auth/react";

function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(new QueryClient());

  // useEffect(() => {
  //   registerServiceWorker();
  // }, []);

  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return (
    <QueryClientProvider client={client}>
        <SessionProvider>{children}</SessionProvider>

      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition={"bottom-right"}
      />
    </QueryClientProvider>
  );
}

export default Providers;
