import { registerUiKitPlugins } from '@zoho-ide/shared/index.ts'
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

router.isReady().then(() => app.mount('#root'))
