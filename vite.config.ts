import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  esbuild: {
    jsxFactory: 'ReactImitation.createElement',
    jsxFragment: 'ReactImitation.Fragment',
  },
});
