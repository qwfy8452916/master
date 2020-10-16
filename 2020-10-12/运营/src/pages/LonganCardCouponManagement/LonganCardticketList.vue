<template>
  <div class="CardticketList">
    <el-form :inline="true" align="left">
      <el-form-item label="酒店">
        <el-select
          v-model="vouOwnerOrgId"
          filterable
          remote
          :remote-method="remoteOrgan"
          :loading="loadingO"
          @focus="getOrgan()"
        >
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in organNameList"
            :key="item.index"
            :label="item.orgName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡券名称">
        <el-input v-model="vouName"></el-input>
      </el-form-item>
      <el-form-item label="使用场景">
        <el-select v-model="vouUseScene">
          <el-option
            v-for="item in UseSceneData"
            :key="item.dictValue"
            :label="item.dictName"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="cardData" border stripe>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="vouOwnerOrgName" label="酒店" align="center"></el-table-column>
      <el-table-column prop="vouName" label="卡券名称" align="center"></el-table-column>
      <el-table-column prop="vouBasicPrice" label="基础价格" align="center"></el-table-column>
      <el-table-column prop="canGive" label="允许转赠" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.canGive===0">不可以</span>
          <span v-if="scope.row.canGive===1">可以</span>
        </template>
      </el-table-column>
      <el-table-column prop="vouTermType" label="使用有效期" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.vouTermType===0">{{scope.row.vouTermDays}}</span>
          <span
            v-if="scope.row.vouTermType===1"
          >{{scope.row.vouTermStartDate}}~{{scope.row.vouTermEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="vouUseSceneName" label="使用场景" align="center"></el-table-column>
      <el-table-column prop="vouVerifiedTotal" label="核销次数" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.vouUseScene==1">
            <span v-if="scope.row.vouVerifiedTotal==1">1</span>
            <span v-if="scope.row.vouVerifiedTotal>1">{{scope.row.vouVerifiedTotal}}</span>
          </div>
          <div v-if="scope.row.vouUseScene==2">
            <span>/</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            :disabled="!authzData['F:BO_VOU_CARDTICKET_SWITCH']"
            v-model="scope.row.isActive"
            :active-value="1"
            :inactive-value="0"
            @change="updateStatus(scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createdByName" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_VOU_CARDTICKET_DETAIL']"
            type="text"
            @click="detailCard(scope.row.id)"
          >详情</el-button>
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
  name: "LonganCardticketList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      delelId: "",
      organNameList: [], //酒店组织数据
      UseSceneData: [],
      cardData: [],
      vouOwnerOrgId: "",
      vouName: "",
      vouUseScene: "",
      loadingO: false,
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
    this.getOrgan();
    this.getUseScene();
    this.getCardticketList();
  },
  methods: {
    resetFunc() {
      this.vouOwnerOrgId = "";
      this.vouName = "";
      this.vouUseScene = "";
      this.getCardticketList();
    },

    getCardticketList() {
      let that = this;
      let params = {
        vouOwnerOrgId: this.vouOwnerOrgId,
        vouName: this.vouName,
        vouUseScene: this.vouUseScene,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getCardticketList({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            that.cardData = result.data.records;
            that.pageTotal = result.data.total;
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

    //详情
    detailCard(id) {
      this.$router.push({ name: "LonganCardticketDetail", query: { id } });
    },

    //确认启用禁用
    updateStatus(id) {
      let that = this;
      this.$api
        .getCardticketisActive(id)
        .then((response) => {
          if (response.data.code == "0") {
            that.$message.success("操作成功");
            that.getCardticketList();
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
            that.getCardticketList();
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取场景
    getUseScene() {
      let that = this;
      let params = {
        key: "VOU_USE_SCENE",
        orgId: "0",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            that.UseSceneData = result.data;
            let allObj = {
              dictName: "全部",
              dictValue: "",
            };
            that.UseSceneData.unshift(allObj);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //酒店组织列表
    getOrgan(oName) {
      let that = this;
      this.loadingO = true;
      let params = {
        orgName: oName,
        orgKind: 3,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getOrganization({ params })
        .then((response) => {
          this.loadingO = false;
          const result = response.data;
          if (result.code == 0) {
            that.organNameList = result.data.records;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    remoteOrgan(val) {
      this.getOrgan(val);
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getCardticketList();
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.getCardticketList();
      this.$store.commit("setSearchList", {
        vouOwnerOrgId: this.vouOwnerOrgId,
        vouName: this.vouName,
        vouUseScene: this.vouUseScene,
      });
    },
  },
};
</script>

<style lang="less" scope>
.CardticketList {
  .el-dialog__footer {
    text-align: center !important;
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>



