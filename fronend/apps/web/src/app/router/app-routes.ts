import type { RouteRecordRaw } from 'vue-router'

export const AppRouteName = {
    error: 'error',
    login: 'login',
    home: 'home',
    users: 'users.group',
    usersIndex: 'users.index',
    userDetails: 'users.details',
    userCreate: 'users.create',
}

export const AppRoutes: RouteRecordRaw[] = [
    {
        name: AppRouteName.home,
        path: '/',
        component: () => import('@/pages/home/HomePage.vue'),
    },
    {
        name: AppRouteName.login,
        path: '/login',
        component: () => import('@/pages/login/LoginPage.vue'),
    },
    {
        name: AppRouteName.users,
        path: '/users',
        component: () => import('@/pages/user/UsersLayoutPage.vue'),
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
