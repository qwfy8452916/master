<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="房源" prop="contractedEnterprisesId">
        <el-select v-model="contractedEnterprisesId" placeholder="请选择房源">
          <el-option
            v-for="item in EnterprisesList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="bindUserName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="bindUserMobile"></el-input>
      </el-form-item>
      <!-- <el-form-item label='核销状态'>
                <el-select
                    v-model="status"
                    placeholder="请选择核销状态">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
      </el-form-item>-->
      <!-- <el-form-item label='订单状态'>
                <el-select
                    v-model="bindFlag"
                    :loading="loadingH"
                    placeholder="请选择订单状态">
                    <el-option
                        v-for="item in statusList1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="操作人" prop="bindFlag">
        <el-select v-model="bindFlag" placeholder="请选择操作人">
          <el-option
            v-for="item in statusList1"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
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
    <el-table :data="CabinetList" :fit="true" border stripe>
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="resourceName" label="房源名称" align="center"></el-table-column>
      <el-table-column prop="roomOriginalPrice" label="房价" align="center"></el-table-column>
      <el-table-column prop="roomCount" label="房间数" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="cusName" label="联系人" align="center"></el-table-column>
      <el-table-column prop="cusPhone" label="联系电话" align="center"></el-table-column>
      <el-table-column label="弹性方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.adaptPriceType == 1">折扣</span>
          <span v-if="scope.row.adaptPriceType == 2">固定金额</span>
        </template>
      </el-table-column>
      <el-table-column prop="adaptPrice" label="弹性范围" align="center"></el-table-column>
      <el-table-column prop="commissionPercentage" label="提成比例" align="center"></el-table-column>
      <el-table-column prop="customerId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="empName" label="操作人" align="center"></el-table-column>
      <el-table-column prop="adaptCreatedAt" label="操作时间" align="center"></el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelAdaptPriceOrderList",
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
      // status:'',
      dateRange: [],

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
      statusList1: [],
      hotelId: "",
      orgId: "",
      priceId: "",
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
    this.orgId = localStorage.getItem("orgId");
    this.priceId = this.$route.query.id;
    this.getEnterprises();
    this.getEnterprises1();
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.contractedEnterprisesId = "";
      this.bindUserName = "";
      this.bindFlag = "";
      this.priceId = "";
      this.bindUserMobile = "";
      this.dateRange = [];
      // this.status = ''
      this.Getdata();
    },
    getEnterprises1() {
      let that = this;
      let params = {
        orgId: this.orgId,
      };
      this.$api
        .staffOrgList(params)
        .then((response) => {
          if (response.data.code == 0) {
            that.statusList1 = response.data.data.map((item) => {
              return {
                id: item.id,
                label: item.empName,
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
    getEnterprises() {
      const params = {
        hotelId: this.hotelId,
      };
      this.$api
        .getBookResourceList(params)
        .then((response) => {
          if (response.data.code == "0") {
            this.EnterprisesList = response.data.data.map((item) => {
              return {
                id: item.id,
                label: item.resourceName,
              };
            });
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
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        bindUserMobile: this.bindUserMobile,
        contractedEnterprisesId: this.contractedEnterprisesId,
        bindFlag: this.bindFlag,
        priceId: this.priceId,
        dateRange: this.dateRange,
        bindUserName: this.bindUserName,
      });
    },
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({ name: "HotelBookOrderDetail", query: { id: guiId } });
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
          let status = value ? 1 : 0;
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
      let guiId = row[index].id;
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
        roomPriceTypeId: this.priceId,
        roomPriceType: 2,
        cusName: this.bindUserName,
        cusPhone: this.bindUserMobile,
        orderDealPerson: this.bindFlag,
        resourceId: this.contractedEnterprisesId,
        hotelId: this.hotelId,
        createAtFrom: this.dateRange[0],
        createAtTo: this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .bookOrderList(params)
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

