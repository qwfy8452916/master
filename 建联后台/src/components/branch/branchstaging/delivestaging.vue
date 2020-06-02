<template>
  <div class="purorderdetail">
    <h2 class="align-left">工作台-供货单</h2>
    <el-table :data="alldelivedata" border stripe style="width:100%;">
      <el-table-column fixed prop="projectName" label="项目名称" align="center"></el-table-column>
      <el-table-column fixed prop="delivNum" label="供货号" align="center"></el-table-column>
      <el-table-column prop label="产品名" align="center">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.delivDetailDTOList" :key="index">{{item.productName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="delivDetailDTOList[0].productNum" label="供货数量(吨)" align="center">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.delivDetailDTOList" :key="index">{{item.productNum}}</p>
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
        >{{ scope.row.status===1 ? "待发货":(scope.row.status===2?"待收货":"已完成") }}</template>
      </el-table-column>
      <el-table-column fixed="right" prop label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==2">
            <el-button
              type="text"
              size="small"
              @click="confirmdeliv(scope.row.delivDetailDTOList[0].delivId)"
              v-if="authzData['F:CM_BDELIVERY_BDELIVERY_ACCEPT']"
              class="edit-text"
            >确认收货</el-button>
            <el-button
              type="text"
              size="small"
              @click="checkdetail(scope.row.orderId)"
              v-if="authzData['F:CM_BDELIVERY_BDELIVERY_DETAIL']"
              class="check-text"
            >查看详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog title="确认收货" :visible.sync="dialogVisible2" width="55%">
      <div class="step-bar-div">
        <stepBar :stepData="stepData" />
      </div>
      <div class="align-left hangitem">
        <span>报价参考:</span>
        <span>西本</span>
      </div>
      <div class="align-left hangitem">
        <span>参考地:</span>
        <span>江苏省,苏州市</span>
      </div>

      <div class="align-left hangitem">
        <span class="hangitemtitle">*计划收货时间：</span>
        <el-date-picker
          v-model="detailData.scheduledReceiveAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :disabled="true"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">物流信息：</span>
        <input class="inputshuru" type="text" :disabled="true" v-model="detailData.logisticsInfo" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">物流凭证：</span>
        <div class="filese">{{detailData.logisticsVoucher}}</div>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">*收货时间：</span>
        <el-date-picker
          v-model="detailData.receiveAt"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="align-left hangitem">
        <el-upload
          class="upload-demo"
          :action="this.$api.upload_file_url"
          name="fileContent"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          multiple
          list-type="picture"
          :file-list="fileList"
        >
          <span class="hangitemtitle">*上传收货凭证：</span>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <h5 class="align-left">参数详情</h5>
      <el-table :data="tableData2" border stripe style="width:100%;margin-bottom:30px;">
        <el-table-column fixed prop="productName" label="产品名" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productName" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productNum" label="数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productUnit" label="单位" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productUnit" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productSpec" label="规格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productSpec" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productDesc" label="产品说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productDesc" :readonly="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productRemark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productRemark" :readonly="true"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="marginleft15 cancel-btn" @click="back">返回</el-button>
      <el-button class="marginleft15 btn-mid" type="primary" @click="ensuredeliv()" v-if="authzData['F:CM_BDELIVERY_BDELIVERY_ACCEPT_APPROVE']">确认收货</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pageTotal: 1,
      tableData: [],     
      authzData: {},
      orderid: "",
      delivedata:[],
      detailData: {},
      alldelivedata:[],
      tableData2: [],
      fileList: [],
      dialogVisible2:false,
       stepData: {
        curStep: 1,
        operateData: [
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:34:15",
            approver: "",
            demand_status: "STATUS_SLAVE_ORDER_CREATED",
            demander: "test1991",
            duration: "--",
            log: "分公司创建批次订单",
            remark: "--",
            submitTime: "2019-04-18 13:34:14"
          },
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:36:11",
            approver: "test713",
            demand_status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
            demander: "test1991",
            duration: "0天0时1分",
            log: "供应商确认批次订单货价量",
            remark: "--",
            submitTime: "2019-04-18 13:36:11"
          },
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:39:15",
            approver: "test1991",
            demand_status: "STATUS_BRANCH_CONFIRM",
            demander: "test713",
            duration: "0天0时3分",
            log: "分公司确认批次订单价量",
            remark: "--",
            submitTime: "2019-04-18 13:39:15"
          },
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:40:01",
            approver: "test913",
            demand_status: "STATUS_PAID_TO_ZHUNIU",
            demander: "test1991",
            duration: "0天0时0分",
            log: "集团财务部成功支付批次订单到筑牛",
            remark: "--",
            submitTime: "2019-04-18 13:40:01"
          },
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:40:51",
            approver: "筑牛",
            demand_status: "STATUS_PAID_TO_SUPPLIER",
            demander: "test913",
            duration: "0天0时0分",
            log: "筑牛支付到供应商",
            remark: "--",
            submitTime: "2019-04-18 13:40:51"
          },
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:41:37",
            approver: "test713",
            demand_status: "STATUS_SUPPLIER_CONFIRM_RECEIVER_MONEY",
            demander: "筑牛",
            duration: "0天0时0分",
            log: "供应商确认收款",
            remark: "--",
            submitTime: "2019-04-18 13:41:37"
          },
          {
            approveStatus: "通过",
            approveTime: "2019-04-18 13:41:57",
            approver: "test713",
            demand_status: "STATUS_SUPPLIER_SEND_GOODS",
            demander: "test713",
            duration: "0天0时0分",
            log: "供应商发货",
            remark: "--",
            submitTime: "2019-04-18 13:41:57"
          },
          {
            approveStatus: "已完成",
            approveTime: "2019-04-18 13:42:47",
            approver: "test1991",
            demand_status: "STATUS_BRANCH_SIGN",
            demander: "test713",
            duration: "0天0时0分",
            log: "分公司确认收货",
            remark: "--",
            submitTime: "2019-04-18 13:42:47"
          }
        ],
        steps: [
          {
            all_status: {
              STATUS_SLAVE_ORDER_CREATED: "已提交"
            },
            icon: "step-icon iconfont icon-ziyuan",
            id: 1,
            process_desc: "已提交",
            status: "STATUS_SLAVE_ORDER_CREATED",
            title: "分公司"
          },
          {
            all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "待发货" },
            icon: "step-icon iconfont icon-renyuanguanli",
            id: 2,
            process_desc: "待发货",
            status: "STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER",
            title: "供应商"
          },
        
          {
            all_status: { STATUS_SUPPLIER_CONFIRM_SLAVE_ORDER: "待收货" },
            icon: "step-icon iconfont icon-ziyuan",
            id: 7,
            process_desc: "待收货",
            status: "FINISHED",
            title: "分公司"
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
    };
  },
  mounted() {
    // 权限
    this.authzData = this.$store.state.authData;
    this.Getdata();
  },
  methods: {
    // 获取列表数据
    Getdata() {
      let that = this;
      let params = {
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      that.$api
        .purorderlist(params)
        .then(response => {
          let result = response.data;
          if (result.code === 0) {
            that.tableData = result.data.records;
            that.pageTotal = result.data.total;
            for (let i = 0; i < that.tableData.length; i++) {
              that.orderid = that.tableData[i].id;
               let params = {
              orderId: that.orderid
            };
            this.$api
              .getSupList(params)
              .then(response => {
                const result = response.data;
                if (result.code == "0") {
                  that.delivedata = result.data.records.map(item=>{
                    item.projectName =  that.tableData[i].projectName;
                    return item
                  });              
                  that.alldelivedata = that.alldelivedata.concat(that.delivedata).filter(item=>{
                    return item.status == 2
                  })                               
                  that.pageTotal = result.data.total;
                } else {
                  that.$message.error("获取供货单失败！");
                }
              })
              .catch(error => {
                that.$alert(error, "警告", {
                  confirmButtonText: "确定"
                });
              });
            }
          } else {
            that.$alert(response.data.msg, "警告", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(function(error) {
          that.$alert(error, "警告", {
            confirmButtonText: "确定",
            callback: action => {
              // that.canClick = !that.canClick;
            }
          });
        });
    },
     //确认收货
    confirmdeliv(delivId) {
      this.id = delivId;
      const params = {};
      const id = this.id;
      this.$api.getDetail(params, id).then(response => {
        const result = response.data;
        if (result.code == "0") {
          this.dialogVisible2 = true;
          this.detailData = result.data;
          this.stepData.curStep= this.detailData.status+2;
          this.tableData2 = result.data.delivDetailDTOList;
          if (this.detailData.logisticsVoucher != "") {
            this.detailData.logisticsVoucher = this.$api.img_url + this.detailData.logisticsVoucher;                
          }
          if(this.detailData.receiveVoucher != ""){
            this.detailData.receiveVoucher = this.$api.img_url + this.detailData.receiveVoucher;
          }
          if (this.detailData.receiveAt == "1970-01-01 00:00:00") {
            this.detailData.receiveAt = "";
          }
        }
      });
    },
    //确定确认收货
    ensuredeliv() {
      const id = this.id;
      const params = {
        delivNum: this.detailData.delivNum,
        delivOrderNum: this.detailData.delivOrderNum,
        isReceived: this.detailData.isReceived,
        isSended: this.detailData.isSended,
        logisticsInfo: this.detailData.logisticsInfo,
        logisticsVoucher: this.detailData.logisticsVoucher,
        orderId: this.detailData.orderId,
        receiveAt: this.detailData.receiveAt,
        receiveVoucher: this.detailData.receiveVoucher,
        scheduledReceiveAt: this.detailData.scheduledReceiveAt,
        sendAt: this.detailData.sendAt,
        settStatus: this.detailData.settStatus,
        status: this.detailData.status,
        delivDetailDTOList: this.tableData2
      };
      this.$api
        .confirmdeliv(params, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.dialogVisible2 = false;
            this.tableData = [];
            this.$message.success("确认收货成功！");
            this.Getdata();
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
     //取消确认收货
    back() {
      this.detailData = {};
      (this.tableData2 = []), (this.dialogVisible2 = false);
    },
    // 查看详情 
    checkdetail(orderId){
      let id = orderId;
      this.$router.push({ path: "/branch/Purorderdetailbra/" + id });
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