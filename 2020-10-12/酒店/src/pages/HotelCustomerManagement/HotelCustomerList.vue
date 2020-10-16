<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="上级ID">
        <el-input v-model="inquireId"></el-input>
      </el-form-item>
      <el-form-item label="上级手机号">
        <el-input v-model="inquireMobile"></el-input>
      </el-form-item>
      <el-form-item label="解绑状态">
        <el-select v-model="status" placeholder="请选择解绑状态">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.empName"
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
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed label="上级ID" min-width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.fatherTeam.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级昵称" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.fatherTeam.userNickName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级手机号" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.fatherTeam.userMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员ID" min-width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员昵称" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.userNickName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.userMobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="加入时间" min-width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.createdAt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享次数" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.shareCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享访问次数" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.shareVisitCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="售出商品数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.prodSaleCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.orderCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.orderAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享奖励" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.shareBonus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理奖励" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sonTeam.shareManageBonus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="解绑状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status?'已解绑':'未解绑'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hotelName" min-width="150" label="解绑时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status?'已解绑':'未解绑'}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="!scope.row.status"
            @click="unlock(scope.$index, CabinetList)"
          >解绑</el-button>
          <el-button type="text" size="small" v-else>-</el-button>
          <el-button
            type="text"
            size="small"
            @click="viewShareRecord(scope.$index, CabinetList)"
          >查看分享记录</el-button>
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
  name: "HotelCustomerList",
  components: {
    resetButton,
    HotelPagination
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      hotelId: "",
      inquireId: "",
      status: "",
      inquireMobile: "",
      hotelList: [],
      statusList: [
        {
          id: "",
          empName: "全部",
        },
        {
          id: 0,
          empName: "未解绑",
        },
        {
          id: 1,
          empName: "已解绑",
        },
      ],
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
    this.hotelId = parseInt(localStorage.hotelId);
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.inquireId = "";
      this.status = "";
      this.inquireMobile = "";
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        inquireId: this.inquireId,
        status: this.status,
        inquireMobile: this.inquireMobile,
      });
    },
    viewShareRecord(index, row) {
      let userType = row[index].fatherTeam.userType;
      let userId = row[index].fatherTeam.userId;
      this.$router.push({
        name: "HotelShareRecord",
        query: { userType, userId },
      });
    },
    //解绑
    unlock(index, row) {
      let params = {
        fatherId: row[index].fatherTeam.id,
        sonId: row[index].sonTeam.id,
      };
      this.$confirm("是否确认解绑?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .unlockLink(params)
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
            message: "已取消解绑",
          });
        });
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
        status: this.status,
        fatherId: this.inquireId,
        fatherMobile: this.inquireMobile,
        hotelId: this.hotelId,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .selCustomerRelation({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
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

