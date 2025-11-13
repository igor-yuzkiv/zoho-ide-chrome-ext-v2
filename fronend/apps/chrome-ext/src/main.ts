import App from './app/App.vue'
import router from './router'
import './styles.css'
import { createApp } from 'vue'

const app = createApp(App)
app.use(router)
app.mount('#root')
