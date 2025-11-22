/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        root: __dirname,
        cacheDir: '../../node_modules/.vite/apps/web',
        base: '',
        server: {
            port: 4200,
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
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.css'],
        },
        preview: {
            port: 4300,
            host: 'localhost',
        },
        plugins: [vue(), tailwindcss(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
        // Uncomment this if you are using workers.
        // worker: {
        //  plugins: [],
        // },
        build: {
            outDir: '../../dist/apps/web',
            emptyOutDir: true,
            reportCompressedSize: true,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
    }
})
