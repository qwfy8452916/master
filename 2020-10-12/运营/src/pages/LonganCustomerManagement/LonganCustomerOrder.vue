<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="顾客ID：">
        <el-input v-model="customId" placeholder="请输入顾客ID"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="mobile" placeholder="请输入顾客手机"></el-input>
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
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="accessTime"
          type="daterange"
          range-separator="至"
          start-placeholder="请选择日期"
          end-placeholder="请选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="orderList" border stripe style="width:100%;">
      <el-table-column prop="commonId" label="顾客ID" align="center"></el-table-column>
      <el-table-column prop="nickName" label="顾客昵称" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店" align="center"></el-table-column>
      <el-table-column prop="hotelFloor" label="楼层" align="center"></el-table-column>
      <el-table-column prop="hotelRoom" label="房间号" align="center"></el-table-column>
      <el-table-column prop="prodCount" label="商品数量" align="center"></el-table-column>
      <el-table-column prop="prodAmount" label="商品金额" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="payTimeStr" label="支付时间" align="center"></el-table-column>
      <el-table-column prop="orderCode" label="订单号" align="center"></el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganCustomerOrder",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      hotelList: [],
      loadingH: false,

      customId: "",
      mobile: "",
      inquireHotelName: "",
      openType: "",
      accessTime: [],

      orderList: [],

      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
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
    this.GetAeecsslistdata();
  },
  methods: {
    resetFunc() {
      this.customId = "";
      this.mobile = "";
      this.inquireHotelName = "";
      this.openType = "";
      this.accessTime = [];

      this.GetAeecsslistdata();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.GetAeecsslistdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.GetAeecsslistdata();
      this.$store.commit("setSearchList", {
        customId: this.customId,
        mobile: this.mobile,
        inquireHotelName: this.inquireHotelName,
        openType: this.openType,
        accessTime: this.accessTime,
      });
    },
    remoteHotel(val) {
      this.getHotelList(val);
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
    //获取打开方式 - 字典表
    getorderList() {
      const params = {
        key: "HOTEL_IMAGE_LINK_NAME", //修改key值
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.opentypelis = result.data.map((item) => {
              return {
                id: item.dictValue,
                openname: item.dictName,
              };
            });
            const openall = {
              id: "",
              openname: "全部",
            };
            this.opentypelis.push(openall);
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
    GetAeecsslistdata() {
      //获取访问记录列表数据
      let fromTimedata = "";
      let toTime = "";
      if (this.accessTime[0]) {
        fromTimedata = this.accessTime[0];
        toTime = this.accessTime[1];
      }
      let params = {
        commonId: this.customId,
        phone: this.mobile,
        hotelId: this.inquireHotelName,
        openWay: this.openType,
        payFromTime: fromTimedata,
        payToTime: toTime,

        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getCustomerOrderlist(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.orderList = result.data.records;
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
  },
};
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 20px;
}
</style>

