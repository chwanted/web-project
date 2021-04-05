<template>
  <div>
    <Myheader></Myheader>
    
  </div>
</template>

<script>
import header from '../components/header.vue'
export default {
  components: { 
      Myheader: header 
  },
  data(){
    return{
      poetId:{
        id:''
      },
    }
  },
  mounted(){
    this.poetId.id = this.$route.query.id
    this.getPoetInfo()
  },
  methods:{
    getPoetInfo(){
      this.$api.detail.poet(this.poetId).then(res => {
        this.poetInfo = res.data
        this.authorAvatar = res.data.headPortraitBase64
        console.log(res)
      })
    },
  }
}
</script>

<style>

</style>