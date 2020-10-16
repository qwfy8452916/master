<template>
  <div class="functionlist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="功能区名称">
        <el-input v-model="inquireFunctionName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="功能区开关">
                <el-select v-model="inquireFunctionShow" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="隐藏" value="0"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="类型">
        <el-select v-model="inquireFuncType" placeholder="请选择">
          <el-option
            v-for="item in funcTypeList"
            :key="item.id"
            :label="item.funcTypeName"
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
    <!-- <div v-if="authzData['F:BH_FUNC_FUNCTION_ADD']"><el-button class="addbutton" @click="hotelFunctionAdd">新增</el-button></div> -->
    <el-table :data="hotelFunctionDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="funcCnName" label="功能区" min-width="100px"></el-table-column>
      <el-table-column prop="funcEnName" label="英文名称" min-width="100px"></el-table-column>
      <el-table-column prop="funcTypeName" label="类型" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="isShow" label="默认开放" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isShow == 0">否</span>
          <span v-else-if="scope.row.isShow == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="pageLayoutName" label="布局" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="delivWayNames" label="配送方式" min-width="160px"></el-table-column>
      <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="160px" align="center"></el-table-column>
      <!-- <el-table-column prop="delivFee" label="配送服务费"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="260px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BH_FUNC_FUNCTION_DETAIL']"
            type="text"
            size="small"
            @click="hotelFunctionDetail(scope.row.id)"
          >详情</el-button>
          <el-button
            v-if="authzData['F:BH_FUNC_FUNCTION_EDIT']"
            type="text"
            size="small"
            @click="hotelFunctionModify(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BH_FUNC_FUNCTION_DELETE']"
            type="text"
            size="small"
            @click="hotelFunctionDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="authzData['F:BH_FUNC_FUNCTION_CLASSIFY']&&scope.row.funcType==4"
            type="text"
            size="small"
            @click="hotelFunctionClassify(scope.row.hotelId, scope.row.id, scope.row.funcCnName)"
          >分类管理</el-button>
          <el-button
            v-if="authzData['F:BH_FUNC_FUNCTION_PROD']&&scope.row.funcType==4"
            type="text"
            size="small"
            @click="hotelFunctionProd(scope.row.id)"
          >商品管理</el-button>
          <el-button
            v-if="scope.row.funcType==2"
            type="text"
            size="small"
            @click="hotelFunctionHouseResource(scope.row.id)"
          >房源管理</el-button>
          <el-button
            v-if="scope.row.funcType==7"
            type="text"
            size="small"
            @click="hotelFunctionLead(scope.row.id)"
          >导航管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该功能区？</span>
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
  name: "HotelFunctionList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      hfId: "",
      funcTypeList: [],
      inquireFunctionName: "",
      inquireFuncType: "",
      inquireFunctionShow: "",
      hotelFunctionDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      dialogVisibleDelete: false,
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
    this.hotelId = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.basicDataItems_ft();
    this.hotelFunctionList();
  },
  methods: {
    resetFunc() {
      this.inquireFunctionName = "";
      this.inquireFuncType = "";
      this.inquireFunctionShow = "";
      this.hotelFunctionList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelFunctionList();
    },
    //获取类型 - 字典表
    basicDataItems_ft() {
      const params = {
        key: "FUNC_TYPE",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            if (result.data.length != 0) {
              this.funcTypeList = result.data.map((item) => {
                return {
                  id: item.dictValue,
                  funcTypeName: item.dictName,
                };
              });
              const funcTypeAll = {
                id: "",
                funcTypeName: "全部",
              };
              this.funcTypeList.unshift(funcTypeAll);
            }
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
    //酒店功能区列表
    hotelFunctionList() {
      const params = {
        isNotNeedDef: 1,
        hotelId: this.hotelId,
        funcName: this.inquireFunctionName,
        funcType: this.inquireFuncType,
        isShow: this.inquireFunctionShow,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelFunctionList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.hotelFunctionDataList = result.data.records;
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
      this.pageNum = 1;
      this.hotelFunctionList();
      this.$store.commit("setSearchList", {
        inquireFunctionName: this.inquireFunctionName,
        inquireFuncType: this.inquireFuncType,
        inquireFunctionShow: this.inquireFunctionShow,
      });
    },
    //新增
    hotelFunctionAdd() {
      this.$router.push({ name: "HotelFunctionAdd" });
    },
    //房源管理
    hotelFunctionHouseResource(id){
        this.$router.push({ name: "HotelFunctionHouseResourceList" });
    },
    //导航管理
    hotelFunctionLead(id) {
      this.$router.push({ name: "HotelFunctionLeadList" });
    },
    //分类管理
    hotelFunctionClassify(hotelId, funcId, funcName) {
      this.$router.push({
        name: "HotelFunctionClassify",
        query: { hotelId, funcId, funcName },
      });
    },
    //商品管理
    hotelFunctionProd(id) {
      this.$router.push({ name: "HotelFunctionProdList" });
    },
    //修改
    hotelFunctionModify(id) {
      this.$router.push({ name: "HotelFunctionModify", query: { id } });
    },
    //删除
    hotelFunctionDelete(id) {
      this.hfId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDelete() {
      const id = this.hfId;
      const params = {};
      // console.log(id);
      this.$api
        .hotelFunctionDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.dialogVisibleDelete = false;
            this.$message.success("删除功能区成功！");
            this.hotelFunctionList();
          } else {
            this.dialogVisibleDelete = false;
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //查看详情
    hotelFunctionDetail(id) {
      this.$router.push({ name: "HotelFunctionDetail", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.functionlist {
 
}
</style>

