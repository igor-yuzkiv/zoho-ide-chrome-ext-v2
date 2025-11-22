import { ApiError } from './api.error.ts'
import { TOKEN_LOCAL_STORAGE_KEY } from './auth/auth.config.ts'
import axios from 'axios'

export const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiClient.interceptors.response.use(
    (r) => r,
    (error: Error) => Promise.reject(axios.isAxiosError(error) ? new ApiError(error) : error)
)
