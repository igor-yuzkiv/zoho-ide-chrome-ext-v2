import './bootstrap.ts'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import AppComponent from '@/app/App.vue'
import { registerPlugins } from '@/app/plugins'
import { router } from '@/app/router'
// import '@/app/style/md-editor.css'

const app = createApp(AppComponent)
const pinia = createPinia()

app.use(pinia)
app.use(router)

registerPlugins(app)

app.mount('#root')
