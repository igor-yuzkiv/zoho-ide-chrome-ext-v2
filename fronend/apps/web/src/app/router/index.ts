import { createRouter, createWebHistory } from "vue-router";
import { AppRoutes } from "@/app/router/app-routes.ts";

const router = createRouter({
    history: createWebHistory(),
    routes: AppRoutes,
});

router.onError((error) => {
    console.log('roter error', error);
})

export { router };
