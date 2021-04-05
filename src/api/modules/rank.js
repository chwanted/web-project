import request from '../../utils/request'
const rank = {
    // 获取前10
    ranking(data){
        return request({
            method: 'POST',
            url: 'ranking/listByPage',
            data
        })
    },
    randomPoet(params){
        return request({
            method: 'GET',
            url: 'poet/getRandomPoet',
            params
        })
    }
}
export default rank