<template>
  <div>
    <Myheader></Myheader>
    <div class="wrap">
      <section>
        <ul class="downloadList">
          <h3>▏下载中心</h3>
          <li v-for="item in downloadList" :key="item.id">
            <div class="download">
              <div class="download-top flex">
                <span class="poetry">{{ '《'+item.poetry+'》' }}</span>
                <span class="time">{{ item.createTime }}</span>
              </div>
            </div>
          </li>
        </ul>
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
      downloadList:[{
        poetry:'sssssss',
        createTime:'20190923-=131',
      }]
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

    .downloadList{
      margin: 0 auto;
      width: 1000px;
      list-style: none;
        
      h3{
        font-weight: normal;
        letter-spacing: 2px;
        margin-bottom: 20px;
        color: #66b1ff;
      }

      li{
        background: #fff;
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
        padding: 20px;

        .download{
          
        }
      }
    }
  }
}
</style>
