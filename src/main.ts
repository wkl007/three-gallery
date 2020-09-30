import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/configs/registerServiceWorker'
import { Button, Card, ConfigProvider, List } from 'ant-design-vue'

const app = createApp(App)

app
  .use(Button)
  .use(Card)
  .use(List)
  .use(ConfigProvider)
  .use(store)
  .use(router)
  .mount('#app')
