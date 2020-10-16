<template>
  <div class="LonganMessagelist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="名称" prop="templatename">
        <el-input v-model="templatename"></el-input>
      </el-form-item>

      <el-form-item label="模板状态">
        <el-select v-model="inquireState">
          <el-option
            v-for="item in templateStatusData"
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div class="addranchisee">
      <el-button
        class="addbutton"
        v-if="authzData['F:BO_MSG_MSGTEMP_ADD']"
        type="primary"
        @click="addranchisee"
      >+创建</el-button>
    </div>
    <el-table :data="messageDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="tpCode" label="code" align="center"></el-table-column>
      <el-table-column prop="tpTitle" label="名称" align="center"></el-table-column>
      <el-table-column prop="tpTitle" label="所有者类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ownerType==1">个人</span>
          <span v-if="scope.row.ownerType==2">组织</span>
        </template>
      </el-table-column>
      <el-table-column prop="tpTitle" label="是否支持订阅" align="center">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.isSubscriptionSupported"
            :active-value="1"
            :inactive-value="0"
            @change="updateStatus(scope.row.id, scope.row.isSubscriptionSupported)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="模板状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='0'">禁用</span>
          <span v-if="scope.row.status=='1'">启用</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="isSafe" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_MSG_MSGTEMP_VIEW']"
            type="text"
            size="small"
            @click="checkmsg(scope.row.tpCode)"
          >查看</el-button>
          <el-button
            v-if="authzData['F:BO_MSG_MSGTEMP_SWITCH']"
            type="text"
            size="small"
            @click="enableDisable(scope.row.tpCode,scope.row.status)"
          >
            <span v-if="scope.row.status==1">禁用</span>
            <span v-if="scope.row.status===0">启用</span>
          </el-button>
          <el-button
            v-if="authzData['F:BO_MSG_MSGTEMP_MODIFY']"
            type="text"
            size="small"
            @click="editDialog(scope.row.tpCode)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_MSG_MSGTEMP_DELETE']"
            type="text"
            size="small"
            @click="delbtn(scope.row.tpCode)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该模板？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="Confirmdel()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganMessagelist",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //实际当前页码
      templateStatusData: [], //模板状态数据
      encryptedOrgId: "",

      dialogVisibleDelete: false,
      switchjudge: true,

      inquireState: "",
      messageDataList: [],

      templatename: "",

      editcode: "", //编辑查看传递的tpCode
    };
  },
  mounted() {
    this.encryptedOrgId = this.$route.params.orgId;
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
    this.templateStatus();
    this.LonganMessagelist();
  },
  methods: {
    resetFunc() {
      this.templatename = "";
      this.inquireState = "";
      this.LonganMessagelist();
    },

    //消息模板列表
    LonganMessagelist() {
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        isPage: true,
        status: this.inquireState,
        tpTitle: this.templatename,
      };
      this.$api
        .getMessageList({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.messageDataList = result.data.records;
            that.pageTotal = result.data.total;
          } else {
            that.$message.error("消息模板列表获取失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    remoteMessage(val) {
      this.messageTempData(val);
    },

    //启用禁用模板操作
    enableDisable(e, status) {
      let that = this;
      this.editcode = e;
      if (status === 1) {
        that.Disabletemp();
      } else if (status === 0) {
        that.enableMessageTemp();
      }
    },

    //禁用模板
    Disabletemp() {
      let that = this;
      let params = "";
      this.$api
        .disableMessageTemp(params, this.editcode)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功");
            that.LonganMessagelist();
          } else {
            that.$message.error("禁用模板失败");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //启用模板
    enableMessageTemp() {
      let that = this;
      let params = "";
      this.$api
        .enableMessageTemp(params, this.editcode)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功");
            that.LonganMessagelist();
          } else {
            that.$message.error("启用模板失败");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //编辑弹窗
    editDialog(e) {
      let that = this;
      let editcode = e;
      this.$router.push({ name: "LonganMessageEdit", query: { editcode } });
    },

    //查看消息模板
    checkmsg(e) {
      let detailCode = e;
      this.$router.push({ name: "LonganMessageDetail", query: { detailCode } });
    },

    //新增模板
    addranchisee() {
      this.$router.push({ name: "LonganMessageAdd" });
    },

    //删除模板
    delbtn(e) {
      this.editcode = e;
      this.dialogVisibleDelete = true;
    },
    //删除确定
    Confirmdel() {
      let that = this;
      let params = "";
      this.$api
        .deleteMessageTemp(params, that.editcode)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功");
            that.LonganMessagelist();
            that.dialogVisibleDelete = false;
          } else {
            that.$alert(response.data.msg, "警告", {
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

    //模板状态
    templateStatus() {
      let that = this;
      this.$api
        .templateStatus()
        .then((response) => {
          if (response.data.code == "0") {
            that.templateStatusData = response.data.data;
            let allObject = {
              dictName: "全部",
              dictValue: "",
            };
            that.templateStatusData.unshift(allObject);
          } else {
            that.$alert(response.data.msg, "警告", {
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
      this.LonganMessagelist();
      this.$store.commit("setSearchList", {
        templatename: this.templatename,
        inquireState: this.inquireState,
      });
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.LonganMessagelist();
    },
  },
};
</script>

<style lang="less">
.LonganMessagelist {
  .el-dialog__header {
    text-align: left;
  }
  .switchstyle {
    margin-top: 30px;
  }
  .el-form-item__content {
    text-align: left;
  }
  .dingyue {
    .el-form-item__content {
      margin-left: 100px !important;
    }
  }
  .selecttemp {
    .el-select {
      width: 40%;
    }
  }
  .el-dialog__footer {
    text-align: center;
  }
  .messagetwo .el-dialog {
    width: 40%;
  }
  .msghang {
    .msgcontent {
      width: calc(100% - 50px);
      display: inline-block;
    }
  }
}
</style>

<style lang="less" scoped>
.LonganMessagelist {
  .addranchisee {
    float: left;
    margin-bottom: 10px;
  }
  .el-dialog__header {
    text-align: left;
  }
  .channeltext {
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    padding-left: 78px;
    box-sizing: border-box;
  }
}
.messagetwo {
  .msgtwohang {
    margin-bottom: 20px;
    text-align: left;
    .msgtwohang_title {
      margin-right: 10px;
    }
  }
  .msgDate {
    text-align: left;
    position: relative;
    top: -38px;
    color: #adadad;
  }
  .orderbox {
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #f9f9f9;
    .ordertitle {
      color: #999;
    }
    .ordernumber {
      font-size: 36px;
    }
  }
}
</style>

