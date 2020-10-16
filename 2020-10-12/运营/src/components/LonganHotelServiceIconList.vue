<template>
  <div class="servicetypelist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="名称">
        <el-input v-model="inquireName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button class="addbutton" @click="serviceCommonAdd">新增图标明细</el-button>
    </div>
    <el-table :data="ServiceCommonDataList" border style="width:100%;">
      <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
      <el-table-column prop="hotelCategoryCatalogName" label="目录" min-width="120px"></el-table-column>
      <el-table-column prop="picUrl" label="图片" min-width="80px" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt style="width:45px;height:35px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="120px"></el-table-column>
      <el-table-column prop="price" label="单价" min-width="80px"></el-table-column>
      <el-table-column prop="unit" label="单位" min-width="80px"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="serviceCommonModify(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="serviceCommonDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <div class="returnbtn">
      <el-button @click="returnFun">返回</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该服务类型明细？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganHotelServiceIconList",
  components: {
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      hsId: "",
      inquireName: "",
      ssId: "",
      ServiceCommonDataList: [],
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
    this.hsId = this.$route.query.id;
    this.serviceCommonList();
  },
  methods: {
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.serviceCommonList();
    },
    //服务类型明细列表
    serviceCommonList() {
      const params = {
        name: this.inquireName,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      const hsId = this.hsId;
      this.$api
        .serviceCommonList(params, hsId)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.ServiceCommonDataList = result.data.records;
            this.pageTotal = response.data.data.total;
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
      this.serviceCommonList();
    },
    //新增
    serviceCommonAdd() {
      const hsId = this.hsId;
      this.$router.push({ name: "LonganHotelServiceIconAdd", query: { hsId } });
    },
    //修改
    serviceCommonModify(id) {
      const hsId = this.hsId;
      this.$router.push({
        name: "LonganHotelServiceIconModify",
        query: { hsId, id },
      });
    },
    //删除
    serviceCommonDelete(id) {
      this.ssId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const hsId = this.hsId;
      const id = this.ssId;
      const params = {};
      this.$api
        .serviceCommonDelete(params, hsId, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("删除服务类型明细成功！");
            this.dialogVisibleDelete = false;
            this.serviceCommonList();
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
    //返回
    returnFun() {
      this.$router.push({ name: "LonganHotelServiceList" });
    },
  },
};
</script>

<style lang="less" scoped>
.servicetypelist {
  .pagination {
    margin-top: 20px;
  }
  .returnbtn {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
