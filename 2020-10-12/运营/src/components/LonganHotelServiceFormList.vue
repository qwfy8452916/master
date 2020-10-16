<template>
  <div class="servicetypelist">
    <div class="modifybtn">
      <el-button type="primary" @click="formIntroduceModify">修改动态表单介绍信息</el-button>
    </div>
    <table cellpadding="0" cellspacing="0" class="customtable">
      <tr>
        <td class="subTitle">banner图</td>
        <td class="subcont">
          <img :src="BannerDataInfo.picUrl" alt style="width:45px;height:35px" />
        </td>
      </tr>
      <tr>
        <td class="subTitle">标题</td>
        <td class="subcont">{{BannerDataInfo.title}}</td>
      </tr>
      <tr>
        <td class="subTitle">介绍</td>
        <td class="subcont">{{BannerDataInfo.intro}}</td>
      </tr>
    </table>
    <div>
      <el-button class="addbutton" @click="serviceFormAdd">新增表单明细</el-button>
    </div>
    <el-table :data="ServiceFormDataList" border style="width:100%;">
      <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
      <el-table-column prop="widgetName" label="控件类型" min-width="100px"></el-table-column>
      <el-table-column prop="showName" label="显示名称" min-width="100px"></el-table-column>
      <el-table-column prop="keyName" label="字段名" min-width="100px"></el-table-column>
      <el-table-column prop="valueTypeName" label="值类型" min-width="100px"></el-table-column>
      <el-table-column prop="valuePlaceholder" label="默认文本" min-width="100px"></el-table-column>
      <el-table-column prop="isValueRequired" label="是否必填" min-width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.isValueRequired == 1">必填</span>
          <span v-else>非必填</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxNum" label="最多选择数量" min-width="120px" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="serviceFormModify(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="serviceFormDelete(scope.row.id)">删除</el-button>
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
  name: "LonganHotelServiceFormList",
  components: {
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      hsId: "",
      sfId: "",
      BannerDataInfo: {},
      ServiceFormDataList: [],
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
    this.formIntroduceDetail();
    this.serviceFormList();
  },
  methods: {
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.serviceFormList();
    },
    //动态表单介绍信息详情
    formIntroduceDetail() {
      const params = {};
      const hsId = this.hsId;
      this.$api
        .HotelServiceTypeDetail(params, hsId)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == 0) {
            if (result.data.picUrl == null) {
              result.data.picUrl = "";
            }
            this.BannerDataInfo = result.data;
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
    //服务类型明细列表
    serviceFormList() {
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      const hsId = this.hsId;
      this.$api
        .serviceFormList(params, hsId)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.ServiceFormDataList = result.data.records;
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
      this.serviceFormList();
    },
    //修改动态表单介绍信息
    formIntroduceModify() {
      const hsId = this.hsId;
      this.$router.push({
        name: "LonganHotelServiceFormIntroduce",
        query: { hsId },
      });
    },
    //新增
    serviceFormAdd() {
      const hsId = this.hsId;
      this.$router.push({ name: "LonganHotelServiceFormAdd", query: { hsId } });
    },
    //修改
    serviceFormModify(id) {
      const hsId = this.hsId;
      this.$router.push({
        name: "LonganHotelServiceFormModify",
        query: { hsId, id },
      });
    },
    //删除
    serviceFormDelete(id) {
      this.sfId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const hsId = this.hsId;
      const sfId = this.sfId;
      const params = {};
      this.$api
        .serviceFormDelete(params, hsId, sfId)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("删除服务类型明细成功！");
            this.dialogVisibleDelete = false;
            this.serviceFormList();
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
  .modifybtn {
    margin-bottom: 10px;
    text-align: left;
  }
  .customtable {
    width: 60%;
    font-size: 14px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    margin-bottom: 30px;
    td {
      height: 30px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 10px 15px;
    }
    .subTitle {
      width: 80px;
      text-align: right;
      color: #909399;
    }
    .subcont {
      text-align: left;
    }
  }
  .pagination {
    margin-top: 20px;
  }
  .returnbtn {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
