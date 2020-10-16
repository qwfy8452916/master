<template>
  <div class="hotelgridlist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店楼层">
        <el-input v-model="inquireHotelFloor"></el-input>
      </el-form-item>
      <el-form-item label="格子编号">
        <el-input v-model="inquireGridNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="HotelGridDataList" border stripe style="width:100%;">
      <el-table-column prop="roomFloor" label="酒店楼层" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="房间号" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="latticeCode" label="格子编号" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodProductDTO.prodName" label="原商品" min-width="120px"></el-table-column>
      <el-table-column prop="changeProdProductDTO.prodName" label="新商品" min-width="120px"></el-table-column>
      <el-table-column prop="replaceStartTime" label="开始更换时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span
            v-if="scope.row.replaceStartTime!='1970-01-01 00:00:00'"
          >{{scope.row.replaceStartTime}}</span>
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
  name: "HotelGridList",
  data() {
    return {
      orgId: "",
      inquireHotelFloor: "",
      inquireGridNumber: "",
      HotelGridDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  components: {
    HotelPagination,
    resetButton,
  },
  mounted() {
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.hotelGridList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelFloor = "";
      this.inquireGridNumber = "";
      this.hotelGridList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelGridList();
    },
    //格子列表
    hotelGridList() {
      const params = {
        // encryptedOrgId: this.orgId,
        orgAs: 3,
        roomFloor: this.inquireHotelFloor,
        latticeCode: this.inquireGridNumber,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelGridList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == 0) {
            this.HotelGridDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error("格子列表获取失败！");
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
      this.hotelGridList();
      this.$store.commit("setSearchList", {
        inquireHotelFloor: this.inquireHotelFloor,
        inquireGridNumber: this.inquireGridNumber,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.hotelgridlist {
}
</style>
