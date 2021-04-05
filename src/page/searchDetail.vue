<template>
  <div>
    <Myheader :isColor="true"></Myheader>
  </div>
</template>

<script>
import header from '../components/header.vue'
export default {
  components: { 
    Myheader: header,
  },

}
</script>

<style>

</style>