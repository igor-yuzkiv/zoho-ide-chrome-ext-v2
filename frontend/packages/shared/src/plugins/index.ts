import type { App } from 'vue'
import primeVuePlugin from './prime-vue.plugin.ts'

export * from './prime-vue.plugin.ts'

export function registerUiKitPlugins(app: App) {
    primeVuePlugin(app)
}
