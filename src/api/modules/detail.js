import request from '../../utils/request'
const detail = {
    // 获取诗词详情
    poetry(params){
        return request({
            method: 'GET',
            url: 'poetry/getDetail',
            params
        })
    },
    // 获取诗人详情
    poet(params){
        return request({
            method: 'GET',
            url: 'poet/getDetail',
            params
        })
    }
}

export default detail