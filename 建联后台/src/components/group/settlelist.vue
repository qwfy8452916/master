<template>
  <div class="purorderdetail">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
      <el-tab-pane label="订单详情" name="Purorderdetail"></el-tab-pane>
      <el-tab-pane
        label="供货单列表"
        name="supplyList"
        v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_DELIVERY']"
      ></el-tab-pane>
      <el-tab-pane
        label="结算单列表"
        name="settleList"
        v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_SETTLE']"
      ></el-tab-pane>
      <el-tab-pane label="付款单列表" name="paylist" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_PAYMENT']"></el-tab-pane>
    </el-tabs>

    <el-table :data="tableData" border stripe style="width:100%;" class="top">
      <el-table-column fixed prop="delivNum" label="结算单号" align="center"></el-table-column>
      <el-table-column prop label="产品名" align="center">
        <template slot-scope="{row}">
          <p v-for="(item, index) in row.settDetailDTOList" :key="index">{{item.productName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="settDetailDTOList[0].productNum" label="数量" align="center">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.settDetailDTOList" :key="index">{{item.productNum}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sendAt" label="发货日期" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.sendAt==='1970-01-01 00:00:00' ? '-' : scope.row.sendAt }}</template>
      </el-table-column>
      <el-table-column prop="receiveAt" label="收货日期" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.receiveAt==='1970-01-01 00:00:00' ? '-' : scope.row.receiveAt }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.settStatus===1 ? "未生成结算单":(scope.row.settStatus===2?"待确认":(scope.row.settStatus===3?"已退回":"已确认")) }}</template>
      </el-table-column>
      <el-table-column fixed="right" prop label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              size="small"
              v-if="dataAuth['F:CM_SETTLE_SETTLE_DETAIL']"
              @click="checkdetail(scope.row.settDetailDTOList[0].delivId)"
              class="check-text"
            >查看详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination top">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="11"
        :page-size="pageSize"
        :total="pageTotal"
        :current-page.sync="currentPage"
        @current-change="current"
        @prev-click="prev"
        @next-click="next"
      ></el-pagination>
    </div>
    <el-dialog title="查看详情" :visible.sync="dialogVisible" width="55%">
      <div class="step-bar-div">
        <stepBar :stepData="stepData" />
      </div>
      <h2 class="align-left">报价参考</h2>
      <div class="align-left hangitem">
        <span>报价参考:</span>
        <span>西本</span>
      </div>
      <div class="align-left hangitem">
        <span>参考地:</span>
        <span>江苏,苏州市</span>
      </div>

      <div class="align-left hangitem">
        <span class="hangitemtitle">结算方式：</span>
        <input class="inputshuru" type="text" v-model="detailData.settleStyleName" :disabled="true" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">总金额(元)：</span>
        <input class="inputshuru" type="text" v-model="detailData.totalMoney" :disabled="true" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">退回原因：</span>
        <span v-html="detailData.returnReason" :disabled="true"></span>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">备注：</span>
        <input class="inputshuru" type="text" v-model="detailData.remark" :disabled="true" />
      </div>

      <h5 class="align-left">参数详情</h5>
      <el-table :data="tableData2" border stripe style="width:100%; margin-bottom:30px;" :row-style="{height:'40px'}">
        <el-table-column fixed prop="productName" label="产品名" align="center"></el-table-column>
        <el-table-column prop="productNum" label="数量" align="center"></el-table-column>
        <el-table-column prop="productUnit" label="单位" align="center"></el-table-column>
        <el-table-column prop="productSpec" label="规格" align="center"></el-table-column>
        <el-table-column prop="productDesc" label="产品说明" align="center"></el-table-column>
        <el-table-column prop="productRemark" label="备注" align="center"></el-table-column>
      </el-table>
      <el-button class="marginleft15 cancel-btn" @click="detailback">返回</el-button>
    </el-dialog>
  </div>
</template>

