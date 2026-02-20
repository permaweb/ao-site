import react from '@vitejs/plugin-react';
import path from 'path';
import polyfillNode from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = process.env.NODE_ENV || 'development';
  const isProduction = env === 'production';

  return {
    base: './',
    plugins: [
      nodePolyfills({
        protocolImports: true,
      }),
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    resolve: {
      alias: {
        app: path.resolve(__dirname, 'src/app'),
        components: path.resolve(__dirname, 'src/components'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        navigation: path.resolve(__dirname, 'src/navigation'),
        providers: path.resolve(__dirname, 'src/providers'),
        views: path.resolve(__dirname, 'src/views'),
        wallet: path.resolve(__dirname, 'src/wallet'),
        wrappers: path.resolve(__dirname, 'src/wrappers'),
        'asn1.js': path.resolve(__dirname, 'node_modules/asn1.js'),
        elliptic: path.resolve(__dirname, 'node_modules/elliptic'),
        qrcode$: path.resolve(__dirname, 'src/helpers/qrcode-alias.js'),
        process: 'vite-plugin-node-polyfills/polyfills/process-es6',
        buffer: 'vite-plugin-node-polyfills/polyfills/buffer',
        crypto: 'vite-plugin-node-polyfills/polyfills/crypto',
        stream: 'vite-plugin-node-polyfills/polyfills/stream',
        util: 'vite-plugin-node-polyfills/polyfills/util',
        path: 'vite-plugin-node-polyfills/polyfills/path',
        events: 'vite-plugin-node-polyfills/polyfills/events',
        timers: 'vite-plugin-node-polyfills/polyfills/timers',
        http: 'vite-plugin-node-polyfills/polyfills/http',
        https: 'vite-plugin-node-polyfills/polyfills/https',
        os: 'vite-plugin-node-polyfills/polyfills/os',
        assert: 'vite-plugin-node-polyfills/polyfills/assert',
        zlib: 'vite-plugin-node-polyfills/polyfills/zlib',
        constants: 'vite-plugin-node-polyfills/polyfills/constants',
        url: 'vite-plugin-node-polyfills/polyfills/url',
      },
    },
    optimizeDeps: {
      include: ['buffer', 'process', 'crypto', 'stream', 'util'],
    },
    define: {
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL || ''),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY || ''),
      'process.browser': JSON.stringify(true),
    },
    build: {
      sourcemap: false,
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        plugins: [polyfillNode()],
        output: {
          manualChunks: (id: string) => {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('@permaweb/aoconnect')) {
              return 'ao-connect';
            }
            if (id.includes('arweave')) {
              return 'arweave';
            }
            if (id.includes('ethers')) {
              return 'ethers';
            }
            if (id.includes('@web3-onboard') || id.includes('wagmi') || id.includes('viem')) {
              return 'web3';
            }
            if (id.includes('react-markdown') || id.includes('katex') || id.includes('marked')) {
              return 'markdown';
            }

            return undefined;
          },
        },
      },
    },
    server: {
      open: false,
      strictPort: true,
      hmr: true,
      port: 3000,
    },
  };
});
