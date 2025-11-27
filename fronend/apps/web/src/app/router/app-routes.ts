import type { RouteRecordRaw } from 'vue-router'
import { AppLayout } from '@/app/layouts/app.layout.config.ts'

export const AppRouteName = {
    error: 'error',
    login: 'login',
    home: 'home',
    users: 'users.group',
    usersIndex: 'users.index',
    userDetails: 'users.details',
    userCreate: 'users.create',

    /**
     * Knowledge Base
     */
    kbIndex: 'kb.index',
    kbNewArticle: 'kb.article.new',
}

export const AppRoutes: RouteRecordRaw[] = [
    {
        name: AppRouteName.login,
        path: '/login',
        component: () => import('@/pages/login/LoginPage.vue'),
        meta: { layout: AppLayout.auth },
    },

    {
        name: AppRouteName.home,
        path: '/',
        component: () => import('@/pages/home/HomePage.vue'),
        meta: { authenticated: true },
    },

    {
        name: AppRouteName.kbIndex,
        path: '/knowledge-base',
        component: () => import('@/pages/knowledge-base/KnowledgeBaseIndexPage.vue'),
        meta: { authenticated: true },
    },

    {
        name: AppRouteName.users,
        path: '/users',
        component: () => import('@/pages/user/UsersLayoutPage.vue'),
        meta: { authenticated: true },
        children: [
            {
                name: AppRouteName.usersIndex,
                path: '',
                component: () => import('@/pages/user/index/UsersIndexPage.vue'),
            },
            {
                name: AppRouteName.userCreate,
                path: 'create',
                component: () => import('@/pages/user/create/CreateUserPage.vue'),
            },
            {
                name: AppRouteName.userDetails,
                path: 'details/:userId',
                component: () => import('@/pages/user/details/UserDetailPage.vue'),
            },
        ],
    },
    {
        name: AppRouteName.error,
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error/ErrorPage.vue'),
    },
]
