<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称：" prop="hotelId">
        <el-select
          v-model="hotelId"
          filterable
          remote
          :loading="loadingH"
          :remote-method="remoteHotel"
          @focus="getHotelList()"
          placeholder="请选择酒店"
        >
          <el-option
            v-for="item in hotelList"
            :key="item.id"
            :label="item.hotelName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协议单位" prop="contractedEnterprisesId">
        <el-select
          v-model="contractedEnterprisesId"
          :loading="loadingH"
          @focus="getEnterprisesList()"
          placeholder="请选择协议"
        >
          <el-option
            v-for="item in EnterprisesList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源">
        <el-select
          v-model="roomResourceId"
          :loading="loadingH"
          @focus="getRoomList()"
          placeholder="请选择房源"
        >
          <el-option
            v-for="item in roomResourceList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <!-- <div>
            <el-button class="addbutton" @click="addNewSetting">添加单位房源协议价</el-button>
        </div> -->
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="contractedEnterprisesName" label="协议单位" align=center></el-table-column>
            <el-table-column label="房源" align=center>
                <template slot-scope="scope">
                    <div v-if="!scope.row.totalRoomFlag">
                        <span style="margin-left:5px" v-for="item in scope.row.roomResourceIds" :key="item.id">{{item.roomResourceName}}</span>
                    </div>
                    <div v-else>全部</div>
                </template>
            </el-table-column>
            <el-table-column label="价格类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.contractedPriceType == 1">折扣</span>
                    <span v-if="scope.row.contractedPriceType == 2">固定金额</span>
                </template>
            </el-table-column>
            <el-table-column label="折扣/金额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.contractedPrice + (scope.row.contractedPriceType == 1?'%':'元')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdName" label="创建人" align=center></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" align=center></el-table-column>
            <!-- <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="viewDetail(scope.$index, CabinetList)">详情</el-button>
                    <el-button type="text" size="small" @click="Cabinetglchange(scope.$index, CabinetList)">修改</el-button>
                    <el-button type="text" size="small" @click="Cabinetglcancel(scope.$index, CabinetList)">删除</el-button>
                </template>
      </el-table-column>-->
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganEnterprisesRoomsList",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      CabinetList: [],
      loadingH: false,

      contractedEnterprisesId: "",
      roomResourceId: "",
      dateRange: [],
      EnterprisesList: [],
      roomResourceList: [],
      hotelList: [],
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
    this.contractedEnterprisesId = this.$route.query.modifyid;
    this.Getdata();
  },
  methods: {
    resetFunc() {
      this.hotelId = "";
      this.contractedEnterprisesId = "";
      this.roomResourceId = "";
      this.dateRange = [];
      this.Getdata();
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.Getdata();
      this.$store.commit("setSearchList", {
        hotelId: this.hotelId,
        contractedEnterprisesId: this.contractedEnterprisesId,
        roomResourceId: this.roomResourceId,
        dateRange: this.dateRange,
      });
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        pageNo: 1,
        hotelName: hName,
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
    addNewSetting() {
      this.$router.push({ name: "HotelEnterprisesRoomsAdd" });
    },
    //修改
    Cabinetglchange(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelEnterprisesRoomsChange",
        query: { modifyid: guiId },
      });
    },
    //房源列表
    getRoomList() {
      this.loadingH = true;
      const params = {
        hotelId: this.hotelId,
      };
      this.$api
        .getBookResourceList(params)
        .then((response) => {
          this.loadingH = false;
          if (response.data.code == "0") {
            this.roomResourceList = response.data.data.map((item) => {
              return {
                id: item.id,
                label: item.resourceName,
              };
            });
            const hotelAll = {
              id: "",
              label: "全部",
            };
            this.roomResourceList.unshift(hotelAll);
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
    },
    getEnterprisesList() {
      let that = this;
      this.loadingH = true;
      let params = {
        hotelId: this.hotelId,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getEnterprises({ params })
        .then((response) => {
          this.loadingH = false;
          if (response.data.code == 0) {
            that.EnterprisesList = response.data.data.records.map((item) => {
              return {
                id: item.id,
                label: item.enterpiseName,
              };
            });
            const hotelAll = {
              id: "",
              label: "全部",
            };
            this.EnterprisesList.unshift(hotelAll);
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
    //查看详情
    viewDetail(index, row) {
      let guiId = row[index].id;
      this.$router.push({
        name: "HotelEnterprisesRoomsDetail",
        query: { modifyid: guiId },
      });
    },
    //删除
    Cabinetglcancel(index, row) {
      let guiId = row[index].id;
      this.$confirm("是否确认删除该活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteEnterprisesRooms(guiId)
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
        contractedEnterprisesId: this.contractedEnterprisesId,
        roomResourceId: this.roomResourceId,
        hotelId: this.hotelId,
        createdAtFrom: this.dateRange[0],
        createdAtTo: this.dateRange[1],
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getEnterprisesRooms({ params })
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