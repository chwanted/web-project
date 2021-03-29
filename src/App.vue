<template>
  <div id="app">
    <Myheader></Myheader>
    <router-view/>
  </div>
</template>

<script>
import header from './components/header'
export default {
  components: {
    Myheader: header
  },
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  min-height: 100vh;
}
html,body {
  width: 100%;
  height: 100%;
  background-color:#FAFAFA;
}
</style>
