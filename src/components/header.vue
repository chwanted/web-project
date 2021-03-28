<template>
  <div>
    <div class="header wrap" :style="{'background-color':!isColor?'rgba(255,255,255,0)':''}">
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

}
</script>

<style>

</style>