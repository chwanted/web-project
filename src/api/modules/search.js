import request from '../../utils/request'
const search = {
    // 搜索
    searchData(data){
        return request({
        method: 'POST',
        url: 'poetry/listByPage',
        data
        })
    }
}
export default search