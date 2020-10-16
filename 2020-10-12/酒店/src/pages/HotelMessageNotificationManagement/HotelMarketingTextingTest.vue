<template>
  <div class="marketingDetail">
    <div class="title">发短信</div>
    <el-form :model="tempData" ref="tempData" align="left">
      <el-form-item label="消息模板" label-width="80px" prop="messageType">
        <el-select
          :disabled="false"
          v-model="tempData.messageTypeval"
          filterable
          placeholder="请选择"
          @change="getseleval"
        >
          <el-option
            v-for="item in messageTypeData"
            :key="item.ctpCode"
            :label="item.ctpTitle"
            :value="item.ctpCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" label-width="80px">
        <el-input :disabled="true" v-model="tempData.textval" :rows="3" type="textarea"></el-input>
      </el-form-item>
      <div v-if="parameter.length > 0" class="parameterbox">
        <el-form-item label="短信内容" label-width="80px">
          <div v-for="item in parameter" :key="item.seq">
            <el-form-item v-if="item.key != 'link'" :label="item.title" label-width="80px">
              <el-input
                maxlength="20"
                v-model="item.val"
                :placeholder="item.desc"
                @input="get_fee(userlistlength)"
              ></el-input>
            </el-form-item>
            <el-form-item v-else :label="item.title" label-width="80px">
              <el-select
                :disabled="false"
                v-model="item.val"
                filterable
                placeholder="请选择"
                @change="get_fee(userlistlength)"
              >
                <el-option
                  v-for="itemsele in linklistdata"
                  :key="itemsele.id"
                  :label="itemsele.adName"
                  :value="itemsele.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
      </div>
      <el-form-item label="用户来源" label-width="80px">
        <el-radio-group @change="changeuserSource" v-model="tempData.userSource">
          <el-radio label="1">系统</el-radio>
          <el-radio label="2">外部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户" label-width="80px">
        <div class="alignleft mgB" v-if="tempData.userSource == 1">
          <el-button v-if="tempData.userlistdata == ''" type="primary" @click="seleuserfun">选择用户</el-button>
          <el-button v-else type="primary" @click="emptyfun">清空</el-button>
        </div>
        <el-input
          :disabled="tempData.texttype"
          v-model="tempData.userlistdata"
          :rows="3"
          type="textarea"
          @input="getlength"
        ></el-input>
      </el-form-item>
      <div
        v-if="tempData.userlistdata != ''"
        class="mgL fonttext"
      >用户总数量 {{userlistlength}}，预算费用{{totalFeemin}}-{{totalFeemax}}元</div>
    </el-form>

    <div class="alignleft mgT">
      <el-button @click="cancelBtn">返 回</el-button>
      <el-button type="primary" @click="textingfun('tempData')">发 送</el-button>
    </div>

    <el-dialog title="选择用户" :visible.sync="dialogTableVisible">
      <el-form align="left" :inline="true">
        <el-form-item label="用户ID">
          <el-input v-model="commonId"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="mobile"></el-input>
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
          <el-button @click="get_userlist" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <resetButton @resetFunc="resetFunc" />
        </el-form-item>
      </el-form>
      <HotelChooseTableTemplate
        ref="HotelChooseTable"
        :tableProps="tableProps"
        @on_changeTable="on_changeTable"
      ></HotelChooseTableTemplate>
      <div class="alignleft">
        <el-button @click="seleuserfun">取消</el-button>
        <el-button type="primary" @click="get_userlistAll">选择全部用户({{tableProps.pageTotal}})</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import resetButton from "@/components/resetButton";
