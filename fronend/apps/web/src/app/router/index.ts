import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from '@/app/router/app-routes.ts'

const router = createRouter({
    history: createWebHistory(),
    routes: AppRoutes,
})

export { router }
