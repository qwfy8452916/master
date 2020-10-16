<template>
  <div class="godownentrylist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="入库单编号">
        <el-input v-model="inquireGodownEntryId"></el-input>
      </el-form-item>
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
      <el-form-item label="收货日期">
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
      <el-form-item label="状态">
        <el-select v-model="inquireState">
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
        v-if="authzlist['F:BH_INV_GODOWNENTRYLIST_ADD']"
        class="addbutton"
        @click="godownEntryAdd"
      >新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="HotelGodownEntryDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="invInCode" label="入库单编号" align="center"></el-table-column>
      <el-table-column prop="ownerOrgKind" label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ownerOrgKind == '1'">平台</span>
          <span v-if="scope.row.ownerOrgKind == '2'">运营商</span>
          <span v-if="scope.row.ownerOrgKind == '3'">自营</span>
          <span v-if="scope.row.ownerOrgKind == '4'">供应商</span>
          <span v-if="scope.row.ownerOrgKind == '5'">入驻商家</span>
        </template>
      </el-table-column>
      <el-table-column prop="supplName" label="商品所有人组织名称" width="150px" align="center"></el-table-column>
      <el-table-column prop="receiveTime" label="收货日期" align="center"></el-table-column>
      <el-table-column prop="lastUpdatedByName" label="操作人姓名" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="invInRemark" label="说明" align="center"></el-table-column>
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
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.reviewStatus== 2 && authzlist['F:BH_INV_GODOWNENTRYLIST_SCHEDULE']"
            type="text"
            size="small"
            @click="examineDetail(scope.row.wfId)"
          >审核进度</el-button>
          <el-button
            v-if="scope.row.reviewStatus == 0 && authzlist['F:BH_INV_GODOWNENTRYLIST_ALTER']"
            type="text"
            size="small"
            @click="modifyInfo(scope.row.id)"
          >修改</el-button>
          <el-button
            v-else-if="authzlist['F:BH_INV_GODOWNENTRYLIST_DETAIL']"
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
  name: "HotelGodownEntryList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      hotelid: "",
      authzlist: {}, //权限数据
      typedata: [],
      disabledjudge: true,
      loadingR: false,
      loadingP: false,
      inquireProdName: "",
      typeId: "",
      MerchantList: [],
      prodList: [],
      encryptedOrgId: "",
      inquireGodownEntryId: "",
      inquireTime: [],
      inquireState: "",
      HotelGodownEntryDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  mounted() {
    this.hotelid = localStorage.getItem("hotelId");
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getType();
    this.getProdList();
    this.godownEntryList();
    this.getHotelMerchant();
  },
  methods: {
    resetFunc() {
      this.inquireGodownEntryId = "";
      this.inquireProdName = "";
      this.inquireTime = [];
      this.typeId = "";
      this.inquireState = "";
      this.godownEntryList();
    },
    //选择类型
    leixing(e) {
      if (e == 5) {
        this.disabledjudge = false;
      } else {
        this.disabledjudge = true;
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

    //入库单列表
    godownEntryList() {
      if (this.inquireTime == null) {
        this.inquireTime = [];
      }
      const params = {
        // encryptedHotelOrgId: this.encryptedOrgId,
        hotelId: this.hotelid,
        invInCode: this.inquireGodownEntryId,
        prodCode: this.inquireProdName,
        receiveTimeStart: this.inquireTime[0],
        receiveTimeEnd: this.inquireTime[1],
        reviewStatus: this.inquireState,
        ownerOrgKind: this.typeId,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        orgAs: 0,
      };
      // return
      this.$api
        .godownEntryList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.HotelGodownEntryDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error("入库单列表获取失败！");
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
        orgAs: "",
        hotelId: this.hotelid,
        isNeedInv: 1,
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
      this.godownEntryList();
      this.$store.commit("setSearchList", {
        inquireGodownEntryId: this.inquireGodownEntryId,
        inquireTime: this.inquireTime,
        typeId: this.typeId,
        inquireState: this.inquireState,
        inquireProdName: this.inquireProdName,
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.godownEntryList();
    },
    //新增
    godownEntryAdd() {
      this.$router.push({ name: "HotelGodownEntryAdd" });
    },
    //查看商品明细
    lookDetail(id) {
      this.$router.push({ name: "HotelGodownEntryDetail", query: { id } });
    },
    //修改
    modifyInfo(id) {
      this.$router.push({ name: "HotelGodownEntryModify", query: { id } });
    },
    //审核详情
    examineDetail(id) {
      this.$router.push({ name: "HotelProcessDetails", query: { id: id } });
    },
  },
};
</script>

<style lang="less" scoped>
.godownentrylist {
}
</style>

