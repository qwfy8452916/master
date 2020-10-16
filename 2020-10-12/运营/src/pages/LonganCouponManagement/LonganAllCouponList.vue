<template>
  <div class="AllCouponList">
    <el-form :inline="true" align="left">
      <el-form-item label="优惠方式">
        <el-select v-model="discountWay">
          <el-option label="全部" value></el-option>
          <el-option label="满减券" value="1"></el-option>
          <el-option label="折扣券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select @change="couponTypeEvent" v-model="couponType">
          <el-option label="全部" value></el-option>
          <el-option label="通用券" value="0"></el-option>
          <el-option label="商品券" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织类型">
        <el-select v-model="couponOwnerOrgKind" :disabled="couponDisabled">
          <el-option label="全部" value></el-option>
          <el-option label="平台" value="1"></el-option>
          <el-option label="运营商" value="2"></el-option>
          <el-option label="酒店" value="3"></el-option>
          <el-option label="供应商" value="4"></el-option>
          <el-option label="入驻商家" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织名称" prop="couponOwnerOrgId">
        <el-select
          :disabled="couponDisabled"
          v-model="couponOwnerOrgId"
          filterable
          remote
          :remote-method="remoteOrgan"
          :loading="loadingO"
          @focus="getOrgan()"
        >
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in organNameList"
            :key="item.index"
            :label="item.orgName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="cusId"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="cusPhone"></el-input>
      </el-form-item>
      <el-form-item label="批次名称">
        <el-select v-model="batchId" filterable>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in batchData"
            :label="item.couponBatchName"
            :key="item.id"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券状态">
        <el-select v-model="isUsed">
          <el-option label="全部" value></el-option>
          <el-option label="未使用" value="0"></el-option>
          <el-option label="已使用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-select v-model="isActive">
          <el-option label="全部" value></el-option>
          <el-option label="无效" value="0"></el-option>
          <el-option label="有效" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用有效期">
        <el-date-picker
          v-model="useDate"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="过期日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="allCouponList" border stripe style="width:100%">
      <el-table-column fixed prop="discountWay" label="优惠范围+方式" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.couponRange == 1?'商品':'订房'}}{{scope.row.discountWay == 1?'满减券':'折扣券'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponType" label="优惠券类型" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.couponType=='0'">通用券</span>
          <span v-if="scope.row.couponType=='1'">商品券</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponOwnerOrgKindName" label="组织类型" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="couponOwnerOrgName" label="组织名称" min-width="180px"></el-table-column>
      <el-table-column prop="cusId" label="用户ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="cusNickName" label="昵称" min-width="100px"></el-table-column>
      <el-table-column prop="cusPhone" label="手机号" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="couponBatchName" label="批次名称" min-width="120px"></el-table-column>
      <el-table-column prop="couponName" label="优惠券名称" min-width="120px"></el-table-column>
      <el-table-column label="使用门槛/最低消费金额" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.discountWay=='1'">{{scope.row.useLimitMoney}}</span>
          <span v-if="scope.row.discountWay=='2'">{{scope.row.discountMinBuyMoney}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reduceMoney" label="优惠券金额/折扣值" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.discountWay=='1'">{{scope.row.reduceMoney}}</span>
          <span v-if="scope.row.discountWay=='2'">{{scope.row.couponDiscount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="discountMaxMoney" label="最高优惠金额" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="couponStartDate" label="使用有效期" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.couponStartDate}}至{{scope.row.couponEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isUsed" label="使用状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isUsed=='0'">未使用</span>
          <span v-if="scope.row.isUsed=='1'">已使用</span>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="是否有效" min-width="80px" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="authzData['F:BO_COUPON_ALLCOUPON_SWITCH']"
            v-model="scope.row.isActive"
            :active-value="1"
            :inactive-value="0"
            @change="updateStatus(scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="orderCode" label="订单编号" min-width="140px" align="center"></el-table-column>
      <el-table-column prop="useTime" label="使用时间" min-width="160px" align="center"></el-table-column>
      <el-table-column fixed="right" prop="id" label="操作" align="center" min-width="180px">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="authzData['F:BO_COUPON_ALLCOUPON_EXTEND'] && scope.row.isUsed=='0'"
            @click="extendTime(scope.row.id,scope.row.couponBatchName,scope.row.couponName)"
          >延长有效期</el-button>
          <el-button
            type="text"
            v-if="scope.row.orderId!='0' && authzData['F:BO_COUPON_ALLCOUPON_ORDER']"
            @click="checkOrder(scope.row.orderId)"
          >优惠券订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />

    <el-dialog title="延长有效期" :visible.sync="datchdialog" width="30%">
      <el-form>
        <el-form-item label="批次名称" label-width="100px">
          <el-input :disabled="true" v-model="diaGrantData.diabatchName"></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称" label-width="100px">
          <el-input :disabled="true" v-model="diaGrantData.diacouponName"></el-input>
        </el-form-item>
        <el-form-item label="延长有效期至" label-width="100px">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="diaGrantData.effectiveTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="datchdialog=false">取 消</el-button>
        <el-button
          v-if="authzData['F:BO_COUPON_ALLCOUPON_SUBMIT']"
          type="primary"
          @click="sureExtendTimeBtn"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganAllCouponList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      couponId: "", //优惠券id
      deledialog: false,
      datchdialog: false,
      loadingO: false,
      couponDisabled: false,
      discountWay: "", //优惠方式
      couponType: "", //优惠券类型
      couponOwnerOrgKind: "", //优惠券组织类型
      couponOwnerOrgId: "", //优惠券所属组织id
      cusId: "", //用户ID
      cusPhone: "", //用户手机号
      batchId: "", //批次id
      isUsed: "", //是否已使用
      couponBatchName: "", //批次名称
      useDate: [], //使用有效期
      isActive: "", //启用禁用
      batchData: [], //批次数据
      allCouponList: [], //优惠券数据
      organNameList: [], //组织数据
      diaGrantData: {
        diabatchName: "", //批次名称
        diacouponName: "", //优惠券批次名
        effectiveTime: "", //有效时间
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
    this.getCouponBatch();
    this.getOrgan();
    this.getCouponList();
  },
  methods: {
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getCouponList();
    },
    resetFunc() {
      this.discountWay = "";
      this.couponType = "";
      this.couponOwnerOrgKind = "";
      this.couponOwnerOrgId = "";
      this.cusId = "";
      this.cusPhone = "";
      this.batchId = "";
      this.isUsed = "";
      this.isActive = "";
      this.useDate = [];
      this.getCouponList();
    },
    //查看订单
    checkOrder(id) {
      this.$router.push({ name: "LonganOrderProductDetails", query: { id } });
    },

    //延长有效期
    extendTime(id, couponBatchName, couponName) {
      this.couponId = id;
      this.diaGrantData.diabatchName = couponBatchName;
      this.diaGrantData.diacouponName = couponName;
      this.diaGrantData.effectiveTime = "";
      this.datchdialog = true;
    },
    //确认延长有效期
    sureExtendTimeBtn() {
      let that = this;
      if(this.diaGrantData.effectiveTime==''){
        this.$message.error("请选择延长的日期")
        return false;
      }
      let params = {
        couponBatchName: this.diaGrantData.diabatchName,
        couponName: this.diaGrantData.diacouponName,
        couponEndDate: this.diaGrantData.effectiveTime,
      };
      this.$api
        .extendTime(params, that.couponId)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功");
            that.getCouponList();
            that.datchdialog = false;
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

    //优惠券类型
    couponTypeEvent(e) {
      if (e == "0") {
        this.couponOwnerOrgKind = "";
        this.couponOwnerOrgId = "";
        this.couponDisabled = true;
      } else {
        this.couponDisabled = false;
      }
    },

    //确认启用禁用
    updateStatus(id) {
      let that = this;
      this.couponId = id;
      let params = "";
      this.$api
        .getCouponisActive(params, that.couponId)
        .then((response) => {
          if (response.data.code == "0") {
            that.deledialog = false;
            that.$message.success("操作成功");
            that.getCouponList();
          } else {
            that.deledialog = false;
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((error) => {
          that.deledialog = false;
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取组织
    getOrgan(hName) {
      let that = this;
      let params = {
        orgName: hName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getOrganization({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.organNameList = response.data.data.records;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    remoteOrgan(val) {
      this.getOrgan(val);
    },

    //获取优惠券批次列表
    getCouponBatch() {
      let that = this;
      let params = "";
      this.$api
        .getCouponBatch({ params })
        .then((response) => {
          if (response.data.code == "0") {
            that.batchData = response.data.data.records;
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

    //获取所有优惠券列表
    getCouponList() {
      let that = this;
      if (this.useDate == null) {
        this.useDate = [];
      }
      let params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        discountWay: this.discountWay,
        couponType: this.couponType,
        couponOwnerOrgKind: this.couponOwnerOrgKind,
        couponOwnerOrgId: this.couponOwnerOrgId,
        cusId: this.cusId,
        cusPhone: this.cusPhone,
        batchId: this.batchId,
        isUsed: this.isUsed,
        isActive: this.isActive,
        couponStartDate: this.useDate[0],
        couponEndDate: this.useDate[1],
      };
      this.$api
        .getCouponList({ params })
        .then((response) => {
          if (response.data.code == "0") {
            that.allCouponList = response.data.data.records;
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
      this.getCouponList();
      this.$store.commit("setSearchList", {
        discountWay: this.discountWay,
        couponType: this.couponType,
        couponOwnerOrgKind: this.couponOwnerOrgKind,
        couponOwnerOrgId: this.couponOwnerOrgId,
        cusId: this.cusId,
        cusPhone: this.cusPhone,
        batchId: this.batchId,
        isUsed: this.isUsed,
        isActive: this.isActive,
        useDate: this.useDate,
      });
    },
  },
};
</script>

<style lang="less" scope>
.AllCouponList {
  .pagination {
    margin-top: 20px;
  }
  .alignleft {
    text-align: left;
    margin-bottom: 10px;
  }
  .el-dialog__footer {
    text-align: center !important;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
