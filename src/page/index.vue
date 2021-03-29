<template>
  <div>
    <div class="wrap">
      <header>
        <div class="inner">
          <div class="search-box">
            <div class="search-input-content">
              <el-input v-model="searchContent"
              maxlength="200"
              placeholder="请输入作者、诗词名称"
              @keyup.enter.native="toSearch()">
              </el-input>
              <p @click="toSearch" style="display: flex;align-items: center;justify-content: center;">查一下</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      searchContent: '',
      authorList: []
    }
  },
  methods: {
    toSearch(){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input-content /deep/.el-input__inner {
  height: 58px;
  line-height: 58px;
  border: none;
}

header {
  margin-top: 70px;
  width: 100%;
  background: url(../assets/img/banner.png) no-repeat center;
  min-height: 400px;
  min-width: 870px;
  background-size: 100% 100%;
}
    
.inner {
  height: 400px;
  display: flex;
  align-items: center;
}
      
.search-box {
  width: 870px;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0px 4px 16px 0px rgba(28, 60, 154, 0.3);
  margin: 0 auto;
}

.search-input-content {
  display: flex;
  flex: 1;
  align-items: center;
}

p {
  width: 140px;
  line-height: 60px;
  text-align: center;
  background-color: #3867f2;
  font-size: 22px;
  color: #ffffff;
  cursor: pointer;
}
</style>