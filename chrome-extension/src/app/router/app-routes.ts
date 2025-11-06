import type { RouteRecordRaw } from 'vue-router'

export const AppRouteName = {
    error: 'error',
    home: 'home',
    workspace: 'workspace',
    workspaceIndex: 'workspace.index',
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
                name: AppRouteName.workspaceFunctions,
                path: 'functions/:functionId?',
                components: {
                    default: () => import('@/pages/workspace/functions/FunctionsDetailPage.vue'),
                    menu: () => import('@/pages/workspace/functions/FunctionsMenuPage.vue'),
                },
            },
            {
                name: AppRouteName.workspaceWorkflows,
                path: 'workflows/:workflowId?',
                components: {
                    default: () => import('@/pages/workspace/workflows/WorkflowsDetailPage.vue'),
                    menu: () => import('@/pages/workspace/workflows/WorkflowsMenuPage.vue'),
                },
            },
            {
                name: AppRouteName.workspaceModules,
                path: 'modules/:moduleId?',
                components: {
                    default: () => import('@/pages/workspace/modules/ModulesDetailPage.vue'),
                    menu: () => import('@/pages/workspace/modules/ModulesMenuPage.vue'),
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
