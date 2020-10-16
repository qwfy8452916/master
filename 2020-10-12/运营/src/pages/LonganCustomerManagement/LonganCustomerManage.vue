<template>
  <div class="customerlist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="ID">
        <el-input v-model="inquireID" @change="verifyNumber"></el-input>
      </el-form-item>
      <!-- <el-form-item label="昵称">
                <el-input v-model="inquireNickname"></el-input>
      </el-form-item>-->
      <el-form-item label="手机号">
        <el-input v-model="inquirePhone"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否认证分享">
                <el-select v-model="inquireIsShare" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="是否会员">
        <el-select v-model="inquireIsCap" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="customerDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="commonId" label="顾客ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="nickName" label="昵称" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号码" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="memberLevel" label="是否会员" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.memberLevel == 1">是</span>
          <span v-else-if="scope.row.memberLevel == 0">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="shareLevel" label="分销级别" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.shareLevel == -1">未参与</span>
          <span v-else-if="scope.row.shareLevel == 0">分销推广员</span>
          <span v-else-if="scope.row.shareLevel == 1">分销管理员</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="isConfirmShare" label="认证分享" min-width="80px" align=center></el-table-column> -->
      <!-- <el-table-column prop="regimentalCommander" label="是否为团长" min-width="100px" align=center></el-table-column> -->
      <el-table-column prop="firstVisitTimeStr" label="首次访问时间" min-width="240px" align="center"></el-table-column>
      <el-table-column prop="lastVisitTimeStr" label="最后登录时间" min-width="160px" align="center"></el-table-column>
      <!-- <el-table-column prop="lastHotelName" label="最后访问酒店" min-width="240px" align=center></el-table-column> -->
      <el-table-column prop="incomeAmount" label="收入总额" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="pendingAmount" label="待入账总额" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="withdrawAmount" label="提现总额" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="balanceAmount" label="账户余额" min-width="100px" align="center"></el-table-column>

      <el-table-column prop="shareAmount" label="分享次数" min-width="100px" @click="funSharelist()"></el-table-column>
      <el-table-column
        prop="shareVisitAmount"
        label="分享访问次数"
        min-width="100px"
        @click="funShareVisit()"
      ></el-table-column>
      <el-table-column prop="orderAmount" label="订单数量" min-width="100px" @click="funOrderCount()"></el-table-column>
      <el-table-column prop="subordinateAmount" label="下级数量" min-width="100px"></el-table-column>

      <el-table-column fixed="right" label="操作" min-width="200px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="funStaffManageDetail(scope.row.id)">详情</el-button>
          <!-- <el-button v-if="scope.row.regimentalCommander == 1" type="text" size="small" @click="customerCapDetail(scope.row.id)">社群明细</el-button> -->
          <el-button
            v-if="authzData['F:BO_FIN_CUSTACCOUNTLIST_WAITINCOM']"
            type="text"
            size="small"
            @click="waitEnter(scope.row.id)"
          >待入账收入</el-button>
          <el-button
            v-if="authzData['F:BO_FIN_CUSTACCOUNTLIST_CUSTINCOME']"
            type="text"
            size="small"
            @click="customerMoneyDetail(scope.row.id)"
          >收支记录</el-button>
          <el-button type="text" size="small" @click="funShareVisit()">访问记录</el-button>
          <el-button type="text" size="small" @click="funOrderCount()">订单记录</el-button>
          <el-button type="text" size="small" @click="funEmployeeList()">顾客下级</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import LonganPagination from "@/components/LonganPagination";
import resetButton from "@/components/resetButton";
export default {
  name: "LonganCustomerManage",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "", //权限数据
      inquireID: "",
      inquireNickname: "",
      inquirePhone: "",
      inquireIsShare: "",
      inquireIsCap: "",
      customerDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.customerList();
  },
  methods: {
    resetFunc() {
      this.inquireID = "";
      // this.inquireNickname = "";
      this.inquirePhone = "";
      // this.inquireIsShare = "";
      this.inquireIsCap = "";
      this.customerList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.customerList();
    },
    //验证
    verifyNumber() {
      this.inquireID = this.inquireID.replace(/[^\d]/g, "");
    },
    //顾客列表
    customerList() {
      const params = {
        commonId: this.inquireID,
        isVIP: this.inquireIsCap,
        phone: this.inquirePhone,
        shareLevel: "",
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .customerList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.customerDataList = result.data.records;
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
      this.customerList();
      this.$store.commit("setSearchList", {
        inquireID: this.inquireID,
        inquireIsCap: this.inquireIsCap,
        inquirePhone: this.inquirePhone,
      });
    },
    //社群明细
    customerCapDetail(id) {
      this.$router.push({ name: "LonganCustomerList", query: { id } });
    },

    //待入账收入
    waitEnter(id) {
      this.$router.push({ name: "LonganCustomerWaitIn", query: { id } });
    },

    //收支明细
    customerMoneyDetail(id) {
      this.$router.push({ name: "LonganCustomerIncomeRecord", query: { id } });
      // this.$router.push({name: 'LonganCustomerCash', query: {id}});
    },
    //分享记录
    funSharelist() {
      this.$router.push({ name: "LonganHotelShareRecord" });
    },
    //分享访问记录
    funShareVisit() {
      this.$router.push({ name: "LonganHotelVisitRecord" });
    },
    //分享订单记录
    funOrderCount() {
      this.$router.push({ name: "LonganHotelOrderRecord" });
    },
    //顾客下级
    funEmployeeList() {
      this.$router.push({ name: "LonganCustomerList" });
    },
    //详情
    funStaffManageDetail(id) {
      this.$router.push({ name: "LonganCustomerManageDetail", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.customerlist {
  .pagination {
    margin-top: 20px;
  }
}
</style>
