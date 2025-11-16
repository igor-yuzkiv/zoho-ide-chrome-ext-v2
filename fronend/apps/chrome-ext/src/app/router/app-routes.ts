import type { RouteRecordRaw } from 'vue-router'

export const AppRouteName = {
    error: 'error',
    home: 'home',
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
        component: () => import('@/pages/home/HomePage.vue'),
    },
    {
        name: AppRouteName.workspace,
        path: '/workspace/:providerId',
        component: () => import('@/pages/workspace/WorkspaceLayoutPage.vue'),
        children: [
            {
                name: AppRouteName.workspaceIndex,
                path: '',
                component: () => import('@/pages/workspace/WorkspaceIndexPage.vue'),
            },
            {
                name: AppRouteName.workspaceSettings,
                path: 'settings',
                component: () => import('@/pages/workspace/WorkspaceSettingsPage.vue'),
            },
            {
                name: AppRouteName.workspaceFunctions,
                path: 'capabilities/functions/:functionId?',
                components: {
                    default: () => import('@/pages/workspace/capabilities/functions/FunctionsDetailPage.vue'),
                    menu: () => import('@/pages/workspace/capabilities/functions/FunctionsMenuPage.vue'),
                },
            },
            {
                name: AppRouteName.workspaceWorkflows,
                path: 'capabilities/workflows/:workflowId?',
                components: {
                    default: () => import('@/pages/workspace/capabilities/workflows/WorkflowsDetailPage.vue'),
                    menu: () => import('@/pages/workspace/capabilities/workflows/WorkflowsMenuPage.vue'),
                },
            },
            {
                name: AppRouteName.workspaceModules,
                path: 'capabilities/modules/:moduleId?',
                components: {
                    default: () => import('@/pages/workspace/capabilities/modules/ModulesDetailPage.vue'),
                    menu: () => import('@/pages/workspace/capabilities/modules/ModulesMenuPage.vue'),
                },
            },
        ],
    },
    {
        name: AppRouteName.error,
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error/ErrorPage.vue'),
    },
]
