
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

function resolveViteBase(): string {
  // Active GitHub Pages deployment lives at /jyotishsetu/.
  // Future custom-domain migration can override via VITE_BASE_PATH=/ at build time.
  const raw = (process.env.VITE_BASE_PATH ?? '/jyotishsetu/').trim();
  if (!raw || raw === '/') return '/';
  const collapsed = raw.replace(/\/{2,}/g, '/');
  const withLeading = collapsed.startsWith('/') ? collapsed : `/${collapsed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export default defineConfig(() => {
  const base = resolveViteBase();

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),

      // Dev-only convenience: redirect bare "/" to "/jyotishsetu/" when running under project subpath.
      {
        name: 'redirect-root-to-base-in-dev',
        apply: 'serve',
        configureServer(server) {
          if (base === '/') return;
          server.middlewares.use((req, res, next) => {
            if (req.url === '/' || req.url?.startsWith('/?')) {
              const query = req.url.length > 1 ? req.url.slice(1) : '';
              res.statusCode = 302;
              res.setHeader('Location', `${base}${query}`);
              res.end();
              return;
            }
            next();
          });
        },
      },

      // Copies src/assets into dist/src/assets.
      // Preserve this for unbundled image assets.
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
            fs.cpSync(srcAssets, distAssets, {
              recursive: true,
              force: true,
            });
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
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
