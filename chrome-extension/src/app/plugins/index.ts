import type { App } from 'vue'
import { globalSearchPlugin } from '@/app/plugins/global-search/global-search.plugin.ts'
import { monacoEditorPlugin } from '@/app/plugins/monaco/monaco-editor.plugin.ts'
import { primeVuePlugin } from '@/app/plugins/primevue/prime-vue.plugin.ts'
import { vueQueryPlugin } from '@/app/plugins/vue-query/vue-query.plugin.ts'

export function registerPlugins(app: App) {
    primeVuePlugin(app)
    monacoEditorPlugin(app)
    vueQueryPlugin(app)
    globalSearchPlugin(app)
}
