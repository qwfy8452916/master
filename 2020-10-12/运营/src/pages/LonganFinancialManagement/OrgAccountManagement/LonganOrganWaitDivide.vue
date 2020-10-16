<template>
  <div class="getWaitDivide">
    <el-form :inline="true" :model="query" ref="query" align="left" class="searchform">
      <el-form-item label="组织" prop="orgId">
        <el-select
          v-model="query.orgId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getOrgan()"
        >
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in organNameList"
            :key="item.index"
            :label="item.orgName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-select
          v-model="query.hotelId"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          @change="selectHotel"
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
      <el-form-item label="订单类型">
        <el-select v-model="query.funId" filterable remote>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in orderTypeData"
            :key="item.index"
            :label="item.funcCnName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层房间号">
        <el-input v-model="query.roomFloorAndCode"></el-input>
      </el-form-item>
      <el-form-item label="分成身份">
        <el-select v-model="query.revenueAs">
          <el-option label="全部" value></el-option>
          <el-option label="平台" value="2"></el-option>
          <el-option label="酒店" value="3"></el-option>
          <el-option label="供应商" value="4"></el-option>
          <el-option label="城市运营商" value="6"></el-option>
          <el-option label="合伙人" value="7"></el-option>
          <el-option label="加盟商" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单">
        <el-input v-model="query.orderCode"></el-input>
      </el-form-item>
      <el-form-item label="入账状态">
        <el-select v-model="query.pendingStatus">
          <el-option label="待入账" value="0"></el-option>
          <el-option label="已入账" value="1"></el-option>
          <el-option label="已取消" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间" prop="inquireTime">
        <el-date-picker
          v-model="query.inquireTime"
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
        <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="WaitDivideDataList" border stripe style="width:100%;">
      <el-table-column prop="orgName" label="组织" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店" align="center"></el-table-column>
      <el-table-column prop="roomFloor" label="楼层房间号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.roomFloor}}-{{scope.row.roomCode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="funcName" label="订单类型" align="center"></el-table-column>
      <el-table-column prop="orderCode" label="订单号" align="center"></el-table-column>
      <el-table-column prop="delivCode" label="配送单号" align="center"></el-table-column>
      <el-table-column prop="prodName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="prodShowName" label="商品显示名称" align="center"></el-table-column>
      <el-table-column prop="prodAmount" label="商品金额" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="revenueAs" label="分成身份" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.revenueAs==2">平台</span>
          <span v-if="scope.row.revenueAs==3">酒店</span>
          <span v-if="scope.row.revenueAs==4">供应商</span>
          <span v-if="scope.row.revenueAs==6">城市运营商</span>
          <span v-if="scope.row.revenueAs==7">合伙人</span>
          <span v-if="scope.row.revenueAs==8">加盟商</span>
        </template>
      </el-table-column>
      <el-table-column prop="pendingStatus" label="入账状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.pendingStatus==0">待入账</span>
          <span v-if="scope.row.pendingStatus==1">已入账</span>
          <span v-if="scope.row.pendingStatus==2">已取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="revenueAmount" label="待入账金额" align="center"></el-table-column>
      <el-table-column prop="settlingTime" label="入账时间" align="center"></el-table-column>
      <el-table-column prop="payCompleteTime" label="下单时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_FIN_WAITINCOM_DETAIL']"
            type="text"
            size="small"
            @click="lookdetail(scope.row.id)"
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
  name: "LonganOrganWaitDivide",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      oprId: "",
      WaitDivideDataList: [],
      hotelList: [],
      orderTypeData: [],
      query: {
        orgId: "",
        hotelId: "",
        funId: "",
        roomFloorAndCode: "",
        revenueAs: "",
        orderCode: "",
        pendingStatus: "0",
        inquireTime: [],
      },
      organNameList: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      loadingH: false,
    };
  },
  created() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzData = response;
      })
      .catch((err) => {
        this.authzData = err;
      });
  },

  mounted() {
    this.oprId = localStorage.oprId;
    this.query.orgId = this.$route.query.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this.query[item] = this.$store.state.searchList[item];
      }
    }
    this.getOrgan();
    this.HotelFuncList();
    this.getHotelList();
    this.getWaitDivide();
  },
  methods: {
    resetFunc() {
      this.query.orgId = "";
      this.query.hotelId = "";
      this.query.funId = "";
      this.query.roomFloorAndCode = "";
      this.query.revenueAs = "";
      this.query.orderCode = "";
      this.query.pendingStatus = "0";
      this.query.inquireTime = [];
      this.getWaitDivide();
    },
    //查看详情
    lookdetail(id) {
      this.$router.push({ name: "LonganOrganWaitDivideDetail", query: { id } });
    },

    //重置
    resetbtn(query) {
      this.$refs[query].resetFields();
    },

    //获取组织待入账分成记录
    getWaitDivide() {
      let that = this;
      let params = {
        orgId: this.query.orgId,
        hotelId: this.query.hotelId,
        funId: this.query.funId,
        roomFloorAndCode: this.query.roomFloorAndCode,
        revenueAs: this.query.revenueAs,
        orderCode: this.query.orderCode,
        pendingStatus: this.query.pendingStatus,
        startTime: this.query.inquireTime[0],
        endTime: this.query.inquireTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getWaitDivide({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            that.WaitDivideDataList = result.data.records;
            that.pageTotal = result.data.total;
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    selectHotel() {
      this.query.funId = "";
      this.HotelFuncList();
    },

    //获取订单类型
    HotelFuncList() {
      let that = this;
      let params = {
        isNeedBookRoom: 1,
        isNotNeedDef: 1,
        hotelId: that.query.hotelId,
      };
      this.$api
        .HotelFuncList(params)
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            that.orderTypeData = result.data.records;
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取组织
    getOrgan(hName) {
      let that = this;
      let params = {
        orgName: hName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getOrganization({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.organNameList = response.data.data.records;
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

    remoteHotel(val) {
      this.getOrgan(val);
    },

    //获取所有酒店名称
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

    //查询
    inquire() {
      this.pageNum = 1;
      this.getWaitDivide();
      this.$store.commit("setSearchList", {
        orgId: this.query.orgId,
        hotelId: this.query.hotelId,
        funId: this.query.funId,
        roomFloorAndCode: this.query.roomFloorAndCode,
        revenueAs: this.query.revenueAs,
        orderCode: this.query.orderCode,
        pendingStatus: this.query.pendingStatus,
        inquireTime: this.query.inquireTime,
      });
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getWaitDivide();
    },
  },
};
</script>

<style lang="less" scoped>
.getWaitDivide {
  .Revenue-font {
    text-align: left;
    margin-bottom: 20px;
  }
  .cell a {
    display: block;
    margin-bottom: 10px;
  }
  .resetbtn.el-button--primary {
    background-color: #71a8e0;
    border-color: #71a8e0;
  }
}
</style>

