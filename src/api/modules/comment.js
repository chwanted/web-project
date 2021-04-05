import request from '../../utils/request'
const comment = {
    // 添加评论
    addComment(data){
        return request({
            method: 'POST',
            url: 'comment/add',
            data
        })
    }
}

export default comment