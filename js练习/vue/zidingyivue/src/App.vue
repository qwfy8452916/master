<template>
  <div id="app">
    <demoren></demoren>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>
<router-view></router-view>

<script>
import vuemoren from './components/HelloWorld.vue'
export default {
  name: 'App',
  components:{'demoren':vuemoren}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
