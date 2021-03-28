import { Message } from 'element-ui'
import Router from '../router'

const utils = {
  // 错误提示
  toast (message = '系统忙，请稍后重试', type = 'error') {
    Message({
      message,
      type
    })
  },
  // 拷贝对象
  parseJSON (json) {
    return JSON.parse(JSON.stringify(json))
  },
  // 跳转指定页
  toPage(url){
    if (url) Router.push(url)
  }
}
export default utils
