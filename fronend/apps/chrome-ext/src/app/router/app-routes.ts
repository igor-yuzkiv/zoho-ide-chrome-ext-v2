import type { RouteRecordRaw } from 'vue-router'
import { AppLayout } from '@/app/layouts/app-layouts.config.ts'

export const AppRouteName = {
    error: 'error',
    home: 'home',
    login: 'auth.login',
    workspace: 'workspace',
    workspaceIndex: 'workspace.index',
    workspaceFunctions: 'workspace.functions',
    workspaceWorkflows: 'workspace.workflows',
    workspaceModules: 'workspace.modules',

    settingsIndex: 'settings.index',

    knowledgeBaseIndex: 'knowledge-base.index',
    knowledgeBaseArticleDetails: 'knowledge-base.article.details',
    knowledgeBaseArticleEdit: 'knowledge-base.article.edit',
} as const

export const AppRoutes: RouteRecordRaw[] = [
    {
        name: AppRouteName.home,
        path: '/',
        meta: { hideSidebarMenu: true },
        component: () => import('@/pages/home/HomePage.vue'),
    },
    {
        name: AppRouteName.login,
        path: '/login',
        meta: { hideSidebarMenu: true, hideTopbar: true },
        component: () => import('@/pages/login/LoginPage.vue'),
    },

    /** * Workspace Routes */
    {
        name: AppRouteName.workspaceIndex,
        path: '/workspace/:providerId',
        meta: { hideSidebarMenu: true, layout: AppLayout.workspace },
        component: () => import('@/pages/workspace/WorkspaceIndexPage.vue'),
    },
    {
        name: AppRouteName.workspaceFunctions,
        path: '/workspace/:providerId/capabilities/functions/:functionId?',
        meta: { hideSidebarMenu: false, layout: AppLayout.workspace },
        components: {
            default: () => import('@/pages/workspace/functions/FunctionsDetailPage.vue'),
            menu: () => import('@/pages/workspace/functions/FunctionsMenuPage.vue'),
        },
    },
    {
        name: AppRouteName.workspaceWorkflows,
        path: '/workspace/:providerId/capabilities/workflows/:workflowId?',
        meta: { hideSidebarMenu: false, layout: AppLayout.workspace },
        components: {
            default: () => import('@/pages/workspace/workflows/WorkflowsDetailPage.vue'),
            menu: () => import('@/pages/workspace/workflows/WorkflowsMenuPage.vue'),
        },
    },
    {
        name: AppRouteName.workspaceModules,
        path: '/workspace/:providerId/capabilities/modules/:moduleId?',
        meta: { hideSidebarMenu: false, layout: AppLayout.workspace },
        components: {
            default: () => import('@/pages/workspace/modules/ModulesDetailPage.vue'),
            menu: () => import('@/pages/workspace/modules/ModulesMenuPage.vue'),
        },
    },

    {
        name: AppRouteName.settingsIndex,
        path: '/settings',
        meta: { hideSidebarMenu: true, layout: AppLayout.default },
        component: () => import('@/pages/settings/SettingsPage.vue'),
    },

    /** * Knowledge Base Routes */
    {
        name: AppRouteName.knowledgeBaseIndex,
        path: '/knowledge-base',
        meta: { hideSidebarMenu: false, layout: AppLayout.default, authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/KnowledgeBaseIndexPage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeBaseSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.knowledgeBaseArticleDetails,
        path: '/knowledge-base/items/:itemId/details',
        meta: { hideSidebarMenu: false, layout: AppLayout.default, authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/article/ArticleDetailPage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeBaseSidebarMenu.vue'),
        },
    },
    {
        name: AppRouteName.knowledgeBaseArticleEdit,
        path: '/knowledge-base/items/:itemId/edit',
        meta: { hideSidebarMenu: false, layout: AppLayout.default, authenticated: true },
        components: {
            default: () => import('@/pages/knowledge-base/article/EditArticlePage.vue'),
            menu: () => import('@/pages/knowledge-base/KnowledgeBaseSidebarMenu.vue'),
        },
    },

    /** * Error Route */
    {
        name: AppRouteName.error,
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error/ErrorPage.vue'),
    },
]
