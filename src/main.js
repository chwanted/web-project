import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import utils from './utils'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.prototype.$utils = utils
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
