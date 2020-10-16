<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="申请人">
        <el-input v-model="nickName" placeholder="输入申请人昵称"></el-input>
      </el-form-item>
      <el-form-item label="提现金额">
        <el-input v-model="amount" placeholder="输入提现金额"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
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
      <el-table-column fixed prop="nickName" label="申请人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="申请时间" align="center"></el-table-column>
      <el-table-column prop="balanceAmount" label="账户余额" align="center"></el-table-column>
      <el-table-column prop="amount" label="提现金额" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.status==0?'待处理':scope.row.status==1?'已同意':scope.row.status==2?"已拒绝":"已取消"}}</template>
      </el-table-column>
      <el-table-column label="处理人" align="center">
        <template slot-scope="scope">{{scope.row.handler? scope.row.handler:'-'}}</template>
      </el-table-column>
      <el-table-column label="处理时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.transTime == '1970-01-01 00:00:00'? '-' : scope.row.transTime}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="authzData['F:BO_FS_MEMBERWITHDRAW_DEAL'] && !scope.row.status"
            size="samll"
            @click="handleWithdraw(scope.row.id)"
          >处理</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>是否同意提现申请？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuse()">拒 绝</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "longanWithdraw",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      amount: "",
      nickName: "",
      dateRange: [],
      status: "",
      dialogVisible: false,
      currentIndex: "",
      statusList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "待处理",
          value: 0,
        },
        {
          label: "已同意",
          value: 1,
        },
        {
          label: "已拒绝",
          value: 2,
        },
        {
          label: "已取消",
          value: 3,
        },
      ],
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
      (this.amount = ""),
        (this.nickName = ""),
        (this.dateRange = []),
        (this.status = "");
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        amount: this.amount,
        nickName: this.nickName,
        dateRange: this.dateRange,
        status: this.status,
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
    handleWithdraw(id) {
      this.dialogVisible = true;
      this.currentIndex = id;
    },
    handlresult(params) {
      this.$api
        .handlewithdraw(params, this.currentIndex)
        .then((response) => {
          if (response.data.code == 0) {
            this.$message.success("操作成功");
            this.dialogVisible = false;
            this.Getdata();
          } else {
            this.$alert(response.data.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    refuse() {
      let params = { status: 2 };
      this.handlresult(params);
    },
    confirm() {
      let params = { status: 1 };
      this.handlresult(params);
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        applInvestorName: this.ifEmpty(this.nickName),
        createAtFrom: this.dateRange == null ? undefined : this.dateRange[0],
        createAtTo: this.dateRange == null ? undefined : this.dateRange[1],
        amount: this.ifEmpty(this.amount),
        status: this.ifEmpty(this.status),
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getwithdrawAmount({ params })
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

