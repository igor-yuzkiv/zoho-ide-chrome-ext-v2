import { type IUser } from '../user'
import { TOKEN_LOCAL_STORAGE_KEY } from './auth.config.ts'
import { fetchCurrentUserRequest } from './requests/fetch.current-user.request.ts'
import { loginRequest } from './requests/login.request.ts'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('backend-api.auth', () => {
    const user = ref<IUser | null>(null)
    const token = useStorage<string | undefined>(TOKEN_LOCAL_STORAGE_KEY, undefined)

    async function loadCurrentUser() {
        if (!token.value) {
            throw new Error('No token found')
        }

        const response = await fetchCurrentUserRequest()
        console.log('Fetched current user:', response)
    }

    async function login(email: string, password: string) {
        const response = await loginRequest(email, password)
        if (!response?.data || !response.token) {
            throw new Error('Login failed')
        }

        token.value = response.token
        user.value = response.data
    }

    return { user, login, loadCurrentUser }
})
