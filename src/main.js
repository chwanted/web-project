import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import api from './api/index'
import Element from 'element-ui'
import utils from './utils'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.prototype.$utils = utils
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
