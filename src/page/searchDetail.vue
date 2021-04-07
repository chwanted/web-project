<template>
  <div>
    <div class="wrap">
      <div class="banner">
        <Myheader :class="{ fixed: isFixed }"></Myheader>
      </div>
      <div class="inner">
        <div class="search-box">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../components/header.vue'
import bg from '../assets/img/bg.png'
export default {
  components: { 
    Myheader: header,
  },
  data(){
    return{
      bg: bg,
      isFixed:false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  background-color: rgb(244,247,252);

  .banner{
    width: 100%;
    height: 320px;
    background: url(../assets/img/bg.png) no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
}
</style>