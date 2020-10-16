<template>
    <div class="HotelOrderList">
        <el-form
            :inline="true"
            align=left
            class="searchform"
        >
            <el-form-item label="功能区">
                <el-select
                    v-model="inquireFunctionName"
                    filterable
                    remote
                    :remote-method="remoteFunction"
                    :loading="loadingF"
                    @focus="getFunctionList()"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in functionList"
                        :key="item.id"
                        :label="item.funcCnName"
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
                        value=""
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
                        value=""
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
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="inquire"
                >查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc' />
            </el-form-item>
        </el-form>
        <!-- <div><el-button class="addbutton" @click="exportExe">导&nbsp;&nbsp;出</el-button></div> -->
        <el-table
            :data="HotelOrderListDataList"
            border
            stripe
            style="width:100%;"
        >
            <el-table-column
                fixed
                prop="orderCode"
                label="订单编号"
                width="180px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="serialNumber"
                label="流水号"
                width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="funcName"
                label="功能区"
                width="100px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="roomFloor"
                label="区域"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="roomCode"
                label="地点"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="prodCount"
                label="商品数量"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="totalAmount"
                label="商品金额"
                min-width="80px"
                align=center
            >
            </el-table-column>
            <el-table-column
                prop="couponAmount"
                label="优惠金额"
                min-width="100px"
                align=center
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
                min-width="100px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="actualPay"
                label="实付金额"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="customerId"
                label="用户ID"
                min-width="80px"
                align=center
            ></el-table-column>
            <!-- <el-table-column prop="nickName" label="用户昵称" align=center></el-table-column> -->
            <el-table-column
                prop="contactPhone"
                label="手机号"
                width="120px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="orderStatus"
                label="订单状态"
                min-width="80px"
                align=center
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
                align=center
            ></el-table-column>
            <el-table-column
                prop="payCompleteTime"
                label="支付时间"
                width="160px"
                align=center
            ></el-table-column>
            <el-table-column
                prop="cancelTime"
                label="取消时间"
                width="160px"
                align=center
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                min-width="140px"
                align=center
            >
                <template slot-scope="scope">
                    <el-button
                        v-if="authzlist['F:BH_ORDER_ORDERLIST_DETAIL']"
                        type="text"
                        size="small"
                        @click="prodDetails(scope.row.id)"
                    >商品详情</el-button>
                    <el-button
                        type="text"
                        size="small"
                        :disabled="scope.row.allVouUserCount==0?true:false"
                        @click="couponDetails(scope.row.id)"
                    >卡券详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <HotelPagination
            :pageTotal="pageTotal"
            @pageFunc="pageFunc"
        />
    </div>

</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelOrderList",
  components: {
    HotelPagination,
    resetButton
  },
  data() {
    return {
      authzlist: {}, //权限数据
      hotelId: "",
      inquireFunctionName: "",
      functionList: [],
      loadingF: false,
      inquireTime: [],
      orderAmountStatus: "",
      status: "1",
      phone: "",
      HotelOrderListDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      oprId: "",
      token: ""
    };
  },
  mounted() {
    // this.oprId=localStorage.getItem('orgId');
    // this.oprId = this.$route.params.orgId;
    this.$control
      .jurisdiction(this, 3)
      .then(response => {
        this.authzlist = response;
      })
      .catch(err => {
        this.datalist = err;
      }); //获取权限数据
    this.token = localStorage.getItem("Authorization");
    this.hotelId = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getFunctionList();
    this.HotelOrderList();
  },
  methods: {
    resetFunc() {
      this.inquireFunctionName = "";
      this.phone = "";
      this.orderAmountStatus = "";
      this.status = "1";
      this.inquireTime = [];
      this.HotelOrderList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.HotelOrderList();
    },
    //功能区列表
    getFunctionList(fName) {
      this.loadingF = true;
      const params = {
        funcName: fName,
        hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 50
      };
      this.$api
        .hotelFunctionList(params)
        .then(response => {
          this.loadingF = false;
          const result = response.data;
          if (result.code == 0) {
            this.functionList = result.data.records.map(item => {
              return {
                id: item.id,
                funcCnName: item.funcCnName
              };
            });
            const functionAll = {
              id: "",
              funcCnName: "全部"
            };
            this.functionList.unshift(functionAll);
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
    remoteFunction(val) {
      this.getFunctionList(val);
    },
    //所有商品订单
    HotelOrderList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        // encryOprOrgId : this.oprId,
        hotelId: this.hotelId,
        funcId: this.inquireFunctionName,
        startTime: this.inquireTime[0],
        endTime: this.inquireTime[1],
        status: this.status,
        orderAmountStatus: this.orderAmountStatus,
        phone: this.phone,
        orgAs: 3,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      this.$api
        .HotelOrderList(params)
        .then(response => {
          if (response.data.code == 0) {
            this.HotelOrderListDataList = response.data.data.records;
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
      this.HotelOrderList();
      this.$store.commit("setSearchList", {
        inquireFunctionName: this.inquireFunctionName,
        phone: this.phone,
        orderAmountStatus: this.orderAmountStatus,
        status: this.status,
        inquireTime: this.inquireTime
      });
    },
    //商品详情
    prodDetails(id) {
      this.$router.push({ name: "HotelOrderDetails", query: { id } });
    },
    //卡券详情
    couponDetails(id) {
      this.$router.push({ name: "HotelOrderCouponDetails", query: { id } });
    },
    //导出
    exportExe() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      window.location.href =
        "http://hotel.kefangbao.com.cn/longan/api/order/hotel/export/download?orgAs=3&hotelId=" +
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
      // window.location.href = "http://3020ff7582.qicp.vip:32025/longan/api/order/hotel/export/download?orgAs=3&hotelId="+ this.hotelId +"&phone="+ this.phone +"&orderAmountStatus="+ this.orderAmountStatus +"&status="+ this.status +"&startTime="+ this.inquireTime[0] +"&endTime="+ this.inquireTime[1];
    }
  }
};
</script>

<style lang="less" scoped>
.Revenue-font {
  text-align: left;
  margin-bottom: 20px;
}
</style>

