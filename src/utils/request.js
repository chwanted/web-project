import axios from 'axios'
import store from 'store'
import router from '../router'
import { Notification, Message } from 'element-ui'

// 提示函数
const tip = mes => {
  Notification({
    message: mes,
    title: '错误',
    type: 'error',
    duration: 2000
  })
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api 的 base_url
  withCredentials: true,
  timeout: 300000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let token = localStorage.getItem('access_token')
    let distinctId = AnalysysAgent.getDistinctId()
    config.headers['distinctId'] = distinctId
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Message.error(response.message)
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
      if (!code) {
        code = error.response.data.code
      }
      if (code === 401) {
        store.commit('user/setLoginStatus', false)
      } else if (code === 403) {
        router.push({ path: '/401' })
      } else if (code === 404) {
        Message.error('系统忙，请稍后重试')
      } else if (code === 426) {
        const errorMsg = error.response.data.msg
        Message.error(errorMsg)
      } else if (code === 509) {
        return
      } else {
        const errorMsg = error.response.data.msg
        if (error.response.status === 401) {
          store.commit('user/setLoginStatus', false)
        }
        if (errorMsg !== undefined) {
        //  Message.error(errorMsg || '系统忙，请稍后重试')
        }
      }
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        // Message.error('系统忙，请稍后重试')
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
      //  Message.error('系统忙，请稍后重试')
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      store.commit('user/setLoginStatus', false)
    //  console.log(777)
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else if (code === 404) {
      // Message.error('系统忙，请稍后重试')
    } else {
      // console.log(code)
      const errorMsg = error.response.data.msg
      if (error.response.status === 401) {
        store.commit('user/setLoginStatus', false)
      }

      if (errorMsg !== undefined) {
        // Message.error(errorMsg || '系统忙，请稍后重试')
      }
    }
    return Promise.reject(error)
  }
)
export default service
