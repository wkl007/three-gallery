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
