<template>
  <div class="HotelBookStatusHandleList">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="房源名称">
        <el-select
          v-model="inquireResourceName"
          style="width:200px;"
          filterable
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
      <el-form-item label="操作人">
        <el-select v-model="inquireSubmitter " style="width:200px;">
          <el-option
            v-for="item in inquireConfirmorOptions"
            :key="item.id"
            :label="item.empName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间">
        <el-date-picker
          style="width:260px;"
          v-model="inquireCheckIn"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
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
    <el-table :data="StatusHandleDataList" border stripe style="width:100%;">
      <el-table-column prop="roomResourceName" label="房源名称" min-width="120px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.roomResourceName!=null">
            <p v-for="i in scope.row.roomResourceName" :key="i.id">{{i}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
              >{{ scope.row.roomResourceName.length==1?scope.row.roomResourceName[0]:scope.row.roomResourceName.length>1?scope.row.roomResourceName[0]+",...":""}}</el-tag>
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
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import HotelPagination from "@/components/HotelPagination";
import resetButton from "@/components/resetButton";
export default {
  name: "HotelBookStatusHandleList",
  components: {
    HotelPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      orgId: "",
      inquireResourceName: "",
      inquireSubmitter: "",
      StatusHandleDataList: [],
      inquireCheckIn: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      loadingR: false,
      resourceDataList: [],
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
    this.hotelId = localStorage.getItem("hotelId");
    this.orgId = localStorage.getItem("orgId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getResourceList();
    this.getInquireConfirmorList();
    this.bookStatusHandleList();
  },
  methods: {
    remoteResource(val) {
      this.getResourceList(val);
    },
    resetFunc() {
      this.inquireResourceName = "";
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
        orgAs: 3,
        hotelId: this.hotelId,
        roomResourceId: this.inquireResourceName || "",
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
            this.StatusHandleDataList = result.data.records;
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
      this.loadingR = true;
      const params = {
        orgAs: 3,
        hotelId: this.hotelId,
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
    },
    //操作人列表
    getInquireConfirmorList() {
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
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.bookStatusHandleList();
      this.$store.commit("setSearchList", {
        inquireResourceName: this.inquireResourceName,
        inquireCheckIn: this.inquireCheckIn,
        inquireSubmitter: this.inquireSubmitter,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.HotelBookStatusHandleList {
  
}
</style>
