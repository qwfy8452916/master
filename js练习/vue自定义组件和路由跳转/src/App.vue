<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->  <!-- vue固定logo -->
    <router-link to="/">tab首页</router-link>
    <likui></likui>   <!-- 自定义组件 -->
    <h1>Hello App!</h1>
  <p>
  <router-link router-link to="/hello">hello</router-link><br/>  <!-- 链接页面 -->
    <router-link router-link to="/bar">bar</router-link><br/>  <!-- 链接页面 -->
    <router-link router-link to="/foo">foo</router-link><br/>  <!-- 链接页面 -->
    <router-link router-link to="/baz">baz</router-link><br/>  <!-- 链接页面 -->
  </p>
  <router-view></router-view>   <!-- 路由渲染区域 -->
  </div>
</template>

<script>
import yy from './me.vue'
export default {
  name: 'app',
  // 组件挂载
  components:{"likui":yy}  
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
