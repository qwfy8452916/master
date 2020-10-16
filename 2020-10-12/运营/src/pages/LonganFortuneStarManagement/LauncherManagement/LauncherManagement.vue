<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="openid">
        <el-input v-model="openid" placeholder="输入openid"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="nickName" placeholder="输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="登录时间">
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
      <el-table-column fixed prop="openId" label="openid" align="center"></el-table-column>
      <el-table-column prop="nickName" label="用户呢称" align="center"></el-table-column>
      <el-table-column prop="loginTime" label="登录时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_FS_INVESTOR_VISIT']"
            type="text"
            size="small"
            @click="lookRecords(scope.$index, CabinetList)"
          >访问记录</el-button>
          <el-button
            v-if="authzData['F:BO_FS_INVESTOR_COUPON']"
            type="text"
            size="small"
            @click="bounceRecords(scope.$index, CabinetList)"
          >优惠券记录</el-button>
          <el-button
            v-if="authzData['F:BO_FS_INVESTOR_ORDER']"
            type="text"
            size="small"
            @click="investorOrder(scope.$index, CabinetList)"
          >投资订单</el-button>
          <el-button
            v-if="authzData['F:BO_FS_INVESTOR_CAB']"
            type="text"
            size="small"
            @click="investorCabinet(scope.$index, CabinetList)"
          >投资柜子</el-button>
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
  name: "LauncherManagement",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      openid: "",
      nickName: "",
      dateRange: "",

      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1,
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
    this.oprOgrId = this.$route.params.orgId;
  },
  mounted() {
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.openid = "";
      this.nickName = "";
      this.dateRange = [];
      this.Getdata();
    },
    //查询
    inquire() {
      this.Getdata();
      this.$store.commit("setSearchList", {
        openid: this.openid,
        nickName: this.nickName,
        dateRange: this.dateRange,
      });
    },
    //操作
    lookRecords(index, row) {
      let guiId = row[index].openId;
      this.$router.push({
        name: "LauncherlookRecords",
        params: { modifyid: guiId },
      });
    },
    bounceRecords(index, row) {
      let guiId = row[index].openId;
      this.$router.push({
        name: "LauncherbounceRecords",
        params: { modifyid: guiId },
      });
    },
    investorOrder(index, row) {
      let guiId = row[index].openId;
      this.$router.push({
        name: "LauncherinvestorOrder",
        params: { modifyid: guiId },
      });
    },
    investorCabinet(index, row) {
      let guiId = row[index].openId;
      this.$router.push({
        name: "LauncherinvestorCabinet",
        params: { modifyid: guiId },
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //非空校验
    ifEmpty(item) {
      if (item === "") {
        return undefined;
      } else {
        return item;
      }
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        openId: this.ifEmpty(this.openid),
        nickName: this.ifEmpty(this.nickName),
        loginTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
        loginTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .FsPersonSearch({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.CabinetList = response.data.data.records;
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

