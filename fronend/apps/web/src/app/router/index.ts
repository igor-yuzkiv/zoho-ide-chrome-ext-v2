import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from '@/app/router/app-routes.ts'
import { authMiddleware } from '@/app/router/middleware/auth.middleware.ts'

const router = createRouter({
    history: createWebHistory(),
    routes: AppRoutes,
})

router.beforeEach(authMiddleware)

export { router }
