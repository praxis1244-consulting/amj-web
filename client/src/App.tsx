import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, useLocation } from "wouter";
import HomePage from "@/pages/home";
import ProductsPage from "@/pages/products";

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
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/productos" component={ProductsPage} />
      </Switch>
    </QueryClientProvider>
  );
}
