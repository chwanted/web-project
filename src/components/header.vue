<template>
  <div>
    <div class="header wrap" :class="{fixed: isFixed}">
        <div class="header-container inner">
            <div @click="$utils.toPage('/')" style="cursor: pointer">
                <div v-if="isFixed" class="title" style="color: rgb(138, 138, 138);">古诗文鉴赏</div>
                <div v-else-if="!isFixed && isColor" class="title" style="color: rgb(138, 138, 138);">古诗文鉴赏</div>
                <div v-else class="title" style="color: #FFFF;">古诗文鉴赏</div>
            </div>
            <div class="header-right">
                <div class="login-box flex-row">
                    <div v-if="hasLogin" class="flex-row">
                        <div class="download-center">
                            <i v-if="isFixed" class="el-icon-download download" style="font-size:26px;color: rgb(138, 138, 138);" @click="$utils.toPage('/download')"/>
                            <i v-else class="el-icon-download download" style="font-size:26px;color: #fff;" @click="$utils.toPage('/download')"/>
                        </div>
                        <img v-if="headerIcon=='null'" class="avatar" :src="defaultUserImg"/>
                        <img v-else-if="headerIcon" class="avatar" :src="headerIcon"/>
                        <el-dropdown @command="logout">
                            <div class="el-dropdown-link" style="font-size: 15px;color: rgb(138, 138, 138);">{{username}}</div>
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
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="true" @close="closeLogin" :close-on-click-modal="false" class="login">
      <div class="login-dialog" v-show="showLogin">
        <h4>用户登录</h4>
        <el-form ref="loginForm" style="padding-top: 5px;" :model="loginForm" :rules="rules">
          <div class="item border">
            <el-input class="item" v-model="loginForm.account" placeholder="请输入账号" maxlength=20 prefix-icon="el-icon-user"></el-input>
          </div>
          <div class="item border">
            <el-input class="item" type="password" v-model="loginForm.pwd" placeholder="请输入密码" maxlength=20 prefix-icon="el-icon-lock" @keyup.enter.native="loginAction"></el-input>
          </div>
          <div class="item btn">
            <el-button type="primary" @click="loginAction">{{loginText}}</el-button>
          </div>
          <div class="item register">
            <el-button type="text" v-on:click="toRegister">还未注册，点击这里~</el-button>
          </div>
        </el-form>
      </div>
      <div class="register-dialog" v-show="showRegister">
        <h4>用户注册</h4>
        <el-form ref="registerForm" style="padding-top: 5px;" :model="registerForm" :rules="rules">
          <el-form-item label="头像" label-width="60px" prop="headerImage">
            <el-upload
              class="avatar-uploader"
              action
              :http-request="httpRequest"
              :on-success="handleAvatarSuccess"
              :on-change="onchange"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img :src="avatarUpload" class="avatar" v-else>
            </el-upload>
          </el-form-item>
          <el-form-item label="账号" label-width="60px" prop="account">
              <el-input class="item" v-model="registerForm.account" placeholder="请输入账号" maxlength=20></el-input>
          </el-form-item>
          <el-form-item label="昵称" label-width="60px" prop="name">
              <el-input class="item" v-model="registerForm.name" placeholder="请输入长度不超过5位的昵称" maxlength=5></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="60px" prop="pwd">
              <el-input class="item" type="password" v-model="registerForm.pwd" placeholder="请输入密码" maxlength=20 @keyup.enter.native="registerAction"></el-input>
          </el-form-item>
          <div class="item btn">
            <el-button type="primary" @click="registerAction">{{registerText}}</el-button>
          </div>
          <div class="item register">
            <el-button type="text" v-on:click="toLogin">已有账号，返回登录~</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import downloadImg from '../assets/img/download.png'
