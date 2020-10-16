<template>
  <div class="outhouselist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="商品名称" prop="inquireProdName">
        <el-select
          v-model="inquireProdName"
          filterable
          remote
          :remote-method="remoteProd"
          :loading="loadingP"
          @focus="getProdList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in prodList"
            :key="item.id"
            :label="item.prodName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireState">
          <el-option label="全部" value></el-option>
          <el-option label="驳回" value="0"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="待审核" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出库日期">
        <el-date-picker
          v-model="inquireTime"
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
    <el-table :data="HotelGodownEntryDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="invOutCode" label="出库单编号" width="120px" align="center"></el-table-column>
      <el-table-column prop="outTime" label="出库日期" align="center"></el-table-column>
      <el-table-column prop="lastUpdatedByName" label="操作人姓名" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="invOutRemark" label="说明" align="center"></el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.reviewStatus == 0">驳回</span>
          <span v-else>{{scope.row.reviewStatus == 1 ?'通过':'待审核'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="是否有效" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isActive == 0">无效</span>
          <span v-if="scope.row.isActive == 1">有效</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.reviewStatus== 2 && authzlist['F:BH_INV_OWNPRODOUTLIST_SCHEDULE']"
            type="text"
            size="small"
            @click="examineDetail(scope.row.wfId)"
          >审核进度</el-button>
          <el-button
            v-if="authzlist['F:BH_INV_OWNPRODOUTLIST_DETAIL']"
            type="text"
            size="small"
            @click="lookDetail(scope.row.id)"
          >详情</el-button>
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
  name: "Hotelownprodoutlist",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzlist: {}, //权限数据
      encryptedOrgId: "",
      hotelId: "",
      inquireTime: [],
      prodList: [],
      inquireState: "",
      inquireProdName: "",
      loadingP: false,
      HotelGodownEntryDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  mounted() {
    // this.encryptedOrgId = localStorage.getItem('orgId');
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    this.encryptedOrgId = this.$route.params.orgId;
    this.hotelId = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getProdList();
    this.outhouselist();
  },
  methods: {
    resetFunc() {
      this.inquireProdName = "";
      this.inquireState = "";
      this.inquireTime = [];
      this.outhouselist();
    },
    //出库单列表
    outhouselist() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        // encryptedOrgId: this.encryptedOrgId,
        orgAs: 3,
        outTimeStart: this.inquireTime[0],
        outTimeEnd: this.inquireTime[1],
        prodCode: this.inquireProdName,
        reviewStatus: this.inquireState,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .outhouselist({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.HotelGodownEntryDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error("出库单列表获取失败！");
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //商品列表
    getProdList(pName) {
      this.loadingP = true;
      const params = {
        orgAs: 3,
        isNeedInv: 1,
        hotelId: this.hotelId,
        prodName: pName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .platformCommodityList(params)
        .then((response) => {
          this.loadingP = false;
          const result = response.data;
          if (result.code == 0) {
            this.prodList = result.data.records.map((item) => {
              return {
                id: item.prodCode,
                prodName: item.prodName,
              };
            });
            const prodAll = {
              id: "",
              prodName: "全部",
            };
            this.prodList.unshift(prodAll);
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
    remoteProd(val) {
      this.getProdList(val);
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.outhouselist();
      this.$store.commit("setSearchList", {
        inquireProdName: this.inquireProdName,
        inquireTime: this.inquireTime,
        inquireState: this.inquireState,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.outhouselist();
    },
    //新增
    godownEntryAdd() {
      this.$router.push({ name: "Hotelownprodoutadd" });
    },
    //查看商品明细
    lookDetail(id) {
      this.$router.push({ name: "Hotelownprodoutcheck", query: { id } });
    },

    //审核详情
    examineDetail(id) {
      this.$router.push({ name: "HotelProcessDetails", query: { id: id } });
    },
  },
};
</script>

<style lang="less" scoped>
.outhouselist {
  .pagination {
    margin-top: 20px;
  }
}
</style>

