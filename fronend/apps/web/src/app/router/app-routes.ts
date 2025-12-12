import type { RouteRecordRaw } from 'vue-router'
import { AppLayout } from '@/app/layouts/app-layouts.config.ts'

export const AppRouteName = {
    error: 'error',
    login: 'login',
    home: 'home',

    usersIndex: 'users.index',
    userDetails: 'users.details',
    userCreate: 'users.create',

    knowledgeBaseIndex: 'knowledge-base.index',
    knowledgeBaseArticleDetails: 'knowledge-base.article.details',
    knowledgeBaseArticleEdit: 'knowledge-base.article.edit',
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

    /**
     * Users Routes
     */
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

    /**
     * Knowledge Base Routes
     */
    {
        name: AppRouteName.knowledgeBaseIndex,
        path: '/knowledge-base',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/KnowledgeBaseIndexPage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.knowledgeBaseArticleDetails,
        path: '/knowledge-base/items/:itemId/details',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/articles/ArticleDetailPage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.knowledgeBaseArticleEdit,
        path: '/knowledge-base/items/:itemId/edit',
        meta: { authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/articles/EditArticlePage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeSidebarMenu.vue'),
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
