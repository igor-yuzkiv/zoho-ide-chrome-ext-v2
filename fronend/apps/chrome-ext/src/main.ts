import App from './app/App.vue'
import router from './app/router'
import { registerUiKitPlugins } from '@zoho-ide/ui-kit'
import { createApp } from 'vue'

const app = createApp(App)

registerUiKitPlugins(app)

app.use(router)
app.mount('#root')
