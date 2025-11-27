import type { RouteRecordRaw } from 'vue-router'
import { AppLayout } from '@/app/layouts/app-layouts.config.ts'

export const AppRouteName = {
    error: 'error',
    home: 'home',
    login: 'auth.login',
    workspace: 'workspace',
    workspaceIndex: 'workspace.index',
    workspaceSettings: 'settings',
    workspaceFunctions: 'workspace.functions',
    workspaceWorkflows: 'workspace.workflows',
    workspaceModules: 'workspace.modules',
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
    {
        name: AppRouteName.workspaceIndex,
        path: '/workspace/:providerId',
        meta: { hideSidebarMenu: true, layout: AppLayout.workspace },
        component: () => import('@/pages/workspace/WorkspaceIndexPage.vue'),
    },
    {
        name: AppRouteName.workspaceSettings,
        path: '/workspace/:providerId/settings',
        meta: { hideSidebarMenu: true, layout: AppLayout.workspace },
        component: () => import('@/pages/workspace/settings/WorkspaceSettingsPage.vue'),
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
        name: AppRouteName.error,
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error/ErrorPage.vue'),
    },
]
