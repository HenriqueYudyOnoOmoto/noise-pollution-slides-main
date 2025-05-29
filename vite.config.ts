import path from 'path';
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/NOME_DO_REPOSITORIO/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});