import { createStore } from 'vuex'
import type { App } from 'vue'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})

/**
 * vuex 配置
 * @param app
 */
export function setupStore (app: App<Element>): void {
  app.use(store)
}

export default store
