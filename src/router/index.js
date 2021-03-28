import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components:  () => import('../page/index'),
      meta: { 
        name: '首页'
       }
    },
    {
      path: '/searchDetail',
      name: 'searchDetail',
      component: () => import('../page/searchDetail'),
      meta: { 
        name: '搜索结果'
       }
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('../page/download'),
      meta: { 
        name: '下载中心'
       }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../page/detail'),
      meta: { 
        name: '古诗词详情'
       }
    }
  ]
})
