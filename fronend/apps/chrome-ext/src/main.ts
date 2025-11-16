import './bootstrap.ts'
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import { registerUiKitPlugins } from '@zoho-ide/ui-kit/index.ts'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import AppComponent from '@/app/App.vue'
import { registerAppPlugins } from '@/app/plugins'
import { router } from '@/app/router'

const app = createApp(AppComponent)
const pinia = createPinia()

app.use(pinia)
app.use(router)

registerUiKitPlugins(app)
registerAppPlugins(app)

app.mount('#root')
