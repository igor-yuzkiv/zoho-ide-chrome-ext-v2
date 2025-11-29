import { TOKEN_LOCAL_STORAGE_KEY } from './auth.config.ts'
import { fetchCurrentUserRequest } from './requests/fetch.current-user.request.ts'
import { loginRequest } from './requests/login.request.ts'
import { useStorage } from '@vueuse/core'
import { type IUser } from '@zoho-ide/shared/entities/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('backend-api.auth', () => {
    const user = ref<IUser | null>(null)
    const token = useStorage<string | undefined>(TOKEN_LOCAL_STORAGE_KEY, undefined)
    const isAuthenticated = computed(() => !!token.value)

    async function login(email: string, password: string) {
        const response = await loginRequest(email, password)
        if (!response?.data || !response.token) {
            throw new Error('Login failed')
        }

        token.value = response.token
        user.value = response.data
    }

    function logout() {
        user.value = null
        token.value = undefined
    }

    async function ensureUser() {
        if (user.value) {
            return
        }

        if (!token.value) {
            throw new Error('No token found')
        }

        const response = await fetchCurrentUserRequest().then((res) => res.data)
        if (!response) {
            throw new Error('Failed to fetch current user')
        }

        user.value = response
    }

    return {
        user,
        isAuthenticated,
        login,
        logout,
        ensureUser,
    }
})
