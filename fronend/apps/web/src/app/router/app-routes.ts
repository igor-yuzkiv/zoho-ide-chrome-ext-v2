import type { RouteRecordRaw } from 'vue-router'

export const AppRouteName = {
    home: 'home',
    users: 'users.index',
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
        name: AppRouteName.users,
        path: '/users',
        component: () => import('@/pages/user/UsersIndexPage.vue'),
        children: [
            {
                name: AppRouteName.userCreate,
                path: 'create',
                component: () => import('@/pages/user/UserCreatePage.vue'),
            },
            {
                name: AppRouteName.userDetails,
                path: 'details/:id',
                component: () => import('@/pages/user/UserDetailPage.vue'),
            },
        ],
    },
]
