import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [
    glsl({
      include: '**/**/*.glsl',
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
