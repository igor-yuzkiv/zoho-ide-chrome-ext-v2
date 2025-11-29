/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    console.log('Vite mode:', {mode, api: env.VITE_API_BASE_URL})

    return {
        root: __dirname,
        cacheDir: '../../node_modules/.vite/apps/chrome-ext',
        base: '',
        server: {
            port: 4201,
            host: 'localhost',
            proxy: {
                '/api': {
                    target: env.VITE_API_PROXY_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                // @ts-expect-error TS1470: The 'import.meta' meta-property is not allowed in files which will build into CommonJS output.
                '@': fileURLToPath(new URL('/src', import.meta.url)),
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
