<template>
  <div>
    <div class="header wrap" :class="{fixed: isFixed}" :style="{'background-color':!isColor?'rgba(255,255,255,0)':''}">
        <div class="header-container inner">
            <div @click="$utils.toPage('/')" style="cursor: pointer">
                <div :style="{'color':!isColor?'rgba(255,255,255,0)':''}"></div>
            </div>
            <div class="header-right">
                <div class="download-center">
                    <i></i>
                </div>
                <div class="login-box flex-row">
                    <div v-if="hasLogin" class="flex-row">
                        <img class="avatar" :src="defaultUserImg" />
                        <el-dropdown @command="logout">
                            <span class="el-dropdown-link" :class="{white: !isColor}">
                            {{ username }}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div v-else class="header-right-btn" @click="login"><span>登录</span> <span>注册</span></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        isColor: {
        type: Boolean,
        default: true
      }
    },
    data(){
        return{
            isFixed: true
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 70px !important;

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

        .search-box {
            margin-left: 48px;

            >>>.el-input__inner{
            cursor: pointer;
            }

            >>>.el-input-group__append {
            color: #fff;
            font-size: 12px;
            background-color: #3867f2 !important;
            border: 1px solid #3867f2 !important;
            }
        }
    }
}
</style>