import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
  },
  {
    path: '/gallery1',
    name: 'Gallery1',
    component: () => import(/* webpackChunkName: "gallery1" */ '@/views/gallery1.vue')
  },
  {
    path: '/gallery2',
    name: 'Gallery2',
    component: () => import(/* webpackChunkName: "gallery2" */ '@/views/gallery2.vue')
  },
  {
    path: '/gallery3',
    name: 'Gallery3',
    component: () => import(/* webpackChunkName: "gallery3" */ '@/views/gallery3.vue')
  },
  {
    path: '/gallery4',
    name: 'Gallery4',
    component: () => import(/* webpackChunkName: "gallery4" */ '@/views/gallery4.vue')
  },
  {
    path: '/gallery5',
    name: 'Gallery5',
    component: () => import(/* webpackChunkName: "gallery5" */ '@/views/gallery5.vue')
  },
  {
    path: '/gallery6',
    name: 'Gallery6',
    component: () => import(/* webpackChunkName: "gallery6" */ '@/views/gallery6.vue')
  },
  {
    path: '/gallery7',
    name: 'Gallery7',
    component: () => import(/* webpackChunkName: "gallery7" */ '@/views/gallery7.vue')
  },
  {
    path: '/gallery8',
    name: 'Gallery8',
    component: () => import(/* webpackChunkName: "gallery8" */ '@/views/gallery8.vue')
  },
  {
    path: '/gallery9',
    name: 'Gallery9',
    component: () => import(/* webpackChunkName: "gallery9" */ '@/views/gallery9.vue')
  },
  {
    path: '/gallery10',
    name: 'Gallery10',
    component: () => import(/* webpackChunkName: "gallery10" */ '@/views/gallery10.vue')
  },
  {
    path: '/gallery11',
    name: 'Gallery11',
    component: () => import(/* webpackChunkName: "gallery11" */ '@/views/gallery11.vue')
  },
  {
    path: '/gallery12',
    name: 'Gallery12',
    component: () => import(/* webpackChunkName: "gallery12" */ '@/views/gallery12.vue')
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

/**
 * vue-router 配置
 * @param app
 */
export function setupRouter (app: App<Element>): void {
  app.use(router)
}

export default router
