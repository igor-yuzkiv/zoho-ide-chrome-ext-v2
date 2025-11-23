import { defineAsyncComponent } from 'vue'

export const AppLayout = {
    default: 'default',
    auth: 'auth',
} as const

export type AppLayoutName = (typeof AppLayout)[keyof typeof AppLayout]

export const AppLayoutComponent: Record<AppLayoutName, ReturnType<typeof defineAsyncComponent>> = {
    [AppLayout.default]: defineAsyncComponent(() => import('@/app/layouts/ui/DefaultLayout.vue')),
    [AppLayout.auth]: defineAsyncComponent(() => import('@/app/layouts/ui/AuthLayout.vue')),
}
