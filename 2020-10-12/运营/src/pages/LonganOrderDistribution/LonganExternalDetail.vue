<template>
  <div class="ExternalDetail">
    <div class="title">查看详情</div>
    <el-form
      align="left"
      style="width:70%"
      label-width="130px"
      :model="LogisticsEditData"
      ref="LogisticsEditData"
    >
      <p class="InfoTitle">配送信息</p>
      <el-form-item label="订单状态">
        <span v-if="LogisticsEditData.logisticsDelivStatus">已完成</span>
      </el-form-item>
      <el-form-item label="酒店名称">
        <span>{{LogisticsEditData.hotelName}}</span>
      </el-form-item>
      <el-form-item label="外部物流">
        <span>{{LogisticsEditData.logisticsName}}</span>
      </el-form-item>
      <el-form-item label="配送单号">
        <span>{{LogisticsEditData.orderDelivId}}</span>
      </el-form-item>
      <el-form-item label="订单商品类型">
        <span v-if="LogisticsEditData.goodsType"></span>
      </el-form-item>
      <el-form-item label="门店编号">
        <span>{{LogisticsEditData.shopNo}}</span>
      </el-form-item>
      <el-form-item label="门店名称">
        <span>{{LogisticsEditData.shopName}}</span>
      </el-form-item>
      <el-form-item label="门店地址">
        <span>{{LogisticsEditData.shopAddress}}</span>
      </el-form-item>
      <el-form-item label="城市code">
        <span>{{LogisticsEditData.cityCode}}</span>
      </el-form-item>
      <el-form-item label="商品数量">
        <span>{{LogisticsEditData.goodsAmount}}</span>
      </el-form-item>
      <el-form-item label="订单金额">
        <span>{{LogisticsEditData.orderPrice}}</span>
      </el-form-item>
      <el-form-item label="收货人姓名">
        <span>{{LogisticsEditData.receiverName}}</span>
      </el-form-item>
      <el-form-item label="收货人手机号">
        <span>{{LogisticsEditData.receiverMobile}}</span>
      </el-form-item>
      <el-form-item label="收货人地址">
        <span>{{LogisticsEditData.receiverAddress}}</span>
      </el-form-item>
      <el-form-item label="地图类型">
        <span>{{LogisticsEditData.mapType}}</span>
      </el-form-item>
      <el-form-item label="收货人经纬度">
        <span>{{LogisticsEditData.receiverLongitude}}-{{LogisticsEditData.receiverLatitude}}</span>
      </el-form-item>
      <p class="InfoTitle">配送信息</p>
      <el-form-item label="骑手姓名">
        <span>{{LogisticsEditData.riderName}}</span>
      </el-form-item>
      <el-form-item label="骑手电话">
        <span>{{LogisticsEditData.riderMobile}}</span>
      </el-form-item>
      <el-form-item label="配送费">
        <span>{{LogisticsEditData.deliveryFee}}</span>
      </el-form-item>
      <el-form-item label="实际支付费用">
        <span>{{LogisticsEditData.realDeliveryFee}}</span>
      </el-form-item>
      <el-form-item label="配送距离">
        <span>{{LogisticsEditData.deliveryDistance}}</span>
      </el-form-item>
      <el-form-item label="发单时间">
        <span>{{LogisticsEditData.requestTimeStr}}</span>
      </el-form-item>
      <el-form-item label="接单时间">
        <span>{{LogisticsEditData.acceptTimeStr}}</span>
      </el-form-item>
      <el-form-item label="取货时间">
        <span>{{LogisticsEditData.fecthTimeStr}}</span>
      </el-form-item>
      <el-form-item label="送达时间">
        <span>{{LogisticsEditData.finishTimeStr}}</span>
      </el-form-item>
      <el-form-item label="取消时间">
        <span>{{LogisticsEditData.cancleTimeStr}}</span>
      </el-form-item>
      <el-form-item label="违约金">
        <span>{{LogisticsEditData.brokenFee}}</span>
      </el-form-item>

      <el-form-item>
        <el-button @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LonganExternalDetail",
  data() {
    return {
      detailId: "",
      LogisticsEditData: {}
    };
  },
  mounted() {
    this.detailId = this.$route.query.id;
    this.exterlogisticsDetail();
  },
  methods: {
    //详情
    exterlogisticsDetail() {
      let that = this;
      this.$api
        .exterlogisticsDetail(that.detailId)
        .then(response => {
          let result = response.data;
          if (result.code == 0) {
            that.LogisticsEditData = result.data;
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$alert(err, "警告", {
            confirmButtonText: "确定"
          });
        });
    },

    //取消
    cancel() {
      this.$router.push({ name: "LonganExternalOrder" });
    }
  }
};
</script>

<style lang="less" scope>
.ExternalDetail {
  .title {
    margin-bottom: 20px;
    font-weight: bold;
    text-align: left;
  }
  .el-input,
  .el-select {
    width: 260px;
  }
  .InfoTitle {
    padding: 10px 0;
    border-bottom: 1px solid #d7d7d7;
  }
}
</style>
