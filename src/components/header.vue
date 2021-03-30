<template>
  <div>
    <div class="header wrap" :class="{fixed: isFixed}" :style="{'background-color':!isColor?'rgba(255,255,255,0)':''}">
        <div class="header-container inner">
            <div @click="$utils.toPage('/')" style="cursor: pointer">
                <div :style="{'color':!isColor?'rgba(255,255,255,0)':''}" class="title">古诗文鉴赏</div>
            </div>
            <div class="header-right">
                <div class="login-box flex-row">
                    <div v-if="hasLogin" class="flex-row">
                        <div class="download-center">
                            <img class="download" :src=downloadImg style="width: 29px;cursor: pointer"/>
                        </div>
                        <img class="avatar" :src=userImg style="width: 29px;"/>
                        <el-dropdown @command="logout">
                            <span class="el-dropdown-link" :class="{white: !isColor}">
                            {{ username }}
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div v-else class="header-right-btn" @click="login"><span>登录</span>|<span>注册</span></div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="true" @close="closeLogin" :close-on-click-modal="false">
        
    </el-dialog>
  </div>
</template>

<script>
import downloadImg from '../assets/img/download.png'
import userImg from '../assets/img/avatar.png'
export default {
    props: {
        isColor: {
        type: Boolean,
        default: true
      }
    },
    data(){
        return{
            downloadImg: downloadImg,
            userImg: userImg,
            username:'小明',
            noLogin: true,
            isFixed: true,
            dialogVisible: false,
            hasLogin: localStorage.getItem('hasLogin') || false,
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 显示登录弹窗
        login(){
            this.$store.commit('user/gotoLogin', false)
            this.$store.commit('user/isShowLogin', false)
            this.form.username = ''
            this.form.password = ''
            localStorage.removeItem('hasLogin')
            localStorage.removeItem('username')
            localStorage.removeItem('access_token')
        },
        // 执行登录
        loginAction(){
            if (!this.loginStatus) return
            let formData = this.$utils.parseJSON(this.form)
            // 调用接口
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 70px !important;
}

.title{
    font-size: 26px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
}

.fixed {
    background-color: #fff !important;
    box-shadow: 0 1px 5px #eee;
    transform: translateY(100%);
    transition: all .3s ease;
    position: fixed;
    top: -70px;
    left: 0;
    z-index: 99;
}

.header-right-menu li,.el-dropdown-link.white,.el-dropdown-link.white .el-icon-caret-bottom{
color: #343539 !important;
}

.header-container {
    position: relative;
    height: 70px;
    display: flex;
    align-items: center;
}
</style>