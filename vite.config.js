import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    port: 3000,
    host: true,
    cors: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
  build: {
    // Split chunks so React, GSAP, and Lenis download and parse in parallel
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'gsap-core': ['gsap'],
          'lenis-core': ['lenis'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Raise chunk warning threshold — GSAP is legitimately ~200KB
    chunkSizeWarningLimit: 600,
    // Target modern browsers for smaller, faster output
    target: 'esnext',
    // Minify CSS too
    cssMinify: true,
  },
  // Pre-bundle heavy deps for lightning dev server startup
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'lenis', 'lucide-react'],
  },
});
