<template>
  <div class="plateeliverylist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="配送单号">
        <el-input v-model="inquireDeliveryCode"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="inquirePhone"></el-input>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotelName"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能区">
        <el-select
          v-model="inquireFunctionName"
          filterable
          remote
          :remote-method="remoteFunction"
          :loading="loadingF"
          @focus="getFunctionList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in functionList"
            :key="item.id"
            :label="item.funcCnName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireStatus" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="待确认" value="0"></el-option>
          <el-option label="已确认" value="1"></el-option>
          <el-option label="已发货" value="2"></el-option>
          <!-- <el-option label="已配送" value="2"></el-option>
                    <el-option label="部分退款" value="3"></el-option>
                    <el-option label="全部退款" value="4"></el-option>
          <el-option label="已收货" value="5"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="inquireTime"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="外部配送状态">
        <el-select v-model="inquireDeliveryStatus" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="待接单" value="1"></el-option>
          <el-option label="待取货" value="2"></el-option>
          <el-option label="配送中" value="3"></el-option>
          <el-option label="已完成" value="4"></el-option>
          <el-option label="已取消" value="5"></el-option>
          <el-option label="异常" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="DeliveryDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="delivCode" label="配送单号" min-width="180px" align="center"></el-table-column>
      <el-table-column prop="serialNumber" label="流水号" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="delivWay" label="配送方式" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.delivWay == 1">店内送</span>
          <span v-else-if="scope.row.delivWay == 2">快递送</span>
          <span v-else-if="scope.row.delivWay == 3">迷你吧</span>
          <span v-else-if="scope.row.delivWay == 4">自提</span>
          <span v-else-if="scope.row.delivWay == 5">电子商品</span>
          <span v-else-if="scope.row.delivWay == 6">堂食</span>
          <span v-else-if="scope.row.delivWay == 7">外卖</span>
          <span v-else-if="scope.row.delivWay == 8">外带</span>
        </template>
      </el-table-column>
      <el-table-column prop="lgcName" label="外部配送" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
      <el-table-column prop="roomFloor" label="区域" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="地点" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="funcName" label="功能区" min-width="80px"></el-table-column>
      <el-table-column prop="prodCount" label="商品总数" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="商品金额" align="center"></el-table-column>
      <el-table-column prop="couponAmount" label="优惠金额" width="80px" align="center"></el-table-column>
       <el-table-column
        prop="allVouDeductAmount"
        label="抵扣金额"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column prop="discountAmount" label="减免金额" width="80px" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="customerId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="customerName" label="用户昵称" align="center"></el-table-column>
      <el-table-column prop="contactPeople" label="订单联系人" width="100px" align="center"></el-table-column>
      <el-table-column prop="contactPhone" label="手机号" width="120px" align="center"></el-table-column>
      <el-table-column prop="payCompleteTime" label="支付时间" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.payCompleteTime == '1970-01-01 00:00:00'?'':scope.row.payCompleteTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">待确认</span>
          <span v-else-if="scope.row.status == 1">已确认</span>
          <span v-else-if="scope.row.status == 2">已发货</span>
          <span v-else-if="scope.row.status == 3">部分退款</span>
          <span v-else-if="scope.row.status == 4">全部退款</span>
          <span v-else-if="scope.row.status == 5">已售后</span>
        </template>
      </el-table-column>
      <el-table-column prop="lgcStatus" label="外部物流状态" min-width="110px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.lgcStatus == 1">待接单</span>
          <span v-else-if="scope.row.lgcStatus == 2">待取货</span>
          <span v-else-if="scope.row.lgcStatus == 3">配送中</span>
          <span v-else-if="scope.row.lgcStatus == 4">已完成</span>
          <span v-else-if="scope.row.lgcStatus == 5">已取消</span>
          <span v-else-if="scope.row.lgcStatus == 6">异常</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140px" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="authzData['F:BO_ORDER_OPRDELIV_SUBMIT'] && scope.row.status == 0"
            @click="ensurePlatDelivery(scope.row.id)"
          >确认</el-button>
          <el-button
            type="text"
            size="small"
            v-if="authzData['F:BO_ORDER_OPRDELIV_DELIV'] && scope.row.delivWay == 2 && scope.row.status == 1"
            @click="shipmentsPlatDelivery(scope.row.id)"
          >发货</el-button>
          <el-button
            type="text"
            size="small"
            v-if="authzData['F:BO_ORDER_OPRDELIV_VIEW']"
            @click="deliveryDetail(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisibleOrder" width="30%">
      <span>是否确认该订单？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleOrder=false">取消</el-button>
        <el-button type="primary" @click="ensureOrder">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="发货" :visible.sync="dislogVisibleShipments" width="30%">
      <el-form :model="shipmentsForm" :rules="rules" ref="shipmentsForm" label-width="80px">
        <el-form-item label="物流公司" prop="logistics">
          <el-input v-model.trim="shipmentsForm.logistics"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="logisticsCode">
          <el-input v-model="shipmentsForm.logisticsCode"></el-input>
        </el-form-item>
        <el-form-item label="发货时间" prop="shipmentsTime">
          <el-date-picker
            v-model="shipmentsForm.shipmentsTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dislogVisibleShipments = false">取 消</el-button>
        <el-button type="primary" :disabled="isSubmit" @click="EnsureReset('shipmentsForm')">发 货</el-button>
      </div>
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganPlatDeliveryList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      // orgId: '',
      pdId: "",
      inquireDeliveryCode: "",
      inquirePhone: "",
      inquireHotelName: "",
      hotelList: [],
      loadingH: false,
      inquireFunctionName: "",
      functionList: [],
      loadingF: false,
      inquireStatus: "",
      inquireTime: [],
      inquireDeliveryStatus: "",
      DeliveryDataList: [],
      dialogVisibleOrder: false,
      isEnsureOnce: false,
      dislogVisibleShipments: false,
      shipmentsForm: {
        logistics: "",
        logisticsCode: "",
        shipmentsTime: "",
      },
      rules: {
        logistics: [
          { required: true, message: "请填写物流公司", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "物流公司请保持在20个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        logisticsCode: [
          { required: true, message: "请填写快递单号", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "快递单号请保持在30个字符以内",
            trigger: ["blur", "change"],
          },
        ],
        shipmentsTime: [
          { required: true, message: "请选择发货时间", trigger: "change" },
        ],
      },
      isSubmit: false,
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
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.getFunctionList();
    this.platDeliveryList();
  },
  methods: {
    resetFunc() {
      this.inquireDeliveryCode = "";
      this.inquirePhone = "";
      this.inquireHotelName = "";
      this.inquireFunctionName = "";
      this.inquireStatus = "";
      this.inquireDeliveryStatus = "";
      this.inquireTime = [];
      this.platDeliveryList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.platDeliveryList();
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
    remoteHotel(val) {
      this.getHotelList(val);
    },
    //功能区列表
    getFunctionList(fName) {
      this.loadingF = true;
      const params = {
        funcName: fName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .hotelFunctionList(params)
        .then((response) => {
          this.loadingF = false;
          const result = response.data;
          if (result.code == 0) {
            this.functionList = result.data.records.map((item) => {
              return {
                id: item.id,
                funcCnName: item.funcCnName,
              };
            });
            const functionAll = {
              id: "",
              funcCnName: "全部",
            };
            this.functionList.unshift(functionAll);
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
    remoteFunction(val) {
      this.getFunctionList(val);
    },
    //配送单列表
    platDeliveryList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        chooseAs: 1,
        deliveryCode: this.inquireDeliveryCode,
        contactPhone: this.inquirePhone,
        hotelId: this.inquireHotelName,
        funcId: this.inquireFunctionName,
        status: this.inquireStatus,
        payStartTime: this.inquireTime[0],
        payEndTime: this.inquireTime[1],
        lgcStatus: this.inquireDeliveryStatus,
        // orgAs: 2,
        // choose: 1,
        // delivCode: this.inquireDeliveryCode,
        // contactMobile: this.inquirePhone,
        // hotelId: this.inquireHotelName,
        // prodId: this.inquireProdName,
        // deilvState: this.inquireStatus,
        // startPayAt: this.inquireTime[0],
        // endPayAt: this.inquireTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .platDeliveryList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.DeliveryDataList = result.data.records;
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
    //确认
    ensurePlatDelivery(id) {
      this.pdId = id;
      this.dialogVisibleOrder = true;
    },
    ensureOrder() {
      if (!this.isEnsureOnce) {
        this.isEnsureOnce = true;
        const params = {};
        const id = this.pdId;
        // console.log(id);
        this.$api
          .ensurePlatDelivery(params, id)
          .then((response) => {
            // console.log(response);
            const result = response.data;
            if (result.code == "0") {
              this.$message.success("配送单确认成功！");
              this.dialogVisibleOrder = false;
              this.platDeliveryList();
            } else {
              this.$message.error("配送单确认失败！");
              this.dialogVisibleOrder = false;
            }
            this.isEnsureOnce = false;
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
            this.isEnsureOnce = false;
          });
      }
    },
    //发货
    shipmentsPlatDelivery(id) {
      this.shipmentsForm.logistics = "";
      this.shipmentsForm.logisticsCode = "";
      this.shipmentsForm.shipmentsTime = "";
      this.pdId = id;
      this.dislogVisibleShipments = true;
    },
    EnsureReset(shipmentsForm) {
      const params = {
        deliveryId: this.pdId,
        logistics: this.shipmentsForm.logistics,
        logisticsCode: this.shipmentsForm.logisticsCode,
        shipmentsTime: this.shipmentsForm.shipmentsTime,
      };
      // const id = this.pdId;
      // console.log(params);
      this.$refs[shipmentsForm].validate((valid) => {
        if (valid) {
          this.isSubmit = true;
          this.$api
            .shipmentsPlatDelivery(params)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("配送单发货成功！");
                this.dislogVisibleShipments = false;
                this.isSubmit = false;
                this.platDeliveryList();
              } else {
                this.$message.error("配送单发货失败！");
                this.dislogVisibleShipments = false;
                this.isSubmit = false;
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查看详情
    deliveryDetail(id) {
      this.$router.push({ name: "LonganPlatDeliveryDetail", query: { id } });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.platDeliveryList();
      this.$store.commit("setSearchList", {
        inquireDeliveryCode: this.inquireDeliveryCode,
        inquirePhone: this.inquirePhone,
        inquireHotelName: this.inquireHotelName,
        inquireFunctionName: this.inquireFunctionName,
        inquireStatus: this.inquireStatus,
        inquireTime: this.inquireTime,
        inquireDeliveryStatus: this.inquireDeliveryStatus,
      });
    },
  },
};
</script>

<style scoped>
.el-dialog__footer {
  text-align: center;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>

<style lang="less" scoped>
.plateeliverylist {
}
</style>
