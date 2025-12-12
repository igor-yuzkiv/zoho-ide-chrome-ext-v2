import { useAuthStore } from '@zoho-ide/shared'
import type { NavigationGuard } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

export const authMiddleware: NavigationGuard = async (to, from, next) => {
    if (!to.meta?.authenticated) {
        return next()
    }


    const authStore = useAuthStore()
    if (!authStore.token) {
        return next({ name: AppRouteName.login })
    }

    try {
        await authStore.ensureUser()
    } catch (error) {
        console.error('Auth Middleware - ensureUser failed:', error)
        authStore.logout()
        return next({ name: AppRouteName.login })
    }

    next()
}
