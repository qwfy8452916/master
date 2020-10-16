<template>
  <div class="channellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="订单号">
        <el-input v-model="inquireOrderCode"></el-input>
      </el-form-item>
      <el-form-item label="柜子ID">
        <el-input v-model="inquireCabID"></el-input>
      </el-form-item>
      <el-form-item label="发放人">
        <el-input v-model="inquireProvideName"></el-input>
      </el-form-item>
      <el-form-item label="发放时间">
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
      <el-table-column fixed prop="orderCode" label="订单号" width="180px"></el-table-column>
      <el-table-column prop="investorCabnetId" label="柜子ID"></el-table-column>
      <el-table-column prop="totalCount" label="红包数量"></el-table-column>
      <el-table-column prop="amount" label="红包金额"></el-table-column>
      <el-table-column prop="usedCount" label="已领取数量"></el-table-column>
      <el-table-column prop="usedAmount" label="已领取金额"></el-table-column>
      <el-table-column prop="nickName" label="发放人"></el-table-column>
      <el-table-column prop="createdAt" label="发放时间" width="160px" align="center"></el-table-column>
      <el-table-column label="过期时间" width="160px" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.deadLine=='1970-01-01 00:00:00'?'-':scope.row.deadLine}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="packetGetRecord(scope.row.id)">详情</el-button>
          <el-button type="text" size="small" @click="packetGetRecord(scope.row.id)">分享记录</el-button>
          <el-button
            v-if="authzData['F:BO_FS_RED_RECORD']"
            type="text"
            size="small"
            @click="packetGetRecord(scope.row.id)"
          >领取记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="领取记录" :visible.sync="dialogRecordVisible" width="56%">
      <el-table :data="getRecordData">
        <el-table-column property="id" label="红包ID" align="center"></el-table-column>
        <el-table-column property="detailType" label="类型" align="center">
          <span>红包</span>
          <!-- <template slot-scope="scope">
                        <span v-if="scope.row.detailType == 1">间接红包</span>
                        <span v-else-if="scope.row.detailType == 2">直接红包</span>
                        <span v-else-if="scope.row.detailType == 3">分享奖励</span>
                        <span v-else-if="scope.row.detailType == 4">特使奖励</span>
                        <span v-else-if="scope.row.detailType == 5">升级奖励</span>
                        <span v-else-if="scope.row.detailType == 6">提现扣款</span>
                        <span v-else-if="scope.row.detailType == 7">购买扣款</span>
          </template>-->
        </el-table-column>
        <el-table-column property="amount" label="红包金额" align="center"></el-table-column>
        <el-table-column property="nickName" label="领取人" align="center"></el-table-column>
        <el-table-column property="transTime" label="领取时间" width="160px" align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganRedPacketList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      inquireOrderCode: "",
      inquireCabID: "",
      inquireProvideName: "",
      inquireProvideTime: [],
      PacketDataList: [],
      dialogRecordVisible: false,
      getRecordData: [],
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
    this.redPacketList();
  },
  methods: {
    resetFunc() {
      this.inquireOrderCode = "";
      this.inquireCabID = "";
      this.inquireProvideName = "";
      this.inquireProvideTime = [];
      this.redPacketList();
    },
    //红包列表
    redPacketList() {
      if (this.inquireCreateTime == null) {
        this.inquireCreateTime = [];
      }
      const params = {
        orderCode: this.inquireOrderCode,
        cabId: this.inquireCabID,
        ownerName: this.inquireProvideName,
        createAtFrom: this.inquireProvideTime[0],
        createAtTo: this.inquireProvideTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .redPacketList(params)
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
        inquireCabID: this.inquireCabID,
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
    packetGetRecord(id) {
      const params = {};
      // console.log(id);
      this.$api
        .packetGetRecord(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.getRecordData = result.data;
            this.dialogRecordVisible = true;
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

