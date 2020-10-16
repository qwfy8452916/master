<template>
  <div class="commoditymanage">
    <el-form :inline="true" align="left" class="searchform">
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
      <el-form-item label="发票类型">
        <el-select v-model="inquireInvoiceType" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="电子普通发票" value="1"></el-option>
          <el-option label="增值税专用发票" value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="状态">
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未开票" value="0"></el-option>
                    <el-option label="已申请" value="1"></el-option>
                    <el-option label="已处理" value="2"></el-option>
                    <el-option label="已撤销" value="3"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="用户手机号">
        <el-input v-model="inquireUserPhone"></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker
          v-model="inquireSubmitTime"
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
    <el-table :data="InvoiceDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="invType" label="发票类型" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.invType == 1">电子普通发票</span>
          <span v-else-if="scope.row.invType == 2">增值税专用发票</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="发票金额(元)" width="110px" align="center"></el-table-column>
      <el-table-column prop="mobile" label="用户手机号" width="110px" align="center"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未开票</span>
          <span v-else-if="scope.row.status == 1">已申请</span>
          <span v-else-if="scope.row.status == 2">已处理</span>
          <span v-else-if="scope.row.status == 3">已撤销</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="提交时间" width="160px" align="center"></el-table-column>
      <el-table-column prop="lastUpdatedAt" label="处理时间" width="160px" align="center"></el-table-column>
      <el-table-column prop="invHead" label="开票单位" width="120px" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="80px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_FIN_INVOICE_WAIT_DEAL']"
            type="text"
            size="small"
            @click="waitInvoiceProdDetail(scope.row.id)"
          >处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganWaitInvoiceProdList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      hotelList: [],
      loadingH: false,
      inquireHotelName: "",
      inquireInvoiceType: "",
      // inquireStatus: '',
      inquireUserPhone: "",
      inquireSubmitTime: [],
      InvoiceDataList: [],
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
    this.getHotelList();
    this.waitInvoiceProdList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireInvoiceType = "";
      this.inquireUserPhone = "";
      this.inquireSubmitTime = [];
      this.waitInvoiceProdList();
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
    remoteHotel(val) {
      this.getHotelList(val);
    },
    //待开商品销售发票
    waitInvoiceProdList() {
      if (this.inquireSubmitTime == null) {
        this.inquireSubmitTime = [];
      }
      const params = {
        orgAs: 2,
        hotelId: this.inquireHotelName,
        invCategory: 2,
        invType: this.inquireInvoiceType,
        status: 1,
        mobile: this.inquireUserPhone,
        createAtFrom: this.inquireSubmitTime[0],
        createAtTo: this.inquireSubmitTime[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .waitInvoiceProdList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.InvoiceDataList = result.data.records;
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
      this.waitInvoiceProdList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireInvoiceType: this.inquireInvoiceType,
        inquireUserPhone: this.inquireUserPhone,
        inquireSubmitTime: this.inquireSubmitTime,
      });
    },
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.waitInvoiceProdList();
    },
    //处理
    waitInvoiceProdDetail(id) {
      this.$router.push({ name: "LonganWaitInvoiceProdDetail", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.commoditymanage {
}
</style>
