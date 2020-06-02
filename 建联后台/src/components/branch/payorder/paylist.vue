<template>
  <div class="purorderdetail">
   <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
            <el-tab-pane label="订单详情" name="Purorderdetail"></el-tab-pane>
            <el-tab-pane label="供货单列表" name="supplyList" v-if="authzData['F:CM_BORDER_BORDER_DETAIL_DELIVERY']"></el-tab-pane>
            <el-tab-pane label="结算单列表" name="settleList" v-if="authzData['F:CM_BORDER_BORDER_DETAIL_SETTLE']"></el-tab-pane>
            <el-tab-pane label="付款单列表" name="paylist" v-if="authzData['F:CM_BORDER_BORDER_DETAIL_PAYMENT']"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border stripe style="width:100%;" :row-style="{height:'50px'}"  class="top">
      <el-table-column prop="openInvoiceAt" label="开票时间" align="center"></el-table-column>
      <el-table-column prop="invoiceAmount" label="发票金额 (元)" align="center"></el-table-column>
      <el-table-column prop="statetext" label="状态" align="center"></el-table-column>
      <el-table-column fixed="right" prop label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==1">
            <el-button type="text" size="small" @click="confirmdeliv(scope.row.id)" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_VERIFY']" class="edit-text">审核</el-button>
            <el-button type="text" size="small" @click="checkdetail(scope.row.id)" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_DETAIL']" class="check-text">查看详情</el-button>
          </div>
          <div v-else>
            <el-button type="text" size="small" @click="checkdetail(scope.row.id)" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_DETAIL']" class="check-text">查看详情</el-button>
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
      <div class="align-left hangitem">
        <span class="hangitemtitle">开票时间：</span>
        <el-date-picker
          v-model="detailData.openInvoiceAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :readonly="true"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">发票金额：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.invoiceAmount" />元
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">发票凭证：</span>
        <img
          :src="item.filePathUri"
          alt
          v-for="(item,index) in attachments"
          :key="index"
          class="fold"
        />
      </div>
       <div class="align-left hangitem" v-if="detailData.status==4">
        <span class="hangitemtitle">财务部驳回原因：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.financeRejectReason" />
      </div>
      <div class="align-left hangitem" v-if="detailData.status==2">
        
        <span class="hangitemtitle">分公司驳回原因：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.branchRejectReason" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">备注：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.description" />
      </div>

      <el-button class="marginleft15 cancel-btn" @click="detailback">返回</el-button>
    </el-dialog>
    <el-dialog title="审核发票信息" :visible.sync="dialogVisible2" width="55%">
      <div class="step-bar-div">
        <stepBar :stepData="stepData" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">开票时间：</span>
        <el-date-picker
          v-model="detailData.openInvoiceAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :readonly="true"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">发票金额：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.invoiceAmount" />元
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">发票凭证：</span>
        <img
          :src="item.filePathUri"
          alt
          v-for="(item,index) in attachments"
          :key="index"
          class="fold"
        />
      </div>
        <div class="align-left hangitem" v-if="detailData.status==4">
        <span class="hangitemtitle">财务部驳回原因：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.financeRejectReason" />
      </div>
      <div class="align-left hangitem" v-if="detailData.status==2">
        
        <span class="hangitemtitle">分公司驳回原因：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.branchRejectReason" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">备注：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.description" />
      </div>
      <el-button class="marginleft15" style="width:120px;height:38px;" @click="back">返回</el-button>
      <el-button class="marginleft15" style="width:120px;height:38px;" @click="refuback(0)" type="danger" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_VERIFY_REJECT']">退回</el-button>
      <el-button class="marginleft15" style="width:120px;height:38px;" type="primary" @click="ensuredeliv(1)" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_VERIFY_APPROVE']">通过</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="pass" width="30%">
      <span>是否确认通过？</span>
      <span slot="footer">
        <el-button @click="pass=false">否</el-button>
        <el-button type="primary" @click="confirmpass" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_VERIFY_APPROVE_SUBMIT']">是</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请输入退回原因" :visible.sync="refusereson" width="30%">
      <input type="text" v-model="rejectReason" />
      <span slot="footer">
        <el-button @click="refusereson=false">取消</el-button>
        <el-button type="primary" @click="conreject" v-if="authzData['F:CM_BPAYMENT_BPAYMENT_VERIFY_REJECT_SUBMIT']">确定</el-button>
      </span>
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
      authzData:{     
      },
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
      tableData1: [],
      dialogVisible2: false,
      dialogCreate: false,
      receiveTime: "",
      detailData: {},
      pass: false,
      stepData: {
        curStep: 9,
        operateData: [
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:34:15",
          //   approver: "",
          //   demand_status: "STATUS_SLAVE_ORDER_CREATED",
          //   demander: "test1991",
          //   duration: "--",
          //   log: "分公司创建批次订单",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:34:14"
          // },

          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:36:11",
          //   approver: "test713",
          //   demand_status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
          //   demander: "test1991",
          //   duration: "0天0时1分",
          //   log: "供应商确认批次订单货价量",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:36:11"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:39:15",
          //   approver: "test1991",
          //   demand_status: "STATUS_BRANCH_CONFIRM",
          //   demander: "test713",
          //   duration: "0天0时3分",
          //   log: "分公司确认批次订单价量",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:39:15"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:40:01",
          //   approver: "test913",
          //   demand_status: "STATUS_PAID_TO_ZHUNIU",
          //   demander: "test1991",
          //   duration: "0天0时0分",
          //   log: "集团财务部成功支付批次订单到筑牛",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:40:01"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:40:51",
          //   approver: "筑牛",
          //   demand_status: "STATUS_PAID_TO_SUPPLIER",
          //   demander: "test913",
          //   duration: "0天0时0分",
          //   log: "筑牛支付到供应商",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:40:51"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:41:37",
          //   approver: "test713",
          //   demand_status: "STATUS_SUPPLIER_CONFIRM_RECEIVER_MONEY",
          //   demander: "筑牛",
          //   duration: "0天0时0分",
          //   log: "供应商确认收款",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:41:37"
          // },
          // {
          //   approveStatus: "通过",
          //   approveTime: "2019-04-18 13:41:57",
          //   approver: "test713",
          //   demand_status: "STATUS_SUPPLIER_SEND_GOODS",
          //   demander: "test713",
          //   duration: "0天0时0分",
          //   log: "供应商发货",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:41:57"
          // },
          // {
          //   approveStatus: "已完成",
          //   approveTime: "2019-04-18 13:42:47",
          //   approver: "test1991",
          //   demand_status: "STATUS_BRANCH_SIGN",
          //   demander: "test713",
          //   duration: "0天0时0分",
          //   log: "分公司确认收货",
          //   remark: "--",
          //   submitTime: "2019-04-18 13:42:47"
          // }
        ],
        steps: [
          {
            all_status: {
              STATUS_SLAVE_ORDER_CREATED: "已上传"
            },
            icon: "step-icon iconfont icon-ziyuan",
            id: 1,
            process_desc: "已上传",
            status: "STATUS_SLAVE_ORDER_CREATED",
            title: "供应商"
          },
          {
            all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "待审核" },
            icon: "step-icon iconfont icon-renyuanguanli",
            id: 2,
            process_desc: "已审核",
            status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
            title: "分公司"
          },
           {
            all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "待审核" },
            icon: "step-icon iconfont icon-renyuanguanli",
            id: 3,
            process_desc: "已审核",
            status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
            title: "集团"
          },
          {
            all_status: {
              STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "订单完成",
            },
            description: "",
            icon: "step-icon iconfont icon-Shapecopy",
            id: 8,
            process_desc: "订单完成",
            status: "",
            title: "订单完成"
          }
        ]
      },
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
      confirmGoods: [],
      refusereson: false,
      checkResult: "",
      rejectReason: "",
      verifyid: "",
      state:'',
      activeName:'paylist',
    };
  },
  created() {
    if (this.$route.params) {
      this.checkid = this.$route.params.id;
    }
    this.getSupList();
    this.authzData = this.$store.state.authData
  },
  components: {
    stepBar,
    attachmentList
  },
  methods: {
    detailback() {
      this.dialogVisible = false;
    },
    // 导航切换
    handleClick(tab, event) {
      switch(tab.index){
      case '0':
      this.orderdetail();
      break;
      case '1':
      this.supplylist();
      break;
      case '2':
      this.settlelist();
      break;
      case '3':
      this.paylist();
      break;
      default:
      }
  },
    // 付款单
    paylist() {
      let id = this.checkid;
      this.$router.push({ name: "paylist", params: { id: id } });
    },
     settlelist(){
      let id = this.checkid;
      this.$router.push({name: 'settlelist', params:{id: id}});
    },
    // 切换到供货单
    supplylist() {
      let id = this.checkid;
      this.$router.push({ name: "delivlist", params: { id: id } });
    },
   

    //取消确认收货
    back() {
      this.detailData = {};
      (this.tableData2 = []), (this.dialogVisible2 = false);
    },
    //导航栏切换
    orderdetail() {
      let id = this.checkid;
      this.$router.push({ path: "/branch/Purorderdetailbra/" + id });
    },
    //审核
    confirmdeliv(delivId) {
      const params = {};
      this.verifyid = delivId;
      this.$api.paydetail(params, this.verifyid).then(response => {
        const result = response.data;
        if (result.code == "0") {
          this.dialogVisible2 = true;
          this.detailData = result.data;
          this.state = result.data.status;
            switch(this.state){
              case 1:
              this.stepData.curStep = 2;
              break;
              case 2:
              this.stepData.curStep = 3;
              break;
              case 3:
              this.stepData.curStep = 3;
              break;
              case 5:
              this.stepData.curStep = 5;
              break;
              default:  
            }
          this.attachments = this.detailData.attachments;
        }
      });
    },
    // 退回
    refuback(state) {
      this.checkResult = state;
      this.refusereson = true;
    },
    // 确定退回
    conreject() {
      if(this.rejectReason==''){
       this.$message.error("请输入驳回原因")
        return false;
      }
      const params = {
        checkResult: this.checkResult,
        rejectReason: this.rejectReason
      };
      this.$api.payverify(params, this.verifyid).then(response => {
        const result = response.data;
        if (result.code == "0") {
          this.refusereson = false;
          this.dialogVisible2 = false;
          this.tableData = [];
          this.getSupList();
          this.$message.success("审核退回成功");
        }
      });
    },
    //通过审核
    ensuredeliv(state) {
      this.pass = true;
      this.checkResult = state;
    },
    // 确定通过审核
    confirmpass() {
      const params = {
        checkResult: this.checkResult
      };
      this.$api.payverify(params, this.verifyid).then(response => {
        const result = response.data;
        if (result.code == "0") {
          this.pass = false;
          this.dialogVisible2 = false;
          this.tableData = [];
          this.getSupList();
          this.$message.success("审核通过成功");
        }
      });
    },
    //上传图片
    handleSuccess(response, file, fileList) {
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
        .paydetail(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.dialogVisible = true;
            this.detailData = result.data;
            this.state = result.data.status;
            switch(this.state){
              case 1:
              this.stepData.curStep = 2;
              break;
              case 2:
              this.stepData.curStep = 3;
              break;
              case 3:
              this.stepData.curStep = 3;
              break;
              case 5:
              this.stepData.curStep = 5;
              break;
              default:  
            }
            this.attachments = this.detailData.attachments;
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
      this.$api
        .paylist(params)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            that.tableData = result.data.records.map(item => {
              item.statetext = this.getOrderInfo(item.status);
              return item;
            });
            that.pageTotal = result.data.total;
          } else {
            that.$message.error("获取付款单失败！");
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
  .fold {
    width: 200px;
    height: 200px;
    display: block;
  }
}
</style>

