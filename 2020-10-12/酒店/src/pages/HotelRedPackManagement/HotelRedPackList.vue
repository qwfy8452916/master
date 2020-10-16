<template>
  <div class="channellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="订单类型">
        <el-select v-model="shareType" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="inquireOrderCode"></el-input>
      </el-form-item>
      <el-form-item label="分享人ID">
        <el-input v-model="inquireProvideName"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
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
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column label="订单类型" align="center">
        <template slot-scope="scope">{{scope.row.businessType==1?'购物订单':'订房订单'}}</template>
      </el-table-column>
      <el-table-column prop="businessCode" label="订单号" width="180px" align="center"></el-table-column>
      <el-table-column prop="fromCustomId" label="分享人ID" align="center"></el-table-column>
      <el-table-column prop="fromCustomNickName" label="分享人昵称" align="center"></el-table-column>
      <el-table-column prop="fromCustomMobile" label="分享人手机号" width="120px" align="center"></el-table-column>
      <el-table-column prop="shareCount" label="分享次数" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="红包总金额" align="center"></el-table-column>
      <el-table-column prop="totalNum" label="红包数量" align="center"></el-table-column>
      <el-table-column prop="receviedAmount" label="已领取金额" align="center"></el-table-column>
      <el-table-column prop="receivedNum" label="已领取数量" align="center"></el-table-column>
      <el-table-column label="创建时间" width="160px" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.createdAt=='1970-01-01 00:00:00'?'-':scope.row.createdAt}}</template>
      </el-table-column>
      <el-table-column label="截至时间" width="160px" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.deadlineAt=='1970-01-01 00:00:00'?'-':scope.row.deadlineAt}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="packetGetDetail(scope.row.id)">详情</el-button>
          <el-button type="text" size="small" @click="packetShareRecord(scope.row.id)">分享记录</el-button>
          <el-button type="text" size="small" @click="packetGetRecord(scope.row.id)">领取记录</el-button>
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
  name: "HotelRedPackList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      inquireOrderCode: "",
      shareType: "",
      inquireProvideName: "",
      inquireProvideTime: [],
      PacketDataList: [],
      pageTotal: 0,
      currentPage: 1,
      pageNum: 1,
      loadingH: false,
      hotelList: [],
      statusList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 1,
          label: "购物红包",
        },
        {
          value: 2,
          label: "订房红包",
        },
      ],
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
    this.hotelId = localStorage.getItem("hotelId");
    this.redPacketList();
  },
  methods: {
    resetFunc() {
      this.inquireOrderCode = "";
      this.shareType = "";
      this.inquireProvideName = "";
      this.inquireProvideTime = [];
      this.redPacketList();
    },
    //红包列表
    redPacketList() {
      if (this.inquireProvideTime == null) {
        this.inquireProvideTime = [];
      }
      const params = {
        hotelId: this.hotelId,
        businessType: this.shareType,
        fromCustomName: this.inquireProvideName,
        orderCode: this.inquireOrderCode,
        shareAtFrom: this.inquireProvideTime[0]
          ? this.inquireProvideTime[0]
          : undefined,
        shareAtTo: this.inquireProvideTime[1]
          ? this.inquireProvideTime[1]
          : undefined,
        pageNo: this.pageNum,
        pageSize: 10,
      };
      this.$api
        .searchRedPack({ params })
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
        inquireOrderCode: this.inquireOrderCode,
        shareType: this.shareType,
        inquireProvideName: this.inquireProvideName,
        inquireProvideTime: this.inquireProvideTime,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.redPacketList();
    },
    //领取记录
    packetGetRecord(redId) {
      this.$router.push({ name: "HotelRedPackGetRecord", query: { redId } });
    },
    packetGetDetail(id) {
      this.$router.push({ name: "HotelRedpackDetail", query: { id } });
    },
    packetShareRecord(redId) {
      this.$router.push({ name: "HotelRedPackShareRE", query: { redId } });
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