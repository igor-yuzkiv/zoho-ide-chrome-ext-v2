import type { App } from 'vue'
import { vueQueryPlugin } from '@/app/plugins/vue-query/vue-query.plugin.ts'

export function registerAppPlugins(app: App) {
    vueQueryPlugin(app)
}
