const state = {
    hasLogin: localStorage.getItem('hasLogin') || false, //是否登录
}

const getters = {}

const mutations = {
    //设置登录状态
    setLoginStatus(state, hasLogin){
        state.hasLogin = hasLogin
    }
}

const actions = {}

export default{
    state,
    getters,
    mutations,
    actions
}