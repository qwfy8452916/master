<template>
  <div class="cabinfom">
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
      <el-form-item label="房间号">
        <el-input v-model="inquireRoomNum"></el-input>
      </el-form-item>
      <el-form-item label="柜子状态">
        <el-select v-model="inquireCabStatus" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="异常" value="1"></el-option>
          <el-option label="正常" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
      <br />
      <el-form-item label="是否刷新">
        <el-radio-group v-model="isRefresh" @change="refreshFun">
          <el-radio label="0">不刷新</el-radio>
          <el-radio label="1">刷新</el-radio>
        </el-radio-group>
        <el-select v-model="refreshTime" placeholder="请选择" class="refresht" @change="selTimeFun">
          <el-option label="5秒" value="5000"></el-option>
          <el-option label="10秒" value="10000"></el-option>
          <el-option label="15秒" value="15000"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="statusdesc">
      <div class="desc1">
        <span class="descbg bg1"></span>
        <label>正常</label>
      </div>
      <div class="desc1">
        <span class="descbg bg2"></span>
        <label>疑似故障</label>
      </div>
      <div class="desc1">
        <span class="descbg bg3"></span>
        <label>故障</label>
      </div>
    </div>
    <div class="cabstyle">
      <div class="cabfor" v-for="item in cabInfoDataList" :key="item.id">
        <!-- <div class="row">
                    <div class="col-md-4" v-if="(index+1)%4 == 0"></div>
        </div>-->
        <div v-if="item.isFault == 0" class="cabstatus bg1">
          <label>{{item.hotelName}}</label>
          <label>{{item.roomFloor}}-{{item.roomCode}}</label>
          <label></label>
        </div>
        <div v-if="item.isFault == 1 && item.faultLevel == 'WARNING'" class="cabstatus bg2">
          <label>{{item.hotelName}}</label>
          <label>{{item.roomFloor}}-{{item.roomCode}}</label>
          <label>{{item.faultMsg}}</label>
        </div>
        <div v-if="item.isFault == 1 && item.faultLevel == 'ERROR'" class="cabstatus bg3">
          <label>{{item.hotelName}}</label>
          <label>{{item.roomFloor}}-{{item.roomCode}}</label>
          <label>{{item.faultMsg}}</label>
        </div>
      </div>
    </div>
    <LonganPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import LonganPagination from "@/components/LonganPagination";
export default {
  name: "LonganMalfunctionManage",
  components: {
    LonganPagination,
    resetButton,
  },
  data() {
    return {
      authzlist: {}, //权限数据
      hotelList: [],
      inquireHotelName: "",
      loadingH: false,
      inquireRoomNum: "",
      inquireCabStatus: "1",
      isRefresh: "",
      refreshTime: "5000",
      cabTimer: "",
      cabInfoDataList: [],
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
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
    // this.cabInfoList();
  },
  methods: {
    resetFunc() {
      this.inquireHotelName = "";
      this.inquireRoomNum = "";
      this.inquireCabStatus = "";
      this.cabInfoList();
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.cabInfoList();
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
    //柜子信息
    cabInfoList() {
      const params = {
        hotelId: this.inquireHotelName,
        roomCode: this.inquireRoomNum,
        isFault: this.inquireCabStatus,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .cabInfoList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.cabInfoDataList = result.data.records;
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
    //是否-实时刷新
    refreshFun() {
      const that = this;
      if (this.isRefresh == 1) {
        this.cabTimer = setInterval(function () {
          that.cabInfoList();
        }, this.refreshTime);
      } else {
        clearInterval(this.cabTimer);
      }
    },
    //切换时间
    selTimeFun() {
      const that = this;
      if (this.isRefresh == 1) {
        clearInterval(this.cabTimer);
        this.cabTimer = setInterval(function () {
          that.cabInfoList();
        }, this.refreshTime);
      }
    },
    //查询
    inquire() {
      this.pageNum = 1;
      this.cabInfoList();
      this.$store.commit("setSearchList", {
        inquireHotelName: this.inquireHotelName,
        inquireRoomNum: this.inquireRoomNum,
        inquireCabStatus: this.inquireCabStatus,
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.cabTimer);
  },
};
</script>

<style lang="less" scoped>
.cabinfom {
  .refresht {
    width: 24%;
  }
  .statusdesc {
    font-size: 14px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    .desc1 {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      .descbg {
        width: 24px;
        height: 14px;
        display: inline-block;
      }
      label {
        margin: 0px 20px 0px 5px;
      }
    }
  }
  .cabstyle {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    .cabfor {
      display: flex;
      display: -webkit-flex;
      .cabstatus {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: center;
        width: 190px;
        padding: 8px 10px;
        font-size: 14px;
        color: #fff;
        border: 1px solid #fff;
        label {
          line-height: 20px;
        }
      }
    }
  }
  .bg1 {
    background: #73ba5e;
  }
  .bg2 {
    background: #fe9844;
  }
  .bg3 {
    background: #fc4444;
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>

