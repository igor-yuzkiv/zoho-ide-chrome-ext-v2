/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        root: __dirname,
        cacheDir: '../../node_modules/.vite/apps/chrome-ext',
        base: '',
        server: {
            port: 4201,
            host: 'localhost',
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('/src', import.meta.url)),
                '@zoho-ide/ui-kit/*': fileURLToPath(new URL('../../packages/ui-kit/src/*', import.meta.url)),
                '@zoho-ide/backend-api/*': fileURLToPath(new URL('../../packages/backend-api/src/*', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.css'],
        },
        preview: {
            port: 4301,
            host: 'localhost',
        },
        plugins: [vue(), tailwindcss(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
        // Uncomment this if you are using workers.
        // worker: {
        //  plugins: [ nxViteTsPaths() ],
        // },
        build: {
            outDir: './extension/dist',
            emptyOutDir: true,
            reportCompressedSize: true,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
    }
})
