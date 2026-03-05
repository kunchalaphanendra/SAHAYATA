import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: process.cwd() is standard Node.js, but type definitions might be missing in this context. 
  // Casting to any resolves the 'Property cwd does not exist on type Process' error.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_API_KEY),
    },
    server: {
      port: 3000,
      open: true
    }
  };
});
