import './bootstrap.ts'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { registerUiKitPlugins } from '@zoho-ide/ui-kit'
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
