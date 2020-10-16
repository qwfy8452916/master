<template>
  <div class="purchaselist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="商品名称" prop="prodid">
        <el-select
          v-model="prodid"
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
      <el-form-item label="是否低于安全库存" class="ordertitle" prop="safeid">
        <el-select class="termput" v-model="safeid" placeholder="请选择" @change="selectsafe">
          <el-option v-for="item in safedata" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="typeId" @change="leixing">
          <el-option
            v-for="item in typedata"
            :key="item.dictValue"
            :label="item.dictName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入驻商名称">
        <el-select
          :disabled="disabledjudge"
          v-model="checkinValue"
          filterable
          remote
          :remote-method="remoteMer"
          :loading="loadingR"
          @focus="getHotelList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in MerchantList"
            :key="item.id"
            :label="item.merchantName"
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

    <el-table :data="Productlist" border stripe style="width:100%;" :row-class-name="noSafeClass">
      <el-table-column prop="prodKindName" label="类型" align="center"></el-table-column>
      <el-table-column prop="prodProductDTO.merName" label="入驻商名称"></el-table-column>
      <el-table-column prop="prodProductDTO.prodName" label="商品名称"></el-table-column>
      <el-table-column prop="totalProdAmount" label="总库存" align="center"></el-table-column>
      <el-table-column prop="cabProdAmount" label="迷你吧库存" align="center"></el-table-column>
      <el-table-column prop="invProdAmount" label="仓库库存" align="center"></el-table-column>
      <el-table-column prop="prodSafeCount" label="安全库存" align="center"></el-table-column>
      <el-table-column prop="isSafe" label="是否低于安全库存" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isSafe == 0">是</span>
          <span v-if="scope.row.isSafe == 1">否</span>
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
  name: "Hotelallprodstock",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      hotelid: "",
      pageSize: 10,
      pageTotal: 0, //默认总条数
      pageNum: 1, //实际当前页码
      currentPage: 1, //默认当前页码
      prodList: [], //商品数据
      safedata: [
        { id: "", name: "全部" },
        { id: 0, name: "是" },
        { id: 1, name: "否" },
      ], //安全库存选择数据
      typedata: [],
      MerchantList: [],
      disabledjudge: true,
      loadingP: false,
      loadingR: false,
      prodid: "", //商品名称ID
      safeid: "", //选择安全库存ID
      typeId: "", //选择类型ID
      checkinValue: "", //选择入驻商ID
      delindexid: null, //当前id
      delindex: null, //当前索引
      Productlist: [],
      oprOgrId: "", //标识
    };
  },
  created() {
    // this.oprOgrId=localStorage.orgId
    // this.oprOgrId = this.$route.params.orgId;
    this.hotelid = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getType();
    this.Getdata();
    this.getProdList();
    this.getHotelMerchant();
  },
  methods: {
    resetFunc() {
      this.prodid = "";
      this.safeid = "";
      this.typeId = "";
      this.checkinValue = "";
      this.Getdata();
    },
    //查询
    inquire() {
      this.Getdata();
      this.$store.commit("setSearchList", {
        prodid: this.prodid,
        safeid: this.safeid,
        typeId: this.typeId,
        checkinValue: this.checkinValue,
      });
    },

    //选择商品
    selectprodate(e) {
      let that = this;
      that.prodid = e;
    },

    //选择安全库存
    selectsafe(e) {
      let that = this;
      that.safeid = e;
    },

    //选择类型
    leixing(e) {
      if (e == 5) {
        this.disabledjudge = false;
      } else {
        this.disabledjudge = true;
        this.checkinValue = "";
      }
    },

    //获取类型
    getType() {
      let that = this;
      let params = {
        key: "PROD_KIND",
        orgId: 0,
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          if (response.data.code == "0") {
            that.typedata = response.data.data;
            const allType = {
              dictName: "全部",
              dictValue: "",
            };
            that.typedata.unshift(allType);
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取入驻商列表
    getHotelMerchant(rName) {
      let that = this;
      console.log(rName);
      if (rName == undefined) {
        rName = "";
      }
      this.loadingR = true;
      const params = {
        orgAs: 3,
        name: rName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getHotelMerchant(params)
        .then((response) => {
          that.loadingR = false;
          const result = response.data;
          if (result.code == 0) {
            that.MerchantList = result.data.records.map((item) => {
              return {
                id: item.id,
                merchantName: item.merchantName,
              };
            });
            const merAll = {
              id: "",
              merchantName: "全部",
            };
            that.MerchantList.unshift(merAll);
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    remoteMer(val) {
      this.getHotelMerchant(val);
    },

    //低库存状态-样式
    noSafeClass({ row, rowIndex }) {
      const noSafeState = row.isSafe;
      if (noSafeState == 0) {
        return "noSafe";
      } else {
        return "";
      }
    },

    current() {
      this.pageNum = this.currentPage;
      this.Getdata();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //商品列表
    getProdList(pName) {
      this.loadingP = true;
      const params = {
        orgAs: "",
        prodName: pName,
        isNeedInv: 1,
        hotelId: this.hotelid,
        pageNo: 1,
        pageSize: 50,
        isActive: 1,
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

    Getdata() {
      let that = this;
      let params = {
        pageNo: that.pageNum,
        pageSize: that.pageSize,
        prodCode: that.prodid,
        isSafe: that.safeid,
        prodOwnerOrgKind: that.typeId,
        merId: that.checkinValue,
        orgAs: 0,
        hotelId: that.hotelid,
        // encryptedHotelOrgId:oprOgrId
      };
      this.$api
        .checkstock({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.pageTotal = response.data.data.total;
            that.Productlist = response.data.data.records;
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          that.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>

<style lang="less">
.el-table .noSafe {
  color: #f00;
}
</style>

