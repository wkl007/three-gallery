import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/configs/registerServiceWorker'
import { useAntd } from '@/configs/antd'

const app = createApp(App)

useAntd(app)

app
  .use(store)
  .use(router)
  .mount('#app')
