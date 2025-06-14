import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: [
      "@tomo-inc/tomo-evm-kit",
      "@tanstack/react-query",
      "wagmi",
      "viem",
    ],
  },
  build: {
    target: "es2020",
  },
});
