<template>
  <div class="plateeliverylist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="配送单号">
        <el-input v-model="inquireDeliveryCode"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="inquirePhone"></el-input>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotelName"
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
      <!-- <el-form-item label="商品名称">
                <el-select v-model="inquireProdName" placeholder="请选择">
                    <el-option v-for="item in prodList" :key="item.id" :label="item.prodName" :value="item.id"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="状态">
        <el-select v-model="inquireStatus" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="待确认" value="0"></el-option>
          <el-option label="已确认" value="1"></el-option>
          <el-option label="已发货" value="2"></el-option>
          <!-- <el-option label="已配送" value="2"></el-option>
                    <el-option label="部分退款" value="3"></el-option>
                    <el-option label="全部退款" value="4"></el-option>
          <el-option label="已收货" value="5"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="inquireTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="外部配送状态">
        <el-select v-model="inquireDeliveryStatus" placeholder="请选择">
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
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="DeliveryDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="delivCode" label="配送单号" min-width="180px" align="center"></el-table-column>
      <el-table-column prop="serialNumber" label="流水号" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="delivWay" label="配送方式" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.delivWay == 1">店内送</span>
          <span v-else-if="scope.row.delivWay == 2">快递送</span>
          <span v-else-if="scope.row.delivWay == 3">迷你吧</span>
          <span v-else-if="scope.row.delivWay == 4">自提</span>
          <span v-else-if="scope.row.delivWay == 5">电子商品</span>
          <span v-else-if="scope.row.delivWay == 6">堂食</span>
          <span v-else-if="scope.row.delivWay == 7">外卖</span>
          <span v-else-if="scope.row.delivWay == 8">外带</span>
        </template>
      </el-table-column>
      <el-table-column prop="lgcName" label="外卖配送" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodOrgKindName" label="类型" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodOwner" label="商家" min-width="180px"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
      <el-table-column prop="roomFloor" label="区域" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="地点" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="funcName" label="功能区" min-width="100px"></el-table-column>
      <el-table-column prop="prodCount" label="商品总数" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="商品金额" align="center"></el-table-column>
      <el-table-column prop="couponAmount" label="优惠金额" width="80px" align="center"></el-table-column>
      <el-table-column
        prop="allVouDeductAmount"
        label="抵扣金额"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column prop="discountAmount" label="减免金额" width="80px" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="customerId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="customerName" label="用户昵称"></el-table-column>
      <el-table-column prop="contactPeople" label="订单联系人" width="100px" align="center"></el-table-column>
      <el-table-column prop="contactPhone" label="手机号" width="120px" align="center"></el-table-column>
      <el-table-column prop="payCompleteTime" label="支付时间" width="160px" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">待确认</span>
          <span v-else-if="scope.row.status == 1">已确认</span>
          <span v-else-if="scope.row.status == 2">已发货</span>
          <span v-else-if="scope.row.status == 3">部分退款</span>
          <span v-else-if="scope.row.status == 4">全部退款</span>
          <span v-else-if="scope.row.status == 5">已售后</span>
        </template>
      </el-table-column>
      <el-table-column prop="lgcStatus" label="外卖状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.lgcStatus == 1">待接单</span>
          <span v-else-if="scope.row.lgcStatus == 2">待取货</span>
          <span v-else-if="scope.row.lgcStatus == 3">配送中</span>
          <span v-else-if="scope.row.lgcStatus == 4">已完成</span>
          <span v-else-if="scope.row.lgcStatus == 5">已取消</span>
          <span v-else-if="scope.row.lgcStatus == 6">异常</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_ORDER_ALLDELIV_VIEW']"
            type="text"
            size="small"
            @click="deliveryDetail(scope.row.id)"
          >详情</el-button>
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
  name: "LonganAllDeliveryList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      // orgId: '',
      pdId: "",
      inquireDeliveryCode: "",
      inquirePhone: "",
      inquireHotelName: "",
      hotelList: [],
      loadingH: false,
      inquireFunctionName: "",
      functionList: [],
      loadingF: false,
      inquireProdName: "",
      prodList: [],
      inquireStatus: "",
      inquireTime: [],
      inquireDeliveryStatus: "",
      DeliveryDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
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
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.getFunctionList();
    // this.getProdList();
    this.allDeliveryList();
  },
  methods: {
    resetFunc() {
      this.inquireDeliveryCode = "";
      this.inquirePhone = "";
      this.inquireHotelName = "";
      this.inquireFunctionName = "";
      this.inquireStatus = "";
      this.inquireDeliveryStatus = "";
      this.inquireTime = [];
      this.allDeliveryList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.allDeliveryList();
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
    //功能区列表
    getFunctionList(fName) {
      this.loadingF = true;
      const params = {
        funcName: fName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .hotelFunctionList(params)
        .then((response) => {
          this.loadingF = false;
          const result = response.data;
          if (result.code == 0) {
            this.functionList = result.data.records.map((item) => {
              return {
                id: item.id,
                funcCnName: item.funcCnName,
              };
            });
            const functionAll = {
              id: "",
              funcCnName: "全部",
            };
            this.functionList.unshift(functionAll);
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
    remoteFunction(val) {
      this.getFunctionList(val);
    },
    //商品列表
    getProdList() {
      const params = {
        // encryptedOprOrgId: this.orgId,
        orgAs: 2,
        isActive: 1,
      };
      this.$api
        .getProdList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.prodList = result.data.map((item) => {
              return {
                id: item.prodCode,
                prodName: item.prodName,
              };
            });
            const prodAll = {
              id: "",
              prodName: "全部",
            };
            this.prodList.push(prodAll);
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
    //配送单列表
    allDeliveryList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        chooseAs: 2,
        deliveryCode: this.inquireDeliveryCode,
        contactPhone: this.inquirePhone,
        hotelId: this.inquireHotelName,
        funcId: this.inquireFunctionName,
        status: this.inquireStatus,
        lgcStatus: this.inquireDeliveryStatus,
        payStartTime: this.inquireTime[0],
        payEndTime: this.inquireTime[1],
        // orgAs: 2,
        // choose: 2,
        // delivCode: this.inquireDeliveryCode,
        // contactMobile: this.inquirePhone,
        // hotelId: this.inquireHotelName,
        // // prodId: this.inquireProdName,
        // deilvState: this.inquireStatus,
        // startPayAt: this.inquireTime[0],
        // endPayAt: this.inquireTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .platDeliveryList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.DeliveryDataList = result.data.records;
            this.pageTotal = result.data.total;
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
    //查看详情
    deliveryDetail(id) {
      this.$router.push({ name: "LonganAllDeliveryDetail", query: { id } });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.allDeliveryList();
      this.$store.commit("setSearchList", {
        inquireDeliveryCode: this.inquireDeliveryCode,
        inquirePhone: this.inquirePhone,
        inquireHotelName: this.inquireHotelName,
        inquireFunctionName: this.inquireFunctionName,
        inquireStatus: this.inquireStatus,
        inquireDeliveryStatus: this.inquireDeliveryStatus,
        inquireTime: this.inquireTime,
      });
    },
  },
};
</script>

<style scoped>
.el-dialog__footer {
  text-align: center;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>

<style lang="less" scoped>
.plateeliverylist {
  .pagination {
    margin-top: 20px;
  }
}
</style>
