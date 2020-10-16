<template>
  <div class="booktype">
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
      <el-form-item label="房型名称">
        <el-input v-model="inquireTypeName"></el-input>
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
    <el-table :data="bookTypeDataList" border style="width:100%;">
      <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称" min-width="200px"></el-table-column>
      <el-table-column prop label="图片" min-width="80px" align="center">
        <template slot-scope="scope">
          <img
            v-if="scope.row.layoutTraditionImageUrl"
            :src="scope.row.layoutTraditionImageUrl"
            alt
            style="width:45px;height:35px"
          />
          <img
            v-if="scope.row.layoutBannerImageUrl"
            :src="scope.row.layoutBannerImageUrl"
            alt
            style="width:45px;height:35px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="房型名称" min-width="120px"></el-table-column>
      <el-table-column prop="roomSize" label="面积" min-width="80px"></el-table-column>
      <el-table-column prop="bedTypeName" label="床型" min-width="80px"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="80px">
        <template slot-scope="scope">
          <span>{{scope.row.status===0?"启用":"禁用"}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="80px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzlist['F:BO_BOOK_TYPE_DETAIL']"
            type="text"
            size="small"
            @click="bookTypeDetail(scope.row.id)"
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
  name: "LonganBookTypeList",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzlist: {}, //权限数据
      hotelList: [],
      inquireHotelName: "",
      inquireTypeName: "",
      inquireState: "",
      bookTypeDataList: [],
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
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getHotelList();
    this.bookTypeList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireTypeName = "";
      this.inquireState = "";
      this.bookTypeList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.bookTypeList();
    },
    //酒店列表
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
    //房型列表
    bookTypeList() {
      const params = {
        orgAs: 2,
        hotelId: this.inquireHotelName,
        typeName: this.inquireTypeName,
        status: this.inquireState,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .bookTypeList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.bookTypeDataList = result.data.records;
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
      this.bookTypeList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireTypeName: this.inquireTypeName,
        inquireState: this.inquireState,
      });
    },
    //查看详情
    bookTypeDetail(id) {
      this.$router.push({ name: "LonganBookTypeDetail", query: { id } });
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
.booktype {
  .pagination {
    margin-top: 20px;
  }
}
</style>

