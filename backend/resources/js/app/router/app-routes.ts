import type { RouteRecordRaw } from "vue-router";

export const AppRouteName = {
    home: "home",
    users: "users.index",
};

export const AppRoutes: RouteRecordRaw[] = [
    {
        name: AppRouteName.home,
        path: "/",
        component: () => import("@/pages/home/HomePage.vue"),
    },
    {
        name: AppRouteName.users,
        path: "/users",
        component: () => import("@/pages/user/UsersPage.vue"),
    },
];
