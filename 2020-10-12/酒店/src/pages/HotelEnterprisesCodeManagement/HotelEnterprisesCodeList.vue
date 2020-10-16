<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="协议单位" prop="contractedEnterprisesId">
        <el-select v-model="contractedEnterprisesId" placeholder="请选择协议">
          <el-option
            v-for="item in EnterprisesList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="bindFlag" :loading="loadingH" placeholder="请选择绑定状态">
          <el-option
            v-for="item in statusList1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定微信手机号">
        <el-input v-model="bindUserMobile"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="bindUserName"></el-input>
      </el-form-item>
      <el-form-item label="禁/启用状态">
        <el-select v-model="status" placeholder="请选择禁/启用状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
    <el-table :data="CabinetList" :fit="true" border stripe>
      <el-table-column prop="contractedEnterpriseName" label="协议单位" align="center"></el-table-column>
      <el-table-column prop="license" label="授权码" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.bindFlag == 0">未绑定</span>
          <span v-if="scope.row.bindFlag == 1">已绑定</span>
        </template>
      </el-table-column>
      <el-table-column prop="bindUserId" label="绑定微信ID" align="center"></el-table-column>
      <el-table-column prop="wxNickName" label="绑定微信昵称" align="center"></el-table-column>
      <el-table-column prop="wxMobile" label="绑定微信手机号" align="center"></el-table-column>
      <el-table-column prop="bindUserName" label="姓名" align="center"></el-table-column>
      <el-table-column prop="bindUserMobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="bindUserDept" label="部门" align="center"></el-table-column>
      <el-table-column prop="bindUserPosition" label="职位" align="center"></el-table-column>
      <el-table-column prop="bindUserEmail" label="Email" align="center"></el-table-column>
      <el-table-column label="禁/启用" align="center">
        <template slot-scope="scope">
          <el-switch
            @change="changeActivityStatus(scope.row.status,scope.row.id,scope.$index)"
            v-model="scope.row.status"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
          <el-button
            v-if="scope.row.bindFlag == 1"
            type="text"
            size="small"
            @click="CabinetglUpdate(scope.$index, CabinetList)"
          >解绑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelEnterprisesCodeList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,

      contractedEnterprisesId: "",
      bindFlag: "",
      bindUserName: "",
      bindUserMobile: "",
      status: "",

      EnterprisesList: [],
      statusList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "禁用",
          value: 1,
        },
        {
          label: "启用",
          value: 0,
        },
      ],
      statusList1: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "未绑定",
          value: 0,
        },
        {
          label: "已绑定",
          value: 1,
        },
      ],
      hotelId: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  created() {
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
    this.hotelId = localStorage.getItem("hotelId");
    this.getEnterprises();
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.contractedEnterprisesId = "";
      this.bindUserName = "";
      this.bindFlag = "";
      this.bindUserMobile = "";
      this.status = "";
      this.Getdata();
    },
    getEnterprises() {
      let that = this;
      let params = {
        hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getEnterprises({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.EnterprisesList = response.data.data.records.map((item) => {
              return {
                id: item.id,
                label: item.enterpiseName,
              };
            });
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        bindUserMobile: this.bindUserMobile,
        contractedEnterprisesId: this.contractedEnterprisesId,
        bindFlag: this.bindFlag,
        status: this.status,
        bindUserName: this.bindUserName,
      });
    },
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelEnterprisesCodeDetail",
        query: { modifyid: guiId },
      });
    },
    //修改状态
    changeActivityStatus(value, id, index) {
      let msg = value ? "是否确认启用该授权码?" : "是否确认禁用该授权码?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let status = value ? 0 : 1;
          this.$api
            .changeEnterprisesCodeStatus(status, id)
            .then((response) => {
              if (response.data.code == 0) {
                if (value) {
                  this.$message.success("启用成功");
                } else {
                  this.$message.success("禁用成功");
                }
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
                this.CabinetList[index].status = !value;
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
          this.CabinetList[index].status = !value;
        });
    },
    //解绑
    CabinetglUpdate(index, row) {
      let msg = "是否确认解绑该员工？";
      let guiId = row[index].license;
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .unbindEnterprisesCode(guiId)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message.success("解绑成功");
                this.Getdata();
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        contractedEnterprisesId: this.contractedEnterprisesId,
        bindUserName: this.bindUserName,
        bindUserMobile: this.bindUserMobile,
        bindFlag: this.bindFlag,
        hotelId: this.hotelId,
        status: this.status,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getEnterprisesCode({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.status = item.status ? false : true;
            });
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

