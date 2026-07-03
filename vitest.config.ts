import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "./src/packages/ui"),
      "@hooks": path.resolve(__dirname, "./src/packages/hooks"),
      "@utils": path.resolve(__dirname, "./src/packages/utils"),
      "@config": path.resolve(__dirname, "./src/packages/config"),
      "@types": path.resolve(__dirname, "./src/packages/types"),
      "@icons": path.resolve(__dirname, "./src/packages/icons"),
      "@theme": path.resolve(__dirname, "./src/packages/theme"),
      "@providers": path.resolve(__dirname, "./src/packages/providers"),
      "@layouts": path.resolve(__dirname, "./src/packages/layouts"),
    },
  },
});
