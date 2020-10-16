<template>
  <div class="HotelEvaluate">
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
          <el-option label="平台商品" value="2"></el-option>
          <el-option label="自营商品" value="3"></el-option>
          <el-option label="入驻商品" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="inquireProdName">
        <el-select
          v-model="query.inquireProdName"
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
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="query.userId"></el-input>
      </el-form-item>
      <el-form-item label="评论来源" prop="reviewSource">
        <el-select v-model="query.reviewSource">
          <el-option label="全部" value></el-option>
          <el-option label="用户" value="1"></el-option>
          <el-option label="默认" value="2"></el-option>
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
    <el-table :data="HotelEvaluateDataList" border stripe style="width:100%;">
      <el-table-column prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column prop="prodOwnerOrgKind" label="商品类型">
        <template slot-scope="scope">
          <span v-if="scope.row.prodOwnerOrgKind == '2'">平台商品</span>
          <span v-if="scope.row.prodOwnerOrgKind == '3'">自营商品</span>
          <span v-if="scope.row.prodOwnerOrgKind == '5'">入驻商品</span>
        </template>
      </el-table-column>
      <el-table-column prop="prodOwnerOrgName" label="商家" align="center"></el-table-column>
      <el-table-column prop="customerId" label="用户ID" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.customerId =='0'"></span>
          <span v-else>{{scope.row.customerId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户昵称"></el-table-column>
      <el-table-column prop="prodName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="remarkContent" label="评价内容" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="评价时间" align="center"></el-table-column>
      <el-table-column prop="test" label="评论来源" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.remarkSource =='1'">用户</span>
          <span v-if="scope.row.remarkSource =='2'">默认</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_REM_PRODEVALUATEDELETE']"
            type="text"
            size="small"
            @click="HotelEvaluatedel(scope.row.id)"
          >删除</el-button>
          <el-button
            v-if="authzData['F:BO_REM_PRODEVALUATEDETAIL']"
            type="text"
            size="small"
            @click="HotelEvaluatedetail(scope.row.id)"
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
  name: "LonganHotelEvaluate",
  components: {
    resetButton,
    LonganPagination
  },
  data() {
    return {
      authzData: "",
      hotelList: [],
      prodList: [],
      evaluateid: "",
      HotelEvaluateDataList: [],
      query: {
        inquireHotel: "",
        prostatus: "",
        inquireProdName: "",
        userId: "",
        reviewSource: "",
      },
      organNameList: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      dialogVisibleDelete: false,
      loadingH: false,
      loadingP: false,
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
        this.query[item] = this.$store.state.searchList[item];
      }
    }
    this.HotelEvaluate();
    this.getHotelList();
    this.getProdList();
  },
  methods: {
    resetFunc() {
      this.query.inquireHotel = "";
      this.query.prostatus = "";
      this.query.inquireProdName = "";
      this.query.userId = "";
      this.query.reviewSource = "";
      this.HotelEvaluate();
    },
    //删除
    HotelEvaluatedel(id) {
      this.evaluateid = id;
      this.dialogVisibleDelete = true;
    },

    //删除确定
    Confirmdel() {
      let that = this;
      let params = {};
      this.$api
        .DeleEvaluate(params, this.evaluateid)
        .then((response) => {
          if (response.data.code == 0) {
            that.$message.success("操作成功过！");
            that.dialogVisibleDelete = false;
            that.HotelEvaluate();
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
    HotelEvaluatedetail(id) {
      this.$router.push({ name: "LonganHotelEvalDetail", query: { id } });
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

    //商品列表
    getProdList(pName) {
      this.loadingP = true;
      const params = {
        orgAs: "",
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

    //酒店商品评价列表
    HotelEvaluate() {
      if (isNaN(this.query.userId)) {
        this.$message.error("用户id请输入数字");
        return false;
      }
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        hotelId: this.query.inquireHotel,
        prodKind: this.query.prostatus,
        prodCode: this.query.inquireProdName,
        customerId: this.query.userId,
        remarkSource: this.query.reviewSource,
      };
      this.$api
        .prodEvaluatelist({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.HotelEvaluateDataList = response.data.data.records;
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

    //查询
    inquire() {
      this.pageNum = 1;
      this.HotelEvaluate();
      this.$store.commit("setSearchList", {
        inquireHotel: this.query.inquireHotel,
        prostatus: this.query.prostatus,
        inquireProdName: this.query.inquireProdName,
        userId: this.query.userId,
        reviewSource: this.query.reviewSource,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.HotelEvaluate();
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

