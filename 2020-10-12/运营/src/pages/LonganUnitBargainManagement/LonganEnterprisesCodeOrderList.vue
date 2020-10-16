<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称：" prop="hotelId">
        <el-select
          v-model="hotelId"
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteHotel"
          @focus="getHotelList()"
          placeholder="请选择酒店"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协议单位" prop="contractedEnterprisesId">
        <el-select
          v-model="contractedEnterprisesId"
          :loading="loadingH"
          @focus="getEnterprisesList()"
          placeholder="请选择协议"
        >
          <el-option
            v-for="item in EnterprisesList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="bindFlag" :loading="loadingH" placeholder="请选择订单状态">
          <el-option
            v-for="item in statusList1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
      <el-form-item label="下单时间">
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
      <el-table-column fixed prop="hotelName" label="酒店" align="center"></el-table-column>
      <el-table-column prop="entName" label="协议单位" align="center"></el-table-column>
      <el-table-column prop="orderCode" label="订单号" align="center"></el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dealStatus == 0">初始状态</span>
          <span v-if="scope.row.dealStatus == 1">已接单</span>
          <span v-if="scope.row.dealStatus == 2">已拒单</span>
          <span v-if="scope.row.dealStatus == 3">申请退订</span>
          <span v-if="scope.row.dealStatus == 4">已退订</span>
          <span v-if="scope.row.dealStatus == 6">已核销</span>
        </template>
      </el-table-column>
      <el-table-column prop="resourceName" label="房源名称" align="center"></el-table-column>
      <el-table-column prop="roomOriginalPrice" label="房价" align="center"></el-table-column>
      <el-table-column prop="cusName" label="联系人" align="center"></el-table-column>
      <el-table-column prop="cusPhone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="arrivalDate" label="入住日期" align="center"></el-table-column>
      <el-table-column prop="leaveDate" label="离店日期" align="center"></el-table-column>
      <el-table-column prop="roomCount" label="房间数" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="payTime" label="下单时间" align="center"></el-table-column>
      <!-- <el-table-column prop="bindUserPosition" label="核销状态" align=center></el-table-column> -->
      <el-table-column fixed="right" label="操作" min-width="200px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
          <!-- <el-button type="text" size="small" @click="CabinetglUpdate(scope.$index, CabinetList)">解绑</el-button> -->
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
  name: "LonganEnterprisesCodeOrderList",
  components: {
    resetButton,
    LonganPagination,
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
      hotelList: [],
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
          label: "初始状态",
          value: 0,
        },
        {
          label: "已接单",
          value: 1,
        },
        {
          label: "已拒单",
          value: 2,
        },
        {
          label: "申请退订",
          value: 3,
        },
        {
          label: "已退订",
          value: 4,
        },
        {
          label: "已核销",
          value: 6,
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
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.contractedEnterprisesId = "";
      this.bindUserName = "";
      this.hotelId = "";
      this.bindFlag = "";
      this.bindUserMobile = "";
      this.dateRange = [];
      // this.status = ''
      this.Getdata();
    },
    //酒店列表
    getEnterprisesList() {
      this.loadingH = true;
      let that = this;
      let params = {
        hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getEnterprises({ params })
        .then((response) => {
          this.loadingH = false;
          if (response.data.code == 0) {
            that.EnterprisesList = response.data.data.records.map((item) => {
              return {
                id: item.id,
                label: item.enterpiseName,
              };
            });
            const hotelAll = {
              id: "",
              label: "全部",
            };
            this.EnterprisesList.unshift(hotelAll);
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
        hotelId: this.hotelId,
        dateRange: this.dateRange,
        bindUserName: this.bindUserName,
      });
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        pageNo: 1,
        hotelName: hName,
        pageSize: 50,
      };
      this.$api
        .hotelList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部",
            };
            this.hotelList.unshift(hotelAll);
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
    remoteHotel(val) {
      this.getHotelList(val);
    },
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LonganBookOrderDetail",
        query: { id: guiId },
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
        roomPriceTypeId: this.contractedEnterprisesId,
        roomPriceType: 1,
        cusName: this.bindUserName,
        cusPhone: this.bindUserMobile,
        dealStatus: this.bindFlag,
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

