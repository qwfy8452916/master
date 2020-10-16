<template>
  <div class="LonganBookOrder">
    <el-tabs v-model="typeNameTab" @tab-click="typeActiveFun">
      <el-tab-pane label="未处理订单" name="未处理订单">
        <LonganBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='未处理订单'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></LonganBookOrderTabPane>
        <div v-if="!showTabPane" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="今日新订" name="今日新订">
        <LonganBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='今日新订'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></LonganBookOrderTabPane>
        <div v-if="!showTabPane" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="今日入住" name="今日入住">
        <LonganBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='今日入住'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></LonganBookOrderTabPane>
        <div v-if="!showTabPane" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="待入住" name="待入住">
        <LonganBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='待入住'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></LonganBookOrderTabPane>
        <div v-if="!showTabPane" class="nullData">暂无更多订单</div>
      </el-tab-pane>
      <el-tab-pane label="全部订单" name="全部订单">
        <LonganBookOrderTabPane
          v-if="showTabPane&&typeNameTab=='全部订单'"
          :tabPaneData="tabPaneData"
          :total="total"
          :typeNameTab="typeNameTab"
          @bookOrderList="bookOrderList"
        ></LonganBookOrderTabPane>
        <div v-if="!showTabPane" class="nullData">暂无更多订单</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import LonganBookOrderTabPane from "./LonganBookOrderTabPane";
export default {
  name: "LonganBookOrder",
  components: {
    LonganBookOrderTabPane,
  },
  data() {
    return {
      typeNameTab: "未处理订单",
      orderDataList: [],
      tabPaneData: [],
      showTabPane: false,
      queryType: 1,
      total: 0,
    };
  },
  mounted() {
    this.bookOrderList();
  },
  methods: {
    //订单列表
    bookOrderList(paramsData) {
      const loading = this.$loading({
        lock: true,
        text: "加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(192,196,204, 0.4)",
      });
      let type = this.queryType;
      if (type == 5) {
        type = "";
      }
      const paramsObj = paramsData||{};
      const newObj = {
        queryType: type,
      };
      let params = Object.assign(paramsObj, newObj);
      this.$api
        .bookOrderList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.orderDataList = result.data.records;
            this.total = result.data.total;
            this.tabPaneData = this.orderDataList;
            if (this.tabPaneData.length > 0) {
              this.showTabPane = true;
            }
            loading.close();
          } else {
            this.$message.error(result.msg);
            this.showTabPane = false;
            loading.close();
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
            .then(() => {})
            .catch((e) => {
              e;
            });
        });
      loading.close();
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
};
</script>

<style lang="less" scoped>
.LonganBookOrder {
  width: 100%;
}
.sortBox {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  /deep/ .el-select {
    margin-left: 20px;
  }
}
.nullData {
  width: 100%;
  line-height: 56px;
  color: #909399;
  font-size: 14px;
}
</style>