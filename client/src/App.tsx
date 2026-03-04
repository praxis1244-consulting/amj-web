import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient } from "@trpc/client";
import { Switch, Route, useLocation } from "wouter";
import { TRPCProvider, trpcLinks } from "@/lib/trpc";
import type { AppRouter } from "@server/routers";
import HomePage from "@/pages/home";
import ProductsPage from "@/pages/products";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({ links: trpcLinks() })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/productos" component={ProductsPage} />
        </Switch>
      </TRPCProvider>
    </QueryClientProvider>
  );
}
