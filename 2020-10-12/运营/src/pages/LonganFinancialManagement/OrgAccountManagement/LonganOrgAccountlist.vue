<template>
  <div class="Accountlist">
    <el-form :inline="true" :model="query" ref="query" align="left" class="searchform">
      <el-form-item label="组织" prop="organId">
        <el-select
          v-model="query.organId"
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
      <!-- <el-form-item label="状态" prop="handlestatus">
                <el-select v-model="query.handlestatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="冻结" value="1"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
        <!-- <el-button class="resetbtn" type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="AccountlistDataList" border stripe>
      <el-table-column prop="orgName" label="组织" align="center"></el-table-column>
      <!-- <el-table-column prop="salesAmount" label="销售总额(元)" align=center></el-table-column> -->
      <el-table-column prop="revenueAmount" label="分成总额(元)" align="center"></el-table-column>
      <el-table-column prop="pendingAmount" label="待入账总额(元)" align="center"></el-table-column>
      <el-table-column prop="withdrawAmount" label="提现总额(元)" align="center"></el-table-column>
      <el-table-column prop="accountAmount" label="账户余额(元)" align="center"></el-table-column>
      <!-- <el-table-column prop="frozeAmount" label="账户锁定金额(元)" align=center></el-table-column> -->
      <el-table-column prop="frozeAmount" label="提现中金额(元)" align="center"></el-table-column>
      <el-table-column prop="accountStatus" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.accountStatus=='0'">正常</span>
          <span v-if="scope.row.accountStatus=='1'">冻结</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="240px">
        <template slot-scope="scope">
          <!-- <el-button v-if="authzData['F:BO_FIN_ACCOUNT_CHECKDIVIDE']"  type="text" size="small" @click="dividedetail(scope.row.id,scope.row.orgId)">分成明细</el-button>-->
          <el-button
            v-if="authzData['F:BO_FIN_ORGACCOUNTLIST_WAITINCOM']"
            type="text"
            size="small"
            @click="waitDivide"
          >待入账分成</el-button>
          <el-button
            v-if="authzData['F:BO_FIN_ORGACCOUNTLIST_DIVIDE']"
            type="text"
            size="small"
            @click="DivideRecord"
          >分成记录</el-button>
          <el-button
            v-if="authzData['F:BO_FIN_ACCOUNT_CHECKGETCASH']"
            type="text"
            size="small"
            @click="carrydetail(scope.row.id,scope.row.orgId)"
          >提现记录</el-button>
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
  name: "LonganOrgAccountlist",
  components: {
    resetButton,
    LonganPagination
  },
  data() {
    return {
      authzData: "",
      AccountlistDataList: [],
      query: {
        organId: "",
        inquireTime: [],
        // handlestatus:'',
      },
      organNameList: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      oprId: "",
      orgId: "",
      loadingH: false,
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
    this.oprId = localStorage.oprId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this.query[item] = this.$store.state.searchList[item];
      }
    }
    this.getOrgan();
    this.Accountlist();
  },
  methods: {
    resetFunc() {
      this.query.organId = "";
      this.query.inquireTime = [];
      // this.query.handlestatus = ''
      this.Accountlist();
    },
    //分成明细
    //  dividedetail(id,orgId){
    //     let organId=orgId
    //     this.$router.push({name:'LonganOrganDivide',query:{organId}})
    //  },

    //待入账分成
    waitDivide() {
      this.$router.push({ name: "LonganOrganWaitDivide" });
    },

    //分成记录
    DivideRecord() {
      this.$router.push({ name: "LonganOrganDivideRecord" });
    },

    //提现明细
    carrydetail(id, orgId) {
      this.$router.push({ name: "LonganCarryDetail", query: { orgId } });
    },

    //重置
    resetbtn(query) {
      this.$refs[query].resetFields();
    },

    //账户管理
    Accountlist() {
      if (this.query.inquireTime == null) {
        this.query.inquireTime = [];
      }
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        orgId: this.query.organId,
        startDate: this.query.inquireTime[0],
        endDate: this.query.inquireTime[1],
      };
      this.$api
        .getOrgaccount({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.AccountlistDataList = response.data.data.records;
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

    //查询
    inquire() {
      this.pageNum = 1;
      this.Accountlist();
      this.$store.commit("setSearchList", {
        organId: this.query.organId,
        handlestatus: this.query.handlestatus,
      });
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Accountlist();
    },
  },
};
</script>

<style lang="less" scoped>
.Accountlist {
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

