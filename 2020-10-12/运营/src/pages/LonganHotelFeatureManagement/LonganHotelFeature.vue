<template>
  <div class="hotelfeature">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotelName"
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
      <el-form-item label="特色类型">
        <el-select v-model="inquireFeatureType">
          <el-option
            v-for="item in featureList"
            :key="item.id"
            :label="item.feName"
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
    <div v-if="authzData['F:BO_HOTEL_FEATURE_ADD']">
      <el-button class="addbutton" @click="hotelFeatureAdd">添加客房设施</el-button>
    </div>
    <el-table :data="hotelFeatureDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="feTypeName" label="酒店客房设施"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_HOTEL_FEATURE_DELETE']"
            type="text"
            size="small"
            @click="deleteHotelFeature(scope.row.id)"
          >移除</el-button>
          <el-button
            v-if="authzData['F:BO_HOTEL_FEATURE_DETAIL']"
            type="text"
            size="small"
            @click="detailHotelFeature(scope.row.id)"
          >客房设施明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认移除该客房设施？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganHotelFeature",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      // orgId: '',
      hotelList: [],
      inquireHotelName: "",
      featureList: [],
      inquireFeatureType: "",
      hotelFeatureDataList: [],
      hfId: "",
      dialogVisibleDelete: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
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
    // this.orgId = localStorage.getItem('orgId');
    // this.orgId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.getFeatureList();
    this.hotelFeatureList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireFeatureType = "";
      this.hotelFeatureList();
    },
    //获取酒店列表
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
    //获取特色类型列表
    getFeatureList() {
      const params = {
        // encryptedOprOrgId: this.orgId
        orgAs: 2,
      };
      // console.log(params);
      this.$api
        .commonFeatureList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.featureList = result.data.map((item) => {
              return {
                feName: item.feName,
                id: item.id,
              };
            });
            const featureAll = {
              feName: "全部",
              id: "",
            };
            this.featureList.push(featureAll);
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
    //酒店特色列表
    hotelFeatureList() {
      const params = {
        // encryptedOprOrgId: this.orgId,
        orgAs: 2,
        hotelId: this.inquireHotelName,
        typeId: this.inquireFeatureType,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .hotelFeatureList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.hotelFeatureDataList = result.data.records;
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
      this.hotelFeatureList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireFeatureType: this.inquireFeatureType,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.hotelFeatureList();
    },
    //添加客房设施
    hotelFeatureAdd() {
      this.$router.push({ name: "LonganHotelFeatureAdd" });
    },
    //移除
    deleteHotelFeature(id) {
      this.hfId = id;
      this.dialogVisibleDelete = true;
    },
    EnsureDetail() {
      const params = {};
      const id = this.hfId;
      // console.log(params);
      this.$api
        .deleteHotelFeature(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            if (result.data) {
              this.$message.success("酒店特色移除成功！");
              this.hotelFeatureList();
              this.dialogVisibleDelete = false;
            } else {
              this.$message.error("酒店特色移除失败！");
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
    //客房设施明细
    detailHotelFeature(id) {
      this.$router.push({ name: "LonganHotelFeatureDetail", query: { id } });
    },
  },
};
</script>

<style>
.el-dialog__header {
  text-align: left;
}
</style>

<style lang="less" scoped>
.hotelfeature {

}
</style>

