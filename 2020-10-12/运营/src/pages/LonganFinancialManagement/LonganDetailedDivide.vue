<template>
  <div class="DetailedDivide">
    <el-form :inline="true" :model="query" ref="query" align="left" class="searchform">
      <el-form-item label="组织" prop="organId">
        <el-select
          v-model="query.organId"
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

      <el-form-item label="酒店名称" prop="inquireHotel">
        <el-select
          v-model="query.inquireHotel"
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
      <el-form-item label="身份" prop="identityId">
        <el-select v-model="query.identityId">
          <el-option label="全部" value></el-option>
          <el-option label="平台" value="1"></el-option>
          <el-option label="运营商" value="2"></el-option>
          <el-option label="酒店" value="3"></el-option>
          <el-option label="供应商" value="4"></el-option>
          <el-option label="入驻商" value="5"></el-option>
          <el-option label="城市运营商" value="6"></el-option>
          <el-option label="合伙人" value="7"></el-option>
          <el-option label="加盟商" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间" prop="inquireTime">
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
    <el-table :data="DetailedDivideDataList" border stripe style="width:100%;">
      <el-table-column prop="orgName" label="组织" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="revenueKindName" label="类别" align="center"></el-table-column>
      <el-table-column prop="funcName" label="功能区" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.funcId!=-1">{{scope.row.funcName}}</span>
          <span v-if="scope.row.funcId==-1">客房预订</span>
        </template>
      </el-table-column>
      <el-table-column prop="orgAs" label="身份" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orgAs=='1'">平台</span>
          <span v-if="scope.row.orgAs=='2'">运营商</span>
          <span v-if="scope.row.orgAs=='3'">酒店</span>
          <span v-if="scope.row.orgAs=='4'">供应商</span>
          <span v-if="scope.row.orgAs=='5'">入驻商</span>
          <span v-if="scope.row.orgAs=='6'">城市运营商</span>
          <span v-if="scope.row.orgAs=='7'">合伙人</span>
          <span v-if="scope.row.orgAs=='8'">加盟商</span>
        </template>
      </el-table-column>
      <el-table-column prop="revenueDate" label="交易日期" align="center"></el-table-column>
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
  name: "LonganDetailedDivide",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      DetailedDivideDataList: [],
      query: {
        organId: "",
        inquireHotel: "",
        inquireTime: [],
        identityId: "",
      },
      organNameList: [],
      hotelList: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      oprId: "",
      loadingH: false,
      loadingO: false,
    };
  },
  created() {
    this.oprId = localStorage.getItem("oprId");
    this.getnowdate();
  },

  mounted() {
    this.query.organId = this.$route.query.organId;
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
        this.query[item] = this.$store.state.searchList[item];
      }
    }
    this.getOrgan();
    this.getHotelList();
    this.DetailedDivide();
  },
  methods: {
    resetFunc() {
      this.query.organId = "";
      this.query.inquireHotel = "";
      this.query.identityId = "";
      this.query.inquireTime = [];
      this.DetailedDivide();
    },

    //重置
    resetbtn(query) {
      this.$refs[query].resetFields();
      this.query.inquireTime = [];
    },

    DetailedDivide() {
      if (this.query.inquireTime == null) {
        this.query.inquireTime = [];
      }
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        oprId: this.oprId,
        orgId: this.query.organId,
        hotelId: this.query.inquireHotel,
        orgAs: this.query.identityId,
        startDate: this.query.inquireTime[0],
        endDate: this.query.inquireTime[1],
      };
      this.$api
        .getDividetail({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.DetailedDivideDataList = response.data.data.records;
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

    remoteOrgan(val) {
      this.getOrgan(val);
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
      if (this.$route.query.datetime === undefined) {
        this.query.inquireTime[0] = startdate;
        this.query.inquireTime[1] = enddate;
      } else {
        this.query.inquireTime = this.$route.query.datetime;
      }
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.DetailedDivide();
      this.$store.commit("setSearchList", {
        organId: this.query.organId,
        inquireHotel: this.query.inquireHotel,
        identityId: this.query.identityId,
        inquireTime: this.query.inquireTime,
      });
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.DetailedDivide();
    },
  },
};
</script>

<style lang="less" scoped>
.DetailedDivide {
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

