import { AppRoutes } from './app-routes.ts'
import { authMiddleware } from './middleware/auth.middleware.ts'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: AppRoutes,
})

router.beforeEach(authMiddleware)

export { router }
