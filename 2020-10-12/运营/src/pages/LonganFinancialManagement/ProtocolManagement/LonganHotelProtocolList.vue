<template>
  <div class="protocollist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="分成协议名称">
        <el-input v-model="inquireName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireState">
          <el-option value label="全部"></el-option>
          <el-option value="0" label="禁用"></el-option>
          <el-option value="1" label="启用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div v-if="authzData['F:BO_FIN_DIVIDE_ADD']">
      <el-button class="addbutton" @click="hotelProtocolAdd">新增分成协议</el-button>
    </div>
    <el-table :data="hotelProtocolDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="allocName" label="分成协议名称"></el-table-column>
      <el-table-column prop="isActive" label="状态" align="center">
        <template slot-scope="scope">{{scope.row.isActive=='0'?'禁用':'启用'}}</template>
      </el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isActive == '0' && authzData['F:BO_FIN_DIVIDE_USING']"
            type="text"
            size="small"
            @click="disableProtocol(scope.row.id, scope.row.isActive)"
          >启用</el-button>
          <el-button
            v-if="scope.row.isActive == '1' && authzData['F:BO_FIN_DIVIDE_USING']"
            type="text"
            size="small"
            @click="disableProtocol(scope.row.id, scope.row.isActive)"
          >禁用</el-button>
          <el-button
            v-if="authzData['F:BO_FIN_DIVIDE_DELETE']"
            type="text"
            size="small"
            @click="hotelProtocolDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="authzData['F:BO_FIN_DIVIDE_VIEW']"
            type="text"
            size="small"
            @click="hotelProtocolDetail(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisibleDisable" width="30%">
      <span>确定修改该分成协议状态？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDisable=false">取消</el-button>
        <el-button type="primary" @click="disableEnsure">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该分成协议？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganHotelProtocolList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      inquireName: "",
      inquireState: "",
      hpId: "",
      hpState: "",
      hotelProtocolDataList: [],
      dialogVisibleDisable: false,
      dialogVisibleDelete: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
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
    this.hotelProtocolList();
  },
  methods: {
    resetFunc() {
      this.inquireName = "";
      this.inquireState = "";
      this.hotelProtocolList();
    },
    //获取酒店分成协议列表
    hotelProtocolList() {
      const params = {
        allocName: this.inquireName,
        isActive: this.inquireState,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .hotelProtocolList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.hotelProtocolDataList = result.data.records;
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
      this.hotelProtocolList();
      this.$store.commit("setSearchList", {
        inquireName: this.inquireName,
        inquireState: this.inquireState,
      });
    },

    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelProtocolList();
    },
    //新增
    hotelProtocolAdd() {
      this.$router.push({ name: "LonganHotelProtocolAdd" });
    },
    //禁用、启用
    disableProtocol(id, state) {
      this.hpId = id;
      if (state == 0) {
        this.hpState = 1;
      } else {
        this.hpState = 0;
      }
      this.dialogVisibleDisable = true;
    },
    disableEnsure() {
      const id = this.hpId;
      const params = {
        // isLocked: this.hpState,
      };
      this.$api
        .disableProtocol(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (this.hpState == 1) {
              this.$message.success("启用成功！");
            } else {
              this.$message.success("禁用成功！");
            }
            this.hotelProtocolList();
            this.dialogVisibleDisable = false;
          } else {
            // if(this.hpState == 1){
            //     this.$message.error('启用失败！');
            // }else{
            //     this.$message.error('禁用失败！');
            // }
            this.$message.error(result.msg);
            this.dialogVisibleDisable = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //删除
    hotelProtocolDelete(id) {
      this.hpId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const params = {};
      const id = this.hpId;
      // console.log(params);
      this.$api
        .hotelProtocolDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data) {
              this.$message.success("分成协议删除成功！");
              this.hotelProtocolList();
              this.dialogVisibleDelete = false;
            } else {
              this.$message.error("分成协议删除失败！");
              this.dialogVisibleDelete = false;
            }
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
    //查看详情
    hotelProtocolDetail(id) {
      this.$router.push({ name: "LonganHotelProtocolDetail", query: { id } });
    },
  },
};
</script>

<style>
.el-dialog__header {
  text-align: left;
}
</style>

<style lang="less" scoped>
.protocollist {
  .pagination {
    margin-top: 20px;
  }
}
</style>

