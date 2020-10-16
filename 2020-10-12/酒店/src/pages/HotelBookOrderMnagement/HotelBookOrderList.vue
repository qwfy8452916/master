<template>
  <div class="HotelBookOrderList">
    <div class="badgeBox one" v-text="toDealOrderCount"></div>
    <div class="badgeBox two" v-text="todayOrderCount"></div>
    <div class="badgeBox three" v-text="todayLiveOrderCount"></div>
    <div class="badgeBox four" v-text="toLiveOrderCount"></div>
    <div class="badgeBox five" v-text="allOrderCount"></div>
    <el-tabs v-model="typeNameTab" @tab-click="typeActiveFun">
      <el-tab-pane label="未处理订单" name="未处理订单" class="tabPaneTips">
        <HotelBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='未处理订单'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></HotelBookOrderTabPane>
        <div v-if="!showTabPane||total===0" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="今日新订" name="今日新订" class="tabPaneTips">
        <HotelBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='今日新订'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></HotelBookOrderTabPane>
        <div v-if="!showTabPane||total===0" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="今日入住" name="今日入住" class="tabPaneTips">
        <HotelBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='今日入住'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></HotelBookOrderTabPane>
        <div v-if="!showTabPane||total===0" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="待核销" name="待核销" class="tabPaneTips">
        <HotelBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='待核销'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></HotelBookOrderTabPane>
        <div v-if="!showTabPane||total===0" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="全部订单" name="全部订单" class="tabPaneTips">
        <HotelBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='全部订单'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></HotelBookOrderTabPane>
        <div v-if="!showTabPane||total===0" class="nullData">暂无更多订单</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
