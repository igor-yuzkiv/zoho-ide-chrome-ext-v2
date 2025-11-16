import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/home/HomePage.vue'),
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('@/pages/user/UsersPage.vue'),
        },
    ],
})

export default router
