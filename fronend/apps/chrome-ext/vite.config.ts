/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'


export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/chrome-ext',
    server: {
        port: 4200,
        host: 'localhost',
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('/src', import.meta.url)),
            '@zoho-ide/ui-kit': fileURLToPath(new URL('../../packages/ui-kit/src/index.ts', import.meta.url)),
            '@zoho-ide/ui-kit/*': fileURLToPath(new URL('../../packages/ui-kit/src/*', import.meta.url)),
        },
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.css'],
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: '../../dist/apps/chrome-ext',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
}))
