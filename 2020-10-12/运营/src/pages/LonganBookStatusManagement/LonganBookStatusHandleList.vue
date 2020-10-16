<template>
  <div class="LonganBookStatusHandleList">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotelName"
          filterable
          style="width:150px;"
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          @change="changeHotel()"
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
      <el-form-item label="房源名称">
        <el-select
          v-model="inquireResourceName"
          filterable
          style="width:150px;"
          remote
          :remote-method="remoteResource"
          :loading="loadingR"
          @focus="getResourceList()"
          placeholder="请选择"
        >
          <el-option
            v-for="item in resourceDataList"
            :key="item.id"
            :label="item.resourceName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
          v-model="inquireCheckIn"
          style="width:240px;"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="操作人">
        <el-select
          v-model="inquireSubmitter "
          style="width:150px;"
          @focus="getInquireConfirmorList()"
        >
          <el-option
            v-for="item in inquireConfirmorOptions"
            :key="item.id"
            :label="item.empName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      <resetButton
        style="width:77px;display:inline-block;margin-left:10px;"
        @resetFunc="resetFunc"
      />
    </el-form>
    <el-table :data="statusHandleDataList" border stripe style="width:100%;">
      <el-table-column prop="hotelName" label="酒店名称" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="roomResourceName" label="房源名称" min-width="120px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.roomResourceName!=null">
            <p v-for="i in scope.row.roomResourceName" :key="i.id">{{i}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
              >{{scope.row.roomResourceName.length==1?scope.row.roomResourceName[0]:scope.row.roomResourceName.length>1?scope.row.roomResourceName[0]+",...":""}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop label="房态日期" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.changeStartDate}}&nbsp;至&nbsp;{{scope.row.changeEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="changeContent" label="操作内容" min-width="120px"></el-table-column>
      <el-table-column prop="createdAt" label="操作日期" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="submitterName" label="操作人" min-width="80px"></el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import LonganPagination from "@/components/LonganPagination";
import resetButton from "@/components/resetButton";
export default {
  name: "LonganBookStatusHandleList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      inquireResourceName: "",
      inquireHotelName: "",
      inquireSubmitter: "",
      statusHandleDataList: [],
      inquireCheckIn: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingH: false,
      loadingR: false,
      resourceDataList: [],
      hotelList: [],
      orgId: "",
      inquireConfirmorOptions: [],
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
    this.getHotelList();
    this.bookStatusHandleList();
  },
  methods: {
    changeHotel() {
      // this.getResourceList();
      // this.getInquireConfirmorList();
    },
    remoteHotel(val) {
      this.getHotelList(val);
    },
    remoteResource(val) {
      this.getResourceList(val);
    },
    resetFunc() {
      this.inquireResourceName = "";
      this.inquireHotelName = "";
      this.inquireCheckIn = [];
      this.inquireSubmitter = "";
      this.bookStatusHandleList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.bookStatusHandleList();
    },
    //房态操作列表
    bookStatusHandleList() {
      const params = {
        orgAs: 2,
        roomResourceId: this.inquireResourceName || "",
        hotelId: this.inquireHotelName || "",
        submitStartDate: this.inquireCheckIn[0] || "",
        submitEndDate: this.inquireCheckIn[1] || "",
        submitter: this.inquireSubmitter,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .bookStatusHandleList(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.statusHandleDataList = result.data.records;
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
    //房源列表
    getResourceList(RName) {
      if (this.inquireHotelName == "") {
        this.$message.warning("请先选择酒店");
        this.resourceDataList = [];
      } else {
        this.loadingR = true;
        const params = {
          orgAs: 2,
          hotelId: this.inquireHotelName,
          resourceName: RName || "",
          pageNo: 1,
          pageSize: 50,
        };
        this.$api
          .getBookResourceList(params)
          .then((response) => {
            this.loadingR = false;
            const result = response.data;
            if (result.code == 0) {
              this.resourceDataList = result.data.map((item) => {
                return {
                  id: item.id,
                  resourceName: item.resourceName,
                };
              });
              const resourceAll = {
                id: "",
                resourceName: "全部",
              };
              this.resourceDataList.unshift(resourceAll);
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      }
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName || "",
        pageNo: 1,
        pageSize: 5000,
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
                orgId: item.orgId,
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
    //操作人列表
    getInquireConfirmorList() {
      if (this.inquireHotelName != "") {
        this.inquireConfirmorOptions = [];
        this.hotelList.forEach((element) => {
          if (this.inquireHotelName == element.id) {
            this.orgId = element.orgId;
          }
        });
        const params = {
          orgId: this.orgId,
        };
        this.$api
          .empRelationList({ params })
          .then((response) => {
            const result = response.data;
            if (result.code == "0") {
              this.inquireConfirmorOptions = result.data.map((item) => {
                return {
                  id: item.id,
                  empName: item.empName,
                };
              });
              const empNameAll = {
                id: "",
                empName: "全部",
              };
              this.inquireConfirmorOptions.unshift(empNameAll);
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch((error) => {
            this.$alert(error, "警告", {
              confirmButtonText: "确定",
            });
          });
      } else {
        this.$message.warning("请先选择酒店");
        this.inquireConfirmorOptions = [];
      }
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.bookStatusHandleList();
      this.$store.commit("setSearchList", {
        inquireResourceName: this.inquireResourceName,
        inquireHotelName: this.inquireHotelName,
        inquireCheckIn: this.inquireCheckIn,
        inquireSubmitter: this.inquireSubmitter,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.LonganBookStatusHandleList {
  .pagination {
    margin-top: 20px;
  }
}
</style>
