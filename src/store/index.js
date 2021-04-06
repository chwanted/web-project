import Vue from 'vue'
import Vuex from 'vuex'

//引入模块状态文件
import user from './module/user'

Vue.use(Vuex)

//实例化vuex
export default new Vuex.Store({
    modules: {
        user
    }
})