<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="统计时间">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column label="分销推广员数量" min-width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.promoterCounts}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分销管理员数量" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.managerCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享次数" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shareCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享访问次数" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shareVisitCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="售出商品数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.saleProdCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.orderCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.orderAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享奖励总额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shareBonus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理奖励总额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.shareManageBonus}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="empShareTotal(scope.$index, CabinetList)"
          >员工分销统计</el-button>
        </template>
      </el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelRetailRecord",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      CabinetList: [],
      loadingH: false,
      hotelList: [],
      dateRange: [],
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  created() {
    //    this.oprOgrId=localStorage.orgId
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.hotelId = parseInt(localStorage.hotelId);
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.dateRange = [];
      this.Getdata();
    },
    empShareTotal(index, row) {
      let guiId = row[index].hotelId;
      this.$router.push({
        name: "HotelEmpRetailRecord",
        query: { modifyid: guiId },
      });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        dateRange: this.dateRange,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    Getdata() {
      let that = this;
      let params = {
        hotelId: this.hotelId,
        censusTimeFrom: this.dateRange[0],
        censusTimeTo: this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .hotelShareTotal(params)
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.pageTotal = response.data.data.total;
          } else {
            that.$alert(response.data.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>

