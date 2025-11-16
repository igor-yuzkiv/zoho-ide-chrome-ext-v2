/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MOCK_API: 'true' | 'false'
    readonly VITE_COLLECT_MOCK_DATA: 'true' | 'false'
    readonly VITE_API_BASE_URL: string
    readonly VITE_MOCK_API_BASE_URL: string
}
