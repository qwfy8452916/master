<template>
  <div class="commoditymanage">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="商品名称">
        <el-input v-model="inquireCommodityName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="供应商名称">
                <el-input v-model="inquireSupplierName"></el-input>
      </el-form-item>-->
      <el-form-item label="形式">
        <el-select v-model="inquireCommodityForm" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="实物" value="1"></el-option>
          <el-option label="电子" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireStatus" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="驳回" value="0"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="待审核" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div>
      <el-button
        v-if="authzData['F:BO_PROD_OPRPROD_ADD']"
        class="addbutton"
        @click="platformCommodityAdd"
      >新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="CommodityDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop label="商品图片" min-width="80px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.prodLogoUrl" alt style="width:45px;height:35px" />
        </template>
      </el-table-column>
      <el-table-column prop="prodName" label="商品名称" min-width="240px"></el-table-column>
      <el-table-column prop="prodShowName" label="显示名称" min-width="240px"></el-table-column>
      <!-- <el-table-column prop="prodSupplName" label="供应商名称" width="100px"></el-table-column> -->
      <el-table-column prop="prodCode" label="商品编码" min-width="140px" align="center"></el-table-column>
      <!-- <el-table-column prop="prodPurMaxPrice" label="最高采购价" width="100px" align=center></el-table-column>
      <el-table-column prop="prodAdvisePrice" label="建议零售价" min-width="100px" align=center></el-table-column>-->
      <el-table-column prop="prodTypeName" label="商品形式" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="prodWarrantyPeriod" label="保质期" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodUnitMeasure" label="单位" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align="center"></el-table-column>
      <el-table-column label="规格数量" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isSupportSpec == 0">0</span>
          <span v-if="scope.row.isSupportSpec == 1">{{scope.row.specQty}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.reviewStatus == '0'">驳回</span>
          <span v-if="scope.row.reviewStatus == '1'">通过</span>
          <span v-if="scope.row.reviewStatus == '2'">待审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="是否有效" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isActive == 0">否</span>
          <span v-if="scope.row.isActive == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="160px" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="340px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_PROD_OPRPROD_REVIEWPROGRESS'] && scope.row.reviewStatus == 2"
            type="text"
            size="small"
            @click="lookReviewProcess(scope.row.wfId)"
          >审核进度</el-button>
          <el-button type="text" size="small" @click="platformCommodityDetail(scope.row.id)">详情</el-button>
          <el-button
            v-if="authzData['F:BO_PROD_OPRPROD_EDIT'] && scope.row.reviewStatus != 2"
            type="text"
            size="small"
            @click="platformCommodityModify(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_PROD_OPRPROD_DELETE']"
            type="text"
            size="small"
            @click="platformCommodityDelete(scope.row.id)"
          >删除</el-button>
          <el-button type="text" size="small" @click="prodSpecsManage(scope.row.id)">规格管理</el-button>
          <el-button
            v-if="authzData['F:BO_PROD_OPRPROD_HOTEL'] && scope.row.isActive == 1"
            type="text"
            size="small"
            @click="platCommHotelManage(scope.row.prodCode)"
          >酒店平台商品管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>确定删除该平台商品？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganPlatformCommodityList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      // orgId: '',
      pcId: "",
      inquireCommodityName: "",
      inquireSupplierName: "",
      inquireCommodityForm: "",
      inquireStatus: "",
      CommodityDataList: [],
      dialogVisibleDelete: false,
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
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.platformCommodityList();
  },
  methods: {
    resetFunc() {
      this.inquireCommodityName = "";
      this.inquireCommodityForm = "";
      this.inquireStatus = "";
      this.platformCommodityList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.platformCommodityList();
    },
    //商品列表
    platformCommodityList() {
      const params = {
        // encryptedOrgId: this.orgId,
        orgAs: 2,
        prodName: this.inquireCommodityName,
        supplName: this.inquireSupplierName,
        prodType: this.inquireCommodityForm,
        reviewStatus: this.inquireStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .platformCommodityList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.CommodityDataList = result.data.records;
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
      this.platformCommodityList();
      this.$store.commit("setSearchList", {
        inquireCommodityName: this.inquireCommodityName,
        inquireCommodityForm: this.inquireCommodityForm,
        inquireStatus: this.inquireStatus,
      });
    },
    //新增
    platformCommodityAdd() {
      this.$router.push({ name: "LonganPlatformCommodityAdd" });
    },
    //详情
    platformCommodityDetail(id) {
      this.$router.push({
        name: "LonganPlatformCommodityDetail",
        query: { id },
      });
    },
    //修改
    platformCommodityModify(id) {
      this.$router.push({
        name: "LonganPlatformCommodityModify",
        query: { id },
      });
    },
    //删除
    platformCommodityDelete(id) {
      this.pcId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const id = this.pcId;
      const params = {};
      this.$api
        .platformCommodityDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("删除平台商品成功！");
            this.dialogVisibleDelete = false;
            this.platformCommodityList();
          } else {
            this.$message.error(result.msg);
            this.dialogVisibleDelete = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //规格管理
    prodSpecsManage(id) {
      this.$router.push({ name: "LonganProdSpecsList", query: { id } });
    },
    //管理可用酒店
    platCommHotelManage(pId) {
      this.$router.push({
        name: "LonganHotelPlatCommodityList",
        query: { pId },
      });
    },
    //查看审核进度
    lookReviewProcess(id) {
      this.$router.push({ name: "LonganProcessDetails", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.commoditymanage {
  .pagination {
    margin-top: 20px;
  }
}
</style>
