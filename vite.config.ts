import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode, command}) => {
  const env = loadEnv(mode, '.', '');
  
  const plugins = [react(), tailwindcss()];
  
  if (command === 'serve') {
    plugins.push({
      name: 'inject-env',
      transformIndexHtml(html: string) {
        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
        const safeApiKey = apiKey.replace(/"/g, '\\"').replace(/\n/g, '\\n').trim();
        return html.replace(
          '</head>',
          `<script>window.__GEMINI_API_KEY__ = "${safeApiKey}";</script></head>`
        );
      },
    } as any);
  }

  return {
    define: {
      'process.env.GEMINI_API_KEY': 'window.__GEMINI_API_KEY__',
    },
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
