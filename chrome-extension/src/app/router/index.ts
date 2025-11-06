import { AppRoutes } from './app-routes.ts'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: AppRoutes,
})

export { router }
