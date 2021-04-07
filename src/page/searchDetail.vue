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
              <div class="poet">作者</div>
              <el-input v-model="query.poet" 
                placeholder="请输入作者姓名"
                @input="e => query.poet = validForbid(e,100)"
                maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="poetry">诗词名称</div>
              <el-input v-model="query.name" 
                placeholder="请输入诗词名称"
                @input="e => query.name = validForbid(e,100)"
                maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="type">类型</div>
              <el-select v-model="query.type" placeholder="请选择">
                <el-option label="唐诗" value="唐诗"></el-option>
                <el-option label="宋词" value="宋词"></el-option>
                <el-option label="元曲" value="元曲"></el-option>
                <el-option label="现代" value="现代"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 100px; height: 36px; display: block;" class="search-button">
              <el-button type="primary" style="width: 100px; height: 36px;" @click='toSearch'>搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="result">
          <p class="total">为您找到相关诗词<span>{{total}}</span>篇</p>
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
        <div class="no-result" v-if="poetryList.length <= 0">
          <p>暂无搜索结果，修改一下搜索条件吧~</p>
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
        console.log(this.poetryList)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form{
  margin: 17px 37px;
}
/deep/ .el-form-item{
  width: calc(50% - 10px);
}
/deep/ .el-form-item__content{
  width: 450px;
  display: flex;
  justify-content: flex-start;
}
/deep/ .el-input__inner{
  border: none;
  border-bottom: 1px solid #dcdee4;
  border-radius: 0;
  font-size: 16px;
}
/deep/ .el-pagination{
  margin: 0 auto;
  width: 1200px;
  padding: 25px 0;
  margin-right: 43px;
}
.wrap{
  background-color: #f4f7fc !important;

  .banner{
    width: 100%;
    height: 320px;
    background: url(../assets/img/bg.png) no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .inner{
    width: 1200px;
    margin: 0 auto;

    .search-box{
      height: 340px;
      background-color: #ffffff;
      box-shadow: 0px 2px 26px 0px rgba(28, 60, 154, 0.14);
      border-radius: 20px;
      margin-top: -163px;
      z-index: 2;

      .poet,.type{
        font-size: 18px;
        letter-spacing: 35px;
        color: #727377;
        width: 106px;
      }
      .poetry{
        font-size: 18px;
        color: #727377;
        width: 106px;
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