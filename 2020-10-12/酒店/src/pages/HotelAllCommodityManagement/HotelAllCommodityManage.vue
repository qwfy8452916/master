<template>
  <div class="commoditymanage">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="商品名称">
        <el-input v-model="inquireProdName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="供应商名称">
                <el-input v-model="inquireSupplName"></el-input>
      </el-form-item>-->
      <el-form-item label="形式">
        <el-select v-model="inquireProdType" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="实物" value="1"></el-option>
          <el-option label="电子" value="2"></el-option>
          <el-option label="菜品" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="inquireCommodityType" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="平台商品" value="2"></el-option>
          <el-option label="自营商品" value="3"></el-option>
          <el-option label="入驻商品" value="5"></el-option>
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
      <el-button class="addbutton" @click="hotelProdAdd">添加酒店商品</el-button>
    </div>
    <el-table :data="CommodityDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" min-width="80px" align="center"></el-table-column>
      <!-- <el-table-column prop="marketList" label="市场分类"></el-table-column> -->
      <el-table-column
        prop="prodProductDTO.prodLogoUrl"
        label="商品图片"
        min-width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.prodProductDTO.prodLogoUrl" alt style="width:45px;height:35px" />
        </template>
      </el-table-column>
      <el-table-column prop="prodProductDTO.prodName" label="商品名称" min-width="240px"></el-table-column>
      <el-table-column prop="prodShowName" label="显示名称" min-width="240px"></el-table-column>
      <el-table-column prop="prodProductDTO.prodCode" label="商品编码" min-width="140px" align="center"></el-table-column>
      <el-table-column prop="prodTypeName" label="商品形式" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodKindName" label="类型" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="prodProductDTO.prodSupplName" label="供应商" min-width="160px"></el-table-column>
      <!-- <el-table-column prop="prodMarketPrice" label="划线价(元)" width="90px" align=center></el-table-column> -->
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
      <el-table-column prop="delivWayNames" label="配送方式" min-width="160px"></el-table-column>
      <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="availableSaleQty" label="可售数量" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.reviewStatus==0">驳回</span>
          <span v-if="scope.row.reviewStatus==1">通过</span>
          <span v-if="scope.row.reviewStatus==2">待审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="是否有效" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isActive==0">无效</span>
          <span v-if="scope.row.isActive==1">有效</span>
        </template>
      </el-table-column>

      <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="160px" align="center"></el-table-column>
      <!-- <el-table-column prop="onShelfProd" label="商城上架" width="80px" align=center>
                <template slot-scope="scope">
                    <el-switch v-if="authzlist['F:BH_PROD_ALLPRODSHELF']" v-model="scope.row.onShelfProd" @change="updateStatus(scope.row.id, scope.row.onShelfProd)"></el-switch>
                </template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.prodKindName == '自营商品'" type="text" size="small" disabled>移除</el-button>
          <el-button v-else type="text" size="small" @click="hotelProdDelete(scope.row.id)">移除</el-button>
          <el-button type="text" size="small" @click="hotelProdDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogProdVisible" :close-on-click-modal="false" width="86%">
      <el-form :inline="true" align="left">
        <el-form-item label="供应商">
          <el-select
            v-model="inquireMerId"
            filterable
            remote
            :remote-method="remoteMer"
            :loading="loadingM"
            @focus="getMerList()"
            placeholder="请选择"
          >
            <el-option
              v-for="item in merList"
              :key="item.id"
              :label="item.merchantName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="inquireHotelProd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inquireProd">查&nbsp;&nbsp;询</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="prodFormData" :rules="prodFormData.rules" ref="prodFormData">
        <el-table
          :data="prodFormData.unusedHotelProdList"
          border
          stripe
          :row-key="getRowKeys"
          ref="multipleTable"
          @selection-change="selectUnusedProdChange"
          @toggleRowSelection="toggleRowSelect"
          style="width:100%;"
        >
          <el-table-column :reserve-selection="true" fixed type="selection" width="46px"></el-table-column>
          <!-- <el-table-column prop="marketType" label="市场分类" width="240px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'unusedHotelProdList.'+scope.$index+'.marketType'" :rules="prodFormData.rules.marketType">
                                <el-select v-model="scope.row.marketType" multiple placeholder="请选择">
                                    <el-option
                                        v-for="item in marketList"
                                        :key="item.id"
                                        :label="item.categoryName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
          </el-table-column>-->
          <el-table-column prop="id" label="ID" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="prodLogoUrl" label="商品图片" min-width="80px" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.prodLogoUrl" alt style="width:45px;height:35px" />
            </template>
          </el-table-column>
          <el-table-column prop="prodName" label="商品名称" min-width="200px"></el-table-column>
          <el-table-column prop="prodShowName" label="显示名称" min-width="240px">
            <template slot-scope="scope">
              <el-form-item
                :prop="'unusedHotelProdList.'+scope.$index+'.prodShowName'"
                :rules="prodFormData.rules.prodShowName"
              >
                <el-input v-model="scope.row.prodShowName"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="prodCode" label="商品编码" min-width="140px" align="center"></el-table-column>
          <el-table-column prop="prodTypeName" label="商品形式" min-width="80px" align="center"></el-table-column>
          <!-- <el-table-column prop="prodSupplName" label="供应商" min-width="100px"></el-table-column> -->
          <el-table-column prop="merName" label="供应商" min-width="100px"></el-table-column>
          <el-table-column prop="prodWarrantyPeriod" label="保质期" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="prodUnitMeasure" label="单位" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="prodSupplyPrice" label="供货价" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="prodRetailPrice" label="零售价" width="100px" align="center"></el-table-column>
          <el-table-column prop="specQty" label="规格数量" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="delivWayNames" label="配送方式" min-width="140px"></el-table-column>
          <el-table-column prop="prodSafeCount" label="安全库存" min-width="80px" align="center"></el-table-column>
          <!-- <el-table-column prop="prodMarketPrice" label="划线价(元)" width="100px" align=center></el-table-column> -->
          <el-table-column
            fixed="right"
            prop="prodAdvisePrice"
            label="建议零售价"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="'unusedHotelProdList.'+scope.$index+'.prodAdvisePrice'"
                :rules="prodFormData.rules.prodAdvisePrice"
              >
                <el-input v-model="scope.row.prodAdvisePrice"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <HotelPagination :pageTotal="pageTotal1" @pageFunc="pageFunc1" />
        <el-form-item>
          <el-button @click="dialogProdVisible=false">取消</el-button>
          <el-button type="primary" :disabled="isSubmit" @click="EnsureAdd('prodFormData')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认移除该商品？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDelete">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelAllCommodityManage",
  components: {
    HotelPagination,
    resetButton,
  },
  data() {
    var priceReg = /^\d+(\.\d+)?$/;
    var validatePrice = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!priceReg.test(value)) {
        callback(new Error("格式有误"));
      } else {
        callback();
      }
    };
    return {
      authzlist: {}, //权限数据
      hotelId: "",
      hpId: "",
      inquireProdName: "",
      inquireSupplName: "",
      inquireProdType: "",
      inquireCommodityType: "",
      CommodityDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      pageTotal1: 0,
      pageSize1: 10,
      pageNum1: 1,
      dialogProdVisible: false,
      inquireMerId: "",
      merList: [],
      loadingM: false,
      inquireHotelProd: "",
      prodFormData: {
        rules: {
          prodShowName: [
            { required: true, message: "请输入显示名称", trigger: "blur" },
            {
              min: 1,
              max: 50,
              message: "显示名称请保持在50个字符以内",
              trigger: ["blur", "change"],
            },
          ],
          // marketType: [
          //     { required: true, message: '请选择市场分类', trigger: 'change' }
          // ],
          prodAdvisePrice: [
            { validator: validatePrice, trigger: ["blur", "change"] },
          ],
        },
        unusedHotelProdList: [
          {
            // marketType: []
          },
        ],
      },
      marketList: [],
      mTreeData: [],
      selectedProdList: [],
      isSubmit: false,
      dialogVisibleDelete: false,
      // 获取row的key值
      getRowKeys(row) {
        return row.id; //此id根据项目实际，且为唯一字段
      },
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    this.hotelId = localStorage.getItem("hotelId");
    // this.getHotelMarketDetail();
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getMerList();
    // this.getMarketList();
    this.hotelAllCommodityList();
  },
  methods: {
    //供应商-入驻商 列表
    getMerList(mName) {
      this.loadingM = true;
      const params = {
        name: mName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getHotelMerchant(params)
        .then((response) => {
          this.loadingM = false;
          const result = response.data;
          if (result.code == 0) {
            this.merList = result.data.records.map((item) => {
              return {
                id: item.id,
                merchantName: item.merchantName,
              };
            });
            const merAll = {
              id: "",
              merchantName: "全部",
            };
            this.merList.unshift(merAll);
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
    remoteMer(val) {
      this.getMerList(val);
    },

    resetFunc() {
      this.inquireProdName = "";
      this.inquireSupplName = "";
      this.inquireProdType = "";
      this.inquireCommodityType = "";
      this.hotelAllCommodityList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelAllCommodityList();
    },
    //遍历树-递归
    getMarketTreeList(mTreeList, mList) {
      mTreeList.map((item) => {
        mList.push({
          id: item.id,
          categoryName: item.categoryName,
        });
        if (item.childrenList != null) {
          this.getMarketTreeList(item.childrenList, mList);
        }
      });
    },
    //获取市场分类 - 树
    getHotelMarketDetail() {
      const params = {
        hotelId: this.hotelId,
      };
      this.$api
        .getHotelMarketDetail(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.mTreeData = result.data;
            this.getMarketTreeList(this.mTreeData, this.marketList);
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
    selectUnusedProdChange(val) {
      this.selectedProdList = val;
      // console.log(this.selectedProdList);
    },
    //改变选择状态
    toggleRowSelect(rows) {
      const _this = this;
      if (rows.length > 0) {
        this.$nextTick(() => {
          rows.forEach((row) => {
            _this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //获取市场分类列表
    getMarketList() {
      const params = {
        hotelId: this.hotelId,
      };
      // console.log(params);
      this.$api
        .hotelCommodityMarketListM(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.marketList = result.data.map((item) => {
              return {
                id: item.id,
                categoryName: item.categoryName,
              };
            });
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
    //添加酒店商品
    hotelProdAdd() {
      const params = {
        hotelId: this.hotelId,
        merId: this.inquireMerId,
        prodName: this.inquireHotelProd,
        pageNo: this.pageNum1,
        pageSize: this.pageSize1,
      };
      this.$api
        .hotelUnusedProdList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.prodFormData.unusedHotelProdList = result.data.records.map(
              (item) => {
                if (item.prodAdvisePrice == 0) {
                  item.prodAdvisePrice = "";
                }
                // item.marketType = '';
                return item;
              }
            );
            this.pageTotal1 = result.data.total;
            this.dialogProdVisible = true;
          } else {
            this.$message.error(result.msg);
            this.dialogProdVisible = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //分页
    pageFunc1(data) {
      this.pageSize1 = data.pageSize;
      this.pageNum1 = data.pageNum;
      this.hotelProdAdd();
    },
    EnsureAdd(prodFormData) {
      if (this.selectedProdList.length == 0) {
        this.$message.error("请选择要添加的商品！");
        return false;
      }
      const addProdData = this.selectedProdList.map((item) => {
        return {
          prodCode: item.prodCode,
          // marketCategoryList: JSON.parse('[' + item.marketType + ']'),
          // marketCategoryList: item.marketType,
          prodShowName: item.prodShowName,
          prodAdvisePrice: item.prodAdvisePrice,
        };
      });
      const params = {
        hotelId: this.hotelId,
        dtoList: addProdData,
      };
      this.$refs[prodFormData].validate((valid, model) => {
        if (valid) {
          // for(let i = 0; i < this.selectedProdList.length; i++){
          //     if(this.selectedProdList[i].marketType == ''){
          //         this.$message.error('请选择市场分类！');
          //         return false;
          //     }
          // }
          // console.log(params);
          // return
          this.$api
            .hotelProdAdd(params)
            .then((response) => {
              // console.log(response);
              const result = response.data;
              if (result.code == "0") {
                this.$message.success("添加酒店商品成功！");
                this.hotelAllCommodityList();
                // this.hotelProdAdd();
                this.selectedProdList = [];
                this.dialogProdVisible = false;
              } else {
                this.$message.error(result.msg);
                this.selectedProdList = [];
                this.dialogProdVisible = false;
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    //查询酒店商品
    inquireProd() {
      this.hotelProdAdd();
    },
    //移除
    hotelProdDelete(id) {
      this.hpId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDelete() {
      const params = {};
      const id = this.hpId;
      this.$api
        .hotelProdDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("酒店商品移除成功！");
            this.dialogVisibleDelete = false;
            this.hotelAllCommodityList();
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
    //详情
    hotelProdDetail(id) {
      this.$router.push({ name: "HotelAllCommodityDetail", query: { id } });
    },
    //酒店所有商品列表
    hotelAllCommodityList() {
      const params = {
        prodOwnerOrgKind: 0,
        hotelId: this.hotelId,
        prodName: this.inquireProdName,
        supplName: this.inquireSupplName,
        prodType: this.inquireProdType,
        prodOwnerOrgKind: this.inquireCommodityType,
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
            this.CommodityDataList = result.data.records.map((item) => {
              // item.marketList = item.hotelMarketCategoryDTOList.map(subItem => {
              //     return subItem.categoryName + '、'
              // });
              if (item.onShelf == 0) {
                item.onShelfProd = false;
              } else {
                item.onShelfProd = true;
              }
              return item;
            });
            this.pageTotal = result.data.total;
          } else {
            this.$message.error("商品列表获取失败！");
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
        .ownCommodityStatus(params, id)
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
      this.hotelAllCommodityList();
      this.$store.commit("setSearchList", {
        inquireProdName: this.inquireProdName,
        inquireSupplName: this.inquireSupplName,
        inquireProdType: this.inquireProdType,
        inquireCommodityType: this.inquireCommodityType,
      });
    },
  },
};
</script>

<style>
.el-dialog__body {
  padding: 10px 20px 1px 20px;
}
</style>

<style lang="less" scoped>
.commoditymanage {
}
</style>
