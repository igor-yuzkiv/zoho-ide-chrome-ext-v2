import { AppRoutes } from './app-routes.ts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { authMiddleware } from './middleware/auth.middleware.ts'

const router = createRouter({
    history: createWebHashHistory(),
    routes: AppRoutes,
})

router.beforeEach(authMiddleware)

export { router }
