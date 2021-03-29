const state = {
    hasLogin: localStorage.getItem('hasLogin') || false, //是否登录
    isLogin: false,
    userInfo: null,
    isShowLogin:false,
}

const getters = {}

const mutations = {
    //设置登录状态
    setLoginStatus(state, hasLogin){
        state.hasLogin = hasLogin
    },
    //触发登录
    gotoLogin(state, isLogin){
        state.isLogin = isLogin
    },
    //弹出登录框
    isShowLogin(state, isShowLogin){
        state.isShowLogin = isShowLogin
    }
}

const actions = {}

export default{
    state,
    getters,
    mutations,
    actions
}