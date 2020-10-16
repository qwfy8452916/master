s<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="关联酒店">
        <el-select
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteCabType"
          @focus="getHotelList()"
          v-model="relateHotelId"
          placeholder="请选择酒店名称"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="禁/启用状态">
        <el-select v-model="status" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
    <div>
      <el-button class="addbutton" @click="addNewSetting">添加关联酒店</el-button>
    </div>
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="relateHotelName" label="关联酒店" align="center"></el-table-column>
      <el-table-column prop="showName" label="显示名称" align="center"></el-table-column>
      <el-table-column prop="enterName" label="进场配置" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            @change="changeActivityStatus(scope.row.status,scope.row.id,scope.$index)"
            v-model="scope.row.status"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
          <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
          <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">移除</el-button>
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
  name: "HotelContactList",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzData: "",
      loadingH: false,
      CabinetList: [],
      relateHotelId: "",
      hotelList: [],

      status: "",
      statusList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "禁用",
          value: 0,
        },
        {
          label: "启用",
          value: 1,
        },
      ],
      hotelId: "",
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1, //当前页码
    };
  },
  created() {
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
    this.hotelId = localStorage.getItem("hotelId");
    this.getHotelList();
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.relateHotelId = "";
      this.status = "";
      this.Getdata();
    },
    remoteCabType(val) {
      this.getHotelList(val);
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      let params = {
        relateHotelId: "",
        hotelId: this.hotelId,
        status: "",
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getRelateHotel({ params })
        .then((response) => {
          this.loadingH = false;
          const result = response.data;
          if (result.code == 0) {
            this.hotelList = result.data.records.map((item) => {
              return {
                id: item.id,
                hotelName: item.relateHotelName,
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        relateHotelId: this.relateHotelId,
        status: this.status,
      });
    },
    addNewSetting() {
      this.$router.push({ name: "HotelContactAdd" });
    },
    //修改
    Cabinetglchange(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelContactChange",
        query: { modifyid: guiId },
      });
    },
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelContactDetail",
        query: { modifyid: guiId },
      });
    },
    //修改状态
    changeActivityStatus(value, id, index) {
      let msg = value ? "是否确认启用该关联酒店?" : "是否确认禁用该关联酒店?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let status = value ? 1 : 0;
          this.$api
            .relateHotelStatus(status, id)
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
                this.CabinetList[index].status = !value;
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
          this.CabinetList[index].status = !value;
        });
    },
    //删除
    Cabinetglcancel(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认移除该关联酒店?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteRelateHotel(guiId)
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
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        relateHotelId: this.relateHotelId,
        hotelId: this.hotelId,
        status: this.status,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getRelateHotel({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.status = item.status ? true : false;
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

