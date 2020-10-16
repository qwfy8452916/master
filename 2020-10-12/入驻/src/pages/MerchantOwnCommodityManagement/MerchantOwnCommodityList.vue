<template>
  <div class="commoditymanage">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="商品名称">
        <el-input v-model.trim="inquireCommodityName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="供应商名称">
                <el-input v-model.trim="inquireSupplierName"></el-input>
      </el-form-item>-->
      <el-form-item label="形式">
        <el-select v-model="inquireCommodityForm" placeholder="请选择">
          <el-option v-for="item in pTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        v-if="authzData['F:BM_PROD_PRODUCTADD']"
        class="addbutton"
        @click="ownCommodityAdd"
      >新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="CommodityDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodLogoUrl" label="商品图片" min-width="80px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.prodLogoUrl" alt style="width:45px;height:35px" />
        </template>
      </el-table-column>
      <el-table-column prop="prodName" label="商品名称" min-width="240px"></el-table-column>
      <el-table-column prop="prodShowName" label="显示名称" min-width="240px"></el-table-column>
      <!-- <el-table-column prop="prodSupplName" label="供应商名称"></el-table-column> -->
      <el-table-column prop="prodCode" label="商品编码" min-width="140px" align="center"></el-table-column>
      <el-table-column prop="prodTypeName" label="商品形式" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="prodWarrantyPeriod" label="保质期" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodUnitMeasure" label="单位" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align="center"></el-table-column>
      <!-- <el-table-column prop="prodMarketPrice" label="划线价" width="100px" align=center></el-table-column> -->
      <el-table-column prop="specQty" label="规格数量" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.reviewStatus == 0">驳回</span>
          <span v-if="scope.row.reviewStatus == 1">通过</span>
          <span v-if="scope.row.reviewStatus == 2">待审核</span>
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
      <el-table-column fixed="right" label="操作" min-width="320px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.reviewStatus == 2 && authzData['F:BM_PROD_PRODUCTPROGRESS_SUBMIT']"
            type="text"
            size="small"
            @click="lookReviewProcess(scope.row.wfId)"
          >审核进度</el-button>
          <el-button type="text" size="small" @click="ownCommodityDetail(scope.row.id)">详情</el-button>
          <el-button
            v-if="scope.row.reviewStatus != 2 && authzData['F:BM_PROD_PRODUCTEDIT']"
            type="text"
            size="small"
            @click="ownCommodityModify(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BM_PROD_PRODUCTDELETE_SUBMIT']"
            type="text"
            size="small"
            @click="ownCommodityDelete(scope.row.id)"
          >删除</el-button>
          <el-button type="text" size="small" @click="ownCommoditySpecs(scope.row.id)">规格管理</el-button>
          <el-button
            v-if="scope.row.isActive == 1 && authzData['F:BM_PROD_PRODUCTENTER_SUBMIT']"
            type="text"
            size="small"
            @click="ownHotelManage(scope.row.prodCode)"
          >酒店商品管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MerchantPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该商品？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import MerchantPagination from "@/components/MerchantPagination";
export default {
  name: "MerchantOwnCommodityList",
  components: {
    resetButton,
    MerchantPagination,
  },
  data() {
    return {
      // orgId: '',
      authzData: "",
      pcId: "",
      inquireCommodityName: "",
      inquireSupplierName: "",
      inquireCommodityForm: "",
      pTypeList: [], //商品形式列表
      inquireStatus: "",
      CommodityDataList: [],
      dialogVisibleDelete: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  created() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzData = response;
      })
      .catch((err) => {
        this.authzData = err;
      });
  },
  mounted() {
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.basicDataItems_PT();
    this.ownCommodityList();
  },
  methods: {
    resetFunc() {
      this.inquireCommodityName = "";
      this.inquireSupplierName = "";
      this.inquireCommodityForm = "";
      this.inquireStatus = "";
      this.ownCommodityList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.ownCommodityList();
    },
    //获取商品形式 - 字典表
    basicDataItems_PT() {
      const params = {
        key: "PROD_TYPE",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.pTypeList = result.data.map((item) => {
              return {
                id: parseInt(item.dictValue),
                name: item.dictName,
              };
            });
            let ptAll = {
              id: "",
              name: "全部",
            };
            this.pTypeList.push(ptAll);
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
    //商品列表
    ownCommodityList() {
      const params = {
        // encryptedOrgId: this.orgId,
        orgAs: 5,
        prodName: this.inquireCommodityName,
        supplName: this.inquireSupplierName,
        prodType: this.inquireCommodityForm,
        reviewStatus: this.inquireStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .ownCommodityList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.CommodityDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error("平台商品列表获取失败！");
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
      this.ownCommodityList();
      this.$store.commit("setSearchList", {
        inquireCommodityName: this.inquireCommodityName,
        inquireSupplierName: this.inquireSupplierName,
        inquireCommodityForm: this.inquireCommodityForm,
        inquireStatus: this.inquireStatus,
      });
    },
    //新增
    ownCommodityAdd() {
      this.$router.push({ name: "MerchantOwnCommodityAdd" });
    },
    //详情
    ownCommodityDetail(id) {
      this.$router.push({ name: "MerchantOwnCommodityDetail", query: { id } });
    },
    //修改
    ownCommodityModify(id) {
      this.$router.push({ name: "MerchantOwnCommodityModify", query: { id } });
    },
    //删除
    ownCommodityDelete(id) {
      this.pcId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const id = this.pcId;
      const params = {};
      this.$api
        .ownCommodityDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("删除商品成功！");
            this.dialogVisibleDelete = false;
            this.ownCommodityList();
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
    ownCommoditySpecs(id) {
      this.$router.push({ name: "MerchantProdSpecsList", query: { id } });
    },
    //管理可用酒店
    ownHotelManage(pId) {
      this.$router.push({ name: "MerchantHotelCommodityList", query: { pId } });
    },
    //查看审核进度
    lookReviewProcess(id) {
      this.$router.push({ name: "MerchantProcessDetails", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.commoditymanage {
 
}
</style>
