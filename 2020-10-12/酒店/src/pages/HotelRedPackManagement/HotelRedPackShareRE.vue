<template>
    <div class="channellist">
        <el-form
            :inline="true"
            align=left
            class="searchform"
        >
            <el-form-item label="红包ID">
                <el-input v-model="redPacketId"></el-input>
            </el-form-item>
            <el-form-item label="分享ID">
                <el-input v-model="shareRecordId"></el-input>
            </el-form-item>
            <el-form-item label="分享人ID">
                <el-input v-model="shareUserId"></el-input>
            </el-form-item>
            <el-form-item label="分享时间">
                <el-date-picker
                    v-model="inquireProvideTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="inquire"
                >查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc' />
            </el-form-item>
        </el-form>
        <el-table
            :data="PacketDataList"
            border
            stripe
            style="width:100%;"
        >
            <el-table-column
                fixed
                prop="id"
                label="ID"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="redId"
                label="红包ID"
                width="180px"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="id"
                label="分享ID"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="shareCustomId"
                label="分享人ID"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="shareCustomNickName"
                label="分享人昵称"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="shareCustomMobile"
                label="分享人手机号"
                width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                label="分享方式"
                align="center"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.shareWay==1">转发</span>
                    <span v-if="scope.row.shareWay==2">海报</span>
                </template>
            </el-table-column>
            <el-table-column
                label="分享时间"
                width="160px"
                align=center
            >
                <template slot-scope="scope">
                    {{scope.row.shareTime=='1970-01-01 00:00:00'?'-':scope.row.shareTime}}
                </template>
            </el-table-column>
            <el-table-column
                prop="receivedNum"
                label="领取数量"
                align="center"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100px"
                align=center
            >
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="packetGetRecord(scope.row.id)"
                    >领取记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <HotelPagination
            :pageTotal="pageTotal"
            @pageFunc="pageFunc"
        />
        <div style="text-align:left">
            <el-button
                v-if="ifshowBack"
                @click="cancelbtn()"
            >返回</el-button>
        </div>
    </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelRedPackShareRE",
  components: {
    resetButton,
    HotelPagination
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      redPacketId: "",
      shareRecordId: "",
      shareUserId: "",
      inquireProvideTime: [],
      PacketDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingH: false,
      hotelList: [],
      ifshowBack: false
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then(response => {
        this.authzData = response;
      })
      .catch(err => {
        this.authzData = err;
      });
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    if (this.$route.query.redId !== undefined) {
      this.redPacketId = this.$route.query.redId;
      this.ifshowBack = true;
    }
    this.hotelId = localStorage.getItem("hotelId");
    this.redPacketList();
  },
  methods: {
    cancelbtn() {
      this.$router.go(-1);
      this.ifshowBack = false;
    },
    resetFunc() {
      this.redPacketId = "";
      this.shareRecordId = "";
      this.shareUserId = "";
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
        redPacketId: this.redPacketId,
        shareRecordId: this.shareRecordId,
        shareUserId: this.shareUserId,
        shareAtFrom: this.inquireProvideTime[0]
          ? this.inquireProvideTime[0]
          : undefined,
        shareAtTo: this.inquireProvideTime[1]
          ? this.inquireProvideTime[1]
          : undefined,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      this.$api
        .selRedpackShareRe({ params })
        .then(response => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.PacketDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.redPacketList();
      this.$store.commit("setSearchList", {
        redPacketId: this.redPacketId,
        shareRecordId: this.shareRecordId,
        shareUserId: this.shareUserId,
        inquireProvideTime: this.inquireProvideTime
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.redPacketList();
    },
    packetGetRecord(shareId) {
      this.$router.push({ name: "HotelRedPackGetRecord", query: { shareId } });
    }
  }
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
  .pagination {
    margin-top: 20px;
  }
}
</style>