<template>
  <div>
    <div class="download">
      <div>
        <el-button
          class="addbutton"
          @click="exportExe(1)"
        >订房报表下载</el-button>
      </div>
      <div>
        <el-button
          class="addbutton"
          @click="exportExe(2)"
        >商品报表下载</el-button>
      </div>
      <div>
        <el-button
          class="addbutton"
          @click="exportExe(3)"
        >餐饮销售报表下载</el-button>
      </div>
      <div>
        <el-button
          class="addbutton"
          @click="exportExe(4)"
        >预售券报表下载</el-button>
      </div>
      <div>
        <el-button
          class="addbutton"
          @click="exportExe(5)"
        >活动销售报表下载</el-button>
      </div>
    </div>
    <!-- <div><el-button class="addbutton" @click="exportExe">导&nbsp;&nbsp;出</el-button></div> -->
    <el-dialog
      title="选择报表时间范围"
      :visible.sync="dislogVisibleTime"
      width="30%"
    >
      <el-form
        align="left"
        label-width="80px"
      >
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="orderTime"
            type="daterange"
            range-separator="至"
            start-placeholder="请选择日期"
            end-placeholder="请选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dislogVisibleTime = false">取 消</el-button>
        <el-button
          type="primary"
          @click="ensureDownload"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HotelReportOrderAll",
  data() {
    return {
      authzData: "",
      token: "",
      hotelId: "",
      dislogVisibleTime: false,
      orderTime: [],
      exportType: ""
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
    this.token = localStorage.getItem("Authorization");
    this.hotelId = localStorage.getItem("hotelId");
    if (this.token == "" || this.hotelId == "") {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    //下载
    exportExe(type) {
      this.exportType = type;
      this.dislogVisibleTime = true;
    },
    //确定
    ensureDownload() {
      this.dislogVisibleTime = false;
      if (this.orderTime == null) {
        this.orderTime = [];
      }
      let startTime = this.orderTime[0] == undefined ? "" : this.orderTime[0];
      let endTime = this.orderTime[1] == undefined ? "" : this.orderTime[1];
      if (this.exportType == 1) {
        //订房
        window.location.href =
          this.$api.download_file_url +
          "/longan/api/report/report-book-room-data-po/export?t=" +
          this.token +
          "&hotelId=" +
          this.hotelId +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime;
      } else if (this.exportType == 2) {
        //商品
        window.location.href =
          this.$api.download_file_url +
          "/longan/api/report/report-product-sale-data-po/export?t=" +
          this.token +
          "&hotelId=" +
          this.hotelId +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime;
      } else if (this.exportType == 3) {
        //餐饮
        window.location.href =
          this.$api.download_file_url +
          "/longan/api/report/report-catering-sales-data-po/export?t=" +
          this.token +
          "&hotelId=" +
          this.hotelId +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime;
      } else if (this.exportType == 4) {
        //预售
        window.location.href =
          this.$api.download_file_url +
          "/longan/api/report/report-vou-sales-data-po/export?t=" +
          this.token +
          "&hotelId=" +
          this.hotelId +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime;
      } else if (this.exportType == 5) {
        //活动
        window.location.href =
          this.$api.download_file_url +
          "/longan/api/report/report-act-sales-data-po/export?t=" +
          this.token +
          "&hotelId=" +
          this.hotelId +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime;
      }
      this.orderTime = [];
    }
  }
};
</script>

<style lang="less" scoped>
.download {
  display: flex;
  flex-direction: column;
}
</style>>

