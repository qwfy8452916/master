<template>
  <div>
    <h2 class="align-left">结算方式管理</h2>
    <el-form :inline="true" :model="paymentForm" class="demo-form-inline align-left">
      <el-form-item label="类型筛选">
        <el-select v-model="inquireState" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="已启用" value="1"></el-option>
          <el-option label="已禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" class="btn-bg h-32" style="width:80px;">筛选</el-button>
      </el-form-item>
      <el-form-item class="addPaymentModeItem" v-show="addBtn">
        <el-button type="primary" @click="addPaymentMode" plain>+ 添加付款方式</el-button>
      </el-form-item>
    </el-form>
    <el-button class="btn-bg" type="primary" style="float:left;margin-bottom:20px;height:32px;line-height:8px;" @click="addPayment" v-if="authzData['F:CM_SETSTYLE_SETSTYLE_ADDSETSTYLE']">新增结算方式</el-button>
    <el-table :data="paymentModeList" border style="width: 100%" stripe>
      <el-table-column prop="desc" label="结算方式描述" align="center"></el-table-column>
      <el-table-column prop="mode" label="价格时间规则" align="center"></el-table-column>
      <el-table-column prop="isLocked" label="状态" width="80px" align="center">
        <template slot-scope="scope">{{scope.row.isLocked=='1'?'已启用':'已禁用'}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            v-show="editBtn"
            :type="scope.row.type"
            @click="operate(scope.row.id,scope.row.isLocked)"
            size="mini"
          >{{ scope.row.isLocked == '0' ? '启用' : '禁用' }}</el-button>-->
          <el-button
            v-if="scope.row.isLocked == '1' && authzData['F:CM_SETSTYLE_SETSTYLE_DISABLE']"
            type="text"
            size="small"
            @click="operate(scope.row.id,scope.row.isLocked)"
            class="edit-text"
            style="color:#EE1E1E"
          >禁用</el-button>
          <el-button
           v-if="scope.row.isLocked == '0' && authzData['F:CM_SETSTYLE_SETSTYLE_ENABLE']"
            type="text"
            size="small"
            @click="operate(scope.row.id,scope.row.isLocked)"
            class="edit-text"
          >启用</el-button>
          <el-button
            v-if="authzData['F:CM_SETSTYLE_SETSTYLE_DELETE']"
            type="text"
            @click="deleteMode(scope.row)"
            size="mini"
            class="check-text"
          >删除</el-button>
          <div v-show="noneBtn">--</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageCont top">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :currentPage="curPage"
        @current-change="goTo"
      ></el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisibleDisable" width="30%">
      <span>确定修改用户状态？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDisable=false" class="cancel-btn">取消</el-button>
        <el-button class="btn-mid" type="primary" @click="disableEnsure" v-if="authzData['F:BJ_SETSTYLE_SETSTYLE_DISABLE_SUBMIT']">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deleteInsure" width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer">
        <el-button @click="deleteInsure=false" class="cancel-btn">取消</el-button>
        <el-button type="primary" @click="confirmDel"  v-if="authzData['F:CM_SETSTYLE_SETSTYLE_DELETE_SUBMIT']" class="btn-mid">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      authzData:{
      },
      paymentForm: {
        mode: ""
      },
      paymentModeList: [],
      total: 100,
      curPage: 1,
      //权限按钮
      addBtn: false,
      deleteBtn: true,
      editBtn: true,
      noneBtn: false,
      params: "",
      payid: "",
      userState: "",
      dialogVisibleDisable: false,
      inquireState: "",
      deleteInsure: false,
      deleteId: "",
    };
  },
  mounted() {
     this.authzData = this.$store.state.authData
  },
  methods: {
    //权限按钮
    getAuthority() {
      let that = this;
      if (
        that.$store.getters.authForGroup.NormalSecondPaymentManagement.transfers
          .length != 0
      ) {
        that.$store.getters.authForGroup.NormalSecondPaymentManagement.transfers.map(
          item => {
            if (item.power_transfer_name.indexOf("添加付款方式") != -1) {
              that.addBtn = true;
            } else if (item.power_transfer_name.indexOf("删除") != -1) {
              that.deleteBtn = true;
            } else if (
              item.power_transfer_name.indexOf("禁用" || "启用") != -1
            ) {
              that.editBtn = true;
            }
          }
        );
      } else {
        that.noneBtn = true;
      }
    },
    // 新增付款方式跳转
    addPayment() {
      this.$router.push("/basic/paymentadd");
    },
    //筛选
    submit() {
      this.curPage = 1;
      this.getPaymentModeList();
    },
    //跳转
    goTo(curPage) {
      this.curPage = curPage;
      this.getPaymentModeList(this.curPage);
    },
    //跳转到添加支付方式页面
    addPaymentMode() {
      this.$router.push("/basic/paymentadd");
    },
    //删除当前支付方式
    deleteMode(item) {
      let that = this;
      that.deleteId = item.id;
      that.deleteInsure = true;
    },
    // 确认删除当前支付方式
    confirmDel() {
      let params = {};
      this.$api.deleteSettle(params, this.deleteId).then(response => {
        if (response.data.code == "0") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteInsure = false;
          this.getPaymentModeList();
        }
      });
    },
    //启用或禁用当前支付方式
    operate(id, state) {
      let that = this;
      that.payid = id;
      if (state == 0) {
        that.userState = "1";
      } else {
        that.userState = "0";
      }
      this.dialogVisibleDisable = true;
      // const id = item.id;
      // const state = item.state;
      // var params;
      // params = that.params;
      // that.$api.disableSettle(params, id).then(response => {
      //   let tip = "";
      //   if (params.status == "VISIBLE") {
      //     item.type = "danger";
      //     tip = "启用";
      //     that.params = 1;
      //   } else {
      //     item.type = "primary";
      //     tip = "禁用";
      //     that.params = 0;
      //   }
      //   that.$message({
      //     message: tip + "成功",
      //     type: "success"
      //   });
      // });
    },
    disableEnsure() {
      let that = this;
      var id = that.payid;
      let params = that.userState;
      that.$api.disableSettle(params, id).then(response => {
        let tip = "";
        if (response.data.code == "0") {
          if (that.userState == 0) {
            tip = "禁用";
          } else {
            tip = "启用";
          }
          that.$message({
            message: tip + "成功",
            type: "success"
          });
          that.dialogVisibleDisable = false;
          that.getPaymentModeList();
        } else {
          that.$message({
            message: response.data.msg,
            type: "error"
          });
        }

        // if (params.status == "VISIBLE") {
        //   item.type = "danger";
        //   tip = "启用";
        //   that.params = 1;
        // } else {
        //   item.type = "primary";
        //   tip = "禁用";
        //   that.params = 0;
        // }
      });
    },
    //获取付款方式列表
    getPaymentModeList(page) {
      let that = this;
      let params = {
        isActive: that.inquireState,
        pageNo: page,
        pageSize: 10
      };
      that.$api.getSettle(params).then(response => {
        if (response.data.code == "0") {
          that.paymentModeList = response.data.data.records.map(item => {
            that.total = response.data.data.total;
            let element = {};
            element.id = item.id;
            element.desc = item.content;
            element.pay_type = item.type;
            element.point_day = item.point_day;
            element.isLocked = item.isActive;
            // if (that.paymentForm.mode == "enable") {
            //   params.status = "VISIBLE";
            // } else if (that.paymentForm.mode == "disable") {
            //   params.status = "UNVISIBLE";
            // } else {
            //   params.status = "";
            // }
            // element.status = item.status;
            // element.type = item.status == "VISIBLE" ? "danger" : "primary";
            if (item.type == "2") {
              element.mode = "货到工地日" + item.pointDay + "天";
            } else if (item.type == "3") {
              element.mode = "每月" + item.pointDay + "日";
            } else {
              element.mode = "先发货后付款，支付日期不定";
            }
            return element;
          });
        }
      });
    }
  },
  created() {
    this.token = this.$cookies.get("ZL_token");
    this.getPaymentModeList();
  }
};
</script>


<style lang="less" scoped>
.addPaymentModeItem {
  float: right;
}
</style>