<template>
  <div>
    <h2 class="align-left">分公司工作台</h2>
    <div class="stageInner">
      <div class="stageItem" @click="godemand">
        <img src="../../../assets/img/demand.png" alt />
        <p>采购需求</p>
        <div class="numBox">
          <p class="num">3</p>
        </div>
      </div>
      <div class="stageItem" @click="gosupply">
        <img src="../../../assets/img/supply.png" alt />
        <p>供货单</p>
         <div class="numBox">
          <p class="num">3</p>
        </div>
      </div>
      <div class="stageItem" @click="gosettle">
        <img src="../../../assets/img/settle1.png" alt />
        <p>结算单</p>
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
  mounted() {
    this.getUnreadMessage();
  },
  methods: {
    // 采购需求跳转
    godemand() {
      this.$router.push({ name: "demandstaging" });
    },
    // 供货单跳转
    gosupply() {
      this.$router.push({ name: "delivestaging" });
    },
    // 结算单跳转
    gosettle() {
      this.$router.push({ name: "settlestaging" });
    },
    // 付款单跳转
    gopay() {
      this.$router.push({ name: "paystaging" });
    },
    getUnreadMessage() {
      let that = this;
      that.$api
        .getUnread()
        .then(response => {
          console.log(response);
          const result = response.data;
          if (result.code == "0") {
          } else {
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    }
  }
};
</script>
<style lang="less">
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