import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Usa variável de ambiente VITE_BASE para definir o base path em produção (GitHub Pages)
// Em desenvolvimento (npm run dev) fica como '/'
export default defineConfig(({ mode }) => {
  const root = (globalThis as any).process?.cwd?.() ?? '.';
  const env = loadEnv(mode, root, '');
  const base = env.VITE_BASE || '/';
  return {
    plugins: [react()],
    server: { port: 3000 },
    base,
  };
});