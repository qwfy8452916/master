<template>
  <div class="predictearningslist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="组织">
        <el-select
          v-model="inquireOrganization"
          filterable
          remote
          :remote-method="remoteOrgan"
          :loading="loadingO"
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
      <!-- <el-form-item label="类别">
                <el-select v-model="inquireEarningsType" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="订单分成" value="1"></el-option>
                    <el-option label="订房分成" value="2"></el-option>
                    <el-option label="退款" value="3"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="身份">
        <el-select v-model="inquireIdentity" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="住橙" value="2"></el-option>
          <el-option label="酒店" value="3"></el-option>
          <el-option label="供应商" value="4"></el-option>
          <el-option label="入驻商" value="5"></el-option>
          <el-option label="城市运营商" value="6"></el-option>
          <el-option label="合伙人" value="7"></el-option>
          <el-option label="加盟商" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
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
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
        <!-- <el-button class="resetbtn" type="primary" @click="resetInquire">重&nbsp;&nbsp;置</el-button> -->
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="EarningsDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="orgName" label="组织" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column label="功能区">
        <template slot-scope="scope">
          <span v-if="scope.row.funcId == -1">客房预订</span>
          <span v-else>{{scope.row.funcName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orgAsName" label="身份">
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.orgAs == 2">住橙</span>
                    <span v-else-if="scope.row.orgAs == 3">酒店</span>
                    <span v-else-if="scope.row.orgAs == 4">供应商</span>
                    <span v-else-if="scope.row.orgAs == 5">入驻商</span>
                    <span v-else-if="scope.row.orgAs == 6">城市运营商</span>
                    <span v-else-if="scope.row.orgAs == 7">合伙人</span>
                    <span v-else-if="scope.row.orgAs == 8">加盟商</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="tradeDate" label="交易日期" width="160px" align="center"></el-table-column>
      <el-table-column prop="salesAmount" label="销售金额(元)" align="center"></el-table-column>
      <el-table-column prop="revenueAmount" label="分成金额(元)" align="center"></el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganPredictEarnings",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      inquireOrganization: "",
      organNameList: [],
      loadingO: false,
      inquireHotelName: "",
      hotelList: [],
      loadingH: false,
      inquireEarningsType: "",
      inquireIdentity: "",
      inquireTime: [],
      EarningsDataList: [],
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.getnowdate();
    this.predictEarningsList();
  },
  methods: {
    resetFunc() {
      this.inquireOrganization = "";
      this.inquireHotelName = "";
      this.inquireIdentity = "";
      this.inquireTime = [];
      this.predictEarningsList();
    },
    //组织列表
    getOrgan(oName) {
      let that = this;
      this.loadingO = true;
      let params = {
        orgName: oName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getOrganization({ params })
        .then((response) => {
          this.loadingO = false;
          const result = response.data;
          if (result.code == 0) {
            that.organNameList = result.data.records;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    remoteOrgan(val) {
      this.getOrgan(val);
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
    //获取当月日期
    getnowdate() {
      let nowdate = new Date();
      let enddate =
        nowdate.getFullYear() +
        "-" +
        parseInt(nowdate.getMonth() + 1) +
        "-" +
        nowdate.getDate();
      let startdate =
        nowdate.getFullYear() +
        "-" +
        parseInt(nowdate.getMonth() + 1) +
        "-" +
        "1";
      this.inquireTime = [startdate, enddate];
    },
    //实时分成列表
    predictEarningsList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        orgId: this.inquireOrganization,
        hotelId: this.inquireHotelName,
        // divideType: this.inquireEarningsType,
        orgAs: this.inquireIdentity,
        startTime: this.inquireTime[0],
        endTime: this.inquireTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .predictEarningsList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.EarningsDataList = result.data.records.map((item) => {
              item.revenueAmount = Math.floor(item.revenueAmount * 100) / 100;
              return item;
            });
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.predictEarningsList();
      this.$store.commit("setSearchList", {
        inquireOrganization: this.inquireOrganization,
        inquireHotelName: this.inquireHotelName,
        inquireIdentity: this.inquireIdentity,
        inquireTime: this.inquireTime,
      });
    },
    //重置
    resetInquire() {
      this.inquireOrganization = "";
      this.inquireHotelName = "";
      this.inquireEarningsType = "";
      this.inquireIdentity = "";
      this.inquireTime = [];
      this.inquire();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.predictEarningsList();
    },
  },
};
</script>

<style lang="less" scoped>
.predictearningslist {
  .resetbtn.el-button--primary {
    background-color: #71a8e0;
    border-color: #71a8e0;
  }
}
</style>
