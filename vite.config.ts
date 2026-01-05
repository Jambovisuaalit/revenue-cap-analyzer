// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // No experimental features
      // Keep build output deterministic
    }),
  ],

  server: {
    port: 5173,
    strictPort: true,
    open: false,
  },

  build: {
    target: "es2019",
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.config.*",
      ],
    },
  },
});
