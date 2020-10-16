<template>
  <div class="HotelMarketingSMS">
    <el-form align="left" :inline="true">
      <el-form-item label="消息内容模板">
        <el-select v-model="messageTypeval">
          <el-option
            v-for="item in messageTypeData"
            :key="item.ctpCode"
            :label="item.ctpTitle"
            :value="item.ctpCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息状态">
        <el-select v-model="messageStatus">
          <el-option
            v-for="item in messageStatusData"
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算状态">
        <el-select v-model="settleStatus">
          <el-option
            v-for="item in settleStatusData"
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发送时间">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <resetButton @resetFunc="resetFunc" />
      </el-form-item>
    </el-form>
    <div>
      <el-button v-if="authzlist['F:BH_MSG_MSGTEXTING']" class="addbutton" @click="textingfun">发短信</el-button>
    </div>
    <el-table :data="listdata" stripe style="width:100%">
      <el-table-column fixed prop="orgName" label="组织" align="center"></el-table-column>
      <el-table-column prop="ctpCode" label="消息模板code" align="center"></el-table-column>
      <el-table-column prop="ctpName" label="消息内容模板" align="center"></el-table-column>
      <el-table-column prop="userSourceText" label="用户来源" align="center"></el-table-column>
      <el-table-column prop="statusText" label="消息状态" align="center"></el-table-column>
      <el-table-column prop="totalCount" label="用户总数量" align="center"></el-table-column>
      <el-table-column prop="successCount" label="发送成功数量" align="center"></el-table-column>
      <el-table-column prop="failedCount" label="发送失败数量" align="center"></el-table-column>
      <el-table-column prop="settleStatusText" label="结算状态" align="center"></el-table-column>
      <el-table-column prop="totalFee" label="结算费用/元" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="发送时间" align="center"></el-table-column>
      <el-table-column prop="id" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="detailfun(scope.row.id)" type="text" size="small">详情</el-button>
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
  name: "HotelMarketingSMS",
  components: {
    resetButton,
    HotelPagination,
  },
  data() {
    return {
      authzlist: "",
      organNameList: [], //组织数组
      loadingO: false,
      messageTypeval: "", //消息内容模板
      messageTypeData: [], //消息内容模板数组
      messageStatus: "", //消息状态
      messageStatusData: [], //消息状态数组
      settleStatus: "", //结算状态
      settleStatusData: [], //结算状态数组
      dateRange: [], //发送时间
      listdata: [],
      pageSize: 10, //每页显示条数
      pageTotal: 0, //默认总条数
      pageSize: 10,
      pageNum: 1, //实际当前页码
    };
  },
  mounted() {
    this.$control
      .jurisdiction(this, 3)
      .then((response) => {
        this.authzlist = response;
      })
      .catch((err) => {
        this.authzlist = err;
      }); //获取权限数据
    if (JSON.stringify(this.$store.state.searchList) != "{}") {
      for (var item in this.$store.state.searchList) {
        this[item] = this.$store.state.searchList[item];
      }
    }
    this.getOrgan();
    this.messageType();
    this.getType();
    this.getsettleStatus();
    this.search();
  },
  methods: {
    resetFunc() {
      this.inquireOrganization = "";
      this.messageTypeval = "";
      this.messageStatus = "";
      (this.settleStatus = ""), (this.dateRange = []);
      this.search();
    },
    //组织列表
    getOrgan(oName) {
      let that = this;
      this.loadingO = true;
      let params = {
        orgName: oName,
        pageNo: 1,
        pageSize: 50,
      };
      this.$api
        .getOrganization({ params })
        .then((response) => {
          this.loadingO = false;
          const result = response.data;
          if (result.code == 0) {
            that.organNameList = result.data.records;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((err) => {
          this.$alert(err, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    remoteOrgan(val) {
      this.getOrgan(val);
    },
    //获取消息类型
    messageType() {
      const that = this;
      const params = {
        isPage: false,
        ctpTitle: "",
        ctpType: "3",
      };
      this.$api
        .messageTempData({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.messageTypeData = result.data;
            const allType = {
              ctpTitle: "全部",
              ctpCode: "",
            };
            that.messageTypeData.unshift(allType);
          } else {
            that.$message.error("订阅消息模板列表获取失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //消息状态
    getType() {
      let that = this;
      let params = {
        key: "MSG_SMS_STATUS",
        orgId: 0,
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          if (response.data.code == "0") {
            that.messageStatusData = response.data.data;
            const allType = {
              dictName: "全部",
              dictValue: "",
            };
            that.messageStatusData.unshift(allType);
          } else {
            that.$alert(response.data.msg, "警告", {
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
    //结算状态
    getsettleStatus() {
      let that = this;
      let params = {
        key: "MSG_SMS_SETTLE_STATUS",
        orgId: 0,
      };
      this.$api
        .basicDataItems(params)
        .then((response) => {
          if (response.data.code == "0") {
            that.settleStatusData = response.data.data;
            const allType = {
              dictName: "全部",
              dictValue: "",
            };
            that.settleStatusData.unshift(allType);
          } else {
            that.$alert(response.data.msg, "警告", {
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
    search() {
      let that = this;
      let params = {
        orgId: that.inquireOrganization,
        ctpCode: that.messageTypeval,
        status: that.messageStatus,
        settleStatus: that.settleStatus,
        sendTimeStart: that.dateRange[0],
        sendTimeEnd: that.dateRange[1],
        pageNo: that.pageNum,
        pageSize: that.pageSize,
      };
      this.$api
        .smsrecord({ params })
        .then((response) => {
          if (response.data.code == "0") {
            that.listdata = response.data.data.records;
            that.pageTotal = response.data.data.total;
          } else {
            that.$alert(response.data.msg, "警告", {
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
    //分页
    pageFunc(data) {
      this.pageSize = data.pageSize;
      this.pageNum = data.pageNum;
      this.search();
    },
    //查看消息模板
    detailfun(id) {
      this.$router.push({ name: "HotelMarketingDetail", query: { id } });
    },
    textingfun() {
      this.$router.push({ name: "HotelMarketingTexting" });
    },
  },
};
</script>
<style lang="less" scoped >
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
