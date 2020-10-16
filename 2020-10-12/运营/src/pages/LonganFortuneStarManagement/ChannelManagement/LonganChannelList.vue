<template>
  <div class="channellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="渠道名称">
        <el-input v-model="inquireChannelName"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="inquireUserName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="inquireUserPhone"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireStatus" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div v-if="authzData['F:BO_FS_CHANNEL_ADD']">
      <el-button class="addbutton" @click="channelAdd">新增渠道</el-button>
    </div>
    <el-table :data="ChannelDataList" border stripe style="width:100%;">
      <el-table-column prop="channelName" label="渠道名称"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="contactName" label="姓名"></el-table-column>
      <el-table-column prop="contactMobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="注册时间" width="160px" align="center"></el-table-column>
      <el-table-column
        v-if="authzData['F:BO_FS_CHANNEL_USING']"
        prop="statusVal"
        label="禁/启用状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.statusVal"
            @change="updateStatus(scope.row.id, scope.row.statusVal)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="320px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_FS_CHANNEL_EDIT']"
            type="text"
            size="small"
            @click="channelModify(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_FS_CHANNEL_DELETE']"
            type="text"
            size="small"
            @click="channelDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="authzData['F:BO_FS_CHANNEL_RESETPWD']"
            type="text"
            size="small"
            @click="resetPWD(scope.row.userName)"
          >重置密码</el-button>
          <el-button
            v-if="authzData['F:BO_FS_CHANNEL_PARTNER']"
            type="text"
            size="small"
            @click="wealthPartner(scope.row.id)"
          >财富合伙人</el-button>
          <el-button
            v-if="authzData['F:BO_FS_CHANNEL_LINK']"
            type="text"
            size="small"
            @click="shareLink(scope.row.id)"
          >分享链接</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>确定删除该渠道？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="dislogVisibleResetPWD" width="30%">
      <el-form :model="resetForm" :rules="resetRules" ref="resetForm" label-width="80px">
        <el-form-item label="新密码" prop="newpwd">
          <el-input type="password" v-model.trim="resetForm.newpwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="ensurepwd">
          <el-input type="password" v-model.trim="resetForm.ensurepwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dislogVisibleResetPWD = false">取 消</el-button>
        <el-button type="primary" @click="EnsureReset('resetForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganChannelList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    var accountReg = /^[0-9a-zA-Z]{6,18}$/;
    var validateNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!accountReg.test(value)) {
        callback(new Error("密码为6~18位字母或数字或字母数字组合"));
      } else {
        callback();
      }
    };
    var validateEnsurePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      authzData: "",
      inquireChannelName: "",
      inquireUserName: "",
      inquireUserPhone: "",
      inquireStatus: "",
      ChannelDataList: [],
      channelId: "",
      channelUN: "",
      dialogVisibleDelete: false,
      dislogVisibleResetPWD: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      //重置密码
      resetForm: {
        newpwd: "",
        ensurepwd: "",
      },
      resetRules: {
        newpwd: [
          {
            required: true,
            validator: validateNewPwd,
            trigger: ["blur", "change"],
          },
        ],
        ensurepwd: [
          {
            required: true,
            validator: validateEnsurePwd,
            trigger: ["blur", "change"],
          },
        ],
      },
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
    this.channelList();
  },
  methods: {
    resetFunc() {
      this.inquireChannelName = "";
      this.inquireUserName = "";
      this.inquireUserPhone = "";
      this.inquireStatus = "";
      this.channelList();
    },
    //渠道列表
    channelList() {
      const params = {
        channelName: this.inquireChannelName,
        userName: this.inquireUserName,
        mobile: this.inquireUserPhone,
        status: this.inquireStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .channelList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.ChannelDataList = result.data.records.map((item) => {
              if (item.status == 0) {
                item.statusVal = false;
              } else {
                item.statusVal = true;
              }
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
      this.channelList();
      this.$store.commit("setSearchList", {
        inquireChannelName: this.inquireChannelName,
        inquireUserName: this.inquireUserName,
        inquireUserPhone: this.inquireUserPhone,
        inquireStatus: this.inquireStatus,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.channelList();
    },
    //新增渠道
    channelAdd() {
      this.$router.push({ name: "LonganChannelAdd" });
    },
    //修改启用状态
    updateStatus(id, value) {
      // console.log(value);
      const params = {};
      let status;
      if (value) {
        status = 1;
      } else {
        status = 0;
      }
      this.$api
        .channelStatus(params, id, status)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (value) {
              this.$message.success("渠道启用成功！");
            } else {
              this.$message.success("渠道禁用成功！");
            }
          } else {
            if (value) {
              this.$message.error("渠道启用失败！");
              this.ChannelDataList.statusVal = false;
            } else {
              this.$message.error("渠道禁用失败！");
              this.ChannelDataList.statusVal = true;
            }
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //修改
    channelModify(id) {
      this.$router.push({ name: "LonganChannelModify", query: { id } });
    },
    //删除
    channelDelete(id) {
      this.channelId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const params = {};
      const id = this.channelId;
      this.$api
        .channelDelete(params, id)
        .then((response) => {
          // console.log(response);
          if (response.data.code == "0") {
            this.$message.success("渠道删除成功！");
            this.dialogVisibleDelete = false;
            this.channelList();
          } else {
            this.$message.error(result.msg);
            this.dialogVisibleDelete = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //重置密码
    resetPWD(userName) {
      this.resetForm.newpwd = "";
      this.resetForm.ensurepwd = "";
      this.channelUN = userName;
      this.dislogVisibleResetPWD = true;
    },
    EnsureReset(resetForm) {
      const id = this.channelUN;
      const params = {
        newPassWord: this.resetForm.newpwd,
        userName: this.channelUN,
      };
      // console.log(id,params);
      this.$refs[resetForm].validate((valid) => {
        if (valid) {
          this.$api
            .channelResetPWD(params)
            .then((response) => {
              // console.log(response);
              if (response.data.code == 0) {
                this.$message.success("重置密码成功！");
                this.dislogVisibleResetPWD = false;
              } else {
                this.$message.error("重置密码失败！");
                this.dislogVisibleResetPWD = false;
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
              this.dislogVisibleResetPWD = false;
            });
        } else {
          console.log("error!");
          return false;
        }
      });
    },
    //财富合伙人
    wealthPartner(channelId) {
      this.$router.push({
        name: "LonganChannelPartner",
        params: { channelId },
      });
    },
    //分享链接
    shareLink(channelId) {
      this.$router.push({
        name: "LonganChannelShareLink",
        params: { channelId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.channellist {
}
</style>

