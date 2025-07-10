import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@libs', replacement: path.resolve(__dirname, 'src/libs') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@schemas', replacement: path.resolve(__dirname, 'src/schemas') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      // {
      //   find: '@what-today/design-system',
      //   replacement: path.resolve(__dirname, '../../packages/design-system/dist/components/index.js'),
      // },
    ],
  },
});