var timorOrder = {};
import HotelBookOrderTabPane from "./HotelBookOrderTabPane";
import tipsVoice from "../../../static/tips.mp3";
export default {
  name: "HotelBookOrderList",
  components: {
    HotelBookOrderTabPane,
  },
  data() {
    return {
      typeNameTab: "未处理订单",
      orderDataList: [],
      tabPaneData: [],
      showTabPane: false,
      queryType: 1,
      total: 0,
      hotelId: "",
      orderCountData: {},
      allOrderCount: 0, //所有订单计数
      toDealOrderCount: 0, //待处理订单计数
      toLiveOrderCount: 0, //待入住订单计数
      todayLiveOrderCount: 0, //今日入住订单计数
      todayOrderCount: 0, //今日订单计数
    };
  },
  computed: {
    // allOrderCount() {
    //   return this.$store.getters.getAllOrderCount;
    // },
    // toDealOrderCount() {
    //   return this.$store.getters.getToDealOrderCount;
    // },
    // toLiveOrderCount() {
    //   return this.$store.getters.getToLiveOrderCount;
    // },
    // todayLiveOrderCount() {
    //   return this.$store.getters.getTodayLiveOrderCount;
    // },
    // todayOrderCount() {
    //   return this.$store.getters.getTodayOrderCount;
    // },
  },
  watch: {
    allOrderCount(newName, oldName) {
      this.allOrderCount = newName;
    },
    toDealOrderCount(newName, oldName) {
      this.toDealOrderCount = newName;
    },
    toDealOrderCount(newName, oldName) {
      this.toDealOrderCount = newName;
    },
    todayLiveOrderCount(newName, oldName) {
      this.todayLiveOrderCount = newName;
    },
    todayOrderCount(newName, oldName) {
      this.todayOrderCount = newName;
    },
    "$store.getters.getToDealOrderCount": {
      handler: function (newName, oldName) {
        if (
          Number(newName) > Number(oldName) &&
          newName != "" &&
          newName != undefined &&
          oldName != undefined &&
          oldName != ""
        ) {
          this.bookOrderList();
        } else {
          this.clearNotify();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.hotelId = localStorage.getItem("hotelId");
    if (this.hotelId) {
      this.bookOrderList();
      // this.timorOrder = setInterval(() => {
      //   this.bookOrderList();
      //   if (!document.hidden) {
      //     this.clearNotify();
      //   }
      // }, 60000);
    }
  },
  methods: {
    clearNotify() {
      setTimeout(() => {
        this.notify.faviconClear();
        this.notify.setTitle();
      }, 8000);
    },
    //订单列表
    bookOrderList(paramsData) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "加载中，请稍后...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(192,196,204, 0.4)",
      // });
      if (localStorage.getItem("hotelId")) {
        let type = this.queryType;
        if (type == 5) {
          type = "";
        }
        const paramsObj = paramsData || {};
        const newObj = {
          queryType: type,
          hotelId: localStorage.getItem("hotelId"),
        };
        let params = Object.assign(paramsObj, newObj);
        this.$api
          .bookOrderList(params)
          .then((response) => {
            const result = response.data;
            if (result.code == "0") {
              this.$store.commit("setIsOrderChange");
              this.bookOrderCount();
              if (!document.hidden) {
                this.clearNotify();
              }
              this.orderDataList = result.data.records;
              this.total = result.data.total;
              this.tabPaneData = this.orderDataList;
              this.tabPaneData.forEach((element) => {
                //几晚
                let dayDataNum =
                  new Date(element.leaveDate).getTime() -
                  new Date(element.arrivalDate).getTime();
                element.dayCheckIn = dayDataNum / (24 * 60 * 60 * 1000);
                //几小时
                if (element.hourTime != "") {
                  let hourStart = element.hourTime.substr(0, 5) + ":00";
                  let hourEnd = element.hourTime.substr(6, 5) + ":00";
                  let arrivalTime = element.arrivalDate + " " + hourStart;
                  let leaveTime = element.leaveDate + " " + hourEnd;
                  let hourDataNum =
                    new Date(leaveTime).getTime() -
                    new Date(arrivalTime).getTime();
                  let myHourNum = Math.abs(hourDataNum / (60 * 60 * 1000)); //将负数化为正数
                  if (myHourNum < 1) {
                    element.hourCheckIn = 1;
                  } else {
                    element.hourCheckIn = Math.ceil(myHourNum);
                  }
                }
              });
              if (this.tabPaneData.length > 0) {
                this.showTabPane = true;
              }
              // loading.close();
            } else {
              this.$message.error(result.msg);
              this.showTabPane = false;
              // loading.close();
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      }
    },
    bookOrderCount() {
      let params = {
        hotelId: localStorage.getItem("hotelId") || "",
      };
      this.$api
        .bookOrderCount(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.orderCountData = result.data;
            this.allOrderCount = this.orderCountData.allOrderCount;
            this.toDealOrderCount = this.orderCountData.toDealOrderCount;
            this.toLiveOrderCount = this.orderCountData.toLiveOrderCount;
            this.todayLiveOrderCount = this.orderCountData.todayLiveOrderCount;
            this.todayOrderCount = this.orderCountData.todayOrderCount;
            this.$store.commit(
              "setAllOrderCount",
              this.orderCountData.allOrderCount
            );
            this.$store.commit(
              "setToDealOrderCount",
              this.orderCountData.toDealOrderCount
            );
            this.$store.commit(
              "setToLiveOrderCount",
              this.orderCountData.toLiveOrderCount
            );
            this.$store.commit(
              "setTodayLiveOrderCount",
              this.orderCountData.todayLiveOrderCount
            );
            this.$store.commit(
              "setTodayOrderCount",
              this.orderCountData.todayOrderCount
            );
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //切换tab
    typeActiveFun(tab, event) {
      let index = Number(tab.index);
      this.queryType = index + 1;
      this.bookOrderList();
      this.tabPaneData = this.orderDataList;
      this.typeNameTab = tab.paneName;
      if (tab.paneName === "未处理订单") {
        this.$store.commit("setIsNotDeal", false); //根据tab状态控制筛选输入框的显示隐藏
      } else {
        this.$store.commit("setIsNotDeal", true);
      }
    },
  },
  beforeDestroy() {
    // clearInterval(timorOrder);
    this.$store.commit("setIsNotDeal", false);
  },
};
</script>

<style lang="less" scoped>
.HotelBookOrderList {
  width: 100%;
  position: relative;
  /deep/ .el-tabs__header {
    margin: 0 !important;
  }
}

.nullData {
  width: 100%;
  line-height: 56px;
  color: #909399;
  font-size: 14px;
  position: absolute;
  top: 250px;
  left: 0;
}
.tabPaneTips {
  position: relative;
}
.badgeBox {
  background: #f59a23;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: absolute;
  z-index: 999;
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.one {
  left: 64px;
  top: -4px;
}
.two {
  left: 160px;
  top: -4px;
}
.three {
  left: 256px;
  top: -4px;
}
.four {
  left: 338px;
  top: -4px;
}
.five {
  left: 434px;
  top: -4px;
}
</style>