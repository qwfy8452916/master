<template>
  <div class="channellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
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
      <el-form-item label="统计时间">
        <el-date-picker
          v-model="inquireProvideTime"
          type="daterange"
          format="yyyy-MM-dd"
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
    <el-table :data="PacketDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="orderCount" label="订单总数量" align="center"></el-table-column>
      <el-table-column prop="redPacketAmount" label="红包总金额" align="center"></el-table-column>
      <el-table-column prop="redPacketShareCount" label="红包总发放数量" width="180px" align="center"></el-table-column>
      <el-table-column prop="actRedPacketTotalNum" label="红包可领取总数量" align="center"></el-table-column>
      <el-table-column prop="actRedPacketAveNum" label="平均红包数量" align="center"></el-table-column>
      <el-table-column prop="actRedPacketReceviedNum" label="领取总数量" align="center"></el-table-column>
      <el-table-column prop="actRedPacketReceviedAmount" label="领取总金额" align="center"></el-table-column>
      <el-table-column prop="actRedPacketReceviedAveAmount" label="平均红包金额" align="center"></el-table-column>
      <el-table-column prop="actRedPacketReceviedAveNum" label="平均领取数量" align="center"></el-table-column>
      <el-table-column label="平均领取时间(小时)" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.actRedPacketReceviedAveTime=='-999'?'-':scope.row.actRedPacketReceviedAveTime}}</template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganRedPackHotelTotal",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      inquireProvideTime: [],
      PacketDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingH: false,
      hotelList: [],
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
    this.getHotelList();
    this.redPacketList();
  },
  methods: {
    resetFunc() {
      this.hotelId = "";
      this.inquireProvideTime = [];
      this.redPacketList();
    },
    remoteCabType(val) {
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
    //红包列表
    redPacketList() {
      if (this.inquireProvideTime == null) {
        this.inquireProvideTime = [];
      }
      const params = {
        hotelId: this.hotelId,
        censusTimeFrom: this.inquireProvideTime[0]
          ? this.inquireProvideTime[0]
          : undefined,
        censusTimeTo: this.inquireProvideTime[1]
          ? this.inquireProvideTime[1]
          : undefined,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .shareRedpackHotelTotal({ params })
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.PacketDataList = result.data.records;
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.redPacketList();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        inquireProvideTime: this.inquireProvideTime,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.redPacketList();
    },
  },
};
</script>

<style>
.el-dialog__header {
  text-align: left;
}
.el-dialog__body {
  padding: 0px 20px 30px 20px;
}
</style>

<style lang="less" scoped>
.channellist {
}
</style>