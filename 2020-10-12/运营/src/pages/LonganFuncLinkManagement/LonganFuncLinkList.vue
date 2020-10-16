<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="名称：">
        <el-input v-model="LinkName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="linkType">
          <el-option label="全部" value></el-option>
          <el-option label="内部链接" value="1"></el-option>
          <el-option label="外部链接" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="终端">
        <el-select v-model="linkTerminal">
          <el-option label="全部" value></el-option>
          <el-option label="购物小程序" value="1"></el-option>
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
      <el-button class="addbutton" @click="addNewSetting">新&nbsp;&nbsp;增</el-button>
    </div>
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="linkName" label="链接名称" align="center"></el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.linkType == 1">内部链接</span>
          <span v-if="scope.row.linkType == 2">外部链接</span>
        </template>
      </el-table-column>
      <el-table-column label="终端" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.linkType == 1">购物小程序</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl" label="链接路径" align="center"></el-table-column>
      <el-table-column label="需要参数" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isNeedParameter?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnable"
            @change="swichTab(scope.row.isEnable,scope.row.id,scope.$index)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.reviewStatus == 0">驳回</span>
          <span v-if="scope.row.reviewStatus == 1">通过</span>
          <span v-if="scope.row.reviewStatus == 2">待审核</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isActive?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdByName" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column fixed="right" width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="linkDetail(scope.$index, CabinetList)">详情</el-button>
          <el-button type="text" size="small" @click="linkChange(scope.$index, CabinetList)">修改</el-button>
          <el-button type="text" size="small" @click="linkDelete(scope.$index, CabinetList)">删除</el-button>
          <el-button
            v-if="scope.row.isNeedParameter"
            type="text"
            size="small"
            @click="linkParamManager(scope.$index, CabinetList)"
          >参数管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganFuncLinkList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],

      loadingH: false,
      LinkName: "",
      linkType: "",
      linkTerminal: "",

      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  created() {
    //    this.oprOgrId=localStorage.orgId
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.LinkName = "";
      this.linkType = "";
      this.linkTerminal = "";
      this.Getdata();
    },
    swichTab(value, id, index) {
      let msg = value ? "是否确认启用链接?" : "是否确认关闭链接?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .changelinkStatus(id)
            .then((response) => {
              if (response.data.code == 0) {
                if (value) {
                  this.$message.success("启用成功");
                } else {
                  this.$message.success("禁用成功");
                }
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
                this.CabinetList[index].isEnable = !value;
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
          this.CabinetList[index].isEnable = !value;
        });
    },
    //新增
    addNewSetting() {
      this.$router.push({ name: "LonganFuncLinkAdd" });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        LinkName: this.LinkName,
        linkType: this.linkType,
        linkTerminal: this.linkTerminal,
      });
    },

    //修改
    linkChange(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LonganFuncLinkChange",
        query: { modifyid: guiId },
      });
    },

    //删除
    linkDelete(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .delNewLink(guiId)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message.success("操作成功");
                this.Getdata();
              } else {
                this.$alert(response.data.msg, "警告", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((error) => {
              this.$alert(error, "警告", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //详情
    linkDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LonganFuncLinkDetail",
        query: { modifyid: guiId },
      });
    },
    //参数管理
    linkParamManager(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LonganFuncLinkParams",
        query: { modifyid: guiId },
      });
    },
    //当前页码
    current() {
      // this.pageNum = this.currentPage;
      this.Getdata();
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },

    Getdata() {
      let that = this;
      let params = {
        linkName: this.LinkName,
        linkType: this.linkType,
        linkTerminal: this.linkTerminal,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .selNewLink({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.isEnable = item.isEnable ? true : false;
            });
            that.pageTotal = response.data.data.total;
          } else {
            that.$alert(response.data.data.msg, "警告", {
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
  },
};
</script>

<style lang="less" scoped>
</style>

