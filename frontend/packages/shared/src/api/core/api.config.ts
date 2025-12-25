export const BACKEND_AUTH_TOKEN_LOCAL_STORAGE_KEY = 'backend_api_auth_token'

export const getAuthToken = (): string | null => {
    return localStorage.getItem(BACKEND_AUTH_TOKEN_LOCAL_STORAGE_KEY) || null
}

export const getApiBaseUrl = (): string => {
    return import.meta.env.VITE_API_BASE_URL
}