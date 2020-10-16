<template>
  <div class="WaiteEntryRecord">
    <el-form :model="formdata" ref="formdata" :inline="true" align="left" class="searchform">
      <el-form-item label="分成身份身份" prop="revenueAs">
        <el-select v-model="formdata.revenueAs">
          <el-option label="全部" value></el-option>
          <el-option label="酒店" value="3"></el-option>
          <el-option label="供应商" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类型">
        <el-select v-model="formdata.funId" filterable remote>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in orderTypeData"
            :key="item.index"
            :label="item.funcCnName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单">
        <el-input v-model="formdata.orderCode"></el-input>
      </el-form-item>
      <el-form-item label="楼层房间号">
        <el-input v-model="formdata.roomFloorAndCode"></el-input>
      </el-form-item>
      <el-form-item label="下单时间" prop="inquireTime">
        <el-date-picker
          v-model="formdata.inquireTime"
          type="daterange"
          range-separator="至"
          start-placeholder="请选择日期"
          end-placeholder="请选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
        <!-- <el-button type="primary" @click="reset('formdata')">重&nbsp;&nbsp;置</el-button> -->
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <el-table :data="WaiteEntryRecordDataList" border stripe style="width:100%;">
      <el-table-column prop="revenueAs" label="分成身份" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.revenueAs=='3'">酒店</span>
          <span v-if="scope.row.revenueAs=='4'">供应商</span>
        </template>
      </el-table-column>
      <el-table-column prop="funcName" label="订单类型" align="center"></el-table-column>
      <el-table-column prop="orderCode" label="订单号" align="center"></el-table-column>
      <el-table-column prop="delivCode" label="配送单号" align="center"></el-table-column>
      <el-table-column prop="roomFloor" label="楼层房间号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.roomFloor}}-{{scope.row.roomCode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prodName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="prodShowName" label="商品显示名称"></el-table-column>
      <el-table-column prop="prodAmount" label="商品金额" align="center"></el-table-column>
      <el-table-column prop="actualPay" label="实付金额" align="center"></el-table-column>
      <el-table-column prop="revenueAmount" label="待入账金额" align="center"></el-table-column>
      <el-table-column prop="payCompleteTime" label="下单时间" align="center"></el-table-column>
      <el-table-column prop label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="authzlist['F:BH_FIN_WAITINCOME_DETAIL']"
            type="text"
            @click="lookdetail(scope.row.id)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelPagination from "@/components/HotelPagination";
export default {
  name: "HotelWaiteEntryRecord",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzlist: {}, //权限数据
      orderTypeData: [],
      orgId: "",
      formdata: {
        revenueAs: "",
        funId: "",
        orderCode: "",
        roomFloorAndCode: "",
        inquireTime: [],
      },
      WaiteEntryRecordDataList: [],

      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      hotelId: "",
      token: "",
    };
  },
  created() {},

  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.datalist = err;
      }); //获取权限数据
    this.token = localStorage.getItem("Authorization");
    this.hotelId = localStorage.hotelId;
    this.orgId = localStorage.orgId;

    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this.formdata[item] = this.$store.state.searchList[item];
      }
    }

    this.HotelFuncList();
    this.WaiteEntryRecord();
  },
  methods: {
    resetFunc() {
      this.formdata.revenueAs = "";
      this.formdata.funId = "";
      this.formdata.orderCode = "";
      this.formdata.roomFloorAndCode = "";
      this.formdata.inquireTime = [];
      this.WaiteEntryRecord();
    },
    //查看详情
    lookdetail(id) {
      this.$router.push({ name: "HotelWaiteEntryRecordDetail", query: { id } });
    },

    WaiteEntryRecord() {
      if (this.formdata.inquireTime == null) {
        this.formdata.inquireTime = [];
      }
      const params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        orgId: this.orgId,
        revenueAs: this.formdata.revenueAs,
        funId: this.formdata.funId,
        orderCode: this.formdata.orderCode,
        roomFloorAndCode: this.formdata.roomFloorAndCode,
        startTime: this.formdata.inquireTime[0],
        endTime: this.formdata.inquireTime[1],
        pendingStatus: 0,
      };
      this.$api
        .getWaitDivide({ params })
        .then((response) => {
          if (response.data.code == 0) {
            this.WaiteEntryRecordDataList = response.data.data.records;
            this.pageTotal = response.data.data.total;
          } else {
            this.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //获取订单类型
    HotelFuncList() {
      let that = this;
      let params = {
        isNeedBookRoom: 1,
        isNotNeedDef: 1,
        hotelId: that.hotelId,
      };
      this.$api
        .hotelFunctionList(params)
        .then((response) => {
          let result = response.data;
          if (result.code == 0) {
            that.orderTypeData = result.data.records;
          } else {
            that.$message.error(result.msg);
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },

    //查询
    inquire() {
      this.pageNum = 1;
      this.WaiteEntryRecord();
      this.$store.commit("setSearchList", {
        revenueAs: this.formdata.revenueAs,
        funId: this.formdata.funId,
        orderCode: this.formdata.orderCode,
        roomFloorAndCode: this.formdata.roomFloorAndCode,
        inquireTime: this.formdata.inquireTime,
      });
    },

    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.WaiteEntryRecord();
    },
  },
};
</script>

<style lang="less" scoped>
.Revenue-font {
  text-align: left;
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
.cell a {
  display: block;
  margin-bottom: 10px;
}
.export {
  float: left;
  margin-bottom: 10px;
}
</style>

