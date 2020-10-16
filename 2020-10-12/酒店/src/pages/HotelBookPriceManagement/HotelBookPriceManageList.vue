<template>
  <div class="HotelBookPriceManageList">
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
      <el-form-item label="变价单状态">
        <el-select v-model="inquireState" style="width:140px;">
          <el-option value label="全部"></el-option>
          <el-option value="2" label="审核中"></el-option>
          <el-option value="1" label="通过"></el-option>
          <el-option value="0" label="拒绝"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      <resetButton
        @resetFunc="resetFunc"
        style="width:77px;margin-left:10px;display:inline-block;"
      />
    </el-form>
    <el-table :data="bookPriceChangeDataList" border stripe style="width:100%;">
      <el-table-column prop="changeCode" label="变价单单号" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="roomResourceName" label="变价房源" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="changeName" label="变价主题" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="changeStartDate" label="起始日期" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="changeEndDate" label="截止日期" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="weekSuitList" label="适用星期" min-width="80px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="scope.row.weekSuitList!=null">
            <p v-for="i in scope.row.weekSuitList" :key="i.id">{{i}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
              >{{ scope.row.weekSuitList.length==1?scope.row.weekSuitList[0]:scope.row.weekSuitList.length>1?scope.row.weekSuitList[0]+",...":""}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="afterChangePrice" label="房价" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="submitterName" label="操作人" min-width="80px"></el-table-column>
      <el-table-column prop="createdAt" label="操作时间" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="reviewResult" label="状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.reviewResult==0?"驳回":scope.row.reviewResult==1?"通过":"审核中"}}</span>
        </template>
      </el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import HotelPagination from "@/components/HotelPagination";
import resetButton from "@/components/resetButton";
export default {
  name: "HotelBookPriceManageList",
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
      inquireState: "",
      bookPriceChangeDataList: [],
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
    this.inquireResourceName = "";
    this.getResourceList();
    this.getInquireConfirmorList();
    this.getBookPriceChange();
  },
  methods: {
    remoteResource(val) {
      this.getResourceList(val);
    },
    resetFunc() {
      this.inquireResourceName = "";
      this.inquireCheckIn = [];
      this.inquireSubmitter = "";
      this.inquireState = "";
      this.getBookPriceChange();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.getBookPriceChange();
    },
    //房态操作列表
    getBookPriceChange() {
      const params = {
        orgAs: 3,
        hotelId: this.hotelId,
        roomResourceId: this.inquireResourceName || "",
        submitStartDate: this.inquireCheckIn[0] || "",
        submitEndDate: this.inquireCheckIn[1] || "",
        submitter: this.inquireSubmitter,
        reviewResult: this.inquireState,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api
        .getBookPriceChange(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.bookPriceChangeDataList = result.data.records;
            this.bookPriceChangeDataList.forEach((i) => {
              if (i.weekSuitList != null && i.weekSuitList.length > 0) {
                i.weekSuitList.forEach((element, index) => {
                  if (element == 2) {
                    i.weekSuitList[index] = "星期一";
                  }
                  if (element == 3) {
                    i.weekSuitList[index] = "星期二";
                  }
                  if (element == 4) {
                    i.weekSuitList[index] = "星期三";
                  }
                  if (element == 5) {
                    i.weekSuitList[index] = "星期四";
                  }
                  if (element == 6) {
                    i.weekSuitList[index] = "星期五";
                  }
                  if (element == 7) {
                    i.weekSuitList[index] = "星期六";
                  }
                  if (element == 1) {
                    i.weekSuitList[index] = "星期日";
                  }
                });
              }
            });
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
      this.getBookPriceChange();
      this.$store.commit("setSearchList", {
        inquireResourceName: this.inquireResourceName,
        inquireCheckIn: this.inquireCheckIn,
        inquireSubmitter: this.inquireSubmitter,
        inquireState: this.inquireState,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.HotelBookPriceManageList {
}
</style>
