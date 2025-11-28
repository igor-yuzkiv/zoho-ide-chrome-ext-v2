import type { RouteRecordRaw } from 'vue-router'
import { AppLayout } from '@/app/layouts/app-layouts.config.ts'

export const AppRouteName = {
    error: 'error',
    login: 'login',
    home: 'home',
    usersIndex: 'users.index',
    userDetails: 'users.details',
    userCreate: 'users.create',
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
        meta: { authenticated: true, hideSidebarMenu: true },
    },
    {
        name: AppRouteName.kbIndex,
        path: '/knowledge-base',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/KnowledgeBaseIndexPage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.kbNewArticle,
        path: '/knowledge-base/new-article',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/articles/CreateArticlePage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.usersIndex,
        path: '/users',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/user/UsersIndexPage.vue'),
            menu: () => import('@/pages/user/UsersSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.userCreate,
        path: '/users/new-user',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/user/create/CreateUserPage.vue'),
            menu: () => import('@/pages/user/UsersSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.userDetails,
        path: '/users/details/:userId',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/user/details/UserDetailPage.vue'),
            menu: () => import('@/pages/user/UsersSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.error,
        path: '/:pathMatch(.*)*',
        components: {
            default: () => import('@/pages/error/ErrorPage.vue'),
            menu: () => import('@/pages/user/UsersSidebarMenu.vue'),
        },
    },
]
