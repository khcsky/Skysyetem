import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ls from  './utils/localStorage'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {

    if (!ls.getItem('userName')) {
        // 如果去的是登录
        if (to.path === '/login') {
            next(); // 放行
        } else {
            // 否则 跳转到登录
            next({path: '/login'})
        }
    } else {
        next(); // 放行
    }
})


Vue.prototype.ls = ls;//挂载在vue实例原型上

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
