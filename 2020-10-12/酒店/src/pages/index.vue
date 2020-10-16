<template>
  <div class="index">
    <label class="welcome">欢迎登录 - 管理后台</label>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.index {
  margin: -20px -30px;
  height: calc(100vh - 70px);
  background-image: url("../assets/images/indexbg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .welcome {
    font-size: 38px;
    color: #fff;
    line-height: 38px;
  }
}
</style>

