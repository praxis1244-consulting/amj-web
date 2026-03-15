import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: ".",
  publicDir: "public",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/wouter/")
          ) {
            return "vendor-react";
          }

          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }

          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }

          if (id.includes("lottie-react") || id.includes("lottie-web")) {
            return "vendor-lottie";
          }

          if (
            id.includes("@supabase") ||
            id.includes("@tanstack") ||
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("/zod/") ||
            id.includes("@trpc")
          ) {
            return "vendor-data";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@server": path.resolve(__dirname, "server"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  server: {
    proxy: {
      "/trpc": {
        target: "http://localhost:5174",
        changeOrigin: true,
      },
    },
  },
});
