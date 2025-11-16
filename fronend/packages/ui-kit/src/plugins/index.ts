import type { App } from 'vue'
import primeVuePlugin from './primevue/prime-vue.plugin.ts'

export function registerUiKitPlugins(app: App) {
    primeVuePlugin(app);
}