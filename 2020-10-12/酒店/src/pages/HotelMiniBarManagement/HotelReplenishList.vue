<template>
  <div class="replenishlist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="楼层">
        <el-input v-model="inquireFloor"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="inquireCommodityName"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="inquireType">
          <el-option label="补货" value="1"></el-option>
          <el-option label="取货" value="2"></el-option>
          <el-option label="换货" value="3"></el-option>
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
        v-if="authzlist['M:BH_REPL_REPLENISHLISTEXPORT']"
        class="addbutton"
        @click="outExe"
      >导&nbsp;&nbsp;出</el-button>
    </div>
    <div class="prodtotal">
      <span>总计：</span>
      <ul>
        <li
          v-for="item in HotelReplenishTotal"
          :key="item.prodId"
        >&nbsp;&nbsp;&nbsp;{{item.prodName}}*{{item.allSum}}</li>
      </ul>
    </div>
    <el-table :data="HotelReplenishDataList" border stripe style="width:100%;">
      <!-- :span-method="arraySpanMethod" -->
      <el-table-column prop="roomFloor" label="楼层" width="80px" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="房间号" align="center"></el-table-column>
      <el-table-column prop="latticeCode" label="格子编号" align="center"></el-table-column>
      <el-table-column prop="originalProdName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="prodCount" label="补货数量" align="center"></el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelReplenishList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzlist: {}, //权限数据
      // orgId: '',
      hotelId: "",
      inquireFloor: "",
      inquireCommodityName: "",
      inquireType: "1",
      HotelReplenishTotal: [],
      HotelReplenishDataList: [],
      commodityTotal: [],
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
      token: "",
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
    this.token = localStorage.getItem("Authorization");
    this.hotelId = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getReplenishList();
    this.replenishTotal();
  },
  methods: {
    resetFunc() {
      this.inquireFloor = "";
      this.inquireCommodityName = "";
      this.inquireType = "1";
      this.getReplenishList();
      this.replenishTotal();
    },
    //获取补货/换货单列表
    getReplenishList() {
      const params = {
        // orgId: this.orgId,
        orgAs: 3,
        hotelId: this.hotelId,
        roomFloor: this.inquireFloor,
        prodName: this.inquireCommodityName,
        opFlag: this.inquireType,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      // return
      this.$api
        .getReplenishList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            // this.HotelReplenishDataList = result.data.list;
            const commodifyList = result.data.list;
            this.pageTotal = result.data.total;
            var billType;
            if (this.inquireType == "1") {
              billType = "补货";
            } else if (this.inquireType == "2") {
              billType = "取货";
            } else if (this.inquireType == "3") {
              billType = "换货";
            }
            this.HotelReplenishDataList = commodifyList.map((item) => {
              item.type = billType;
              return item;
            });

            // this.commodityTotal = commodifyList.prodStatsAmtList;
            // if(this.commodityTotal != ''){
            //     this.totalNum();
            // }
          } else {
            if (this.inquireType == "1") {
              this.$message.error("补货单获取失败！");
            } else if (this.inquireType == "2") {
              this.$message.error("取货单获取失败！");
            } else if (this.inquireType == "3") {
              this.$message.error("换货单获取失败！");
            }
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //总计
    replenishTotal() {
      const params = {
        // orgId: this.orgId,
        orgAs: 3,
        hotelId: this.hotelId,
        opFlag: this.inquireType,
      };
      // console.log(params);
      // return
      this.$api
        .replenishTotal(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            // this.HotelReplenishTotal = result.data.list;
            this.HotelReplenishTotal = result.data.map((item) => {
              return {
                prodId: item.prodId,
                prodName: item.originalProdName,
                allSum: item.allSum,
              };
            });
            // this.HotelReplenishTotal = repTotal;
          } else {
            if (this.inquireType == "1") {
              this.$message.error("补货单总计获取失败！");
            } else if (this.inquireType == "2") {
              this.$message.error("取货单总计获取失败！");
            } else if (this.inquireType == "3") {
              this.$message.error("换货单总计获取失败！");
            }
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //总计
    totalNum() {
      const comm = this.commodityTotal;
      let commodityStr = "";
      for (let i = 0; i < comm.length; i++) {
        commodityStr += comm[i].productName + comm[i].allsum + "\xa0\xa0\xa0";
      }
      // console.log(commodityStr);
      this.HotelReplenishDataList.push({
        roomFloor: "总计",
        roomCode: commodityStr,
        cabId: "",
        productName: "",
        replCount: "",
      });
    },
    //合并列-总计
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      const rowNum = this.HotelReplenishDataList.length - 1;
      if (rowIndex === rowNum) {
        if (columnIndex === 1) {
          return [1, 4];
        }
      }
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.getReplenishList();
      this.replenishTotal();
      this.$store.commit("setSearchList", {
        inquireFloor: this.inquireFloor,
        inquireCommodityName: this.inquireCommodityName,
        inquireType: this.inquireType,
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getReplenishList();
      this.replenishTotal();
    },
    //导出
    outExe() {
      window.location.href =
        "http://hotel.kefangbao.com.cn/longan/api/repl/export/download?opFlag=" +
        this.inquireType +
        "&orgAs=3&hotelId=" +
        this.hotelId +
        "&prodName=" +
        this.inquireCommodityName +
        "&roomFloor=" +
        this.inquireFloor +
        "&token=" +
        this.token;

      // this.$confirm('此操作将导出excel文件，是否继续？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'   http://172.16.200.90:9001
      // }).then(() => {
      //     this.excelData = this.HotelReplenishDataList;
      //     this.export2Excel();
      // }).catch(() => {

      // });
      // const params = {
      //     orgId: this.orgId,
      //     opFlag: this.inquireType,
      //     prodName: this.inquireCommodityName,
      //     roomFloor: this.inquireFloor
      // };

      // this.$api.Replenishmentexport(params).then(response => {

      // })
      // .catch(error => {
      //     this.$alert(error,"警告",{
      //         confirmButtonText: "确定"
      //     })
      // })
    },
    export2Excel() {
      const params = {
        // orgId: this.orgId,
        orgAs: 3,
        hotelId: this.hotelId,
        opFlag: this.inquireType,
        prodName: this.inquireCommodityName,
        roomFloor: this.inquireFloor,
      };
      this.$api
        .Replenishmentexport(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
          } else {
            this.$message.error("导出失败！");
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });

      // let that = this;
      // require.ensure([], () => {
      //     const { export_json_to_excel } = require('../vendor/Export2Excel.js');
      //     const tHeader = ['楼层','房间号','柜子编号','商品名称','补货数量'];     // 导出的表头名
      //     const filterVal = ['roomFloor','roomCode','cabId','productName','replCount'];     // 导出的表头字段名
      //     const list = that.excelData;
      //     const data = that.formatJson(filterVal, list);
      //     export_json_to_excel(tHeader, data, '补货单列表');
      // })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

<style lang="less" scoped>
.replenishlist {
  .prodtotal {
    margin: 60px 0px 20px 0px;
    text-align: left;
    font-size: 14px;
    color: red;
    span {
      float: left;
    }
    ul li {
      list-style: none;
      display: inline;
      margin: 0px;
    }
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>

