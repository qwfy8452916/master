<template>
  <div class="owndeliverylist">
    <el-form
      :inline="true"
      align="left"
      class="searchform"
    >
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
      <el-form-item label="状态">
        <el-select
          v-model="inquireStatus"
          placeholder="请选择"
        >
          <el-option
            label="全部"
            value
          ></el-option>
          <el-option
            label="待确认"
            value="0"
          ></el-option>
          <el-option
            label="已确认"
            value="1"
          ></el-option>
          <el-option
            label="已发货"
            value="2"
          ></el-option>
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
    <el-table
      :data="DeliveryDataList"
      border
      stripe
      style="width:100%;"
    >
      <el-table-column
        fixed
        prop="orderDeliveryDTO.delivCode"
        label="配送单号"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderDeliveryDTO.hotelName"
        label="酒店名称"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        prop="orderDeliveryDTO.roomFloor"
        label="楼层"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderDeliveryDTO.roomCode"
        label="房间号"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderDeliveryDTO.funcName"
        label="功能区"
        min-width="100px"
      ></el-table-column>
      <!-- <el-table-column prop="delivWay" label="配送方式" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.delivWay == 1">客房配送</span>
                    <span v-else-if="scope.row.delivWay == 2">快递到家</span>
                </template>
      </el-table-column>-->
      <el-table-column
        prop="prodProductDTO.prodName"
        label="商品名称"
        min-width="240px"
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
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="couponAmount"
        label="优惠金额"
        min-width="100px"
        align=center
      ></el-table-column>
      <!-- <el-table-column
                prop="allVouDeductAmount"
                label="抵扣金额"
                min-width="80px"
                align="center"
            ></el-table-column> -->
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
        prop="orderDeliveryDTO.contactPhone"
        label="手机号"
        width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderDeliveryDTO.payCompleteTime"
        label="支付时间"
        width="160px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderDeliveryDTO.status"
        label="状态"
        min-width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.orderDeliveryDTO.status=='0'">待确认</span>
          <span v-if="scope.row.orderDeliveryDTO.status=='1'">已确认</span>
          <span v-if="scope.row.orderDeliveryDTO.status=='2'">已配送</span>
          <span v-if="scope.row.orderDeliveryDTO.status=='3'">部分退款</span>
          <span v-if="scope.row.orderDeliveryDTO.status=='4'">全部退款</span>
          <span v-if="scope.row.orderDeliveryDTO.status=='5'">已收货</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="deliveryDetail(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MerchantPagination
      :pageTotal="pageTotal"
      @pageFunc="pageFunc"
    />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import MerchantPagination from "@/components/MerchantPagination";
export default {
  name: "MerchantServiceDeliveryList",
  components: {
    MerchantPagination,
    resetButton
  },
  data() {
    return {
      authzData: "",
      inquireDeliveryCode: "",
      inquirePhone: "",
      inquireHotelName: "",
      hotelList: [],
      loadingH: false,
      inquireFunctionName: "",
      functionList: [],
      loadingF: false,
      inquireStatus: "",
      inquireTime: [],
      DeliveryDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1
    };
  },
  created() {
    this.$control
      .jurisdiction(this, 3)
      .then(response => {
        this.authzData = response;
      })
      .catch(err => {
        this.authzData = err;
      });
  },
  mounted() {
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.getFunctionList();
    this.serviceDeliveryList();
  },
  methods: {
    resetFunc() {
      this.inquireDeliveryCode = "";
      this.inquirePhone = "";
      this.inquireHotelName = "";
      this.inquireFunctionName = "";
      this.inquireStatus = "";
      this.inquireTime = [];
      this.serviceDeliveryList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.serviceDeliveryList();
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 5,
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
    //功能区列表
    getFunctionList(fName) {
      this.loadingF = true;
      const params = {
        funcName: fName,
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
    //配送单列表
    serviceDeliveryList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        deliveryCode: this.inquireDeliveryCode,
        contactPhone: this.inquirePhone,
        hotelId: this.inquireHotelName,
        funcId: this.inquireFunctionName,
        status: this.inquireStatus,
        payStartTime: this.inquireTime[0],
        payEndTime: this.inquireTime[1],
        // orgAs: 5,
        // choose: 1,
        // delivCode: this.inquireDeliveryCode,
        // contactMobile: this.inquirePhone,
        // hotelId: this.inquireHotelName,
        // deilvState: this.inquireStatus,
        // startPayAt: this.inquireTime[0],
        // endPayAt: this.inquireTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      this.$api
        .AllDeliverylist(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.DeliveryDataList = result.data.records;
            this.pageTotal = result.data.total;
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
    //查看详情
    deliveryDetail(id) {
      this.$router.push({
        name: "MerchantServiceDeliveryDetail",
        query: { id }
      });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.serviceDeliveryList();
      this.$store.commit("setSearchList", {
        inquireDeliveryCode: this.inquireDeliveryCode,
        inquirePhone: this.inquirePhone,
        inquireHotelName: this.inquireHotelName,
        inquireFunctionName: this.inquireFunctionName,
        inquireStatus: this.inquireStatus,
        inquireTime: this.inquireTime
      });
    }
  }
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
.owndeliverylist {
}
</style>
