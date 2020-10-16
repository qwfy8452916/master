<template>
  <div class="hotellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="名称">
        <el-input v-model="inquireName"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="inquireRank">
          <el-option label="全部" value></el-option>
          <el-option label="通用" value="0"></el-option>
          <el-option label="专用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用范围">
        <el-select v-model="inquireScope">
          <el-option label="全部" value></el-option>
          <el-option label="平台" value="0"></el-option>
          <el-option label="特定酒店" value="1"></el-option>
          <el-option label="除特定酒店外" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireStatus">
          <el-option label="全部" value></el-option>
          <el-option label="草稿" value="0"></el-option>
          <el-option label="已发布" value="1"></el-option>
          <el-option label="已修改待发布" value="2"></el-option>
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
      <el-button class="addbutton" @click="hotelADAdd">新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="AdDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="adName" label="名称" min-width="160px">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">{{scope.row.adName}}</span>
          <span v-if="scope.row.status == 1">{{scope.row.adName}}</span>
          <span v-if="scope.row.status == 2">{{scope.row.adModifyName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="adLevel" label="级别" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.adLevel == 0">通用</span>
          <span v-if="scope.row.adLevel == 1">专用</span>
        </template>
      </el-table-column>
      <el-table-column prop="adScope" label="适用范围" min-width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.adScope == 0">平台</span>
          <span v-if="scope.row.adScope == 1">特定酒店</span>
          <span v-if="scope.row.adScope == 2">除特定酒店外</span>
        </template>
      </el-table-column>
      <el-table-column prop="userdCount" label="引用次数" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">草稿</span>
          <span v-if="scope.row.status == 1">已发布</span>
          <span v-if="scope.row.status == 2">已修改待发布</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdByName" label="创建人" min-width="100px"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="160px" align="center"></el-table-column>
      <el-table-column prop="issuedByName" label="发布人" min-width="100px"></el-table-column>
      <el-table-column prop="issuedTime" label="发布时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.issuedTime == '1970-01-01 00:00:00'"></span>
          <span v-else>{{scope.row.issuedTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lastUpdatedByName" label="最近修改人" min-width="100px"></el-table-column>
      <el-table-column prop="lastUpdatedAt" label="最近修改时间" min-width="160px" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="280px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 2"
            type="text"
            size="small"
            @click="ADModifyCancel(scope.row.id)"
          >撤销修改</el-button>
          <el-button type="text" size="small" @click="hotelADDetail(scope.row.id)">详情</el-button>
          <el-button type="text" size="small" @click="hotelADModify(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="hotelADDelete(scope.row.id)">删除</el-button>
          <el-button
            v-if="scope.row.status == 1"
            type="text"
            size="small"
            @click="ADDetailQuote(scope.row.id)"
          >引用详情</el-button>
          <el-button type="text" size="small" @click="hotelADPreview(scope.row.id)">预览</el-button>
          <el-button
            v-if="scope.row.status != 1"
            type="text"
            size="small"
            @click="hotelADIssue(scope.row.id)"
          >发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleCancel" width="30%">
      <span>是否确认撤销修改该广告页？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleCancel=false">取消</el-button>
        <el-button type="primary" @click="EnsureCancel">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该广告页？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDelete">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="dialogVisiblePreview" width="48%">
      <div v-html="PreviewData"></div>
    </el-dialog>
    <el-dialog title="发布" :visible.sync="dialogVisibleIssue" width="48%">
      <div v-html="IssueData"></div>
      <span slot="footer">
        <el-button @click="dialogVisibleIssue=false">取消</el-button>
        <el-button type="primary" :disabled="isSubmit" @click="EnsureIssue">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganHotelADList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      inquireName: "",
      inquireRank: "",
      inquireScope: "",
      inquireStatus: "",
      AdDataList: [],
      ADId: "",
      dialogVisibleCancel: false,
      dialogVisibleDelete: false,
      dialogVisiblePreview: false,
      dialogVisibleIssue: false,
      isSubmit: false,
      PreviewData: "",
      IssueData: "",
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.hotelADList();
  },
  methods: {
    //重置
    resetFunc() {
      this.inquireName = "";
      this.inquireRank = "";
      this.inquireScope = "";
      this.inquireStatus = "";
      this.hotelADList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelADList();
    },
    //酒店广告列表
    hotelADList() {
      const params = {
        adName: this.inquireName,
        adLevel: this.inquireRank,
        adScope: this.inquireScope,
        status: this.inquireStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelADList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (response.data.code == "0") {
            this.AdDataList = result.data.records;
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
      this.hotelADList();
      this.$store.commit("setSearchList", {
        inquireName: this.inquireName,
        inquireRank: this.inquireRank,
        inquireScope: this.inquireScope,
        inquireStatus: this.inquireStatus,
      });
    },
    //新增
    hotelADAdd() {
      this.$router.push({ name: "LonganHotelADAdd" });
    },
    //撤销修改
    ADModifyCancel(id) {
      this.ADId = id;
      this.dialogVisibleCancel = true;
    },
    EnsureCancel() {
      const id = this.ADId;
      const params = {};
      this.$api
        .ADModifyCancel(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data) {
              this.$message.success("广告页撤销修改成功！");
              this.dialogVisibleCancel = false;
              this.hotelADList();
            } else {
              this.$message.error(result.msg);
              this.dialogVisibleCancel = false;
            }
          } else {
            this.$message.error(result.msg);
            this.dialogVisibleCancel = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //详情
    hotelADDetail(id) {
      this.$router.push({ name: "LonganHotelADDetail", query: { id } });
    },
    //修改
    hotelADModify(id) {
      this.$router.push({ name: "LonganHotelADModify", query: { id } });
    },
    //删除
    hotelADDelete(id) {
      this.ADId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDelete() {
      const id = this.ADId;
      const params = {};
      this.$api
        .hotelADDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data) {
              this.$message.success("广告删除成功！");
              this.dialogVisibleDelete = false;
              this.hotelADList();
            } else {
              this.$message.error(result.msg);
              this.dialogVisibleDelete = false;
            }
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
    //引用详情
    ADDetailQuote(id) {
      this.$router.push({ name: "LonganHotelADQuoteDetail", query: { id } });
    },
    //预览
    hotelADPreview(id) {
      this.ADId = id;
      const params = {};
      this.$api
        .hotelADDetail(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.status == 2) {
              this.PreviewData = result.data.adModifyContent;
            } else {
              this.PreviewData = result.data.adContent;
            }
            this.dialogVisiblePreview = true;
          } else {
            this.$message.error(result.msg);
            this.dialogVisiblePreview = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //发布
    hotelADIssue(id) {
      this.ADId = id;
      const params = {};
      this.$api
        .hotelADDetail(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data.status == 2) {
              this.IssueData = result.data.adModifyContent;
            } else {
              this.IssueData = result.data.adContent;
            }
            this.dialogVisibleIssue = true;
          } else {
            this.$message.error(result.msg);
            this.dialogVisibleIssue = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    EnsureIssue() {
      const id = this.ADId;
      const params = {};
      this.isSubmit = true;
      this.$api
        .hotelADIssue(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data) {
              this.$message.success("广告发布成功！");
              this.dialogVisibleIssue = false;
              this.hotelADList();
            } else {
              this.$message.error(result.msg);
              this.dialogVisibleIssue = false;
              this.isSubmit = false;
            }
          } else {
            this.$message.error(result.msg);
            this.dialogVisibleIssue = false;
            this.isSubmit = false;
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.hotellist {
  .pagination {
    margin-top: 20px;
  }
}
</style>

