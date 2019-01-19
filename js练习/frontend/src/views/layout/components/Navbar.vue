<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo">
      <img src="../../../assets/common_img/logo.png" alt="">
    </div>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <div class="navbar-menu">
      <router-link to="/manager/ad">
        <span>运营管理</span>
      </router-link>
      <router-link to="/content/article/article">
        <span >内容管理</span>
      </router-link>
      <router-link to="/user/list">
        <span>用户管理</span>
      </router-link>
      <router-link to="/examine/article">
        <span>审核管理</span>
      </router-link>
      <router-link to="/upgrade/index">
        <span>升级管理</span>
      </router-link>
      <router-link to="/system/index">
        <span>系统设置</span>
      </router-link>
    </div>
    <div class="navbar-custom-menu">
      <span>欢迎，管理员，Tony</span>
      <span class="change-password">修改密码&nbsp;|</span>
      <span class="logout" @click="logout">退出</span>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: #3B424D;
  color: #fff;
  border-bottom:none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1001;
  .logo {
    float: left;
    width: 185px;
    height: 50px;
    position: relative;
    img {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .navbar-menu {
    float: left;
    color:#000;
    background: #fff;
    margin-top: 8px;
    margin-left: 20px;
    span {
      float: left;
      display: block;
      width:90px;
      height: 34px;
      line-height:34px;
      text-align:center;
      border-right:1px solid #eee;
      cursor: pointer;
    }
  }
  .navbar-custom-menu {
    float: right;
    margin-right: 20px;
    .change-password {
      color: #0099ff;
      cursor: pointer;
    }
    .logout {
      color: #0099ff;
      cursor: pointer;
    }
  }
}
</style>

