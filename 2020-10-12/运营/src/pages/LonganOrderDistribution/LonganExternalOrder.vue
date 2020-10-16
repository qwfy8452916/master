<template>
  <div class="ExternalOrder">
    <el-form :inline="true" align="left">
      <el-form-item label="酒店名称">
        <el-select
          v-model="hotelId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="外部物流">
        <el-select v-model="lgcId">
          <el-option
            v-for="item in exterlogisticsData"
            :key="item.id"
            :label="item.lgcName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送单号">
        <el-input v-model="logisticsName"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="logisticsDelivStatus">
          <el-option label="全部" value></el-option>
          <el-option label="待接单" value="1"></el-option>
          <el-option label="待取货" value="2"></el-option>
          <el-option label="配送中" value="3"></el-option>
          <el-option label="已完成" value="4"></el-option>
          <el-option label="已取消" value="5"></el-option>
          <el-option label="异常" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="logisticsData" border stripe>
      <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="logisticsName" label="外部物流" align="center"></el-table-column>
      <el-table-column prop="orderDelivId" label="配送单号" align="center"></el-table-column>
      <el-table-column prop="shopNo" label="门店编号" align="center"></el-table-column>
      <el-table-column prop="cityCode" label="城市code" align="center"></el-table-column>
      <el-table-column prop="goodsAmount" label="商品数量" align="center"></el-table-column>
      <el-table-column prop="orderPrice" label="订单金额" align="center"></el-table-column>
      <el-table-column prop="deliveryFee" label="配送费" align="center"></el-table-column>
      <el-table-column prop="realDeliveryFee" label="实际支付费用" align="center"></el-table-column>
      <el-table-column prop="logisticsDelivStatus" label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.logisticsDelivStatus==1">待接单</span>
          <span v-if="scope.row.logisticsDelivStatus==2">待取货</span>
          <span v-if="scope.row.logisticsDelivStatus==3">配送中</span>
          <span v-if="scope.row.logisticsDelivStatus==4">已完成</span>
          <span v-if="scope.row.logisticsDelivStatus==5">已取消</span>
          <span v-if="scope.row.logisticsDelivStatus==6">异常</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>
<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganExternalOrder",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: {},
      logisticsData: [],
      exterlogisticsData: [],
      logisticsName: "",
      logisticsDelivStatus: "",
      lgcId: "",
      hotelId: "",
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingH: false,
      hotelList: [],
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzData = response;
      })
      .catch((err) => {
        this.authzData = err;
      });

    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.exterlogistics();
    this.getHotelList();
    this.getExternalOrder();
  },
  methods: {
    resetFunc() {
      this.logisticsName = "";
      this.logisticsDelivStatus = "";
      this.lgcId = "";
      this.hotelId = "";
      this.getExternalOrder();
    },

    //获取列表数据
    getExternalOrder() {
      let that = this;
      let params = {
        hotelId: this.hotelId,
        orderDelivId: this.logisticsName,
        logisticsDelivStatus: this.logisticsDelivStatus,
        lgcId: this.lgcId,
        pageNo: that.pageNum,
        pageSize: that.pageSize,
      };
      this.$api
        .exterDeliOrder({ params })
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            that.logisticsData = result.data.records;
            that.pageTotal = result.data.total;
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((err) => {
          that.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .hotelList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部",
            };
            this.hotelList.unshift(hotelAll);
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
    remoteHotel(val) {
      this.getHotelList(val);
    },

    //获取外部物流
    exterlogistics() {
      let that = this;
      this.$api
        .exterlogistics()
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            that.exterlogisticsData = result.data;
            const logisticsDatAll = {
              id: "",
              lgcName: "全部",
            };
            that.exterlogisticsData.unshift(logisticsDatAll);
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((err) => {
          that.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //详情
    detail(id) {
      this.$router.push({ name: "LonganExternalDetail", query: { id } });
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.getExternalOrder();
      this.$store.commit("setSearchList", {
        logisticsName: this.logisticsName,
        hotelId: this.hotelId,
        logisticsDelivStatus: this.logisticsDelivStatus,
        lgcId: this.lgcId,
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getExternalOrder();
    },
  },
};
</script>

<style lang="less" scope>
.ExternalOrder {
  .pagination {
    margin-top: 20px;
  }
}
</style>
