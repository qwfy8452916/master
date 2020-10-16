<template>
  <div class="DefEvaluate">
    <el-form :inline="true" :model="query" ref="query" align="left" class="searchform">
      <el-form-item label="酒店名称" prop="inquireHotel">
        <el-select
          v-model="query.inquireHotel"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" prop="prostatus">
        <el-select v-model="query.prostatus">
          <el-option label="全部" value></el-option>
          <el-option label="运营商品" value="2"></el-option>
          <el-option label="酒店商品" value="3"></el-option>
          <el-option label="入驻商品" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
        <!-- <el-button type="primary" @click="resetbtn('query')">重&nbsp;&nbsp;置</el-button> -->
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div>
      <el-button
        v-if="authzData['F:BO_REM_DEFAULTEVALUATEADD']"
        class="addbutton"
        @click="addevaluate()"
      >新增评价</el-button>
    </div>
    <el-table :data="DefEvaluateDataList" border stripe style="width:100%;">
      <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="prodOwnerOrgKind" label="商品类型">
        <template slot-scope="scope">
          <span v-if="scope.row.prodOwnerOrgKind=='2'">平台商品</span>
          <span v-if="scope.row.prodOwnerOrgKind=='3'">自营商品</span>
          <span v-if="scope.row.prodOwnerOrgKind=='5'">入驻商品</span>
        </template>
      </el-table-column>
      <el-table-column prop="prodName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="remarkContent" label="评价内容" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="评价时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_REM_DEFAULTEVALUATEEDIT']"
            type="text"
            size="small"
            @click="DefEvaluateedit(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_REM_DEFAULTEVALUATEDELETE']"
            type="text"
            size="small"
            @click="DefEvaluatedel(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="authzData['F:BO_REM_DEFAULTEVALUATEDETAIL']"
            type="text"
            size="small"
            @click="DefEvaluatedetail(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确定删除该评价？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="Confirmdel()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganDefEvaluate",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      hotelList: [],
      defevaluateid: "",
      DefEvaluateDataList: [],
      query: {
        inquireHotel: "",
        prostatus: "",
      },
      organNameList: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      oprId: "",
      dialogVisibleDelete: false,
      loadingH: false,
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
    this.oprId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this.query[item] = this.$store.state.searchList[item];
      }
    }
    this.DefEvaluate();
    this.getHotelList();
  },
  methods: {
    resetFunc() {
      this.query.inquireHotel = "";
      this.query.prostatus = "";
      this.DefEvaluate();
    },
    //修改
    DefEvaluateedit(id) {
      this.$router.push({ name: "LonganDefEvaluateEdit", query: { id } });
    },

    //删除
    DefEvaluatedel(id) {
      this.defevaluateid = id;
      this.dialogVisibleDelete = true;
    },

    //删除确定
    Confirmdel() {
      let that = this;
      let params = {};
      this.$api
        .DeleEvaluate(params, this.defevaluateid)
        .then((response) => {
          if (response.data.code == 0) {
            that.$message.success("操作成功过！");
            this.dialogVisibleDelete = false;
            that.DefEvaluate();
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

    //查看详情
    DefEvaluatedetail(id) {
      this.$router.push({ name: "LonganDefEvaluateDetail", query: { id } });
    },

    //重置
    resetbtn(query) {
      this.$refs[query].resetFields();
    },

    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .hotelList(params)
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.hotelName,
              };
            });
            const hotelAll = {
              id: "",
              hotelName: "全部",
            };
            this.hotelList.unshift(hotelAll);
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
    remoteHotel(val) {
      this.getHotelList(val);
    },

    // 酒店商品评价列表
    DefEvaluate() {
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        hotelId: this.query.inquireHotel,
        prodKind: this.query.prostatus,
        remarkSource: 2,
      };
      this.$api
        .prodEvaluatelist({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.DefEvaluateDataList = response.data.data.records;
            this.pageTotal = response.data.data.total;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //新增默认评价
    addevaluate() {
      this.$router.push({ name: "LonganDefEvaluateAdd" });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.DefEvaluate();
      this.$store.commit("setSearchList", {
        inquireHotel: this.query.inquireHotel,
        prostatus: this.query.prostatus,
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.DefEvaluate();
    },
  },
};
</script>

<style lang="less" scoped>
.Revenue-font {
  text-align: left;
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
.cell a {
  display: block;
  margin-bottom: 10px;
}
</style>

