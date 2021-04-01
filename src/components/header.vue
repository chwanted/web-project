<template>
  <div>
    <div class="header wrap" :class="{fixed: isFixed}">
        <div class="header-container inner">
            <div @click="$utils.toPage('/')" style="cursor: pointer">
                <div class="title" style="color: #343539;">古诗文鉴赏</div>
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
        <div class="login-dialog">
            <h4>用户登录</h4>
            <el-form ref="form" style="padding-top: 5px;" :model="form">
                <el-form-item label="账号" label-width="60px" prop="username">
                    <el-input class="item" v-model="form.username" placeholder="请输入账号" maxlength=8></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="60px" prop="password">
                    <el-input class="item" type="password" v-model="form.password" placeholder="请输入密码" maxlength=20 @keyup.enter.native="onSubmit"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import downloadImg from '../assets/img/download.png'
import userImg from '../assets/img/avatar.png'
import bg2 from '../assets/img/bg2.png'
export default {
    data(){
        return{
            downloadImg: downloadImg,
            userImg: userImg,
            bg2: bg2,
            username:'小明',
            noLogin: true,
            isFixed: true,
            loginText: '登录',
            dialogVisible: false,
            hasLogin: localStorage.getItem('hasLogin') || false,
            form: {},
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
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
        onSubmit(){
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
    display: flex;
    justify-content: center;

    &.fixed {
      background-color: #fff !important;
      box-shadow: 0 1px 5px #eee;
      transform: translateY(100%);
      transition: all .3s ease;
      position: fixed;
      top: -70px;
      left: 0;
      z-index: 99;

      .header-right-menu li,
      .el-dropdown-link.white,
      .el-dropdown-link.white .el-icon-caret-bottom{
        color: #343539 !important;
      }
    }

    .header-container {
        position: relative;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        
        .title{
            font-size: 26px;
            font-family: Microsoft YaHei, Microsoft YaHei-Normal;
            letter-spacing: 5px;
        }

        .header-right {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;
            height: 70px;

            .login-box{
                width: 220px;
                justify-content: flex-end;
                position: relative;
                .header-image{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .header-right-btn {
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                    outline: none;
                    background-color: #3867f2;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;

                    span {
                        position: relative;
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }
        }
    }
}

</style>