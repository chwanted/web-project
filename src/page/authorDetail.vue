<template>
  <div>
    <Myheader></Myheader>
    <div class="wrap">
      <section>
        <div class="inner content-center">
          <div class="left flex">
            <div class="authorInfo flex">
              <img class="authorImg" :src="poetInfo.headPortraitBase64"/>
              <div class="authorInfo-right">
                <h2>{{poetInfo.name}}</h2>
                <p>{{poetInfo.description}}</p>
              </div>
            </div>
            <div class="poetry" v-if="poetryList!=''">
              <PoetryList :poetryList = 'poetryList'>
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="slot, prev, pager, next"
                    :current-page="this.poetId.page"
                    :page-size="this.poetId.limit"
                    :total="total"
                    v-if="total != 0">
                    <span class="page-total">共<span>{{ total }}</span>条</span>
                  </el-pagination>
                </div>
              </PoetryList>
            </div>
          </div>
          <div class="right">
            <div class="right-box">
              <div class="other-poet">
                <h2>推荐诗人</h2>
                <ul class="poetList">
                  <li v-for="(item, index) in poetList" :key="index" @click="toAuthorDetail(item.id)">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import header from '../components/header.vue'
import poetryList from '../components/poetryList.vue'
export default {
  components: { 
      Myheader: header,
      PoetryList : poetryList,
  },
  data(){
    return{
      total:0,
      poetId:{
        id:'',
        page: 1,
        limit: 5,
      },
      poetList:[],
      poetInfo:{},
      poetryList:[],
    }
  },
  watch:{
    // 监听路由参数变化
    '$route.query': {
      handler() {
        this.poetId.id = this.$route.query.id
        this.loadInfo()
      },
      deep: true,
    }
  },
  mounted(){
    this.poetId.id = this.$route.query.id
    this.loadInfo()
  },
  methods:{
    loadInfo(){
      this.getPoetInfo()
      this.getHotPoet()
    },
    getHotPoet(){
        this.$api.rank.randomPoet().then(res => {
        this.poetList = res.data
      })
    },
    getPoetInfo(){
      this.$api.detail.poet(this.poetId).then(res => {
        this.poetInfo = res.data
        this.poetryList = res.data.poetryEntities.records
        this.total = res.data.poetryEntities.total
      })
    },
    toAuthorDetail(id){
      this.$utils.toPage('/authorDetail?id='+id)
    },
    //分页
    handleSizeChange(e){
      this.poetId.page = e
      this.getPoetInfo()
    },
    handleCurrentChange(e){
      this.poetId.page = e
      this.getPoetInfo()
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-pagination{
  margin: 0 auto;
  width: 800px;
  text-align: center !important;
}

.wrap{
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: 70px;

  section{
    width: 100%;
    margin: 0 auto;

    .content-center{
      display: flex;
      justify-content: center;
      min-width: 1300px;

      .left{
        width: 800px;
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .authorInfo{
          background: #FFF;
          margin-bottom: 28px;
          margin-top: 16px;
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
          display: flex;
          padding: 20px 20px;

          .authorImg{
            width: 178px;
            height: 226px;
            object-fit: cover;
            margin-right: 20px;
          }
          .authorInfo-right{
            h2{
              font-weight: normal;
              letter-spacing: 4px;
              margin-bottom: 10px;
            }
            p{
              text-indent: 2em;
              letter-spacing: 1px; 
              font-size:15px;
              color: #58595d;
            }
          }
        }

        .poetry{
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

      .right{
        width: 300px;
        height: 100%;
        padding: 16px 0px;

        .right-box{
          .other-poet{
            background-color: #fff;

            h2{
              font-family: MicrosoftYaHei;
              font-size: 18px;
              letter-spacing: 1px;
              color: #343539;
              border-bottom: 1px solid #dbdcdf;
              padding: 0 18px;
              line-height: 40px;
              display: flex;
              font-weight: normal;
              }
              .poetList{
                width: 100%;
                background-color: #ffffff;
                text-align: center;

                li{
                  width: 100%;
                  display: flex;
                  align-items: center;
                  height: 48px;
                  cursor: pointer;
                  font-family: MicrosoftYaHeiLight;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 1px;
                  color: #58595d;
                  padding: 0 20px;

                  &:hover{
                    background-color: rgba(56,103,242,.08);
                  }
                }
              }
          }
        }
      }
    }
  }
}
</style>