import { useAuthStore } from '@zoho-ide/shared/entities/auth'
import type { NavigationGuard } from 'vue-router'
import { AppRouteName } from '@/app/router/app-routes.ts'

// @ts-expect-error Vue: from is declared but its value is never read
export const authMiddleware: NavigationGuard = async (to, from, next) => {
    if (!to.meta?.authenticated) {
        return next()
    }

    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
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
