/// <reference types='vitest' />
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig } from 'vite'

export default defineConfig(({mode}) => {
    const result: UserConfig = {
        root: __dirname,
        cacheDir: '../../node_modules/.vite/apps/admin',
        base: '',
        server: {
            port: 4200,
            host: 'localhost',
            proxy: {},
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('/src', import.meta.url)),
                '@zoho-ide/shared': fileURLToPath(new URL('../../packages/shared/src/index.ts', import.meta.url))
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.css'],
        },
        preview: {
            port: 4300,
            host: 'localhost',
        },
        plugins: [vue(), tailwindcss()],
        // Uncomment this if you are using workers.
        // worker: {
        //  plugins: [],
        // },
        build: {
            outDir: './dist',
            emptyOutDir: true,
            reportCompressedSize: true,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
    };

    if (mode === 'development') {
        const env = loadEnv(mode, process.cwd(), '')
        result.server.proxy = {
            '/api': {
                target: env.VITE_API_BASE_URL,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        };
    }

    return result;
})
