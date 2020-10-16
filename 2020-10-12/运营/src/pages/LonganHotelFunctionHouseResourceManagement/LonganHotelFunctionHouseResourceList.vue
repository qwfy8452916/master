<template>
  <div class="functionHouseResourceList">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotelName"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          @change="changeHotel()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hotelOptions"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能区名称">
        <el-select
          v-model="inquireFunctionName"
          filterable
          remote
          :remote-method="remoteFunction"
          :loading="loadingF"
          @focus="getHotelFunctionList()"
          placeholder="请选择功能区"
        >
          <el-option
            v-for="item in functionOptions"
            :key="item.id"
            :label="item.funcCnName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源名称">
        <el-select
          v-model="inquireHouseRerource"
          filterable
          remote
          :remote-method="remoteBookResource"
          :loading="loadingB"
          @focus="getBookResourceList()"
          placeholder="请选择房源"
        >
          <el-option
            v-for="item in houseResourceOptions"
            :key="item.id"
            :label="item.resourceName"
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
    <!-- <div v-if="authzData['F:BO_HOTEL_HOTEL_ADD']">
      <el-button class="addbutton" @click="functionHouseResourceAdd">新&nbsp;&nbsp;增</el-button>
    </div>-->
    <div>
      <el-button class="addbutton" @click="functionHouseResourceAdd">新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="functionHouseResourceDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" width="80px" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" width="80px" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.roomResource==null?"":scope.row.roomResource.hotelName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="funcName" label="功能区名称" min-width="160px"></el-table-column>
      <el-table-column prop="typeName" label="房型名称" width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.roomType==null?"":scope.row.roomType.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="resourceName" label="房源名称" min-width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.roomResource==null?"":scope.row.roomResource.resourceName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdByName" label="创建人" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createdByName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createdAt}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <!-- <el-button v-if="authzData['F:BO_HOTEL_HOTEL_VIEW']" type="text" size="small" @click="lookFunctionHouseResourceDetail(scope.row.id)">详情</el-button> -->
          <!-- <el-button v-if="authzData['F:BO_HOTEL_HOTEL_EDIT']" type="text" size="small" @click="modifyFunctionHouseResource(scope.row.id)">修改</el-button> -->
          <!-- <el-button v-if="authzData['F:BO_HOTEL_HOTEL_DELETE']" type="text" size="small" @click="deleteFunctionHouseResource(scope.row.id)">删除</el-button> -->
          <el-button
            type="text"
            size="small"
            @click="lookFunctionHouseResourceDetail(scope.row.id)"
          >详情</el-button>
          <el-button type="text" size="small" @click="modifyFunctionHouseResource(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteFunctionHouseResource(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>确定删除该房源？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="ensureDetail">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganHotelFunctionHouseResourceList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      // orgId: '',
      inquireHotelName: "",
      inquireFunctionName: "",
      inquireHouseRerource: "",
      functionHouseResourceDataList: [],
      hotelOptions: [], //酒店名称options
      functionOptions: [], //功能区名称options
      houseResourceOptions: [], //房源名称options
      loadingH: false,
      loadingF: false,
      loadingB: false,
      hotelId: "",
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
    this.getHotelList();
    this.functionHouseResourceList();
    // this.getHotelFunctionList();
    // this.getBookResourceList();
  },
  methods: {
    changeHotel() {
      this.inquireHouseRerource = "";
      this.houseResourceOptions = [];
      this.inquireFunctionName = "";
      this.functionOptions = [];
    },
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireFunctionName = "";
      this.inquireHouseRerource = "";
      this.functionHouseResourceList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.functionHouseResourceList();
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
        pageSize: 5000,
      };
      this.$api
        .hotelList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelOptions = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部",
            };
            this.hotelOptions.unshift(hotelAll);
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
    //房源列表
    getBookResourceList(bName) {
      this.inquireHouseRerource = "";
      this.houseResourceOptions = [];
      if (this.inquireHotelName == "") {
        this.$message.warning("请先选择酒店！");
        return false;
      }
      this.loadingB = true;
      const params = {
        orgAs: 2,
        hotelId: this.inquireHotelName,
        resourceName: bName,
      };
      this.$api
        .bookResourceList(params)
        .then((response) => {
          this.loadingB = false;
          const result = response.data;
          if (result.code == 0) {
            this.houseResourceOptions = result.data.records.map((item) => {
              return {
                id: item.id,
                resourceName: item.resourceName,
              };
            });
            const bookResourceAll = {
              id: "",
              resourceName: "全部",
            };
            this.houseResourceOptions.unshift(bookResourceAll);
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
    //获取功能区通过类型funcType=4为订单类型
    getHotelFunctionList(fName) {
      this.inquireFunctionName = "";
      this.functionOptions = [];
      if (this.inquireHotelName == "") {
        this.$message.warning("请先选择酒店！");
        return false;
      }
      const params = {
        funcCnName: fName,
        hotelId: this.inquireHotelName,
        funcType: 2,
      };
      this.loadingF = true;
      this.$api
        .getFuncType({ params })
        .then((response) => {
          this.loadingF = false;
          if (response.data.code == 0) {
            let recordsData = response.data.data;
            let areaList = recordsData.map((item) => {
              return {
                funcCnName: item.funcCnName,
                id: item.id,
              };
            });
            areaList.unshift({
              funcCnName: "全部",
              id: "",
            });
            this.functionOptions = areaList;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            })
              .then(() => {})
              .catch((e) => {
                e;
              });
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //功能区房源列表
    functionHouseResourceList() {
      const params = {
        orgAs: 2,
        hotelId: this.inquireHotelName,
        funcId: this.inquireFunctionName,
        resourceId: this.inquireHouseRerource,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .getBookFuncResourceList(params)
        .then((response) => {
          const result = response.data;
          if (response.data.code == "0") {
            this.functionHouseResourceDataList = result.data.records;
            this.pageTotal = result.data.total;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          })
            .then(() => {})
            .catch((e) => {
              e;
            });
        });
    },
    //新增
    functionHouseResourceAdd() {
      this.$router.push({ name: "LonganHotelFunctionHouseResourceAdd" });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireFunctionName: this.inquireFunctionName,
        inquireHouseRerource: this.inquireHouseRerource,
      });
      this.functionHouseResourceList();
    },
    //查看
    lookFunctionHouseResourceDetail(id) {
      this.$router.push({
        name: "LonganHotelFunctionHouseResourceDetail",
        query: { id },
      });
    },
    //修改
    modifyFunctionHouseResource(id) {
      this.$router.push({
        name: "LonganHotelFunctionHouseResourceEdit",
        query: { id },
      });
    },
    //打开删除模态框
    deleteFunctionHouseResource(id) {
      this.hotelId = id;
      this.dialogVisibleDelete = true;
    },
    //移除功能区房源
    ensureDetail() {
      const id = this.hotelId;
      const params = {};
      this.$api
        .bookFuncResourceDelete(params, id)
        .then((response) => {
          const result = response.data;
          if (response.data.code == "0") {
            this.$message.success("删除功能区房源成功！");
            this.dialogVisibleDelete = false;
            this.functionHouseResourceList();
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
    remoteHotel(val) {
      this.getHotelList(val);
    },
    remoteBookResource(val) {
      this.getBookResourceList(val);
    },
    remoteFunction(val) {
      this.getHotelFunctionList(val);
    },
  },
};
</script>

<style lang="less" scoped>
.functionHouseResourceList {
  .pagination {
    margin-top: 20px;
  }
}
</style>

