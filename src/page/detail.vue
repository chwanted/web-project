<template>
  <div>
    <Myheader></Myheader>
    <div class="wrap">
      <section>
        <div class="inner content-center">
          <div class="left flex">
            <div class="poem-info">
              这里是诗词内容
            </div>
            <div class="comment-list">
              这里是评论区
            </div>
          </div>
          <div class="right">
            <div class="right-box" :class="searchBarFixed == true ? 'isFixed':''">
              <div class="right-info">
                <h2>诗词排行榜</h2>
                <ul class="rankList">
                  <li v-for="(item, index) in rankingList" :key="index" @click="toDetail(item)">{{item.name}}</li>
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
import header from '../components/header'
export default {
  components:{
    Myheader: header,
  },
  data(){
    return{
      rankingList:[
        { name: "《蜀道难》"},
				{ name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'}
      ]
    }
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

      .left{
        width: 800px;
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .poem-info{
          background: #FFF;
          margin-bottom: 28px;
          margin-top: 16px;
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15);
        }

        .comment-list{
          background: #FFF;
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15);
        }
      }

      .right{
        width: 300px;
        height: 100%;
        padding: 16px 0px;

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
}
</style>