import HotelChooseTableTemplate from "@/components/HotelChooseTableTemplate";
export default {
  name: "HotelMarketingDetail",
  components: {
    resetButton,
    HotelChooseTableTemplate,
  },
  data() {
    return {
      authzData: "",
      tempData: {
        messageTypeval: "",
        textval: "",
        userSource: "1",
        texttype: true,
        userlistdata: "",
      },
      messageTypeData: [],
      hotelId: "",
      userlistlength: 0,
      totalFeemin: 0.0,
      totalFeemax: 0.0,
      parameter: [],
      linklistdata: [],
      dialogTableVisible: false,
      dateRange: [],
      commonId: "",
      mobile: "",
      tableProps: {
        paramsObj: {},
        url: "/longan/api/user/cus/hotel",
        tableData: [],
        tableFiled: [
          {
            label: "用户ID",
            filed: "commonId",
            align: "center",
          },
          {
            label: "用户昵称",
            filed: "nickName",
            align: "center",
          },
          {
            label: "手机号",
            filed: "mobile",
            align: "center",
          },
          {
            label: "首次访问时间",
            filed: "firstVisitTimeStr",
            align: "center",
          },
          {
            label: "最后访问时间",
            filed: "lastVisitTimeStr",
            align: "center",
          },
        ],
        pageSize: 4, //每页显示条数
        pageTotal: 1, //默认总条数
        pageNum: 1, //实际当前页码
        layout: "total,prev, pager, next, jumper, ->, slot",
      }, //table参数
      multipleSelection: [], //已选中的数据
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
    this.hotelId = localStorage.hotelId;
    this.detailid = this.$route.query.id;
    this.messageType();
    // this.get_userlist();
    this.get_linklist();
  },
  methods: {
    resetFunc() {
      this.commonId = "";
      this.mobile = "";
      this.dateRange = [];
      this.get_userlist();
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
    getseleval() {
      const that = this;
      if (that.tempData.userlistdata != "") {
        let strs = that.tempData.userlistdata.split(",");
        that.get_fee(strs.length);
      }
      const params = "";
      that.$api
        .contentTempDetail(params, that.tempData.messageTypeval)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.tempData.textval = result.data.platformTemplateContent;
            let parameterlist = JSON.parse(result.data.platformParamsTransRule);
            parameterlist.map((item) => {
              item.val = "";
            });
            that.parameter = parameterlist;
          } else {
            that.$message.error("消息内容模板详情获取失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //所有广告页
    get_linklist() {
      const that = this;
      const params = {
        hotelId: that.hotelId,
      };
      that.$api
        .selAllAdPages(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.linklistdata = result.data;
          } else {
            that.$message.error("所有广告页获取失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //查询已认证手机号的酒店顾客
    get_userlist() {
      let that = this;
      this.tableProps.paramsObj = {
        hotelId: that.hotelId,
        commonId: that.commonId,
        mobile: that.mobile,
        lastVisitTimeStart: that.dateRange[0],
        lastVisitTimeEnd: that.dateRange[1],
      };
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.HotelChooseTable.getTablelist();
        }, 1000);
      });
    },
    //查询所有的酒店顾客
    get_userlistAll() {
      const that = this;
      const params = {
        hotelId: this.hotelId,
        commonId: that.commonId,
        mobile: that.mobile,
        lastVisitTimeStart: that.dateRange[0],
        lastVisitTimeEnd: that.dateRange[1],
      };
      that.$api
        .getuserlistAll({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.tempData.userlistdata = result.data;
            if (result.data != "") {
              let strs = result.data.split(",");
              that.userlistlength = strs.length;
              that.get_fee(strs.length);
            } else {
              that.userlistlength = 0;
            }
            that.dialogTableVisible = false;
          } else {
            that.$message.error("所有酒店顾客的手机号获取失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //获取费用
    get_fee(length) {
      const that = this;
      let paramsValuedata = {};
      let dataval = "";
      const parameterlist = that.parameter;
      let type = true;
      if (parameterlist.length > 0) {
        parameterlist.map((item) => {
          if (item.key == "link") {
            paramsValuedata[item.seq] = "link:" + item.val;
          } else {
            paramsValuedata[item.seq] = item.val;
          }
          if (item.val == "") {
            type = false;
          }
        });
        if (type) {
          dataval = JSON.stringify(paramsValuedata);
        }
      }
      const params = {
        ctpCode: that.tempData.messageTypeval,
        mobileCount: length,
        paramsValue: dataval,
      };
      this.$api
        .getfee({ params })
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.totalFeemin = result.data;
            that.totalFeemax = result.data * 2;
          } else {
            that.$message.error("预估当前要发送的短信的费用获取失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //修改用户来源
    changeuserSource(e) {
      this.tempData.userSource = e;
      if (e == 1) {
        this.tempData.texttype = true;
      } else {
        this.tempData.texttype = false;
      }
      this.tempData.userlistdata = "";
    },
    seleuserfun() {
      this.dialogTableVisible = !this.dialogTableVisible;
      this.get_userlist();
    },
    emptyfun() {
      this.tempData.userlistdata = "";
    },
    getlength(e) {
      let strs = e.replace(/，/g, ",").split(",");
      strs = strs.filter(function (el) {
        return el !== "";
      });
      strs = strs.map((item) => {
        return item.trim();
      });
      this.userlistlength = strs.length;
      this.get_fee(strs.length);
    },
    //返回
    cancelBtn() {
      this.$router.push({ name: "HotelMarketingSMS" });
    },
    //发送
    textingfun(tempData) {
      const that = this;
      const ctpCode = that.tempData.messageTypeval;
      let mobiles = that.tempData.userlistdata;
      const parameterlist = that.parameter;
      const userSource = that.tempData.userSource;
      if (ctpCode == "") {
        that.$message.error("请选择消息模板");
        return false;
      }
      for (let i = 0; i < parameterlist.length; i++) {
        if (parameterlist[i].val == "") {
          if (parameterlist[i].key == "link") {
            that.$message.error("请选择" + parameterlist[i].title);
          } else {
            that.$message.error("请填写" + parameterlist[i].title);
          }
          return false;
        }
      }
      if (mobiles == "") {
        that.$message.error("请添加用户");
        return false;
      }
      if (
        mobiles.charAt(mobiles.length - 1) == "," ||
        mobiles.charAt(mobiles.length - 1) == "，"
      ) {
        mobiles = mobiles.substr(0, mobiles.length - 1);
      }
      mobiles = mobiles.replace(/，/gi, ",");
      let mobileslist = mobiles.split(",");
      for (let i = 0; i < mobileslist.length; i++) {
        if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(mobileslist[i])) {
          that.$message.error(mobileslist[i] + "格式错误，请修改");
          return false;
        }
      }
      let paramsValue = {};
      parameterlist.map((item) => {
        if (item.key == "link") {
          paramsValue[item.seq] = "link:" + item.val;
        } else {
          paramsValue[item.seq] = item.val;
        }
      });
      paramsValue = JSON.stringify(paramsValue);
      const params = {
        ctpCode: ctpCode,
        mobiles: mobiles,
        paramsValue: paramsValue,
        userSource: userSource,
      };
      this.$api
        .postsmsrecord(params)
        .then((response) => {
          const result = response.data;
          if (result.code == "0") {
            that.$message.success("发送操作已完成，请在列表页查看发送状态");
            that.cancelBtn();
          } else {
            that.$message.error("发送失败！");
          }
        })
        .catch((error) => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
          });
        });
    },
    //接收选择的数据
    on_changeTable(data) {
      this.multipleSelection = data;
    },
  },
};
</script>
<style lang="less" scoped>
.marketingDetail {
  text-align: left;
  .title {
    font-weight: bold;
    margin-bottom: 20px;
  }
  .libox {
    width: 100%;
    font-size: 16px;
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    .name {
      margin-right: 15px;
      width: 70px;
      text-align: right;
    }
    .fontcolor {
      color: red;
    }
  }
  .mgL {
    margin-left: 75px;
  }
  .mgT {
    margin-top: 20px;
  }
  .mgB {
    margin-bottom: 20px;
  }
  .el-textarea {
    width: 310px;
  }
  .fonttext {
    font-size: 14px;
    color: red;
    margin-top: 10px;
  }
  .parameterbox {
    .el-input {
      width: 300px;
    }
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>