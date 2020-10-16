<template>
  <div class="GrantCouponRecord">
    <el-form :inline="true" align="left">
      <el-form-item label="优惠方式">
        <el-select v-model="discountWay">
          <el-option label="全部" value></el-option>
          <el-option label="满减券" value="1"></el-option>
          <el-option label="折扣券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-select
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
        <el-input v-model.trim="userId"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model.trim="userPhone"></el-input>
      </el-form-item>
      <el-form-item label="批次名称">
        <el-select
          v-model="batchId"
          filterable
          remote
          :remote-method="remoteBatchone"
          :loading="loadingBone"
          @focus="getCouponBatch()"
        >
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
        <el-select v-model="couponState">
          <el-option label="全部" value></el-option>
          <el-option label="未使用" value="0"></el-option>
          <el-option label="已使用" value="1"></el-option>
          <el-option label="已过期" value="2"></el-option>
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
    <el-table :data="CouponSendData" border stripe style="width:100%">
      <el-table-column fixed prop="batchId" label="优惠券批次ID" min-width="120px"></el-table-column>
      <el-table-column prop="couponOwnerOrgName" label="酒店名称" min-width="120px"></el-table-column>
      <el-table-column prop="discountWay" label="优惠范围+方式" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.couponRange == 1?'商品':'订房'}}{{scope.row.discountWay == 1?'满减券':'折扣券'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponType" label="优惠券类型" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.couponLimit=='0'">通用券</span>
          <span v-if="scope.row.couponLimit=='1'">商品券</span>
        </template>
      </el-table-column>
      <el-table-column prop="cusId" label="领用人ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="cusNickName" label="昵称" min-width="100px"></el-table-column>
      <el-table-column prop="cusPhone" label="手机号" min-width="120px"></el-table-column>
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
      <el-table-column label="使用有效期" min-width="170px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.couponStartDate}}至{{scope.row.couponEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isUsed" label="使用状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isUsed=='0'">未使用</span>
          <span v-if="scope.row.isUsed=='1'">已使用</span>
          <span v-if="scope.row.isUsed=='2'">已过期</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="" label="发送时间" min-width="160px" align="center"></el-table-column> -->
      <el-table-column prop="giftTime" label="领用时间" min-width="160px" align="center"></el-table-column>
      <el-table-column prop="useTime" label="使用时间" min-width="160px" align="center"></el-table-column>
      <el-table-column prop="orderCode" label="订单编号" min-width="160px" align="center"></el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganCouponSendRecord",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      discountWay: "", //优惠方式
      couponOwnerOrgId: "", //酒店名称
      organNameList: [], //酒店组织数据
      loadingO: false,
      userId: "", //用户ID
      userPhone: "", //手机号
      batchId: "", //批次ID
      loadingBone: false,
      batchData: [], //批次数据
      couponState: [], //优惠券状态
      useDate: [], //发放时间
      CouponSendData: [],
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
    this.getCouponSendRecord();
    this.getCouponBatch();
  },
  methods: {
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getCouponSendRecord();
    },
    resetFunc() {
      this.discountWay = "";
      this.couponOwnerOrgId = "";
      this.userId = "";
      this.userPhone = "";
      this.batchId = "";
      this.couponState = "";
      this.useDate = [];
      this.getCouponSendRecord();
    },
    //酒店组织列表
    getOrgan(oName) {
      let that = this;
      this.loadingO = true;
      let params = {
        orgName: oName,
        orgKind: 3,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getOrganization({ params })
        .then((response) => {
          this.loadingO = false;
          const result = response.data;
          if (result.code == 0) {
            that.organNameList = result.data.records;
          } else {
            this.$message.error(result.msg);
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
    getCouponBatch(couponBatchName) {
      let that = this;
      let params = {
        couponBatchName: couponBatchName,
        pageNo: 1,
        pageSize: 50,
      };
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
    remoteBatchone(val) {
      this.getCouponBatch(val);
    },

    //获取发送优惠券记录列表
    getCouponSendRecord() {
      let that = this;
      if (this.useDate == null) {
        this.useDate = [];
      }
      let params = {
        discountWay: this.discountWay,
        couponOwnerOrgId: this.couponOwnerOrgId,
        cusId: this.userId,
        cusPhone: this.userPhone,
        batchId: this.batchId,
        isUsed: this.couponState,
        couponStartDate: this.useDate[0],
        couponEndDate: this.useDate[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getCouponSendRecord(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.CouponSendData = result.data.records;
            that.pageTotal = result.data.total;
          } else {
            this.$message.error(result.msg);
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
      this.getCouponSendRecord();
      this.$store.commit("setSearchList", {
        discountWay: this.discountWay,
        couponOwnerOrgId: this.couponOwnerOrgId,
        userId: this.userId,
        userPhone: this.userPhone,
        batchId: this.batchId,
        couponState: this.couponState,
        useDate: this.useDate,
      });
    },
  },
};
</script>

<style lang="less" scope>
.GrantCouponRecord {
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
}
</style>
