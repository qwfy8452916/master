<template>
  <div class="bookorderdetail">
    <p class="title">查看详情</p>
    <!-- 基本信息 start -->
    <p class="subTtitle">基本信息</p>
    <div class="baseInfoLine">
      <div class="leftTitleItem">订单状态</div>
      <div class="rightDetailtem">{{orderDataDetail.dealStatusName}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">后台退订状态</div>
      <div
        class="rightDetailtem"
      >{{orderDataDetail.adminUnsubscribeStatus==0?"初始状态":orderDataDetail.adminUnsubscribeStatus==1?"申请退订中":orderDataDetail.adminUnsubscribeStatus==2?"退订成功":"拒绝退订"}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">订单号</div>
      <div class="rightDetailtem">{{orderDataDetail.orderCode}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">酒店名称</div>
      <div class="rightDetailtem">{{orderDataDetail.hotelName}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">房型名称</div>
      <div class="rightDetailtem">{{orderDataDetail.roomTypeName}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">房源名称</div>
      <div class="rightDetailtem">{{orderDataDetail.resourceName}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">房间数</div>
      <div class="rightDetailtem">{{orderDataDetail.roomCount}}&nbsp;间</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">入住日期</div>
      <div class="rightDetailtem">
        {{orderDataDetail.arrivalDate}}&nbsp;至&nbsp;{{orderDataDetail.leaveDate}}&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          v-if="orderDataDetail.hourTime == ''"
        >{{dayCheckIn}}&nbsp;晚</span>
        <span v-else>{{orderDataDetail.hourTime}}</span>
      </div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">联系人</div>
      <div class="rightDetailtem">{{orderDataDetail.cusName}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">联系电话</div>
      <div class="rightDetailtem">{{orderDataDetail.cusPhone}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">到店时间</div>
      <div class="rightDetailtem">{{orderDataDetail.arrivalTime||""}}</div>
    </div>
    <!-- 基本信息 end -->
    <!-- 订单信息 start -->
    <p class="subTtitle">订单信息</p>
    <div class="baseInfoLine">
      <div class="leftTitleItem">房价</div>
      <div class="rightDetailtem">￥ {{orderDataDetail.totalAmount}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==0">
      <div class="leftTitleItem">价格类型</div>
      <div class="rightDetailtem">日历房价</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==1">
      <div class="leftTitleItem">价格类型</div>
      <div class="rightDetailtem">单位协议价</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==1">
      <div class="leftTitleItem">协议单位</div>
      <div class="rightDetailtem">{{orderDataDetail.entName}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==2">
      <div class="leftTitleItem">价格类型</div>
      <div class="rightDetailtem">最优弹性价</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==2">
      <div class="leftTitleItem">员工ID</div>
      <div class="rightDetailtem">{{orderDataDetail.empId}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==2">
      <div class="leftTitleItem">员工姓名</div>
      <div class="rightDetailtem">{{orderDataDetail.empName}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==2">
      <div class="leftTitleItem">员工手机号</div>
      <div class="rightDetailtem">{{orderDataDetail.empMobile}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==2">
      <div class="leftTitleItem">弹性金额</div>
      <div class="rightDetailtem">{{orderDataDetail.empAdaptAmount}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.roomPriceType==2">
      <div class="leftTitleItem">提成金额</div>
      <div class="rightDetailtem">{{orderDataDetail.empPercentageAmount}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.discountWay!=0">
      <div class="leftTitleItem">优惠方式</div>
      <div class="rightDetailtem">
        <span v-if="orderDataDetail.discountWay == 1">订房满减券</span>
        <span v-else>订房折扣券</span>
      </div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.discountWay != 0">
      <div class="leftTitleItem">优惠金额</div>
      <div class="rightDetailtem">￥ {{orderDataDetail.couponAmount}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">实付金额</div>
      <div class="rightDetailtem">￥ {{orderDataDetail.actualPay}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">下单时间</div>
      <div class="rightDetailtem">{{orderDataDetail.payTime}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">备注</div>
      <div class="rightDetailtem">{{orderDataDetail.cusRemark}}</div>
    </div>
    
    <!-- 订单信息 end -->
    <!-- 订单信息 start -->
    <!-- 0:初始状态；1:已接单；2:已拒单；3:申请退订；4:已退订；6：已核销 -->
    <p class="subTtitle">其他信息</p>
    <div class="baseInfoLine" v-if="orderDataDetail.dealStatus!=0">
      <div class="leftTitleItem">确认人</div>
      <div class="rightDetailtem">{{orderDataDetail.orderDealPersonName}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.dealStatus!=0">
      <div class="leftTitleItem">确认时间</div>
      <div class="rightDetailtem">{{orderDataDetail.orderDealTime!=undefined?orderDataDetail.orderDealTime.indexOf("1970-01-01")==-1?orderDataDetail.orderDealTime:"":""}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.dealStatus==6">
      <div class="leftTitleItem">核销人</div>
      <div class="rightDetailtem">{{orderDataDetail.wirteOffEmpName}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.dealStatus==6">
      <div class="leftTitleItem">核销时间</div>
      <div class="rightDetailtem">{{orderDataDetail.writeOffTime!=undefined?orderDataDetail.writeOffTime.indexOf("1970-01-01")==-1?orderDataDetail.writeOffTime:"":""}}</div>
    </div>
    <div class="baseInfoLine" v-if="orderDataDetail.dealStatus==6">
      <div class="leftTitleItem">核销备注</div>
      <div class="rightDetailtem">{{orderDataDetail.writeOffRemark}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">红包金额</div>
      <div class="rightDetailtem">{{orderDataDetail.redPacketAmount}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">分享奖励</div>
      <div class="rightDetailtem">{{orderDataDetail.shareReward||0}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">管理奖励</div>
      <div class="rightDetailtem">{{orderDataDetail.shareSecReward||0}}</div>
    </div>
    <div class="baseInfoLine">
      <div class="leftTitleItem">入账金额</div>
      <div class="rightDetailtem">{{orderDataDetail.hotelBookAmount||0}}</div>
    </div>
    <br />
    <!-- 订单信息 end -->
    <el-button @click="returnList">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "LonganBookOrderDetail",
  data() {
    return {
      authzlist: {}, //权限数据
      boId: "",
      orderDataDetail: {},
      orderStatus: "",
      hourCheckIn: 0,
      dayCheckIn: 0,
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    this.boId = this.$route.query.id;
    this.bookOrderDetail();
  },
  methods: {
    //获取订单详情
    bookOrderDetail() {
      const params = {};
      const id = this.boId;
      this.$api
        .bookOrderDetail(params, id)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.orderDataDetail = result.data;
            this.orderStatus = result.data.dealStatus;
            //几晚
            let dayDataNum =
              new Date(result.data.leaveDate).getTime() -
              new Date(result.data.arrivalDate).getTime();
            this.dayCheckIn = dayDataNum / (24 * 60 * 60 * 1000);
            //几小时
            if (result.data.hourTime != "") {
              let hourStart = result.data.hourTime.substr(0, 5) + ":00";
              let hourEnd = result.data.hourTime.substr(6, 5) + ":00";
              let arrivalTime = result.data.arrivalDate + " " + hourStart;
              let leaveTime = result.data.leaveDate + " " + hourEnd;
              let hourDataNum =
                new Date(leaveTime).getTime() - new Date(arrivalTime).getTime();
              this.hourCheckIn = hourDataNum / (60 * 60 * 1000);
            }
          } else {
            this.$message.error("订单详情获取失败！");
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //返回
    returnList() {
      // this.$router.push({ name: "LonganBookOrder" });
      this.$router.go(-1)
    },
  },
};
</script>

<style lang="less" scoped>
.bookorderdetail {
  text-align: left;
  .title {
    font-weight: bold;
  }
  .subTtitle {
    font-weight: bold;
    padding-left: 20px;
  }
  .baseInfoLine {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: #333333;
    line-height: 32px;
    .leftTitleItem {
      text-align: right;
      width: 100px;
    }
    .rightDetailtem {
      padding-left: 20px;
      text-align: left;
      width: calc(100% - 160px);
    }
  }
}
</style>

