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
    <div v-if="authzData['F:BO_PROD_HOTELPROD_ADD']">
      <el-button class="addbutton" @click="hotelPlatCommodityAdd">添&nbsp;&nbsp;加</el-button>
    </div>
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
      <el-table-column prop="specQty" label="规格数量" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="delivWayNames" label="配送方式" min-width="140px">
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.delivWay == 1">现场送</span>
                    <span v-else-if="scope.row.delivWay == 2">快递送</span>
                    <span v-else-if="scope.row.delivWay == 3">迷你吧</span>
                    <span v-else-if="scope.row.delivWay == 4">自提</span>
                    <span v-else-if="scope.row.delivWay == 5">电子券</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="availableSaleQty" label="可售数量" min-width="80px" align="center"></el-table-column>
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
      <!-- <el-table-column prop="prodPurPrice" label="采购单价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodRetailPrice" label="零售价" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodMarketPrice" label="划线价" min-width="80px" align=center></el-table-column>
            <el-table-column v-if="authzData['F:BO_PROD_HOTELPROD_ONLINE']" prop="onShelfProd" label="商城上架" width="80px" align=center>
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" width="260px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="hotelPlatCommodityDetail(scope.row.id)">详情</el-button>
          <el-button
            v-if="authzData['F:BO_PROD_HOTELPROD_REVIEWPROGRESS'] && scope.row.reviewStatus == 2"
            type="text"
            size="small"
            @click="lookReviewProcess(scope.row.wfId)"
          >审核进度</el-button>
          <el-button
            v-if="authzData['F:BO_PROD_HOTELPROD_EDIT']"
            type="text"
            size="small"
            @click="hotelPlatCommodityModify(scope.row.id, scope.row.hotelId)"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="hotelPlatProdDelete(scope.row.id, scope.row.hotelId)"
          >移除</el-button>
          <el-button
            v-if="scope.row.prodProductDTO.isSupportSpec == 1"
            type="text"
            size="small"
            @click="hotelPlatProdSpecs(scope.row.id)"
          >规格管理</el-button>
          <!-- <el-button v-if="authzData['F:BO_PROD_HOTELPROD_PRICE']" type="text" size="small" @click="lookHistoryPrice(scope.row.hotelId, scope.row.id)">查看历史价格</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title :visible.sync="dialogPriceVisible" width="38%">
      <el-table :data="priceData">
        <el-table-column property="startTime" label="开始时间" min-width="160px" align="center"></el-table-column>
        <el-table-column property="endTime" label="结束时间" min-width="160px" align="center"></el-table-column>
        <el-table-column property="purPrice" label="采购单价" min-width="80px" align="center"></el-table-column>
        <el-table-column property="lastUpdatedByName" label="操作人姓名" min-width="100px"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>确定要移除此酒店平台商品吗？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganHotelPlatCommodityList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      // orgId: '',
      pId: "",
      hotelList: [],
      inquireHotelName: "",
      prodList: [],
      inquireProdName: "",
      hppId: "",
      CommodityDataList: [],
      dialogPriceVisible: false,
      priceData: [],
      dialogVisibleDelete: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingH: false,
      loadingP: false,
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
    this.hotelPlatCommodityList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireProdName = "";
      this.hotelPlatCommodityList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelPlatCommodityList();
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
    //商品列表
    getProdList(pName) {
      this.loadingP = true;
      const params = {
        orgAs: 2,
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
    //酒店平台商品列表
    hotelPlatCommodityList() {
      const params = {
        // encryptedOrgId: this.orgId,
        orgAs: 2,
        hotelId: this.inquireHotelName,
        prodCode: this.inquireProdName,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelPlatCommodityList(params)
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
            this.$message.error(result.msg);
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
        .hotelPlatCommodityStatus(params, id)
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
    //查看历史价格
    lookHistoryPrice(hotelId, id) {
      const params = {
        hotelId: hotelId,
        hotelProdId: id,
      };
      // console.log(params);
      this.$api
        .lookHistoryPrice(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.priceData = result.data;
            this.dialogPriceVisible = true;
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
      this.hotelPlatCommodityList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireProdName: this.inquireProdName,
      });
    },
    //添加
    hotelPlatCommodityAdd() {
      this.$router.push({ name: "LonganHotelPlatCommodityAdd" });
    },
    //修改
    hotelPlatCommodityModify(id, hotelId) {
      this.$router.push({
        name: "LonganHotelPlatCommodityModify",
        query: { id },
        params: { hotelId },
      });
    },
    //详情
    hotelPlatCommodityDetail(id) {
      this.$router.push({
        name: "LonganHotelPlatCommodityDetail",
        query: { id },
      });
    },
    //移除
    hotelPlatProdDelete(id, hotelId) {
      this.hppId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const params = {};
      const id = this.hppId;
      this.$api
        .hotelPlatProdDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("酒店平台商品删除成功！");
            this.dialogVisibleDelete = false;
            this.hotelPlatCommodityList();
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
    hotelPlatProdSpecs(id) {
      const pType = "plat";
      this.$router.push({
        name: "LonganHotelProdSpecsList",
        query: { id, pType },
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
