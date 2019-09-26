import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          redirect: '/login' // 路由重定向
      },
      {
          path: '/login',
          name: '/login',
          component: () => import( './pages/Login/Login'),
      },
    {
      //首页路由
      path: '/index',
      name: '/index',
      component: () => import( './pages/Index/Index'),
        children: [

            {
                path: '/index',
                name: '/index',
                component: () => import('./pages/userManger/userManger'),

            },
            {
                path: '/index/suppliermanger',
                name: '/index/suppliermanger',
                component: () => import('./pages/userManger/supplierManger'),

            },
            {
                path: '/index/businessmanger',
                name: '/index/businessmanger',
                component: () => import('./pages/userManger/businessManger'),

            },
            {
                path: '/index/activemanger',
                name: '/index/activemanger',
                component: () => import('./pages/activeManger/activeManger'),

            },
            {
                path: '/index/reportmanger',
                name: '/index/reportmanger',
                component: () => import('./pages/activeManger/reportManger'),

            },
        ]
    },

  ]
})