import defaultUserImg from '../assets/img/avatar.png'
import bg2 from '../assets/img/bg2.png'
import avatarUpload from '../assets/img/avatarUpload.png'
export default {
  props: {
    isColor: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      imageUrl:'',
      showLogin: true,
      showRegister: false,
      downloadImg: downloadImg,
      avatarUpload: avatarUpload,
      defaultUserImg: defaultUserImg,
      headerImage:'',
      bg2: bg2,
      // isFixed: true,
      loginText: '登录',
      registerText: '注册',
      dialogVisible: false,
      username: localStorage.username,
      headerIcon: localStorage.userImg,
      hasLogin: localStorage.getItem('hasLogin') || false,
      loginForm: {
        account:'',
        pwd:''
      },
      registerForm:{
        headerImage:'',
        account:'',
        name:'',
        pwd:''
      },
      rules: {
        account: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    loadUserInfo(){
      location.reload()
    },
    // 跳转注册
    toRegister(){
      this.showRegister=true,
      this.showLogin=false,
      this.registerForm.account = ''
      this.registerForm.name = ''
      this.registerForm.pwd = ''
    },
    // 跳转登录
    toLogin(){
      this.showRegister=false,
      this.showLogin=true,
      this.loginForm.account = ''
      this.loginForm.pwd = ''
    },
    // 显示登录弹窗
    login(){
        // this.$store.commit('user/gotoLogin', false)
        // this.$store.commit('user/isShowLogin', true)
        this.dialogVisible = true
        this.loginForm.account = ''
        this.loginForm.pwd = ''
        this.registerForm.headerImage = ''
        this.registerForm.account = ''
        this.registerForm.name = ''
        this.registerForm.pwd = ''
        localStorage.removeItem('hasLogin')
        localStorage.removeItem('account')
        localStorage.removeItem('access_token')
    },
    // 执行登录
    loginAction(){
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.$api.user.login(this.loginForm).then(res => {
            this.loginText = '登录中'
            if (res.msg === '操作成功') {
              this.$message({message: '登录成功！', type: 'success'})
              this.hasLogin = true
              // this.$store.commit('user/isShowLogin', false)
              // this.$store.commit('user/setLoginStatus', true)
              this.dialogVisible = false
              localStorage.setItem('hasLogin', true)
              localStorage.setItem('account', this.loginForm.account)
              localStorage.setItem('username', res.data.name)
              localStorage.setItem('userId', res.data.id)
              localStorage.setItem('userImg', res.data.headPortraitBase64)
              localStorage.setItem('access_token', res.data.token)
              this.username = localStorage.getItem('username')
              this.headerIcon = localStorage.getItem('userImg')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })  
    },
    // 执行注册
    registerAction(){
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          this.$api.user.addUser(this.registerForm).then(res => {
            this.registerText = '注册中'
            if (res.msg === '操作成功') {
              this.loginForm.account = this.registerForm.account
              this.loginForm.pwd = this.registerForm.pwd
              this.loginAction(this.loginForm)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })  
    },
    logout(){
      this.$api.user.logout().then(res => {
        if (res.msg === '操作成功') {
          this.$message({message: '退出成功！', type: 'success'})
          this.hasLogin = false
          // this.$store.commit('user/setLoginStatus', false)
          localStorage.removeItem('hasLogin')
          localStorage.removeItem('account')
          localStorage.removeItem('username')
          localStorage.removeItem('userId')
          localStorage.removeItem('userImg')
          localStorage.removeItem('access_token')

          if(this.$route.path != "/index")
          {
            this.$router.push({
              path:"/index"
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    closeLogin(){
      // this.$store.commit('user/isShowLogin', false)
    },
    // 上传
    httpRequest(file) {
      let fd = new FormData(); 
      fd.append("file", file.file);
      this.$api.user.addImg(fd).then(res=>{
        if(res.code===0)
        {
          this.registerForm.headerImage = res.data
          this.$message.success("更新成功")
        }else
        {
          this.$message.error(res.msg)
        }
      })
    },
    onchange(file,fileList){
      var _this = this;
      var event = event || window.event
      var file = event.target.files[0]
      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result //将图片路径赋值给src
      }
      reader.readAsDataURL(file)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    //对上传图片的大小、格式进行限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"
      const isJPG2 = file.type === "image/jpg"
      const isPNG = file.type === "image/png"
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG && !isJPG2 && !isPNG) {
        this.$message.warning("只支持jpg或png格式图片")
      }
      if (!isLt5M) {
        this.$message.warning("请上传5MB以内的图片!")
      }
      return (isJPG || isJPG2 || isPNG) && isLt5M
    },
  }
}
</script>

<style lang="scss" scoped>
  >>>.el-dropdown-link {
    cursor: pointer;
    margin-left: 6px;
    font-size: 14px;

    &.white,
    &.white .el-icon-caret-bottom{
      color: #fff;
    }
  }
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
      width: 1200px;
      margin: 0 auto;
      .title {
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

        .login-box {
          width: 220px;
          justify-content: flex-end;
          position: relative;
          
          div{
            display: flex;
            align-items: center;

            .download{
              width: 21px;
              height: 23px;
              margin-right: 30px;
              cursor: pointer;
            }
            .avatar {
              width: 29px;
              height: 29px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 10px;
            }
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

  .login-dialog {
    h4 {
      text-align: center;
      font-size: 20px;
      font-weight: normal;
      margin-bottom: 39px;
      letter-spacing: 1px;
      margin-top: 40px;
    }

    .item {
      margin-bottom: 24px;
      font-size: 12px;
      height: 38px;
      overflow: hidden;

      /deep/ .el-input .el-input__inner {
        height: 38px;
        border: none;
        padding-left: 35px;
      }

      /deep/ .el-input .el-input__prefix, .el-input__icon {
        font-size: 20px;
        height: 100%;
        width: 25px;
        text-align: center;
        line-height: 40px;
        color: #66b1ff;
      }

      /deep/ .el-button--primary{
        width: 100%;
        border-radius: 0;
        font-size: 16px;
        letter-spacing: 4px;
      }
      /deep/ .el-button--text{
        width: 100%;
        font-size: 14px;
        color: #606266;

        &:hover{
          color: #94979c;
        }
      }

      &.btn {
        height: 46px;
        margin-bottom: 42px;
      }

      &.border {
        border: 1px solid #DCDFE6;
      }
    }
  }

  .register-dialog{
    .avatar-uploader{
      height: 42px;
    }
    h4 {
      text-align: center;
      font-size: 20px;
      font-weight: normal;
      margin-bottom: 17px;
      letter-spacing: 1px;
      margin-top: 10px;
    }
    .avatar{
      width: 42px;
      height: 42px;
      cursor: pointer;
      overflow: hidden;
      border-radius: 50%;
    }
    .item {
      margin-bottom: 8px;
      font-size: 12px;
      height: 38px;

      /deep/ .el-input .el-input__inner {
        height: 38px;
        // border: none;
        padding-left: 35px;
      }

      /deep/ .el-button--primary{
        width: 100%;
        border-radius: 0;
        font-size: 16px;
        letter-spacing: 4px;
      }

      /deep/ .el-button--text{
        width: 100%;
        font-size: 14px;
        color: #606266;

        &:hover{
          color: #94979c;
        }
      }

      &.btn {
        height: 46px;
        margin-bottom: 25px;
      }

      &.border {
        border: 1px solid #DCDFE6;
      }
    }
  }
  .login /deep/ .el-dialog__header,
  .login /deep/ .el-dialog__body {
    padding: 0;
  }

  .login /deep/ .el-dialog {
    width: 470px;
    height: 508px;
    box-shadow: 0px 4px 20px 0px rgba(4, 0, 0, 0.18);
    border-radius: 10px;
    padding: 40px 55px 55px;
    box-sizing: border-box;
  }

  .login /deep/ .el-input-group__append {
    border-left: none;
    background-color: #fff;
    font-size: 14px;
    color: #3867f2;
    border-radius: 0;
    cursor: pointer;
  }

  .login /deep/ .el-input__inner {
    border: 1px solid #DCDFE6;
    // border-right: none;
    border-radius: 0;
    height: 40px;
  }

</style>
