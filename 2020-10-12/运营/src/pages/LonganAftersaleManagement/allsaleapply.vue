<template>
  <div class="aftersaleapplylist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="服务单号">
        <el-input v-model="orderId"></el-input>
      </el-form-item>
      <el-form-item label="酒店名称" prop="inquireHotel">
        <el-select
          v-model="inquireHotel"
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
      <el-form-item label="手机号">
        <el-input v-model="userMobile"></el-input>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="handlestatus">
          <el-option label="全部" value></el-option>
          <el-option label="待处理" value="1"></el-option>
          <el-option label="已通过" value="2"></el-option>
          <el-option label="已拒绝" value="3"></el-option>
          <el-option label="已撤销" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
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
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="aftersaleapplylistDataList" border stripe style="width:100%;">
      <el-table-column prop="csCode" label="服务单号" width="80px" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="funcName" label="功能区"></el-table-column>
      <el-table-column prop="prodOwnerOrgKind" label="商品类型" width="120px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.prodOwnerOrgKind=='1'">平台</span>
          <span v-if="scope.row.prodOwnerOrgKind=='2'">运营商</span>
          <span v-if="scope.row.prodOwnerOrgKind=='3'">酒店</span>
          <span v-if="scope.row.prodOwnerOrgKind=='4'">供应商</span>
          <span v-if="scope.row.prodOwnerOrgKind=='5'">入驻商家</span>
        </template>
      </el-table-column>
      <el-table-column prop="prodOwnerOrgName" label="商家" width="80px" align="center"></el-table-column>
      <el-table-column prop="orderContactName" label="订单联系人" width="120px"></el-table-column>
      <el-table-column prop="orderContactPhone" label="手机号" width="120px" align="center"></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="120px" align="center"></el-table-column>
      <el-table-column prop="csType" label="售后类型" width="120px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.csType=='1'">换货</span>
          <span v-if="scope.row.csType=='2'">退货退款</span>
          <span v-if="scope.row.csType=='3'">迷你吧</span>
          <span v-if="scope.row.csType=='4'">退款</span>
          <span v-if="scope.row.csType=='5'">确认前退款</span>
        </template>
      </el-table-column>
      <el-table-column prop="prodCount" label="申请数量" width="120px" align="center"></el-table-column>
      <el-table-column prop="refoundAmount" label="退款金额" width="120px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.csType!='2'">{{scope.row.refoundAmount}}</span>
          <span v-if="scope.row.csType=='2'"></span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="申请时间" width="120px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.createdAt==='1970-01-01 00:00:00'"></span>
          <span v-if="scope.row.createdAt!='1970-01-01 00:00:00'">{{scope.row.createdAt}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="处理状态" width="120px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='1'">待处理</span>
          <span v-if="scope.row.status=='2'">已通过</span>
          <span v-if="scope.row.status=='3'">已拒绝</span>
          <span v-if="scope.row.status=='4'">已撤销</span>
        </template>
      </el-table-column>
      <el-table-column prop="handleTime" label="处理时间" width="120px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.handleTime==='1970-01-01 00:00:00'"></span>
          <span v-if="scope.row.handleTime!='1970-01-01 00:00:00'">{{scope.row.handleTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="authzData['F:BO_CS_ALLPROD_VIEW']"
        label="操作"
        width="120px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookdetail(scope.row.id)">详情</el-button>
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
  name: "allsaleapply",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      inquireTime: [],
      aftersaleapplylistDataList: [],
      inquireHotel: "",
      handlestatus: "",
      hotelList: [],
      functionList: [],
      loadingH: false,
      loadingF: false,
      inquireFunctionName: "",
      orderId: "",
      userMobile: "",
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      oprId: "",
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
    this.oprId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.aftersaleapplylist();
  },
  methods: {
    resetFunc() {
      this.orderId = "";
      this.inquireHotel = "";
      this.inquireFunctionName = "";
      this.userMobile = "";
      this.handlestatus = "";
      this.inquireTime = [];
      this.aftersaleapplylist();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.aftersaleapplylist();
    },
    //查看详情
    lookdetail(id) {
      this.$router.push({ name: "allsaleapplydetail", query: { id } });
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

    //售后申请记录
    aftersaleapplylist() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        hotelId: this.inquireHotel,
        csCode: this.orderId,
        funcId: this.inquireFunctionName,
        status: this.handlestatus,
        mobile: this.userMobile,
        applTimeFrom: this.inquireTime[0],
        applTimeTo: this.inquireTime[1],
        orgAs: 2,
      };
      this.$api
        .allAfterSale({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.aftersaleapplylistDataList = response.data.data.records;
            this.pageTotal = response.data.data.total;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.aftersaleapplylist();
      this.$store.commit("setSearchList", {
        orderId: this.orderId,
        inquireHotel: this.inquireHotel,
        inquireFunctionName: this.inquireFunctionName,
        userMobile: this.userMobile,
        handlestatus: this.handlestatus,
        inquireTime: this.inquireTime,
      });
    },
  },
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
.cell a {
  display: block;
  margin-bottom: 10px;
}
</style>

