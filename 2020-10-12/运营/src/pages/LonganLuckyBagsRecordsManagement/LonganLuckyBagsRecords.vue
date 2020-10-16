<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-select
          filterable
          remote
          :remote-method="remoteCabType"
          @focus="getHotelList()"
          v-model="hotelId"
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
      <el-form-item label="用户ID">
        <el-input v-model="cusId" placeholder="请输入用户id"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="cusNickName" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="柜子id">
        <el-input v-model="roomCode" placeholder="请输入柜子id"></el-input>
      </el-form-item>
      <el-form-item label="格子商品">
        <el-select
          v-model="prodCode"
          filterable
          remote
          :remote-method="remoteGoodsType"
          @focus="getCabTypeList()"
          placeholder="请选择格子商品"
        >
          <el-option
            v-for="item in cabGoodsList"
            :key="item.id"
            :label="item.prodName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取时间">
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
      <el-table-column fixed prop="orderCode" label="订单号" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="cusId" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="cusNickName" label="用户昵称" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="订单金额" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="领取的柜子id" align="center"></el-table-column>
      <el-table-column prop="latticeCode" label="格子" align="center"></el-table-column>
      <el-table-column prop="prodName" label="格子商品" align="center"></el-table-column>

      <el-table-column label="领取时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.drawTime=='1970-01-01 00:00:00'?'-':scope.row.drawTime}}</template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganLuckyBagsRecords",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      hotelId: "",
      hotelList: [],
      cusId: "",
      cusNickName: "",
      roomCode: "",
      prodCode: "",
      cabGoodsList: [],
      dateRange: [],

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
    this.getHotelList();
    this.getCabTypeList();
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.hotelId = "";
      this.cusId = "";
      this.cusNickName = "";
      this.roomCode = "";
      this.prodCode = "";
      this.dateRange = [];
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        cusId: this.cusId,
        cusNickName: this.cusNickName,
        roomCode: this.roomCode,
        prodCode: this.prodCode,
        dateRange: this.dateRange,
      });
    },
    remoteCabType(val) {
      this.getHotelList(val);
    },
    remoteGoodsType(val) {
      this.getCabTypeList(val);
    },
    //格子商品
    getCabTypeList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: "",
        prodName: hName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .platformCommodityList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.cabGoodsList = result.data.records.map((item) => {
              return {
                id: item.id,
                prodName: item.prodName,
              };
            });
            const hotelAll = {
              id: "",
              prodName: "全部",
            };
            this.cabGoodsList.unshift(hotelAll);
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
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //获取数据
    ifEmpty(item) {
      if (item === "") {
        return undefined;
      } else {
        return item;
      }
    },
    Getdata() {
      let that = this;
      let params = {
        cusId: this.ifEmpty(this.cusId),
        cusNickName: this.ifEmpty(this.cusNickName),
        hotelId: this.ifEmpty(this.hotelId),
        prodCode: this.ifEmpty(this.prodCode),
        roomCode: this.ifEmpty(this.roomCode),
        drawTimeStart: this.dateRange == null ? undefined : this.dateRange[0],
        drawTimeEnd: this.dateRange == null ? undefined : this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getLuckyBagList({ params })
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

