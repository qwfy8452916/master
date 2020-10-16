<template>
  <div class="resourcemanage">
    <el-form :inline="true" align="left" class="searchform">
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
    <div v-if="authzData['F:BH_BOOK_RESOURCE_ADD']">
      <el-button class="addbutton" @click="bookResourceAdd">新增房源</el-button>
    </div>
    <el-table :data="ResourceDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="sort" label="排序" min-width="80px"></el-table-column>
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
          <el-switch
            v-model="scope.row.status"
            active-color="#1ABC9C"
            inactive-color="#ccc"
            @change="changeStatus(scope.row.id,scope.row.status)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="basicPrice" label="基础价格" min-width="80px"></el-table-column> -->
      <!-- <el-table-column prop="isHourRoom" label="是否为钟点房" min-width="110px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isHourRoom == 0">否</span>
                    <span v-if="scope.row.isHourRoom == 1">是</span>
                </template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BH_BOOK_RESOURCE_EDIT']"
            type="text"
            size="small"
            @click="bookResourceModify(scope.row.id)"
          >修改</el-button>
          <el-button
            v-if="authzData['F:BH_BOOK_RESOURCE_DELETE']"
            type="text"
            size="small"
            @click="bookResourceDelete(scope.row.id)"
          >删除</el-button>
          <!-- v-if="authzData['F:BH_BOOK_RESOURCE_DETAIL']" -->
          <el-button type="text" size="small" @click="bookResourceDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认删除该房源？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="EnsureDetail">确定</el-button>
      </span>
    </el-dialog>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import HotelPagination from "@/components/HotelPagination";
import resetButton from "@/components/resetButton";
export default {
  name: "HotelBookResourceList",
  components: {
    HotelPagination,
    resetButton,
  },
  data() {
    return {
      authzData: "",
      hotelId: "",
      brId: "",
      inquireResourceName: "",
      inquireState: "",
      ResourceDataList: [],
      dialogVisibleDelete: false,
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
    this.hotelId = localStorage.getItem("hotelId");
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.bookResourceList();
  },
  methods: {
    changeStatus(id, status) {
      if (status === true) {
        status = 0;
      } else if (status === false) {
        status = 1;
      }
      const params = {};
      this.$api
        .bookResourChangeStatus(params, id, status)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            this.bookResourceList();
            this.$message.success("房源状态修改成功！");
          } else {
            this.bookResourceList();
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    resetFunc() {
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
    //房源列表
    bookResourceList() {
      const params = {
        orgAs: 3,
        hotelId: this.hotelId,
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
            this.ResourceDataList.forEach((element) => {
              if (element.status === 1) {
                element.status = false;
              } else if (element.status === 0) {
                element.status = true;
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
    //查询
    inquire() {
      this.pageNum = 1;
      this.bookResourceList();
      this.$store.commit("setSearchList", {
        inquireResourceName: this.inquireResourceName,
        inquireState: this.inquireState,
      });
    },
    //新增
    bookResourceAdd() {
      this.$router.push({ name: "HotelBookResourceAdd" });
    },
    //修改
    bookResourceModify(id) {
      this.$router.push({ name: "HotelBookResourceModify", query: { id } });
    },
    //删除
    bookResourceDelete(id) {
      this.brId = id;
      this.dialogVisibleDelete = true;
    },
    bookResourceDetail(id) {
      this.$router.push({ name: "HotelBookResourceDetail", query: { id } });
    },
    EnsureDetail() {
      const params = {};
      const id = this.brId;
      this.$api
        .bookResourceDelete(params, id)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.$message.success("删除房源成功！");
            this.dialogVisibleDelete = false;
            this.bookResourceList();
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
  },
};
</script>

<style lang="less" scoped>
.resourcemanage {
 
}
</style>
