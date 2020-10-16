<template>
  <div class="resourcemanage">
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
      <el-form-item label="房源名称">
        <el-input v-model="inquireResourceName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="inquireState">
          <el-option value label="全部"></el-option>
          <el-option value="1" label="禁用"></el-option>
          <el-option value="0" label="启用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="ResourceDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
      <el-table-column prop="roomTypeName" label="房型名称" min-width="120px"></el-table-column>
      <el-table-column prop="resourceName" label="房源名称" min-width="120px"></el-table-column>
      <el-table-column prop="breakfastFlag" label="是否含早" min-width="80px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.breakfastFlag == 0">无早</span>
          <span v-if="scope.row.breakfastFlag == 1">单早</span>
          <span v-if="scope.row.breakfastFlag == 2">双早</span>
        </template>
      </el-table-column>
      <el-table-column prop="windowFlag" label="窗户" min-width="80px">
        <template slot-scope="scope">
          <span v-if="scope.row.windowFlag == 0">无窗</span>
          <span v-if="scope.row.windowFlag == 1">有窗</span>
          <span v-if="scope.row.windowFlag == 2">飘窗</span>
          <span v-if="scope.row.windowFlag == 3">落地窗</span>
        </template>
      </el-table-column>
      <el-table-column prop="livePeople" label="可住人数" min-width="80px" align="center"></el-table-column>
      <el-table-column prop="isCancellable" label="是否可取消" min-width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.isCancellable == 0">不可取消</span>
          <span
            v-if="scope.row.isCancellable == 1"
          >{{scope.row.cancelDeadline}}{{scope.row.cancelDeadline == null?'':'前'}}可取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="roomCount" label="房量" min-width="80px"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="80px">
        <template slot-scope="scope">
          <span>{{scope.row.status===0?"启用":"禁用"}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="80px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_BOOK_RESOURCE_DETAIL']"
            type="text"
            size="small"
            @click="bookResourceDetail(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import LonganPagination from "@/components/LonganPagination";
import resetButton from "@/components/resetButton";
export default {
  name: "LonganBookResourceList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      hotelList: [],
      inquireHotelName: "",
      inquireResourceName: "",
      inquireState: "",
      ResourceDataList: [],
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
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.bookResourceList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireResourceName = "";
      this.inquireState = "";
      this.bookResourceList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.bookResourceList();
    },
    //酒店列表
    getHotelList(hName) {
      this.loadingH = true;
      const params = {
        orgAs: 2,
        hotelName: hName,
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
    //房源列表
    bookResourceList() {
      const params = {
        orgAs: 2,
        hotelId: this.inquireHotelName,
        resourceName: this.inquireResourceName,
        status: this.inquireState,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .bookResourceList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.ResourceDataList = result.data.records;
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
    //查看详情
    bookResourceDetail(id) {
      this.$router.push({ name: "LonganBookResourceDetail", query: { id } });
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.bookResourceList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireResourceName: this.inquireResourceName,
        inquireState: this.inquireState,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.resourcemanage {
  .pagination {
    margin-top: 20px;
  }
}
</style>
