<template>
  <div class="AllCouponBatch">
    <el-form :inline="true" align="left">
      <el-form-item label="优惠方式">
        <el-select v-model="discountWay">
          <el-option label="全部" value></el-option>
          <el-option label="满减券" value="1"></el-option>
          <el-option label="折扣券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="couponType" @change="couponTypeEvent">
          <el-option label="全部" value></el-option>
          <el-option label="通用券" value="0"></el-option>
          <el-option label="商品券" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织类型">
        <el-select v-model="couponOwnerOrgKind" :disabled="couponDisabled2">
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
          :disabled="couponDisabled2"
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
      <el-form-item label="批次名称">
        <el-input v-model="couponBatchName"></el-input>
      </el-form-item>
      <el-form-item label="优惠券名称">
        <el-input v-model="couponName"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="couponLimit">
          <el-option label="全部" value></el-option>
          <el-option label="唯一券" :disabled="couponDisabled" value="0"></el-option>
          <el-option label="分组券" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券金额">
        <el-input v-model="reduceMoney"></el-input>
      </el-form-item>
      <el-form-item label="领取/发放有效期">
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

    <el-table :data="batchData" border stripe style="width:100%">
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
      <el-table-column prop="couponBatchName" label="批次名称" min-width="120px"></el-table-column>
      <el-table-column prop="couponName" label="优惠券名称" min-width="120px"></el-table-column>
      <el-table-column prop="couponLimit" label="类型" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.couponLimit=='0'">唯一券</span>
          <span v-if="scope.row.couponLimit=='1'">分组券</span>
        </template>
      </el-table-column>
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
      <el-table-column prop="batchStartTime" label="领取/发放有效期" min-width="170px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.batchStartTime}}至{{scope.row.batchEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponTermType" label="使用有效期" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.couponTermType=='0'">{{scope.row.couponTermDays}}天</span>
          <span
            v-if="scope.row.couponTermType=='1'"
          >{{scope.row.couponTermStartDate}}至{{scope.row.couponTermEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="id" label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_COUPON_ALLGROUP_MODIFY']"
            type="text"
            @click="editBatch(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_COUPON_ALLGROUP_DELETE']"
            type="text"
            @click="delBatch(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="deledialog" width="30%">
      <span>是否确认删除该优惠券批次?</span>
      <span slot="footer">
        <el-button @click="deledialog=false">取 消</el-button>
        <el-button type="primary" @click="sureDeleBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganAllCouponBatch",
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
      batchId: "", //批次id
      loadingO: false,
      deledialog: false,
      couponDisabled: false,
      couponDisabled2: false,
      organNameList: [], //获取组织数据
      discountWay: "", //优惠方式
      couponType: "", //优惠券类型
      couponOwnerOrgKind: "", //组织类型
      couponOwnerOrgId: "", //优惠券所属组织ID
      couponBatchName: "", //批次名称
      couponName: "", //优惠券名称
      couponLimit: "", //优惠券类型
      reduceMoney: "", //优惠券金额
      useDate: [], //使用有效期
      batchStartTime: "", //领取发放起始时间
      batchEndTime: "", //领取发放截止时间
      isActive: "", //启用禁用
      batchData: [{ name: "11" }],
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
  },
  methods: {
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getCouponBatch();
    },
    resetFunc() {
      this.discountWay = "";
      this.couponType = "";
      this.couponOwnerOrgKind = "";
      this.couponOwnerOrgId = "";
      this.couponBatchName = "";
      this.couponName = "";
      this.couponLimit = "";
      this.reduceMoney = "";
      this.useDate = [];
      this.getCouponBatch();
    },
    //优惠券类型
    couponTypeEvent(e) {
      if (e == "0") {
        this.couponOwnerOrgKind = "";
        this.couponOwnerOrgId = "";
        this.couponDisabled = false;
        this.couponDisabled2 = true;
        if (this.couponLimit == "0") {
          this.couponLimit = "";
        }
      } else {
        this.couponDisabled = true;
        this.couponDisabled2 = false;
      }
    },

    //修改
    editBatch(id) {
      this.$router.push({ name: "LonganAllCouponBatchEdit", query: { id } });
    },

    //删除
    delBatch(id) {
      this.batchId = id;
      this.deledialog = true;
    },
    //确认删除
    sureDeleBtn() {
      let that = this;
      let params = "";
      this.$api
        .deleCouponBatch(params, that.batchId)
        .then((response) => {
          if (response.data.code == "0") {
            that.deledialog = false;
            that.$message.success("操作成功");
            that.getCouponBatch();
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
        couponBatchName: this.couponBatchName,
        couponName: this.couponName,
        couponLimit: this.couponLimit,
        reduceMoney: this.reduceMoney,
        batchStartTime: this.useDate[0],
        batchEndTime: this.useDate[1],
        isActive: this.isActive,
      };
      this.$api
        .getCouponBatch({ params })
        .then((response) => {
          if (response.data.code == "0") {
            that.batchData = response.data.data.records;
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
      this.getCouponBatch();
      this.$store.commit("setSearchList", {
        discountWay: this.discountWay,
        couponType: this.couponType,
        couponOwnerOrgKind: this.couponOwnerOrgKind,
        couponOwnerOrgId: this.couponOwnerOrgId,
        couponBatchName: this.couponBatchName,
        couponName: this.couponName,
        couponLimit: this.couponLimit,
        reduceMoney: this.reduceMoney,
        useDate: this.useDate,
      });
    },
  },
};
</script>

<style lang="less" scope>
.AllCouponBatch {
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
