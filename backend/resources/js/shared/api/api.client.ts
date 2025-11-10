import axios from 'axios'
import { ApiError } from '@/shared/api/api.error.ts'

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

function normalizeError(error: Error) {
    return Promise.reject(axios.isAxiosError(error) ? new ApiError(error) : error)
}

apiClient.interceptors.response.use((r) => r, normalizeError)
