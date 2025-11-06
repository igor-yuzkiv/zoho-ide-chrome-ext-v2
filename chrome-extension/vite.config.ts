import { defineConfig, loadEnv } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const result: UserConfig = {
        plugins: [vue(), tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('/src', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.css'],
        },
        base: '',
        build: {
            outDir: './extension/dist',
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vue-lite': ['vue', 'pinia', 'vue-router'],
                        'monaco-editor': ['monaco-editor'],
                    },
                },
            },
        },
        server: {},
    }

    if (mode === 'development') {
        const env = loadEnv(mode, process.cwd(), '')
        result.server = {
            host: '0.0.0.0',
            port: 3000,
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        }
    }

    return result
})
