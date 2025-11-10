import type { App } from "vue";
import { primeVuePlugin } from "@/app/plugins/primevue/prime-vue.plugin.ts";
import { vueQueryPlugin } from "@/app/plugins/vue-query/vue-query.plugin.ts";

export function registerPlugins(app: App) {
    primeVuePlugin(app);
    vueQueryPlugin(app);
}
