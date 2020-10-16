<template>
  <div class="ProdCouponGroup">
    <el-form :inline="true" align="left">
      <el-form-item label="分组名称">
        <el-input v-model="groupName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div class="alignleft">
      <el-button
        class="addbutton"
        v-if="authzData['F:BO_COUPON_OPRGROUP_ADD']"
        @click="addBtn"
      >新增优惠券分组</el-button>
    </div>
    <el-table :data="groupData" border stripe style="width:100%">
      <el-table-column prop="groupName" label="分组名称" align="center"></el-table-column>
      <el-table-column prop="id" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_COUPON_OPRGROUP_MODIFY']"
            type="text"
            @click="editGroup(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_COUPON_OPRGROUP_DELETE']"
            type="text"
            @click="deleGroup(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="deledialog" width="30%">
      <span>是否确认删除该优惠券分组?</span>
      <span slot="footer">
        <el-button @click="deledialog=false">取 消</el-button>
        <el-button type="primary" @click="suredel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganProdCouponGroup",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      deledialog: false,
      groupId: "", //分组id
      groupName: "", //分组名
      groupData: [], //分组数据
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
    this.getCouponGroupList();
  },
  methods: {
    resetFunc() {
      this.groupName = "";
      this.getCouponGroupList();
    },
    //新增优惠券分组
    addBtn() {
      this.$router.push({ name: "LonganAllCouponGroupAdd" });
    },

    //修改分组
    editGroup(e) {
      let id = e;
      this.$router.push({ name: "LonganProdCouponGroupEdit", query: { id } });
    },

    //删除
    deleGroup(e) {
      this.groupId = e;
      this.deledialog = true;
    },

    //确定删除
    suredel() {
      let that = this;
      let params = {};
      this.$api
        .delCouponGroup(params, that.groupId)
        .then((response) => {
          if (response.data.code == "0") {
            this.deledialog = false;
            that.$message.success("操作成功");
            that.getCouponGroupList();
          } else {
            this.deledialog = false;
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((error) => {
          this.deledialog = false;
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取优惠券分组列表
    getCouponGroupList() {
      let that = this;
      let params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        orgAs: 2,
        groupName: this.groupName,
      };
      this.$api
        .getCouponGroupList({ params })
        .then((response) => {
          if (response.data.code == "0") {
            that.groupData = response.data.data.records;
            that.pageTotal = response.data.data.total;
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
      this.getCouponGroupList();
      this.$store.commit("setSearchList", {
        groupName: this.groupName,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getCouponGroupList();
    },
  },
};
</script>

<style lang="less" scope>
.ProdCouponGroup {
  .alignleft {
    text-align: left;
    margin-bottom: 10px;
  }
  .el-dialog__footer {
    text-align: center !important;
  }
  .datchdialog {
    .el-select {
      width: 100%;
    }
  }
}
</style>
