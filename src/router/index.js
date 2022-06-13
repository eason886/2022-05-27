import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import Home from '../views/layout/index'
import Login from '../views/Login.vue'
import store from '../store/index'
const routes = [
  {
    path: '/',
    name: 'root',
    hidden: true,
    redirect: '/visualization',
    component: Home
  },
  {
    path: '/dashbord',
    name: 'dashbord',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "about" */ '../views/child2.vue')
  },
  {
    path: '/mapList',

    redirect: '/mapList/mapOne',
    component: Home,
    meta: { title: '地图列表' },
    children: [
      { path: '/mapList/mapOne', name: 'mapOne', meta: { title: 'mapOne', query: 'weixing' }, component: () => import(/* webpackChunkName: "about" */ '../views/Map/MapList.vue') },
      { path: '/mapList/mapTwo', name: 'mapTwo', meta: { title: 'mapTwo', query: '3D' }, component: () => import(/* webpackChunkName: "about" */ '../views/Map/MapList.vue') },
      { path: '/mapList/mapThree', name: 'mapThree', meta: { title: 'mapThree', query: 'luwang' }, component: () => import(/* webpackChunkName: "about" */ '../views/Map/MapList.vue') },
      { path: '/mapList/mapFive', name: 'mapFive', meta: { title: 'mapFive', query: 'grey' }, component: () => import(/* webpackChunkName: "about" */ '../views/Map/MapList.vue') },
      { path: '/mapList/default', name: 'default', meta: { title: 'default', query: '' }, component: () => import(/* webpackChunkName: "about" */ '../views/Map/MapList.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/visualization',
    name: 'visualization',
    component: Home,
    meta: { title: '可视化菜单' },
    redirect: '/visualization/child1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      { path: '/visualization/child1', name: 'child1', meta: { title: '大屏可视化1' }, component: () => import(/* webpackChunkName: "about" */ '../views/child2.vue') },

      { path: '/visualization/child2', name: 'child2', meta: { title: '大屏可视化2' }, component: () => import(/* webpackChunkName: "about" */ '../views/Home/HomeView.vue') }
    ]
  },
  {
    path: '/newpage',
    name: 'newpage',
    redirect: '/newpage/child3',
    component: Home,
    children: [
      { path: '/newpage/child3', name: 'newpage', meta: { title: 'newpage' }, component: () => import(/* webpackChunkName: "about" */ '../views/normal.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/newpage2',
    name: 'newpage2',
    redirect: '/newpage2/child4',
    component: Home,
    children: [
      { path: '/newpage2/child4', name: 'newpage2', meta: { title: 'newpage2' }, component: () => import(/* webpackChunkName: "about" */ '../views/normal2.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/newpage3',
    name: 'newpage3',
    redirect: '/newpage3/child4',
    component: Home,
    children: [
      { path: '/newpage3/child4', name: 'newpage3', meta: { title: 'newpage3' }, component: () => import(/* webpackChunkName: "about" */ '../views/normal3.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/newpage4',
    name: 'newpage4',
    redirect: '/newpage4/child4',
    component: Home,
    children: [
      { path: '/newpage4/child4', name: 'newpage4', meta: { title: 'newpage4' }, component: () => import(/* webpackChunkName: "about" */ '../views/normal4.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/newpage5',

    redirect: '/newpage5/child4',
    component: Home,
    children: [
      { path: '/newpage5/child4', name: 'newpage5', meta: { title: 'newpage5' }, component: () => import(/* webpackChunkName: "about" */ '../views/normal5.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/icon',

    redirect: '/icon/iconList',
    component: Home,
    children: [
      { path: '/icon/iconList', name: 'iconList', meta: { title: 'iconList' }, component: () => import(/* webpackChunkName: "about" */ '../views/icon.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  {
    path: '/preview',

    redirect: '/preview/previewView',
    component: Home,
    children: [
      { path: '/preview/previewView', name: 'preview', meta: { title: 'preview' }, component: () => import(/* webpackChunkName: "about" */ '../views/preview.vue') }

      // { path: '/newpage/child4', name: 'newpage4', meta: { title: '大屏可视化4' }, component: () => import(/* webpackChunkName: "about" */ '../views/child1.vue') }
    ]
  },
  // {
  //   path: '/visualization',
  //   name: 'visualization2',
  //   component: HomeView,
  //   meta: { title: '可视化菜单2' },
  //   redirect: '/visualization/child2',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   children: [
  //     { path: '/visualization/child1', name: 'child1', meta: { title: '大屏可视化1' }, component: () => import(/* webpackChunkName: "about" */ '../views/child2.vue') },

  //     { path: '/visualization/child2', name: 'child2', meta: { title: '大屏可视化2' }, component: () => import(/* webpackChunkName: "about" */ '../views/child2.vue') }
  //   ]
  // },
  {
    path: '/login',
    name: 'login',
    // redirect: '/home',
    hidden: true,
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
store.state.routerList = routes
// router.beforeEach((to, from, next) => {
//   const flag = window.localStorage.getItem('flag')
//   if (flag) {
//     // return true
//     next()
//   } else if (to.path === '/login') {
//     // return true
//     next()
//     // {
//     //   name: 'Login'
//     // }
//   } else {
//     router.push({ path: '/login' })
//     // location.href = ` http://192.168.0.101:8080/#/login`
//   }

// next()
// })
export default router
