import Vue from 'vue'

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
// 引入element-ui
import ElementUI from 'element-ui'
import '@/theme/element-00C0EF/index.css'

// 兼容IE
import 'babel-polyfill'

import App from './App'
// vuex
import store from './store'
import router from './router'
import './router/permission'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
