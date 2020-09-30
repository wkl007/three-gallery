import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
  },
  {
    path: '/demo1',
    name: 'Demo1',
    component: () => import(/* webpackChunkName: "demo1" */ '@/views/demo1.vue')
  },
  {
    path: '/demo2',
    name: 'Demo2',
    component: () => import(/* webpackChunkName: "demo2" */ '@/views/demo2.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

export default router
