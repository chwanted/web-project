import request from '../../utils/request'
const user = {
    // 上传用户头像
    addImg(data){
        return request({
            method: 'POST',
            url: 'poet/uploadHeaderImg',
            data
        })
    },
    // 注册
    addUser(data){
        return request({
            method: 'POST',
            url: 'webUser/add',
            data
        })
    },
    // 登录
    login(data){
        return request({
            method: 'POST',
            url: 'webUser/login',
            data
        })
    },
    // 退出
    logout(){
        return request({
            method: 'GET',
            url: 'webUser/logout'
        })
    },
    //下载列表
    myDownload(data){
        return request({
            method: 'POST',
            url: 'myDownload/listByPage',
            data
        })
    }
}

export default user