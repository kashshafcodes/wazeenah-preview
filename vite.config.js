import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths so the site works on GitHub Pages (username.github.io/repo-name/)
  // as well as on Vercel or a custom domain.
  base: "./",
});
