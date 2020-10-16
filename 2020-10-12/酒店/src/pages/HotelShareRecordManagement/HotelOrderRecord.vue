<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="分享人类型：">
        <el-select v-model="shareUserType" placeholder="请选择分享人类型">
          <el-option value label="全部"></el-option>
          <el-option value="1" label="员工"></el-option>
          <el-option value="2" label="顾客"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分享人ID：">
        <el-input v-model="shareUserId" placeholder="请输入分享人ID"></el-input>
      </el-form-item>
      <el-form-item label="分享日期">
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
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed prop="shareRecordId" label="分享记录ID" align="center"></el-table-column>
      <el-table-column label="分享人类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.shareUserType == 1">员工</span>
          <span v-if="scope.row.shareUserType == 2">顾客</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="shareUserId" label="分享人ID" align="center"></el-table-column>
      <el-table-column prop="shareUserName" label="分享人名称" align="center"></el-table-column>
      <el-table-column prop="shareUserMobile" label="分享人手机号" align="center"></el-table-column>
      <el-table-column prop="roomFloor" label="楼层" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="房间号" align="center"></el-table-column>
      <el-table-column prop="userId" label="顾客ID" align="center"></el-table-column>
      <el-table-column prop="userName" label="顾客昵称" align="center"></el-table-column>
      <el-table-column prop="userMobile" label="顾客手机号" align="center"></el-table-column>
      <el-table-column prop="prodCount" label="商品数量" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="商品金额" align="center"></el-table-column>
      <el-table-column prop="orderAmount" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="orderTime" label="支付时间" align="center"></el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 0">待支付</span>
          <span v-if="scope.row.orderStatus == 1">已支付</span>
          <span v-if="scope.row.orderStatus == 2">已取消</span>
          <span v-if="scope.row.orderStatus == 3">部分退款</span>
          <span v-if="scope.row.orderStatus == 4">全部退款</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="订单号" min-width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row.orderStatus == 1"
            size="small"
            @click="productdetails(scope.$index, CabinetList)"
          >{{scope.row.orderCode}}</el-button>
          <el-button type="text" v-else size="small">-</el-button>
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
  name: "HotelOrderRecord",
  components: {
    resetButton,
    HotelPagination
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      hotelId: "",
      hotelList: [],
      shareUserId: "",
      dateRange: [],
      shareUserType: "",
      shareCode: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  created() {
    //    this.oprOgrId=localStorage.orgId
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
    this.hotelId = parseInt(localStorage.hotelId);
    this.shareCode = this.$route.query.modifyid;
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.shareUserId = "";
      this.shareUserType = "";
      this.dateRange = [];
      this.Getdata();
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        shareUserId: this.shareUserId,
        shareUserType: this.shareUserType,
        dateRange: this.dateRange,
      });
    },
    //商品详情
    productdetails(index, row) {
      let id = row[index].orderId;
      this.$router.push({ name: "HotelOrderDetails", query: { id } });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    Getdata() {
      let that = this;
      let params = {
        hotelId: this.hotelId,
        shareUserId: this.shareUserId,
        shareUserType: this.shareUserType,
        shareTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
        shareTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
        shareCode: this.shareCode,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .selHotelOrderRecords({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
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

