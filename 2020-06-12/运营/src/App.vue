<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.changebox .el-dialog{
  width: 500px;
}
.chengebox .el-input{
  width: 85%;
}
.chengebox .el-input .el-input__inner{
  width: 96%;
}
</style>
