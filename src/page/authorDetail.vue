<template>
  <div>
    <Myheader></Myheader>
    <div class="wrap">
      <section>
        <div class="inner content-center">
          <div class="left flex">
            <div class="authorInfo flex">
              <img class="authorImg" :src="authorImg"/>
              <div class="authorInfo-right">
                <h2>李白</h2>
                <p>zheshi libai ,biecai le</p>
              </div>
            </div>
            <div class="poetry">
              <PoetryList></PoetryList>
            </div>
          </div>
          <div class="right">
            <div class="right-box">
              <div class="other-poet">
                <h2>热门诗人</h2>
                <ul class="poetList">
                  <li v-for="(item, index) in poetList" :key="index" @click="toAuthorDetail(item)">{{item.poet}}</li>
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
      authorImg:'',
      poetId:{
        id:'',
      },
    }
  },
  mounted(){
    this.poetId.id = this.$route.query.id
    this.getPoetInfo()
  },
  methods:{
    getPoetInfo(){
      // this.$api.detail.poet(this.poetId).then(res => {
      //   this.poetInfo = res.data
      //   this.authorAvatar = res.data.headPortraitBase64
      //   console.log(res)
      // })
    },
  }
}
</script>

<style lang="scss" scoped>
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
            object-fit: cover;
            margin-right: 20px;
          }
          .authorInfo-right{
            h2{
              font-weight: normal;
              letter-spacing: 4px;
              margin-bottom: 5px;
            }
            p{
              text-indent: 2em;
              letter-spacing: 1px; 
              font-size:15px;
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