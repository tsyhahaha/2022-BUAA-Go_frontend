import Vue from 'vue'
import App from './App.vue'
// router
import router from './router'
// 饿了吗团队开发的 UI，各种组件可以在官网上查到 https://element.eleme.io/#/zh-CN
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios，用于和前后端交互
import axios from 'axios'
import VueAxios from "vue-axios"
// 应该是动画
import "animate.css"
import "wowjs/css/libs/animate.css"
import wow from 'wowjs'
import store from './store/index'
import './permission'
// 画图用的 echarts 包
import echarts from 'echarts'

// 所有的 Vue 组件都是 Vue 的实例，所以才可以通过设置原型的方法添加原型变量
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

/**
 * Vue.use 调用的是各种插件的 install 方法
 */
Vue.use(ElementUI, VueAxios, axios)
/**
 * 如果将这个移入到拦截里，似乎很好
 */
axios.defaults.baseURL = "http://43.143.187.171:9090/api/";
axios.interceptors.request.use(
    (request) => {
      request.baseURL = "http://43.143.187.171:9090/api/";
      let token = store.getters.getToken;
      if (token !== null && token !== '') {
        request.headers['token'] = token;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
);
Vue.prototype.$axios = axios

Vue.prototype.$wow = wow;

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
