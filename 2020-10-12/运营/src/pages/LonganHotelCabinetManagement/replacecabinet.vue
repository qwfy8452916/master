<template>
  <div>
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotel"
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
      <el-form-item label="房间号">
        <el-input v-model="roomCode"></el-input>
      </el-form-item>
      <el-form-item label="柜子id">
        <el-input v-model="cabinetId"></el-input>
      </el-form-item>
      <el-form-item label="柜子状态">
        <el-select v-model="defaultstatus" placeholder="请选择" @change="statusselect">
          <el-option v-for="item in statusdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>

    <el-table :data="CabinetList" border style="width:100%;">
      <el-table-column fixed prop="repairId" label="维修单id" align="center"></el-table-column>
      <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="roomFloor" label="酒店楼层" align="center"></el-table-column>
      <el-table-column prop="roomCode" label="房间号" align="center"></el-table-column>
      <el-table-column prop="cabinetId" label="柜子id" align="center"></el-table-column>
      <el-table-column prop="replaceStatus" label="柜子状态" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.replaceStatus===0 ? "待处理":(scope.row.replaceStatus===1?"待取货":(scope.row.replaceStatus===2?"待更换":"已更换")) }}</template>
      </el-table-column>
      <el-table-column prop="createdAt" label="提交时间" width="160px" align="center"></el-table-column>
      <el-table-column fixed="right" prop width="200px" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzData['F:BO_CAB_LOG_CAB'] && scope.row.replaceStatus===2"
            type="text"
            size="small"
            @click="Cabinetglchange(scope.$index, CabinetList)"
          >更换柜子</el-button>
          <el-button
            v-if="authzData['F:BO_CAB_LOG_CAB'] && scope.row.replaceStatus===0"
            type="text"
            size="small"
            @click="Cabinetglchange(scope.$index, CabinetList)"
          >待处理</el-button>
          <el-button
            v-if="authzData['F:BO_CAB_LOG_CAB'] && scope.row.replaceStatus===1"
            type="text"
            size="small"
          >待取货</el-button>
          <el-button
            v-if="authzData['F:BO_CAB_LOG_CAB'] && scope.row.replaceStatus===3"
            type="text"
            size="small"
          >已更换</el-button>
        </template>
      </el-table-column>
    </el-table>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
      <span>是否确认更换柜子？</span>
      <span slot="footer">
        <el-button @click="dialogVisibleDelete=false">取消</el-button>
        <el-button type="primary" @click="Confirmdel()">确定</el-button>
        <!-- <el-button type="primary" @click="dialogVisibleDelete=false">确定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "replacecabinet",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzData: "",
      oprOgrId: "", //标识
      cabinetId: "",
      hotelList: [], //酒店数据
      loadingH: false,
      inquireHotel: "", //酒店名称id
      roomCode: "",
      hotelName: "",
      pageId: "",
      CabinetList: [],
      modifyid: "", //柜子id
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageNum: 1,
      defaultstatus: "", //状态
      statusdata: [
        { id: "", name: "全部" },
        { id: 0, name: "待处理" },
        { id: 1, name: "待取货" },
        { id: 2, name: "待更换" },
        { id: 3, name: "已更换" },
      ],
      dialogVisibleDelete: false,
    };
  },
  created() {
    //    this.oprOgrId=localStorage.orgId
    //    this.oprOgrId = this.$route.params.orgId;
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.gethotel();
    this.Getdata();
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
  },
  methods: {
    resetFunc() {
      this.inquireHotel = "";
      this.roomCode = "";
      this.cabinetId = "";
      this.defaultstatus = "";
      this.Getdata();
    },
    hotelselect(e) {
      this.hotelid = e;
      // console.log(this.hotelid)
    },
    statusselect(e) {
      this.defaultstatus = e;
      // console.log(this.defaultstatus)
    },

    //查询
    inquire() {
      let that = this;
      this.Getdata();
      this.$store.commit("setSearchList", {
        inquireHotel: this.inquireHotel,
        roomCode: this.roomCode,
        cabinetId: this.cabinetId,
        defaultstatus: this.defaultstatus,
      });
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

    //发起更换
    Cabinetglchange(index, row) {
      this.modifyid = row[index].id;
      this.dialogVisibleDelete = true;
    },

    Confirmdel() {
      let that = this;
      let params = {
        orgAs: 2,
      };
      this.$api
        .launchreplacecabinet(that.modifyid, params)
        .then((response) => {
          if (response.data.code == 0) {
            this.$message.success("操作成功！");
            that.Getdata();
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          that.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
      this.dialogVisibleDelete = false;
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.Getdata();
    },
    //得到酒店数据
    gethotel() {
      let that = this;
      let params = {
        orgAs: 2,
      };
      this.$api
        .queryhotel(params)
        .then((response) => {
          if (response.data.code == 0) {
            that.hoteldata = response.data.data;
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          that.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //获取数据
    Getdata() {
      let that = this;
      let params = {
        // oprOrgId:that.oprOgrId,
        orgAs: 2,
        hotelId: that.inquireHotel,
        roomCode: that.roomCode,
        cabinetId: that.cabinetId,
        replaceStatus: that.defaultstatus,
        pageNo: that.pageNum,
        pageSize: that.pageSize,
      };

      this.$api
        .replacecabinetcordlist({ params })
        .then((response) => {
          if (response.data.code == 0) {
            that.pageTotal = response.data.data.total;
            that.CabinetList = response.data.data.records;
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

