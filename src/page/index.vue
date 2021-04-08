<template>
  <div>
    <Myheader :isFixed="true"></Myheader>
    <div class="wrap">
      <header>
        <div class="inner">
          <div class="search-box">
            <div class="search-select-content">
              <el-col :span="4">
                <el-select v-model="searchSelect" placeholder="请选择" @change="searchChange">
                  <el-option label="作者" :value="0"></el-option>
                  <el-option label="诗词名称" :value="1"></el-option>
                </el-select>
              </el-col>
            </div>
            <div class="search-input-content">
              <el-input v-model="searchContent"
              maxlength="200"
              :placeholder="selectPlaceholder"
              @keyup.enter.native="toSearch()">
              </el-input>
              <p @click="toSearch" style="display: flex;align-items: center;justify-content: center;">查一下</p>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div class="inner content-center">
          <div class="left">
            <div class="authorList" style="width: 100%; position: relative;">
              <ul class="author-info">
                <li v-for="(item, index) in authorList" :key="index" class="info-list" @click="toAuthorDetail(item.id)">
                  <div class="author-message">
                    <img :src="item.headPortraitBase64" class="headPortrait">
                    <div class="authorAvatar">
                      <h3>{{item.name}}</h3>
                      <span>{{item.description}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="right-box">
              <RankingList :rankingList = 'rankingList'></RankingList>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import header from '../components/header'
import hoverImg from '../assets/img/hover.png'
import RankingList from '../components/rankingList.vue'
export default {
  components:{
    Myheader: header,
    RankingList: RankingList
  },
  data() {
    return{
      searchSelect: 0,
      searchContent: '',
      selectPlaceholder:'请输入作者名称',
      hoverImg: hoverImg,
      authorList: [],
      rankingList: [],
      query:{}
    }
  },
  created(){
    this.authorList = this.getRandomPoet()
    this.rankingList = this.getRankingList()
  },
  watch:{
    searchSelect(val,oldVal){
      if(val == 0) this.selectPlaceholder = '请输入作者名称'
      if(val == 1) this.selectPlaceholder = '请输入诗词名称'
    }
  },
  methods: {
    searchChange(val){
      this.searchContent = ''
    },
    toSearch(){
      var searchContent = this.searchContent
      if(this.searchSelect == 0){
        this.query.poet = searchContent
        this.query.name = ''
        this.query.type = ''
      }else if(this.searchSelect == 1){
        this.query.poet = ''
        this.query.name = searchContent
        this.query.type = ''
      }
      localStorage.setItem('searchQueryPoet', this.query.poet)
      localStorage.setItem('searchQueryName', this.query.name)
      this.$router.push('/searchDetail')
    },
    // 获取随机诗人
    getRandomPoet(){
      this.$api.rank.randomPoet().then(res => {
        this.authorList = res.data
      })
    },
    // 获取排行榜
    getRankingList(){
      const params = {
        page: 1,
	      limit: 10
      }
      this.$api.rank.ranking(params).then(res => {
        this.rankingList = res.data.records
      })
    },
    toAuthorDetail(id){
      this.$utils.toPage('/authorDetail?id='+id)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-select-content /deep/.el-input__inner{
  border: none;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.search-select-content /deep/.el-input__icon{
  margin-top: 5px
}

.search-input-content /deep/.el-input__inner {
  height: 58px;
  line-height: 58px;
  border: none;
}

header {
  margin-top: 70px;
  width: 100%;
  background: url(../assets/img/banner.png) no-repeat center;
  min-height: 425px;
  min-width: 870px;
  background-size: 100% 100%;
}

.inner {
  height: 425px;
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

section{
  width: 100%;
  margin: 0 auto;
  padding: 26px 0;

  .content-center{
    display: flex;
    // flex-wrap: wrap;
    justify-content: center;

    .left{
      width: 620px;
      margin-right: 20px;
      margin-top: auto;

      .authorList{
        width: 100%;
        padding: 20px 10px;
        display: inline-block;

        .author-info{
          overflow: hidden;
          width: 600px;
          margin-bottom: -30px;
          margin-top: 0;
          background: none;

          li{
            list-style: none;
            float: left;
            width: 198px;
            height: 198px;
            margin-bottom: 10px;
            cursor:pointer;

            .author-message{
              margin: 0 10px;
              height: 178px;
              position: relative;  

              .headPortrait{
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: inline-block;
              }

              .authorAvatar{
                position: absolute; 
                top:0px;
                height: 178px;
                width: 178px;
                background: url('../assets/img/hover.png');
                background-size: contain;
                padding: 0px 4px;
                display: flex;
                flex-direction:column;
                justify-content: flex-end;
                font-family: Microsoft YaHei, Microsoft YaHei-Normal;
                z-index: 2;

                h3{
                  text-align: right;
                  margin-bottom: 4px;
                  color: rgb(255, 255, 255);
                  letter-spacing: 5px;
                  font-weight: normal;
                }

                span{
                  font-size: 11px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                  margin-bottom: 4px;
                  letter-spacing: 1px;
                  text-indent:2em;
                  color: rgb(255, 255, 255);
                }
              }

              &:hover{
                box-shadow: 0px 4px 16px 0px rgba(28, 60, 154, 0.3);
                -webkit-transform:translate3d(-2px,-4px,0);
                -moz-transform:translate3d(-2px,-4px,0);
                transform:translate3d(-2px,-4px,0);
              }
            }
          }
        }
      }
    }
    .right{
      width: 300px;
      height: 100%;
      padding: 20px 0px;

      .right-info{
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
        .rankList{
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
</style>
