import { Suspense, lazy, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, useLocation } from "wouter";

const HomePage = lazy(() => import("@/pages/home"));
const ProductsPage = lazy(() => import("@/pages/products"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/productos" component={ProductsPage} />
          <Route path="/productos/" component={ProductsPage} />
        </Switch>
      </Suspense>
    </QueryClientProvider>
  );
}
