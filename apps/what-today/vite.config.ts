import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@what-today/design-system': path.resolve(__dirname, '../../packages/design-system/src/index.ts'),
    },
  },
});
