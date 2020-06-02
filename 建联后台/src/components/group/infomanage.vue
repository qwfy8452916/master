<template>
  <div>
    <h2 class="align-left">消息管理</h2>
    <el-form :inline="true" size="medium" class="demo-form-inline align-left">
      <el-form-item label="角色名称">
        <el-input v-model="inquireAccount" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="inquirePhone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="nomalBtn1 btn-bg" @click="userInquire">查询</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="UserDataList" stripe border style="width: 100%">
        <el-table-column prop="account" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="userName" label="角色成员" align="center"></el-table-column>
        <el-table-column prop="userMobile" label="手机号" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="settingInfo(scope.row.id)"
              type="text"
              size="small"
              class="check-text"
            >设置模板消息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="pageCont top" v-if="total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="total"
        :current-page.sync="currentPage"
        @current-change="current_change"
        @prev-click="prev"
        @next-click="next"
      ></el-pagination>
    </div>
  </div>
</template>
    </div>
</template>

<script>
import privilegeApi from "../../request/api.js";
export default {
  data() {
    return {
      formInline: {
        role_member: "",
        phone_number: ""
      },
      UserDataList: [],
      total: 0,
      currentPage: 1,
      pageNum: 1,
      inquireAccount: "",
      inquirePhone: "",
      inquireState: ""
    };
  },
  mounted() {
    this.userList();
  },
  methods: {
    settingInfo(id) {
      this.$router.push({ name: "systeminfomodel", params: { id: id } });
    },
    current_change(currentPage) {
      this.pageNum = this.currentPage;
      this.userList();
    },
    // 上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.userList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.userList();
    },
    //查询
    userInquire() {
      this.pageNum = 1;
      this.userList();
    },
    userList() {
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        account: this.inquireAccount,
        userMobile: this.inquirePhone,
        isActive:
          this.inquireState == ""
            ? this.inquireState
            : parseInt(this.inquireState) // 0 启用  1 禁用
      };
      privilegeApi
        .userList(params)
        .then(response => {
          if (response.data.code == 0) {
            this.UserDataList = response.data.data.records;
            this.total = response.data.data.total;
          } else {
            this.$message.error("获取用户列表失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    }
  }
};
</script>
<style>
</style>