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
      <el-form-item label="商品名称">
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
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <!-- <div><el-button v-if="authzData['F:BM_PROD_HOTELPRODUCTADD']" class="addbutton" @click="hotelCommodityAdd">添加酒店商品</el-button></div> -->
    <el-table :data="CommodityDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店" min-width="200px"></el-table-column>
      <!-- <el-table-column prop="marketList" label="市场分类"></el-table-column> -->
      <el-table-column prop="prodLogoUrl" label="商品图片" min-width="80px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.prodLogoUrl" alt style="width:45px;height:35px" />
        </template>
      </el-table-column>
      <el-table-column prop="prodProductDTO.prodName" label="商品" min-width="240px"></el-table-column>
      <el-table-column prop="prodShowName" label="显示名称" min-width="240px"></el-table-column>
      <el-table-column prop="prodCode" label="商品编码" min-width="140px" align="center"></el-table-column>
      <el-table-column prop="prodTypeName" label="商品形式" min-width="100px" align="center"></el-table-column>
      <el-table-column
        prop="prodProductDTO.prodWarrantyPeriod"
        label="保质期"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="prodProductDTO.prodUnitMeasure"
        label="单位"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align="center"></el-table-column>
      <!-- <el-table-column prop="prodMarketPrice" label="划线价(元)" width="100px" align=center></el-table-column>
      <el-table-column prop="prodAdvisePrice" label="建议零售价(元)" width="120px" align=center></el-table-column>-->
      <el-table-column prop="specQty" label="规格数量" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="delivWayNames" label="配送方式" min-width="140px">
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.delivWay == 0">无</span>
                    <span v-else-if="scope.row.delivWay == 1">现场送</span>
                    <span v-else-if="scope.row.delivWay == 2">快递送</span>
                    <span v-else-if="scope.row.delivWay == 3">现场送、快递送</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="availableSaleQty" label="可售数量" min-width="80px" align="center"></el-table-column>
      <!-- <el-table-column prop="onShelfProd" label="商城上架" width="80px" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
      </el-table-column>-->
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
      <el-table-column fixed="right" label="操作" min-width="260px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.reviewStatus == 2 && authzData['F:BM_PROD_HOTELPRODUCTPROGRESS_SUBMIT']"
            type="text"
            size="small"
            @click="lookReviewProcess(scope.row.wfId)"
          >审核进度</el-button>
          <el-button
            type="text"
            size="small"
            @click="hotelCommodityDetail(scope.row.id, scope.row.hotelId)"
          >详情</el-button>
          <el-button
            v-if="authzData['F:BM_PROD_HOTELPRODUCTEDIT']"
            type="text"
            size="small"
            @click="hotelCommodityModify(scope.row.id, scope.row.hotelId)"
          >修改</el-button>
          <el-button type="text" size="small" @click="hotelCommodityDelete(scope.row.id)">移除</el-button>
          <el-button
            v-if="scope.row.prodProductDTO.isSupportSpec == 1"
            type="text"
            size="small"
            @click="hotelCommoditySpecs(scope.row.id)"
          >规格管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MerchantPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>确定要移除此酒店商品吗？</span>
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
  name: "MerchantHotelCommodityList",
  components: {
    resetButton,
    MerchantPagination,
  },
  data() {
    return {
      authzData: "",
      hcId: "",
      pId: "",
      hotelList: [],
      inquireHotelName: "",
      prodList: [],
      inquireProdName: "",
      CommodityDataList: [],
      dialogVisibleDelete: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingH: false,
      loadingP: false,
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
    this.pId = this.$route.query.pId;
    if (this.pId) {
      this.inquireProdName = this.pId;
    }
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.getProdList();
    this.hotelCommodityList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireProdName = "";
      this.hotelCommodityList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelCommodityList();
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 5,
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
    //商品列表
    getProdList(pName) {
      this.loadingP = true;
      const params = {
        orgAs: 5,
        prodName: pName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .ownCommodityList(params)
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
    //酒店平台商品列表
    hotelCommodityList() {
      const params = {
        orgAs: 5,
        prodOwnerOrgKind: 5,
        hotelId: this.inquireHotelName,
        prodCode: this.inquireProdName,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelCommodityList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.CommodityDataList = result.data.records;
            // this.CommodityDataList = result.data.records.map(item => {
            //     item.marketList = item.hotelMarketCategoryDTOList.map(subItem => {
            //         return subItem.categoryName + '、'
            //     });
            //     if(item.onShelf == 0){
            //         item.onShelfProd = false
            //     }else{
            //         item.onShelfProd = true
            //     }
            //     return item
            // });
            this.pageTotal = result.data.total;
            // console.log(this.CommodityDataList);
          } else {
            this.$message.error("酒店列表获取失败！");
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //修改上架状态
    updateStatus(id, value) {
      // console.log(value);
      const params = {};
      this.$api
        .hotelCommodityStatus(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (value) {
              this.$message.success("商品上架成功！");
            } else {
              this.$message.success("商品下架成功！");
            }
          } else {
            if (value) {
              this.$message.error("商品上架失败！");
              this.CommodityDataList.onShelfProd = false;
            } else {
              this.$message.error("商品下架失败！");
              this.CommodityDataList.onShelfProd = true;
            }
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
      this.hotelCommodityList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireProdName: this.inquireProdName,
      });
    },
    //添加
    hotelCommodityAdd() {
      this.$router.push({ name: "MerchantHotelCommodityAdd" });
    },
    //详情
    hotelCommodityDetail(id, hotelId) {
      this.$router.push({
        name: "MerchantHotelCommodityDetail",
        query: { id },
        params: { hotelId },
      });
    },
    //修改
    hotelCommodityModify(id, hotelId) {
      this.$router.push({
        name: "MerchantHotelCommodityModify",
        query: { id },
        params: { hotelId },
      });
    },
    //移除
    hotelCommodityDelete(id) {
      this.hcId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const id = this.hcId;
      const params = {};
      this.$api
        .hotelCommodityDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("酒店商品移除成功！");
            this.dialogVisibleDelete = false;
            this.hotelCommodityList();
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
    hotelCommoditySpecs(id) {
      this.$router.push({ name: "MerchantHotelProdSpecsList", query: { id } });
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
