import type { App } from "vue";
import { registerUiKitPlugins } from '@zoho-ide/ui-kit'
import { vueQueryPlugin } from "@/app/plugins/vue-query/vue-query.plugin.ts";

export function registerPlugins(app: App) {
    registerUiKitPlugins(app)
    vueQueryPlugin(app);
}
