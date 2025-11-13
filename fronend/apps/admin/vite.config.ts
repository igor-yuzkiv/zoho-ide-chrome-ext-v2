/// <reference types='vitest' />
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/admin',
    server: {
        port: 4200,
        host: 'localhost',
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('/src', import.meta.url)),
            '@zoho-ide/ui-kit': fileURLToPath(new URL('../../packages/ui-kit/src/index.ts', import.meta.url))
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
}))
