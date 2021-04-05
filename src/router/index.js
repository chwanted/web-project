import Vue from 'vue'
import Router from 'vue-router'


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../page/index'),
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
    },
    {
      path: '/authorDetail',
      name: 'authorDetail',
      component: () => import('../page/authorDetail'),
      meta: { 
        name: '诗人详情'
       }
    }
  ]
})