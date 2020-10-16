<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="创建人" prop="contractedEnterprisesId">
        <el-select v-model="empId" placeholder="请选择创建人">
          <el-option
            v-for="item in EnterprisesList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
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
    <el-table :data="CabinetList" :fit="true" border stripe>
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column label="加价类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.adaptPriceType == 1">折扣</span>
          <span v-if="scope.row.adaptPriceType == 2">固定金额</span>
        </template>
      </el-table-column>
      <el-table-column prop="adaptPrice" label="弹性范围" align="center"></el-table-column>
      <el-table-column prop="empName" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">查看弹性价订单</el-button>
          <!-- <el-button type="text" size="small" @click="CabinetglUpdate(scope.$index, CabinetList)">解绑</el-button> -->
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
  name: "HotelAdaptPriceList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,

      empId: "",
      dateRange: [],

      EnterprisesList: [],
      hotelId: "",
      orgId: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.hotelId = localStorage.getItem("hotelId");
    this.orgId = localStorage.getItem("orgId");
    this.getEnterprises();
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.empId = "";
      this.dateRange = [];
      // this.status = ''
      this.Getdata();
    },
    getEnterprises() {
      let that = this;
      let params = {
        orgId: this.orgId,
      };
      this.$api
        .staffOrgList(params)
        .then((response) => {
          if (response.data.code == 0) {
            that.EnterprisesList = response.data.data.map((item) => {
              return {
                id: item.id,
                label: item.empName,
              };
            });
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        empId: this.empId,
        dateRange: this.dateRange,
      });
    },
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelAdaptPriceOrderList",
        query: { id: guiId },
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        empId: this.empId,
        hotelId: this.hotelId,
        createFrom: this.dateRange[0],
        createTo: this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getAdaptPriceList({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.status = item.status ? false : true;
            });
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

