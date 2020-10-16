<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店">
        <el-select
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteCabType"
          @focus="getHotelList()"
          v-model="hotelId"
          placeholder="请选择酒店名称"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二维码编码">
        <el-input v-model="qrCode"></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-select
          filterable
          remote
          :remote-method="remoteActName"
          @focus="getActList()"
          :loading="loadingH"
          v-model="activityName"
          placeholder="请选择活动名称"
        >
          <el-option
            v-for="item in activityList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动类型">
                <el-select
                    v-model="activityType"
                    :loading="loadingH"
                    placeholder="请选择活动类型">
                    <el-option v-for="item in activityTypeList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
      </el-form-item>-->

      <el-form-item label="参与人id">
        <el-input v-model="partInId" placeholder="请输入参与人Id"></el-input>
      </el-form-item>
      <el-form-item label="参与人手机号">
        <el-input v-model="partInName" placeholder="请输入参与人手机号"></el-input>
      </el-form-item>
      <el-form-item label="参与时间">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd"
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
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店" align="center"></el-table-column>
      <el-table-column prop="cabCode" label="二维码编码" align="center"></el-table-column>
      <el-table-column prop="actName" label="活动名称" align="center"></el-table-column>
      <el-table-column prop="gainCount" label="领取数量" align="center"></el-table-column>
      <el-table-column prop="customerId" label="参与id" align="center"></el-table-column>
      <el-table-column prop="customerName" label="参与人昵称" align="center"></el-table-column>
      <el-table-column prop="customerMobile" label="参与人手机号" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="参与时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewDetail(scope.row.id)">查看明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="查看明细(扫码领券)"
      :before-close="cancelData()"
      :visible.sync="dialogRecordVisible"
      width="56%"
    >
      <el-table :data="getRecordData">
        <el-table-column prop="couponName" width="320px" label="券名称" align="center"></el-table-column>
        <el-table-column prop="couponType" label="券类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.couponType == 1">优惠券</span>
            <span v-if="scope.row.couponType == 2">卡券</span>
          </template>
        </el-table-column>
        <el-table-column prop="couponCount" label="数量" align="center"></el-table-column>
        <el-table-column label="使用期限" width="200px" align="center">
          <template
            slot-scope="scope"
          >{{(scope.row.couponStartDate=='1970-01-01'?'-':scope.row.couponStartDate) + ' 至 ' + (scope.row.couponEndDate=='1970-01-01'?'-':scope.row.couponEndDate)}}</template>
        </el-table-column>
        <el-table-column label="使用门槛/最低消费金额" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.couponType == 1"
            >{{'满' + scope.row.useLimitMoney + '减' + scope.row.reduceMoney}}</span>
            <span v-if="scope.row.couponType == 2">{{scope.row.useLimitMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reduceMoney" label="券金额/折扣值" align="center"></el-table-column>
        <el-table-column prop="topMoney" label="最高优惠价" align="center"></el-table-column>
        <el-table-column prop="vouUseSceneName" label="使用场景" align="center"></el-table-column>
        <el-table-column prop="vouRemainingVerifiedNum" label="剩余使用次数" align="center"></el-table-column>
        <el-table-column prop="userAddress" label="使用地址" align="center"></el-table-column>
        <el-table-column prop="vouDeductibleMoney" label="可抵扣金额" align="center"></el-table-column>
      </el-table>
      <!-- <LonganPagination :pageTotal="pageTotal1" @pageFunc="pageFunc1" /> -->
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganActivityScanRecord",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      activityName: "",
      hotelList: [],
      activityList: [],
      hotelId: "",
      partInName: "",
      getRecordData: [],
      partInId: "",
      qrCode: "",
      dialogRecordVisible: false,
      activityTypeList: [],
      // activityType:'',
      dateRange: [],
      chooseID: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
      pageSize1: 10, //每页显示条数
      pageTotal1: 0, //默认总条数
      pageNum1: 1, //当前页码
    };
  },
  created() {
    // this.getHotelList();
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
    // this.hotelId = localStorage.getItem('hotelId');
    this.Getdata();
    this.getHotelList();
    this.getActList();
  },
  methods: {
    resetFunc() {
      this.hotelId = "";
      this.qrCode = "";
      this.activityName = "";
      this.partInId = "";
      this.partInName = "";
      this.dateRange = [];
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        qrCode: this.qrCode,
        activityName: this.activityName,
        partInId: this.partInId,
        partInName: this.partInName,
        dateRange: this.dateRange,
      });
    },
    //查看详情
    viewDetail(index) {
      let guiId = index;
      this.dialogRecordVisible = true;
      this.GetChooseID(guiId);
    },
    getActTypeList() {
      this.$api
        .basicDataItems({ key: "ACTTYPE", orgId: 0 })
        .then((response) => {
          if (response.data.code == 0) {
            this.activityTypeList = response.data.data.map((item) => {
              return {
                id: item.dictValue,
                label: item.dictName,
              };
            });
            this.activityTypeList.unshift({
              id: "",
              label: "全部",
            });
            this.CabinetList.forEach((item, index) => {
              this.activityTypeList.forEach((key) => {
                if (key.id == item.actType) {
                  this.$set(this.CabinetList[index], "actTypeName", key.label);
                }
              });
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
    remoteCabType(val) {
      this.getHotelList(val);
    },
    remoteActName(val) {
      this.getActList(val);
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
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
    //活动列表
    getActList(hName) {
      this.loadingH = true;
      const params = {
        actName: hName,
        orgAs: 2,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .selectActivity({ params })
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.activityList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.actName,
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部",
            };
            this.activityList.unshift(hotelAll);
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
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //分页
    pageFunc1(data) {
      this.pageSize1 = data.pageSize;
      this.pageNum1 = data.pageNum;
      this.GetDetaildata();
    },
    // //获取数据
    // ifEmpty(item){
    //     if(item === ''){
    //         return undefined;
    //     }else{
    //         return item;
    //     }
    // },
    Getdata() {
      let that = this;
      let params = {
        actId: this.activityName,
        // actType: this.activityType,
        customerId: this.partInId,
        cabCode: this.qrCode,
        // cabCode: this.qrCode,
        customerMobile: this.partInName,
        hotelId: this.hotelId,
        partInTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
        partInTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .virtuaQrcodelRecord(params)
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.pageTotal = response.data.data.total;
            this.getActTypeList();
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
    getTime(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = this.getDoubleNum(date.getMonth() + 1);
      var day = this.getDoubleNum(date.getDate());
      console.log(year);
      return year + "-" + month + "-" + day;
    },
    getDoubleNum(item) {
      return item < 10 ? "0" + item : item;
    },
    GetChooseID(id) {
      this.chooseID = id;
      this.GetDetaildata();
    },
    cancelData() {
      this.chooseID = "";
      this.pageNum1 = 1;
    },
    GetDetaildata() {
      let that = this;
      this.$api
        .getRecordsDetails(this.chooseID)
        .then((response) => {
          if (response.data.code == 0) {
            that.getRecordData = response.data.data.actCouponPartInDetailDTOS.map(
              (item) => {
                if (item.vouVoucherDTO) {
                  return {
                    couponName: item.vouVoucherDTO.vouName,
                    couponType: 2,
                    couponCount: item.couponCount,
                    couponStartDate: item.vouVoucherDTO.vouStartDate,
                    couponEndDate: item.vouVoucherDTO.vouEndDate,
                    useLimitMoney: "-",
                    topMoney: "-",
                    reduceMoney: item.vouVoucherDTO.vouDeductibleMoney,
                    vouUseSceneName: item.vouVoucherDTO.vouUseSceneName,
                    vouRemainingVerifiedNum:
                      item.vouVoucherDTO.vouRemainingVerifiedNum,
                    userAddress: "-",
                    vouDeductibleMoney: item.vouVoucherDTO.vouDeductibleMoney,
                  };
                } else if (item.couponCouponDTO) {
                  return {
                    couponName: item.couponCouponDTO.couponName,
                    couponType: 1,
                    couponCount: item.couponCount,
                    couponStartDate: item.couponCouponDTO.couponStartDate,
                    couponEndDate: item.couponCouponDTO.couponEndDate,
                    useLimitMoney: item.couponCouponDTO.useLimitMoney,
                    reduceMoney: item.couponCouponDTO.reduceMoney,
                    vouUseSceneName: "-",
                    topMoney: item.couponCouponDTO.discountMaxMoney,
                    vouRemainingVerifiedNum: "-",
                    userAddress: "-",
                    vouDeductibleMoney: item.couponCouponDTO.reduceMoney,
                  };
                }
              }
            );

            // console.log(that.getRecordData);
            // that.getRecordData.forEach(item => {
            //     item.couponStartDate = this.getTime(item.couponStartDate)
            //     item.couponEndDate = this.getTime(item.couponEndDate)
            // })
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
.pagination {
  margin-top: 20px;
}
</style>

