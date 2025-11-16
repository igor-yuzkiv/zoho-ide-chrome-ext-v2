import primeVuePlugin from './plugins/primevue/prime-vue.plugin.ts'
import './styles/ui-kit.css'
import type { App } from 'vue'

export function registerUiKitPlugins(app: App) {
    primeVuePlugin(app)
}
