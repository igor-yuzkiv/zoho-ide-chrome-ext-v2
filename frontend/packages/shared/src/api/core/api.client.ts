import { TOKEN_LOCAL_STORAGE_KEY } from '../../contracts/user'
import { ApiError } from './api.error.ts'
import axios from 'axios'

function getAuthToken(): string | null {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || null
}

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

apiClient.interceptors.request.use((config) => {
    const token = getAuthToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiClient.interceptors.response.use(
    (r) => r,
    (error: Error) => Promise.reject(axios.isAxiosError(error) ? new ApiError(error) : error)
)
