import { createApp } from 'vue'
import App from '@/App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupAntd } from '@/configs/antd'
import '@/configs/registerServiceWorker'

const app = createApp(App)

setupRouter(app) // vue-router
setupStore(app) // vuex
setupAntd(app) // antd

app.mount('#app')
