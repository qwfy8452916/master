<template>
  <div>
    <h2 class="align-left">集团工作台</h2>
    <div class="stageInner">
      <div class="stageItem" @click="godemand">
        <img src="../../../assets/img/demand.png" alt />
        <p>联采需求</p>
        <div class="numBox">
          <p class="num">3</p>
        </div>
      </div>
      <div class="stageItem" @click="gopay">
        <img src="../../../assets/img/pay.png" alt />
        <p>付款单</p>
        <div class="numBox">
          <p class="num">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 联采需求跳转
    godemand() {
      this.$router.push({ path: "/group/demandstaging" });
    },
    // 付款单跳转
    gopay() {
      this.$router.push({ path: "/group/paystaging" });
    }
  }
};
</script>
<style lang="less" scoped>
.stageInner {
  float: left;
  .stageItem {
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
    float: left;
    margin-right: 30px;
    padding: 40px 0;
    position: relative;
  }
  .numBox {
  width: 26px;
  height: 26px;
  background-color: #ee1e1e;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 20px;
  .num {
    text-align: center;
    color: #fff;
    line-height: 0px;
  }
}
}

</style>