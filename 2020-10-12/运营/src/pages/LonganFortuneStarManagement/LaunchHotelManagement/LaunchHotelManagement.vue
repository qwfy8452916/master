<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-input v-model="inquireHotel" placeholder="输入酒店名称"></el-input>
      </el-form-item>
      <el-form-item v-for="(item,index) in selectData" :key="index" :label="item.label">
        <el-select v-model="selectValue[index]" :loading="loadingH" placeholder="请选择">
          <el-option
            v-for="ele in item.selection"
            :key="ele.value"
            :label="ele.name"
            :value="ele.value"
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
    <div v-if="authzData['F:BO_FS_HOTEL_ADD']">
      <el-button class="addbutton" @click="addNewSetting">添加投放酒店</el-button>
    </div>
    <el-table :data="CabinetList" border stripe style="width:100%;">
      <el-table-column fixed prop="hotelName" label="酒店名称" align="center"></el-table-column>
      <el-table-column label="财运指数" align="center">
        <template slot-scope="scope">
          <el-rate :value="scope.row.starLevel" :disabled="true"></el-rate>
        </template>
      </el-table-column>

      <el-table-column prop="hitRate" label="投中率" align="center"></el-table-column>
      <el-table-column prop="isShow" label="是否显示酒店" align="center"></el-table-column>
      <el-table-column prop="isOpen" label="是否投放柜子" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_FS_HOTEL_EDIT']"
            type="text"
            size="small"
            @click="Cabinetglchange(scope.$index, CabinetList)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BO_FS_HOTEL_DELETE']"
            type="text"
            size="small"
            @click="Cabinetglcancel(scope.$index, CabinetList)"
          >删除</el-button>
          <el-button
            v-if="authzData['F:BO_FS_HOTEL_CAB']"
            type="text"
            size="small"
            @click="CabinetglManager(scope.$index, CabinetList)"
          >柜子管理</el-button>
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
  name: "LaunchHotelManagement",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,
      inquireHotel: "",
      selectData: [
        {
          label: "是否显示酒店",
          selection: [
            {
              name: "全部",
              value: "",
            },
            {
              name: "开放",
              value: 1,
            },
            {
              name: "关闭",
              value: 0,
            },
          ],
        },
        {
          label: "是否开放柜子",
          selection: [
            {
              name: "全部",
              value: "",
            },
            {
              name: "开放",
              value: 1,
            },
            {
              name: "关闭",
              value: 0,
            },
          ],
        },
      ],
      selectValue: ["", ""],

      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1,
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
    this.oprOgrId = this.$route.params.orgId;
  },
  mounted() {
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      this.inquireHotel = this.$store.state.searchList["inquireHotel"];
      this.selectValue[0] = this.$store.state.searchList["selectValue1"];
      this.selectValue[1] = this.$store.state.searchList["selectValue2"];
    }
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.inquireHotel = "";
      this.selectValue[0] = "";
      this.selectValue[1] = "";
      this.Getdata();
    },
    //查询
    inquire() {
      this.Getdata();
      this.$store.commit("setSearchList", {
        selectValue1: this.selectValue[0],
        selectValue2: this.selectValue[1],
        inquireHotel: this.inquireHotel,
      });
    },
    addNewSetting() {
      this.$router.push({ name: "LaunchHotelAdd" });
    },
    //修改
    Cabinetglchange(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LaunchHotelChange",
        query: { modifyid: guiId },
      });
    },
    CabinetglManager(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "LaunchCabinetManagement",
        query: { modifyid: guiId },
      });
    },
    //删除
    Cabinetglcancel(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .FsHotelDelete(guiId)
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
        hotelName: this.inquireHotel,
        isShow: this.selectValue[0],
        isOpen: this.selectValue[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      let rules = {
        0: "否",
        1: "是",
      };
      this.$api
        .FsHotelSearch({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.CabinetList = response.data.data.records;
            that.CabinetList.forEach((item) => {
              item.isShow = rules[item.isShow];
              item.isOpen = rules[item.isOpen];
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

