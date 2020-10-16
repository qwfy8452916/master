<template>
  <div class="orderlist">
    <el-form :inline="true" align="left" class="searchform">
      <el-form-item label="订单状态">
        <el-select v-model="inquireStatus" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.statusVal"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="inquireOrderCode"></el-input>
      </el-form-item>
      <el-form-item label="客人姓名">
        <el-input v-model="inquireUserName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="inquireUserPhone"></el-input>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-select
          v-model="inquireHotel"
          filterable
          remote
          :remote-method="remoteHotel"
          :loading="loadingH"
          @focus="getHotelList()"
          placeholder="请选择"
          @change="selectHotel"
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
        <el-select v-model="inquireResource" placeholder="请选择" @focus="getResourceList">
          <el-option
            v-for="item in resourceDataList"
            :key="item.id"
            :label="item.resourceName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住日期">
        <el-date-picker
          v-model="inquireCheckIn"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="价格类型">
        <el-select v-model="inquireRoomPriceType">
          <el-option label="全部" value></el-option>
          <el-option label="日历房价" value="0"></el-option>
          <el-option label="单位协议价" value="1"></el-option>
          <el-option label="最优弹性价" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="后台退订状态">
        <el-select v-model="inquireAdminUnsubscribeStatus">
          <el-option label="全部" value></el-option>
          <el-option label="初始状态" value="0"></el-option>
          <el-option label="申请退订中" value="1"></el-option>
          <el-option label="退订成功" value="2"></el-option>
          <el-option label="拒绝退订" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="orderDataList" border stripe style="width:100%;">
      <el-table-column fixed prop="orderCode" label="订单号" width="180px" align="center"></el-table-column>
      <el-table-column prop="dealStatusName" label="状态" width="80px">
        <template slot-scope="scope">
          <span
            :class="scope.row.dealStatusName == '待处理' || scope.row.dealStatusName == '申请退订'?'fontcolor':''"
          >{{scope.row.dealStatusName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
      <el-table-column prop="resourceName" label="房源名称" width="150px"></el-table-column>
      <el-table-column prop="roomPrice" label="房价" width="100px" align="center"></el-table-column>
      <el-table-column prop="roomPriceType" label="价格类型" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.roomPriceType==0?"日历房价":scope.row.roomPriceType==1?"单位协议价":"最优弹性价"}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cusName" label="客人姓名"></el-table-column>
      <el-table-column prop="cusPhone" label="联系电话" width="120px" align="center"></el-table-column>
      <el-table-column prop="arrivalDate" label="入住日期" width="100px" align="center"></el-table-column>
      <el-table-column prop="leaveDate" label="离店日期" width="100px" align="center"></el-table-column>
      <el-table-column prop="roomCount" label="房间数" width="80px" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" width="100px" align="center"></el-table-column>
      <el-table-column prop="payTime" label="下单时间" width="160px" align="center"></el-table-column>
      <el-table-column prop="writeOffRemark" label="核销备注" width="160px" align="center">
        <template slot-scope="scope">
          <span
            v-if="scope.row.dealStatus==6"
          >{{scope.row.writeOffRemark==null?"":scope.row.writeOffRemark}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="adminUnsubscribeStatus" label="后台退订状态" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.adminUnsubscribeStatus==0?"初始状态":scope.row.adminUnsubscribeStatus==1?"申请退订中":scope.row.adminUnsubscribeStatus==2?"退订成功":"拒绝退订"}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="writeOffStatus" label="核销状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.writeOffStatus == 1">已核销</span>
                    <span v-else>未核销</span>
                </template>
            </el-table-column>
      <el-table-column prop="writeOffRemark" label="核销备注" align=center></el-table-column>-->
      <el-table-column fixed="right" label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzlist['F:BO_BOOK_ORDER_DETAIL']"
            type="text"
            size="small"
            @click="bookOrderDetail(scope.row.id)"
          >详情</el-button>
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
  name: "LonganBookOrder",
  components: {
    resetButton,
    LonganPagination,
  },
  data() {
    return {
      authzlist: {}, //权限数据
      hotelList: [],
      statusList: [],
      resourceDataList: [],
      inquireStatus: "",
      inquireOrderCode: "",
      inquireUserName: "",
      inquireUserPhone: "",
      inquireHotel: "",
      inquireResource: "",
      inquireCheckIn: [],
      inquireAdminUnsubscribeStatus: "",
      inquireRoomPriceType: "",
      orderDataList: [],
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
    this.getOrderStatusList();
    this.bookOrderList();
  },
  methods: {
    resetFunc() {
      this.inquireStatus = "";
      this.inquireOrderCode = "";
      this.inquireUserName = "";
      this.inquireUserPhone = "";
      this.inquireHotel = "";
      this.inquireResource = "";
      this.inquireCheckIn = [];
      this.inquireAdminUnsubscribeStatus = "";
      this.inquireRoomPriceType = "";
      this.bookOrderList();
    },
    //获取订单状态
    getOrderStatusList() {
      const params = {
        key: "ROOM_ORDER_STATUS",
        orgId: "0",
        parentKey: "",
        parentValue: "",
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          const result = response.data;
          if (result.code == 0) {
            this.statusList = result.data.map((item) => {
              return {
                id: item.dictValue,
                statusVal: item.dictName,
              };
            });
            const statusAll = {
              id: "",
              statusVal: "全部",
            };
            this.statusList.unshift(statusAll);
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
    selectHotel() {
      // this.getResourceList();
    },
    //获取房源列表
    getResourceList() {
      if (this.inquireHotel != "") {
        const params = {
          hotelId: this.inquireHotel,
        };
        this.$api
          .getBookResourceList(params)
          .then((response) => {
            // console.log(response);
            const result = response.data;
            if (result.code == "0") {
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
      } else {
        this.resourceDataList = [];
        this.$message.warning("请先选择酒店");
      }
    },
    //订单列表
    bookOrderList() {
      if (this.inquireCheckIn == null) {
        this.inquireCheckIn = [];
      }
      const params = {
        dealStatus: this.inquireStatus,
        orderCode: this.inquireOrderCode,
        cusName: this.inquireUserName,
        cusPhone: this.inquireUserPhone,
        hotelId: this.inquireHotel,
        resourceId: this.inquireResource,
        arrivalStartDate: this.inquireCheckIn[0],
        arrivalEndDate: this.inquireCheckIn[1],
        adminUnsubscribeStatus: this.inquireAdminUnsubscribeStatus,
        roomPriceType: this.inquireRoomPriceType,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      // console.log(params);
      this.$api
        .bookOrderList(params)
        .then((response) => {
          // console.log(response);
          const result = response.data;
          if (result.code == "0") {
            this.orderDataList = result.data.records;
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
      this.bookOrderList();
      this.$store.commit("setSearchList", {
        inquireStatus: this.inquireStatus,
        inquireOrderCode: this.inquireOrderCode,
        inquireUserName: this.inquireUserName,
        inquireUserPhone: this.inquireUserPhone,
        inquireHotel: this.inquireHotel,
        inquireResource: this.inquireResource,
        inquireCheckIn: this.inquireCheckIn,
        inquireAdminUnsubscribeStatus: this.inquireAdminUnsubscribeStatus,
        inquireRoomPriceType: this.inquireRoomPriceType,
      });
    },
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.bookOrderList();
    },
    //处理、查看详情
    bookOrderDetail(id) {
      this.$router.push({ name: "LonganBookOrderDetail", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.orderlist {
  .fontcolor {
    color: #d81e06;
  }
}
</style>
