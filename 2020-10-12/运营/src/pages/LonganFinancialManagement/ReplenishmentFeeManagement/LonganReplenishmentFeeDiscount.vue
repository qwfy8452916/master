<template>
  <div class="LonganReplenishmentFeeDiscount">
    <el-form :inline="true" align="left" class="searchform">
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
      <el-form-item label="提现人">
        <el-input v-model="empName"></el-input>
      </el-form-item>
      <el-form-item label="提现状态">
        <el-select v-model="empWithdrawalStatus">
          <el-option label="全部" value></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
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
    <el-table :data="LonganReplenishmentFeeDiscountDataList" border stripe style="width:100%;">
      <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="empName" label="提现人" align="center"></el-table-column>
      <el-table-column prop="empWithdrawalAmount" label="提现金额（元）" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="提现时间" align="center"></el-table-column>
      <el-table-column prop="empWithdrawalStatus" label="提现状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.empWithdrawalStatus == '1'">成功</span>
          <span v-else-if="scope.row.empWithdrawalStatus == '2'">失败</span>
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
  name: "LonganReplenishmentFeeDiscount",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      inquireTime: [],
      LonganReplenishmentFeeDiscountDataList: [],
      HotelId: "",
      hotelNameList: [],
      empName: "",
      empWithdrawalStatus: "",
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      encryptedOrgId: "",
      hotelList: "",
      inquireHotelName: "",
      loadingH: false,
    };
  },
  mounted() {
    // this.encryptedOrgId=localStorage.getItem('orgId');
    // this.encryptedOrgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.LonganReplenishmentFeeDiscount();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.empName = "";
      this.empWithdrawalStatus = "";
      this.inquireTime = [];
      this.LonganReplenishmentFeeDiscount();
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
    //酒店提现记录
    LonganReplenishmentFeeDiscount() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        orgAs: 2,
        hotelId: this.inquireHotelName,
        empName: this.empName,
        empWithdrawalStatus: this.empWithdrawalStatus,
        applyStartTime: this.inquireTime[0],
        applyEndTime: this.inquireTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .LonganReplenishmentFeeDiscount({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.LonganReplenishmentFeeDiscountDataList =
              response.data.data.list;
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
      this.LonganReplenishmentFeeDiscount();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        empName: this.empName,
        inquireTime: this.inquireTime,
        empWithdrawalStatus: this.empWithdrawalStatus,
      });
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.LonganReplenishmentFeeDiscount();
    },
  },
};
</script>

<style lang="less" scoped>
.Revenue-font {
  text-align: left;
  margin-bottom: 20px;
}
</style>

