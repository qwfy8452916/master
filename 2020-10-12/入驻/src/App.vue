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
/* 用户管理模态框最小宽度为1000px */
.userMangeDialog .el-dialog {
  /* max-width: 1000px !important; */
  min-width: 1000px !important;
}
.userMangeDialog .el-dialog__header {
  text-align: left;
}
/* panel的宽度由260变为42% */
.userMangeDialog .el-dialog__body .el-transfer .el-transfer-panel {
  text-align: left;
  width: 380px !important;
  height: 413px !important;
}
.userMangeDialog .el-transfer-panel__body {
  height: 356px !important;
}
/* 新加弹性布局，以免里面的项出现在一行 */
.userMangeDialog .el-transfer-panel__list.is-filterable {
  height: 304px !important;
  display: flex;
  flex-direction: column;
}
.userMangeDialog .el-form--inline .el-form-item {
  margin-left: 15px;
}
</style>
