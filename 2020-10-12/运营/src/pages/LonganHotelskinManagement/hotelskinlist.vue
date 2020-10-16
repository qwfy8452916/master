<template>
  <div class="hotellist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="主题名称">
        <el-input v-model="Skinname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div v-if="authzData['F:BO_HOTEL_THEME_ADD']">
      <el-button class="addbutton" @click="addproduct()">新增主题</el-button>
    </div>
    <el-table :data="Skindatalist" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="id" width="80px" align="center"></el-table-column>
      <el-table-column prop="themeName" label="主题名称"></el-table-column>
      <el-table-column prop label="操作" width="120px" align="center" is-center>
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_HOTEL_THEME_EDIT']"
            type="text"
            size="small"
            @click="Modifyproduct(scope.$index, Skindatalist)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_HOTEL_THEME_DELETE']"
            type="text"
            size="small"
            @click="Deleteproduct(scope.$index, Skindatalist)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该商品？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="Confirmdel()">确定</el-button>
        <!-- <el-button type="primary" @click="dialogVisibleDelete=false">确定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "hotelskinlist",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      pageSize: 10,
      pageTotal: 0, //默认总条数
      pageNum: 1, //实际当前页码
      Skinname: "", //主题名称
      delindexid: null, //当前id
      delindex: null, //当前索引
      Skindatalist: [],
      dialogVisibleDelete: false,
      oprOgrId: "", //标识
    };
  },
  created() {
    // this.oprOgrId=localStorage.orgId
    // this.oprOgrId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.Getdata();
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
  },
  methods: {
    resetFunc() {
      this.Skinname = "";
      this.Getdata();
    },
    //查询
    inquire() {
      let that = this;
      that.Getdata();
      this.$store.commit("setSearchList", {
        Skinname: this.Skinname,
      });
    },
    //新增主题
    addproduct() {
      this.$router.push({ name: "hotelskinadd" });
    },
    //修改
    Modifyproduct(index, rows) {
      let changeid = rows[index].id;
      this.$router.push({
        name: "hotelskinmodify",
        query: { productid: changeid },
      });
    },
    //删除
    Deleteproduct(index, rows) {
      this.delindex = index;
      this.delindexid = rows[index].id;
      this.dialogVisibleDelete = true;
    },

    Confirmdel() {
      let that = this;
      let params = "";
      this.$api
        .deletehotelskin({ params }, that.delindexid)
        .then((response) => {
          if (response.data.code == 0) {
            that.Skindatalist.splice(that.delindex, 1);
            this.$message.success("操作成功！");
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
      this.dialogVisibleDelete = false;
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
        pageNo: that.pageNum,
        pageSize: that.pageSize,
        // encryptedOrgId:that.oprOgrId,
        orgAs: 2,
        themeName: that.Skinname,
      };
      this.$api
        .gethotelskinlist({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.pageTotal = response.data.data.total;
            that.Skindatalist = response.data.data.records;
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

<style lang="less" scoped>
.hotellist {

}
</style>
