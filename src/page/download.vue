<template>
  <div>
    <Myheader></Myheader>
    <div class="wrap">
      <section>
        <h3>▏下载中心</h3>
        <ul class="downloadList" v-if="downloadList.length >0">
          <li v-for="(item,index) in downloadList" :key="index">
            <div class="download">
              <span class="poetry">{{ '《'+item.poetry+'》' }}</span>
              <span class="time">{{ item.createTime }}</span>
            </div>
          </li>
        </ul>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="slot, prev, pager, next"
            :current-page="this.form.page"
            :page-size="this.form.limit"
            :total="total"
            v-if="total != 0">
            <span class="page-total">共<span>{{ total }}</span>条</span>
          </el-pagination>
        </div>
        <div class="no-result" v-if="total <= 0">
          <img :src="noDownload" class="noDownload"/>
          <p>暂无下载，快去下载一些诗词吧~</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import header from '../components/header'
import noDownload from '../assets/img/noDownload.png'
export default {
  components:{
    Myheader: header,
  },
  data(){
    return{
      noDownload: noDownload, 
      total:0,
      realTotal: 0,
      downloadList:[],
      form:{
        page: 1,
        limit: 10,
        userId: localStorage.userId
      }
    }
  },
  mounted(){
    this.getDownloadList()
  },
  methods:{
    getDownloadList(){
      this.$api.user.myDownload(this.form).then(res => {
        this.downloadList = res.data.records
        this.total = res.data.total
      })
    },
    //分页
    handleSizeChange(e){
      this.form.page = e
      this.getDownloadList()
    },
    handleCurrentChange(e){
      this.form.page = e
      this.getDownloadList()
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-pagination{
  margin: 0 auto;
  width: 1000px;
  padding: 25px 0;
  margin-right: 43px;
}
.wrap{
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: 70px;

  section{
    width: 100%;
    margin: 0 auto;

    h3{
      font-weight: normal;
      letter-spacing: 2px;
      margin-bottom: 20px;
      color: #66b1ff;
      margin: 0 auto 20px auto;
      width: 1000px;
    }
    
    .downloadList{
      margin: 0 auto;
      width: 1000px;
      list-style: none;
      
      li{
        background: #fff;
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
        padding: 30px;
        border-bottom: 1px solid #dcdee4;

        .download{

         .poetry{
            color: #58595d;
            font-size: 16px;
         } 
         .time{
            color: #999999;
            font-size: 14px;
            float: right;
         }
        }
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

    .no-result{
      text-align:center;
      margin: 0 auto;
      width: 1000px;
      font-size: 14px;
      color:#999999;

      .noDownload{
        width: 200px;
        margin-top: 50px;
        margin-bottom: 30px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
