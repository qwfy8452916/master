<template>
  <div class="LonganDeclarationForm">
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
      <el-form-item label="柜子id">
        <el-input v-model="cabId" @keyup.native="number"></el-input>
      </el-form-item>
      <el-form-item label="故障类型">
        <el-select v-model="malType">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in MalTypeList"
            :key="item.dictValue"
            :label="item.dictName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报修人">
        <el-input v-model="malReportBy"></el-input>
      </el-form-item>
      <el-form-item label="处理人">
        <el-input v-model="dealPeople"></el-input>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="dealStatus">
          <el-option label="全部" value></el-option>
          <el-option label="处理成功" value="1"></el-option>
          <el-option label="处理失败" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="LonganDeclarationFormDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="roomFloor" label="酒店楼层" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="房间号" align="center"></el-table-column>
      <el-table-column prop="cabId" label="柜子id" align="center"></el-table-column>
      <el-table-column prop="latticeCode" label="格子编号" align="center"></el-table-column>
      <el-table-column prop="malType" label="故障类型" align="center">
        <!-- 0-初始类型; 1-扫码失败; 2-柜门不开; 3-锁具异常; 4-其他 -->
        <template slot-scope="scope">
          <span v-if="scope.row.malType == '0'">初始类型</span>
          <span v-else-if="scope.row.malType == '1'">扫码失败</span>
          <span v-else-if="scope.row.malType == '2'">柜门不开</span>
          <span v-else-if="scope.row.malType == '3'">锁具异常</span>
          <span v-else-if="scope.row.malType == '4'">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="malReportBy" label="报修人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="报修时间" width="160px" align="center"></el-table-column>
      <el-table-column prop="dealPeople" label="处理人" align="center"></el-table-column>
      <el-table-column prop="dealAt" label="处理时间" width="160px" align="center"></el-table-column>
      <el-table-column prop="dealStatus" label="处理状态" align="center">
        <!-- 0是未处理，1是处理成功；2是处理失败 -->
        <template slot-scope="scope">
          <span v-if="scope.row.dealStatus == '0'">未处理</span>
          <span v-else-if="scope.row.dealStatus == '1'">处理成功</span>
          <span v-else-if="scope.row.dealStatus == '2'">处理失败</span>
          <span v-else-if="scope.row.dealStatus == '3'">已提交更换柜子</span>
        </template>
      </el-table-column>
      <el-table-column prop="malPart" label="故障部件" align="center">
        <!-- 0-初始类型; 1-部件1坏了; 2-部件2坏了; 3-其他 -->
        <template slot-scope="scope">
          <span v-if="scope.row.malPart == '0'">初始类型</span>
          <span v-else-if="scope.row.malPart == '1'">部件1坏了</span>
          <span v-else-if="scope.row.malPart == '2'">部件2坏了</span>
          <span v-else-if="scope.row.malPart == '3'">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="malReason" label="故障原因" align="center">
        <!-- 0-初始类型; 1-理由1; 2-理由2; 3-其他 -->
        <template slot-scope="scope">
          <span v-if="scope.row.malReason == '0'">初始类型</span>
          <span v-else-if="scope.row.malReason == '1'">理由1</span>
          <span v-else-if="scope.row.malReason == '2'">理由2</span>
          <span v-else-if="scope.row.malReason == '3'">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganDeclarationForm",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      LonganDeclarationFormDataList: [],
      MalTypeList: [],
      oprOrgId: "",
      cabId: "",
      malType: "",
      malReportBy: "",
      dealPeople: "",
      dealStatus: "",
      hotelName: "",
      pageNum: 1,
      pageTotal: 0,
      pageSize: 10,
      inquireHotelName: "",
      hotelList: [],
      loadingH: false,
    };
  },
  mounted() {
    // this.oprOrgId=localStorage.getItem('orgId');
    // this.oprOrgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.GetMalTypeList();
    this.RevenueStatistics();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.cabId = "";
      this.malType = "";
      this.malReportBy = "";
      this.dealPeople = "";
      this.dealStatus = "";
      this.RevenueStatistics();
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
    //故障类型
    GetMalTypeList() {
      const params2 = "";
      this.$api
        .FaultManagementMalType(params2)
        .then((response) => {
          const result = response.data;
          const resultlist = result.data.malType;
          if (result.code == "0") {
            this.MalTypeList = resultlist;
          } else {
            this.$message.error("故障列表获取失败");
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //故障统计
    RevenueStatistics() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        // oprOrgId : this.oprOrgId,
        orgAs: 2,
        hotelId: this.inquireHotelName,
        cabId: this.cabId,
        malType: this.malType,
        malReportBy: this.malReportBy,
        dealPeople: this.dealPeople,
        dealStatus: this.dealStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .FaultManagement({ params })
        .then((response) => {
          const result = response.data;
          const resultlist = result.data.records;
          if (result.code == "0") {
            this.LonganDeclarationFormDataList = resultlist;
            this.pageTotal = result.data.total;
            // this.pagesize = parseInt(result.data.size);
            // this.currentPage = parseInt(result.data.current);
            // this.pagercount = parseInt(result.data.pages);
          } else {
            this.$message.error("故障列表获取失败");
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
      this.RevenueStatistics();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        cabId: this.cabId,
        malType: this.malType,
        malReportBy: this.malReportBy,
        dealPeople: this.dealPeople,
        dealStatus: this.dealStatus,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.RevenueStatistics();
    },
    number() {
      this.cabId = this.cabId.replace(/[^\.\d]/g, "");
      this.cabId = this.cabId.replace(".", "");
    },
  },
};
</script>

<style lang="less" scoped>
.Revenue-font {
  text-align: left;
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>

