import { getApiBaseUrl, getAuthToken } from './api.config.ts'
import { ApiError } from './api.error.ts'
import axios from 'axios'

export const apiClient = axios.create({
    baseURL: getApiBaseUrl(),
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
