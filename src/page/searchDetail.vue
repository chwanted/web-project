<template>
  <div>
    <div class="wrap">
      <div class="banner">
        <Myheader :isFixed="false"></Myheader>
      </div>
      <div class="inner">
        <div class="search-box">
          <el-form :inline="true" :model="query">
            <el-form-item>
              <span class="poet">作者</span>
              <el-input v-model="query.poet" 
                placeholder="请输入作者姓名"
                maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item>
              <span class="poetry">诗词名称</span>
              <el-input v-model="query.name" 
                placeholder="请输入诗词名称"
                maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item>
              <span class="type">类型</span>
              <el-select v-model="query.type" placeholder="请选择">
                <el-option label="唐诗" value="唐诗"></el-option>
                <el-option label="宋词" value="宋词"></el-option>
                <el-option label="元曲" value="元曲"></el-option>
                <el-option label="现代" value="现代"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="width: 100px; height: 36px;" @click='toSearch' class="search-button">搜索</el-button>
        </div>
        <div class="result">
          <p v-if="total != 0" class="total">为您找到相关诗词<span>{{total}}</span>篇</p>
        </div>
        <PoetryList :poetryList='poetryList' v-if="poetryList.length > 0"></PoetryList>
        <div class="pagination" v-if="poetryList.length > 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="slot, prev, pager, next"
            :current-page="this.query.page"
            :page-size="this.query.limit"
            :total="total"
            v-if="total != 0">
            <span class="page-total">共<span>{{ total }}</span>条</span>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../components/header.vue'
import bg from '../assets/img/bg.png'
import poetryList from '../components/poetryList.vue'
export default {
  components: { 
    Myheader: header,
    PoetryList: poetryList,
  },
  data(){
    return{
      bg: bg,
      poetryList:[],
      total:0,
      query:{
        name:'',
        type:'',
        poet:'',
        page:1,
        limit:10,
      }
    }
  },
  created(){
    this.query.poet = localStorage.getItem('searchQueryPoet') ? localStorage.getItem('searchQueryPoet') : ''
    this.query.name = localStorage.getItem('searchQueryName') ? localStorage.getItem('searchQueryName') : ''
    if (this.query.poet != ''|this.query.name != ''){
      this.toSearch()
    }
  },
  methods:{
    //分页
    handleSizeChange(e){
      this.query.page = e
      this.toSearch()
    },
    handleCurrentChange(e){
      this.query.page = e
      this.toSearch()
    },
    toSearch(){
      this.$api.search.searchData(this.query).then(res => {
        this.poetryList = res.data.records
        this.total = res.data.total
        if (this.total == 0) {
          this.$message({message: '暂无搜索结果！', type: 'info'})
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form--inline{
  margin: 0px auto;
}
/deep/ .el-form{
  margin: 17px 100px 0px 100px;
}
/deep/ .el-form-item{
  width: calc(50% - 10px);
}
/deep/ .el-form-item__content{
  width: 800px !important;
  display: flex !important;
  justify-content: flex-start !important;
}
/deep/ .el-input__inner{
  border: none;
  border-bottom: 1px solid #dcdee4;
  border-radius: 0;
  font-size: 16px;
  width: 600px;
}
/deep/.el-pagination{
  margin: 0 auto;
  width: 1000px;
  padding: 25px 0;
  margin-right: 43px;
  text-align: center;
}
/deep/ .el-button{
  width: 100px!important;
  height: 36px;
  border-radius: 6px;
  float: right;
}
.wrap{
  height: auto;
  .banner{
    width: 100%;
    height: 320px;
    background: url(../assets/img/bg.png) no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .inner{
    width: 1000px;
    margin: 0 auto;

    .result{
      font-size: 14px;
      color:#999999;
      margin: 20px 0;
    }
    .search-box{
      height: 300px;
      background-color: #ffffff;
      box-shadow: 0px 2px 26px 0px rgba(28, 60, 154, 0.14);
      border-radius: 20px;
      margin-top: -163px;
      z-index: 2;
      padding-top: 20px;
      

      .search-button{
        margin-right: 40px;
      }

      .poet{
        font-size: 18px;
        letter-spacing: 35px;
        color: #727377;
        width: 150px;
      }
      .type{
        font-size: 18px;
        letter-spacing: 35px;
        color: #727377;
        width: 130px;
      }
      .poetry{
        font-size: 18px;
        color: #727377;
        width: 150px;
      }
    }

    .pagination{
      .page-total{
        font-size: 11px;
        padding-right: 27px;
        color: #8e8f93;
        font-weight: normal;
        span{
          font-size: 13px;
          padding:0 5px;
          color: #4f5054;
          font-weight: normal;
          text-align: center;
        }
      }
    }
  }
}
</style>