<template>
  <div class="LonganOrderList">
    <el-form
      :inline="true"
      align="left"
      class="searchform"
    >
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
      <el-form-item label="手机号">
        <el-input v-model="phone"></el-input>
      </el-form-item>
      <el-form-item label="订单金额">
        <el-select v-model="orderAmountStatus">
          <el-option
            label="全部"
            value
          ></el-option>
          <el-option
            label="为0"
            value="0"
          ></el-option>
          <el-option
            label="不为0"
            value="1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="status">
          <el-option
            label="全部"
            value
          ></el-option>
          <el-option
            label="待支付"
            value="0"
          ></el-option>
          <el-option
            label="已支付"
            value="1"
          ></el-option>
          <el-option
            label="已取消"
            value="2"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="inquireTime"
          type="daterange"
          range-separator="至"
          start-placeholder="请选择日期"
          end-placeholder="请选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="inquire"
        >查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <!-- <div><el-button class="addbutton" @click="exportExe">导&nbsp;&nbsp;出</el-button></div> -->
    <el-table
      :data="LonganOrderListDataList"
      border
      stripe
      style="width:100%;"
    >
      <el-table-column
        fixed
        prop="orderCode"
        label="订单编号"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="hotelName"
        label="酒店名称"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        prop="roomFloor"
        label="区域"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="roomCode"
        label="地点"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="prodCount"
        label="商品数量"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="totalAmount"
        label="商品金额"
        min-width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="couponAmount"
        label="优惠金额"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="allVouDeductAmount"
        label="抵扣金额"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="discountAmount"
        label="减免金额"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="actualPay"
        label="实付金额"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="customerId"
        label="用户ID"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickName"
        label="用户昵称"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        prop="contactPhone"
        label="手机号"
        width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        min-width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 0">待支付</span>
          <span v-else-if="scope.row.orderStatus == 1">已支付</span>
          <span v-else-if="scope.row.orderStatus == 2">已取消</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payTime"
        label="下单时间"
        width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.payTime == '1970-01-01 00:00:00'?'':scope.row.payTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payCompleteTime"
        label="支付时间"
        width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.payCompleteTime == '1970-01-01 00:00:00'?'':scope.row.payCompleteTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cancelTime"
        label="取消时间"
        width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.cancelTime == '1970-01-01 00:00:00'?'':scope.row.cancelTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_ORDER_ORDER_PROD']"
            type="text"
            size="small"
            @click="productdetails(scope.row.id)"
          >商品详情</el-button>
          <el-button
            v-if="authzData['F:BO_ORDER_ORDER_DELIV'] && scope.row.orderStatus != 2"
            type="text"
            size="small"
            @click="deliverydetails(scope.row.id)"
          >配送详情</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="scope.row.allVouUserCount==0?true:false"
            @click="couponDetails(scope.row.id)"
          >卡券详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination
      :pageTotal="pageTotal"
      @pageFunc="pageFunc"
    />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganOrderList",
  components: {
    LonganPagination,
    resetButton
  },
  data() {
    return {
      authzData: "",
      inquireTime: [],
      hotelId: "",
      hotelList: [],
      orderAmountStatus: "",
      status: "1",
      phone: "",
      LonganOrderListDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      oprId: "",
      loadingH: false,
      token: ""
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then(response => {
        this.authzData = response;
      })
      .catch(err => {
        this.authzData = err;
      });
    this.token = localStorage.getItem("Authorization");
    // this.oprId=localStorage.getItem('orgId');
    // this.oprId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.LonganOrderList();
  },
  methods: {
    resetFunc() {
      this.hotelId = "";
      this.phone = "";
      this.orderAmountStatus = "";
      this.status = "";
      this.inquireTime = [];
      this.LonganOrderList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.LonganOrderList();
    },
    //获取所有酒店名称
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
        pageSize: 50
      };
      this.$api
        .hotelList(params)
        .then(response => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map(item => {
              return {
                id: item.id,
                hotelName: item.hotelName
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部"
            };
            this.hotelList.unshift(hotelAll);
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    remoteHotel(val) {
      this.getHotelList(val);
    },
    //商品订单
    LonganOrderList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        hotelId: this.hotelId,
        startTime: this.inquireTime[0],
        endTime: this.inquireTime[1],
        status: this.status,
        orderAmountStatus: this.orderAmountStatus,
        phone: this.phone,
        orgAs: 2,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      this.$api
        .LonganOrderList(params)
        .then(response => {
          if (response.data.code == 0) {
            this.LonganOrderListDataList = response.data.data.records;
            this.pageTotal = response.data.data.total;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(err => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.LonganOrderList();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        phone: this.phone,
        orderAmountStatus: this.orderAmountStatus,
        status: this.status,
        inquireTime: this.inquireTime
      });
    },
    //页面跳转
    current() {
      this.pageNum = this.currentPage;
      this.LonganOrderList();
    },
    //上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.LonganOrderList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.LonganOrderList();
    },
    //商品详情
    productdetails(id) {
      this.$router.push({ name: "LonganOrderProductDetails", query: { id } });
    },
    //配送详情
    deliverydetails(id) {
      this.$router.push({ name: "LonganOrderDeliveryDetails", query: { id } });
    },
    //卡券详情
    couponDetails(id) {
      this.$router.push({ name: "LonganOrderCouponDetails", query: { id } });
    },
    //导出
    exportExe() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      window.location.href =
        "http://opr.kefangbao.com.cn/longan/api/order/export/download?orgAs=2&hotelId=" +
        this.hotelId +
        "&phone=" +
        this.phone +
        "&orderAmountStatus=" +
        this.orderAmountStatus +
        "&status=" +
        this.status +
        "&startTime=" +
        this.inquireTime[0] +
        "&endTime=" +
        this.inquireTime[1] +
        "&token=" +
        this.token;
      // window.location.href = "http://3020ff7582.qicp.vip:32025/longan/api/order/export/download?orgAs=2&hotelId="+ this.hotelId +"&phone="+ this.phone +"&orderAmountStatus="+ this.orderAmountStatus +"&status="+ this.status +"&startTime="+ this.inquireTime[0] +"&endTime="+ this.inquireTime[1];
    }
  }
};
</script>

<style lang="less" scoped>
.Revenue-font {
  text-align: left;
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>