<script>
import stepBar from "@/components/public/stepBar";
import attachmentList from "@/components/public/attachmentList";
export default {
  name: "delivlist",
  data() {
    return {
      id: "",
      pageSize: 10,
      pageTotal: 1, //默认总条数
      pageNum: 1, //实际当前页码
      currentPage: 1, //默认当前页码
      tableData: null,
      checkid: "",
      dialogVisible: false,
      title: "确认收货",
      judge: true,
      tableData2: [],
      tableData1: [],
      dialogVisible1: false,
      dialogVisible2: false,
      dialogCreate: false,
      receiveTime: "",
      detailData: {},
      dataAuth: {},
      settlevalue: "选择结算方式",
      stepData: {},
      receiveAt: "",
      fileList: [],
      //图片弹窗
      imgVisible: false,
      imgurl: "",
      exampleFold: true,
      unfoldBtnDiv: false,
      uploadPercentage: 0,
      uploadProgressVisible: false,
      attachments: [
        // {
        //     business_id: 635,
        //     business_type: "SLAVE_ORDER_SIGN_PROOF",
        //     created_at: "2019-04-18 13:42:45",
        //     id: 1757,
        //     original_name: "19273_dowater.doc",
        //     path: "http://src.zhuniu.com/zhuniu/purchasers/order/0398da6805ecc0e6e1eea59d72f8015b.doc",
        //     updated_at: "2019-04-18 13:42:45"
        // }
      ],
      activeName: "settleList"
    };
  },
  created() {
    this.dataAuth = this.$store.state.authData;
    if (this.$route.params) {
      this.checkid = this.$route.params.id;
    }
    this.stepData = this.$settleStep;
    this.getSupList();
  },
  components: {
    stepBar,
    attachmentList
  },
  methods: {
    //导航栏切换
    handleClick(tab, event) {
      switch (tab.index) {
        case "1":
          this.delivlist();
          break;
        case "2":
          this.settlelist();
          break;
        case "3":
          this.paylist();
          break;
        default:
      }
    },
    delivlist() {
      let id = this.checkid;
      this.$router.push({ path: "/group/delivlist/" + id });
    },
    paylist() {
      let id = this.checkid;
      this.$router.push({ path: "/group/paylist/" + id });
    },
    detailback() {
      this.dialogVisible = false;
    },
    //取消创建供货单
    cancel() {
      this.tableData1 = [];
      this.dialogVisible1 = false;
    },
    //取消确认收货
    back() {
      this.detailData = {};
      (this.tableData2 = []), (this.dialogVisible2 = false);
    },
    //确认发布
    ensureCreate() {
      this.dialogCreate = true;
    },
    //创建供货单
    supplyList() {
      this.dialogVisible1 = true;
    },
    //确定创建供货单
    createSupList() {
      let that = this;
      const params = {
        orderId: that.checkid,
        scheduledReceiveAt: that.receiveTime,
        settDetailDTOList: that.tableData1
      };
      that.$api
        .createSupList(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.dialogCreate = false;
            that.dialogVisible1 = false;
            this.tableData1 = [];
            this.$message.success("新增供货单成功！");
            this.getSupList();
          } else {
            this.dialogCreate = false;
            that.dialogVisible1 = false;
            0;
            this.$message.error("新增供货单失败！");
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //删除行
    deleteRow(index, rows) {
      if (rows.length == 1) {
        return;
      }
      rows.splice(index, 1);
      console.log(this.tableData1);
    },
    //新增行
    AddLine() {
      let newLine = {
        productName: "",
        productSpec: "",
        productNum: "",
        productUnit: "",
        productRemark: "",
        productDesc: ""
      };
      this.tableData1.push(newLine);
    },
    //导航栏切换
    orderdetail() {
      let id = this.checkid;
      this.$router.push({ path: "/group/Purorderdetail/" + id });
    },
    //生成结算单
    confirmdeliv(delivId) {
      this.id = delivId;
      const params = {};
      const id = this.id;
      this.$api.getSetDetail(id).then(response => {
        const result = response.data;
        if (result.code == "0") {
          this.dialogVisible2 = true;
          this.detailData = result.data;
          this.tableData2 = result.data.settDetailDTOList;
          if (this.detailData.receiveAt == "1970-01-01 00:00:00") {
            this.detailData.receiveAt = "";
          }
        }
      });
    },
    //提交结算单
    ensuredeliv() {
      const id = this.id;
      if (this.totalPrice == "") {
        this.$message({
          message: "价格不能为空！！",
          type: "warning"
        });
        return;
      }
      let goodsData = {
        delivNum: this.detailData.delivNum,
        delivOrderNum: this.detailData.delivOrderNum,
        isReceived: this.detailData.isReceived,
        isSended: this.detailData.isSended,
        logisticsInfo: this.detailData.logisticsInfo,
        logisticsVoucher: this.detailData.logisticsVoucher,
        orderId: this.detailData.orderId,
        receiveAt: this.detailData.receiveAt,
        receiveVoucher: this.detailData.receiveVoucher,
        remark: this.detailData.remark,
        returnReason: this.detailData.returnReason,
        scheduledReceiveAt: this.detailData.scheduledReceiveAt,
        sendAt: this.detailData.sendAt,
        settDetailDTOList: this.tableData2,
        settStatus: this.detailData.settStatus,
        settleStyleId: this.detailData.settleStyleId,
        settleStyleName: this.detailData.settleStyleName,
        status: this.detailData.status,
        totalMoney: this.detailData.totalMoney
      };
      console.log(goodsData);
      this.$api
        .createSettle(goodsData, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$alert("提交成功！！返回详情页", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.checkdetail(this.id);
                this.back();
              }
            });
          } else {
            this.$alert(result.message, "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //上传图片
    handleSuccess(response, file, fileList) {
      console.log(file);
      const image = {
        name: response.data,
        url: file.url
      };
      this.fileList.push(image);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList.map((item, index) => {
        return {
          name: item.name,
          url: item.url
        };
      });
    },
    handlePreview(file) {
      let that = this;
      that.imgVisible = true;
      that.imgurl = file.url;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //查看详情
    checkdetail(delivId) {
      const params = {};
      const id = delivId;
      this.$api
        .getSetDetail(id)
        .then(response => {
          const result = response.data;
          switch (result.data.settStatus) {
            case 1:
              this.stepData.curStep = 1;
              this.stepData.steps.forEach((item, index) => {
                switch (index) {
                  case 0:
                    item.process_desc = "待生成结算单";
                    break;
                  case 1:
                    item.process_desc = "待确认";
                    item.current_status = "";
                    break;
                  case 2:
                    item.process_desc = "已完成";
                    break;
                  default:
                    break;
                }
              });
              break;
            case 2:
              this.stepData.curStep = 2;
              this.stepData.steps.forEach((item, index) => {
                switch (index) {
                  case 0:
                    item.process_desc = "已生成结算单";
                    break;
                  case 1:
                    item.process_desc = "待确认";
                    item.current_status = "";
                    break;
                  case 2:
                    item.process_desc = "已完成";
                    break;
                  default:
                    break;
                }
              });
              break;
            case 3:
              this.stepData.curStep = 1;
              this.stepData.steps.forEach((item, index) => {
                switch (index) {
                  case 0:
                    item.process_desc = "待重新生成结算单";
                    break;
                  case 1:
                    item.process_desc = "已驳回";
                    item.current_status = "error";
                    break;
                  case 2:
                    item.process_desc = "已完成";
                    break;
                  default:
                    break;
                }
              });
              break;
            case 4:
              this.stepData.curStep = 4;
              this.stepData.steps.forEach((item, index) => {
                switch (index) {
                  case 0:
                    item.process_desc = "已生成结算单";
                    break;
                  case 1:
                    item.process_desc = "已确认";
                    item.current_status = "";
                    break;
                  case 2:
                    item.process_desc = "已完成";
                    break;
                  default:
                    break;
                }
              });
              break;

            default:
              break;
          }
          if (result.code == "0") {
            this.dialogVisible = true;
            this.detailData = result.data;
            console.log(this.detailData);
            this.tableData2 = result.data.settDetailDTOList;
            if (this.detailData.receiveAt == "1970-01-01 00:00:00") {
              this.detailData.receiveAt = "";
            }
          } else {
            this.$alert(result.message, "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          this.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    //获取数据
    getSupList() {
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        orderId: that.checkid
      };
      console.log(params);
      this.$api
        .getSetList(params)
        .then(response => {
          const result = response.data;
          console.log(result);
          if (result.code == "0") {
            that.tableData = result.data.records.filter(item => {
              return item.status == 3;
            });
            that.pageTotal = result.data.total;
            console.log(that.tableData);
            console.log(that.pageTotal);
          } else {
            that.$message.error("获取供货单失败！");
          }
        })
        .catch(error => {
          that.$alert(error, "警告", {
            confirmButtonText: "确定"
          });
        });
    },
    current() {
      this.pageNum = this.currentPage;
      this.getSupList();
    },
    //上一页
    prev() {
      this.pageNum = this.pageNum - 1;
      this.getSupList();
    },
    //下一页
    next() {
      this.pageNum = this.pageNum + 1;
      this.getSupList();
    }
  }
};
</script>

<style lang="less">
.purorderdetail {
  .navtab {
    text-align: left;
    overflow: hidden;
    margin-bottom: 35px;
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .left {
    text-align: left;
    margin-bottom: 10px;
  }
  .wrapniu {
    overflow: hidden;
    text-align: right;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__header {
    background: #2793f4;
    text-align: left !important;
    display: none;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-collapse-item__header {
    text-align: left;
  }
  .inline-block {
    display: inline-block;
  }
  .marginleft15 {
    margin-left: 15px;
  }
  .returnwrap {
    .el-dialog--center .el-dialog__body {
      padding-bottom: 0 !important;
    }
  }
  .el-table__body td {
    padding: 0;
    .cell {
      padding: 0;
    }
  }

  .inputshuru {
    height: 30px;
    line-height: 30px;
    outline: none;
    width: 270px;
    border: 1px solid #d7d7d7;
    text-indent: 5px;
  }
  .hangitem {
    margin-bottom: 25px;
  }
  .hangitemtitle {
    display: inline-block;
    text-align: left;
  }
  .filese {
    color: #0000ff;
    margin-top: 5px;
  }
}
</style>

