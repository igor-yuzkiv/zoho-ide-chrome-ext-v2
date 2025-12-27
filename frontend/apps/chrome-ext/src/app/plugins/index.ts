import type { App } from 'vue'
import { monacoEditorPlugin } from '@/app/plugins/monaco/monaco-editor.plugin.ts'
import { vueQueryPlugin } from '@/app/plugins/vue-query/vue-query.plugin.ts'

export function registerAppPlugins(app: App) {
    monacoEditorPlugin(app)
    vueQueryPlugin(app)
}
