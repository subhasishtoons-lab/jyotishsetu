import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/jyotishsetu/',
    plugins: [
      react(),
      tailwindcss(),
      // In local dev preview (where the preview frame opens "/"), redirect
      // non-prefixed HTML requests to "/jyotishsetu/" so the app loads cleanly
      // under its GitHub Pages project base path.
      {
        name: 'redirect-root-to-base',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ?? '/';
            if (
              url === '/' ||
              url.startsWith('/?') ||
              (!url.startsWith('/jyotishsetu') &&
                !url.startsWith('/@') &&
                !url.startsWith('/node_modules') &&
                !url.startsWith('/src') &&
                !url.includes('.'))
            ) {
              const target =
                url === '/'
                  ? '/jyotishsetu/'
                  : url.startsWith('/?')
                    ? `/jyotishsetu/${url.slice(1)}`
                    : `/jyotishsetu${url}`;
              res.statusCode = 302;
              res.setHeader('Location', target);
              res.end();
              return;
            }
            next();
          });
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
