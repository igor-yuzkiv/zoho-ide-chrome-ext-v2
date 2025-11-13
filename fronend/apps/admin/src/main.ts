import App from './app/App.vue'
import router from './router'
import './styles.css'
import { PluginsRegister } from '@zoho-ide/ui-kit'
import { createApp } from 'vue'

const app = createApp(App)
app.use(router)

PluginsRegister.primeVuePlugin(app)

app.mount('#root')
