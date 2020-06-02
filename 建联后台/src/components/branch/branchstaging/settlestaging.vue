<template>
  <div>
    <h2 class="align-left">工作台-结算单</h2>
    <el-table :data="alldelivedata" border stripe style="width:100%;">
      <el-table-column fixed prop="projectName" label="项目名称" align="center"></el-table-column>
      <el-table-column fixed prop="delivNum" label="供货号" align="center"></el-table-column>
      <el-table-column prop label="产品名" align="center">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.settDetailDTOList" :key="index">{{item.productName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="settDetailDTOList[0].productNum" label="供货数量(吨)" align="center">
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
        >{{ scope.row.status===1 ? "待发货":(scope.row.status===2?"待收货":"已完成") }}</template>
      </el-table-column>
      <el-table-column fixed="right" prop label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.settStatus==1">
            <el-button
              type="text"
              v-if="dataAuth['F:CM_BSETTLE_BSETTLE_CREATE']"
              size="small"
              @click="createsettle(scope.row.settDetailDTOList[0].delivId,1)"
              class="check-text"
            >生成结算单</el-button>
             <el-button
              type="text"
              size="small"
              v-if="dataAuth['F:CM_BSETTLE_BSETTLE_DETAIL']"
              @click="checkdetail(scope.row.orderId,0)"
              class="check-text"
            >查看详情</el-button>
           
          </div>
          <div v-else-if="scope.row.settStatus==3">
            <el-button
              type="text"
              v-if="dataAuth['F:CM_BSETTLE_BSETTLE_CREATE']"
              size="small"
              @click="createsettle(scope.row.settDetailDTOList[0].delivId,1)"
              class="check-text"
            >重新生成</el-button>
             <el-button
              type="text"
              v-if="dataAuth['F:CM_BSETTLE_BSETTLE_DETAIL']"
              size="small"
              @click="checkdetail(scope.row.orderId,0)"
              class="check-text"
            >查看详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog title="生成结算单" :visible.sync="dialogVisible2" width="55%">
      <div class="step-bar-div">
        <stepBar :stepData="stepData" />
      </div>
      <h2 class="align-left">报价参考</h2>
      <div class="align-left hangitem">
        <span>报价参考方式:</span>
        <span>西本</span>
      </div>
      <div class="align-left hangitem">
        <span>参考地:</span>
        <span>江苏省,苏州市</span>
      </div>

      <div class="align-left hangitem">
        <span class="hangitemtitle">结算方式：</span>
        <el-select v-model="settlevalue" @change='selectValues' placeholder="请选择结算方式">
          <el-option 
          v-for="(item,index) in detailData.offerSettleDTO" 
          :key="index"
          :label="item.settleTypeName"
          :value="index"
          ></el-option>
        </el-select>
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">总金额：</span>
        <input class="inputshuru" type="number" v-model.number="detailData.totalMoney" />
      </div>
      <div class="align-left hangitem">
        <span class="hangitemtitle">备注：</span>
        <input class="inputshuru" type="text" v-model="detailData.remark" />
      </div>

      <h5 class="align-left">参数详情</h5>
      <el-table :data="tableData2" border stripe style="width:100%;margin-bottom:30px;">
        <el-table-column fixed prop="productName" label="产品名" align="center">
          <template slot-scope="scope">
            <el-input :disabled="true" v-model="scope.row.productName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productNum" label="数量" align="center">
          <template slot-scope="scope">
            <el-input :disabled="true" v-model="scope.row.productNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productUnit" label="单位" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productUnit"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productSpec" label="规格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productSpec"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productDesc" label="产品说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productDesc"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productRemark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productRemark"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="marginleft15 cancel-btn" @click="back">返回</el-button>
      <el-button class="marginleft15 btn-mid" v-if="dataAuth['F:CM_BSETTLE_BSETTLE_CREATE_APPROVE']||dataAuth['F:CM_BSETTLE_BSETTLE_RECREATE_APPROVE']" type="primary" @click="ensuredeliv()">提交</el-button>
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
      dataAuth: {},
      orderid: "",
      delivedata:[],
      alldelivedata:[],
      tableData2: [],
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
      detailData:{},
      settlevalue: '',
    };
  },
  mounted() {
    // 权限
    this.dataAuth = this.$store.state.authData;
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
              .getSetList(params)
              .then(response => {
                const result = response.data;
                if (result.code == "0") {
                console.log(result.data.records)
                  that.delivedata = result.data.records.map(item=>{
                    item.projectName =  that.tableData[i].projectName;
                    return item
                  });              
                  that.alldelivedata = that.alldelivedata.concat(that.delivedata).filter(item=>{
                    return (item.settStatus == 1 || item.settStatus == 3) && item.status == 3
                  })                               
                  that.pageTotal = result.data.total;
                } else {
                  that.$message.error("获取结算单失败！");
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
    // 查看详情
    checkdetail(orderId){
      let id = orderId;
      this.$router.push({ path: "/branch/Purorderdetailbra/" + id });
    },
    //  查看详情 || 生成结算单
    createsettle(delivId,num) {
      const params = {};
      const id = delivId;
      this.$api.getSetDetail(id)
        .then(response => {
          const result = response.data;
          switch(result.data.settStatus) {
            case 1:
              this.stepData.curStep = 1;
              this.stepData.steps.forEach((item,index) => {
                switch (index) {
                  case 0:
                    item.process_desc = '待生成结算单'
                    break;
                  case 1:
                    item.process_desc = '待确认'
                    item.current_status = ''
                    break;
                  case 2:
                    item.process_desc = '已完成'
                    break;
                  default:
                    break;
                }
              });
              break;
            case 2:
              this.stepData.curStep = 2;
              this.stepData.steps.forEach((item,index) => {
                switch (index) {
                  case 0:
                    item.process_desc = '已生成结算单'
                    break;
                  case 1:
                    item.process_desc = '待确认'
                    item.current_status = ''
                    break;
                  case 2:
                    item.process_desc = '已完成'
                    break;
                  default:
                    break;
                }
              });
              break;
            case 3:
              this.stepData.curStep = 1;
              this.stepData.steps.forEach((item,index) => {
                switch (index) {
                  case 0:
                    item.process_desc = '待重新生成结算单'
                    break;
                  case 1:
                    item.process_desc = '已驳回'
                    item.current_status = 'error'
                    break;
                  case 2:
                    item.process_desc = '已完成'
                    break;
                  default:
                    break;
                }
              });
              break;
            case 4:
              this.stepData.curStep = 4;
              this.stepData.steps.forEach((item,index) => {
                switch (index) {
                  case 0:
                    item.process_desc = '已生成结算单'
                    break;
                  case 1:
                    item.process_desc = '已确认'
                    item.current_status = ''
                    break;
                  case 2:
                    item.process_desc = '已完成'
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
            if(num){
              this.dialogVisible2 = true;
            }else{
              //  this.$router.push({ path: "/branch/Purorderdetailbra/" + id });
            }
            this.detailData = result.data;
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
    //取消生成结算单
    back() {
      this.detailData = {};
      (this.tableData2 = []), (this.dialogVisible2 = false);
    },
     //提交结算单
    ensuredeliv() {
      if(this.settlevalue === ''){
          this.$message({
              message: "结算方式不能为空！！",
              type: 'warning'
            });
          return ;
      }
      console.log(this.detailData.totalMoney)
      if(this.detailData.totalMoney === '' || parseInt(this.detailData.totalMoney)<= 0){
          this.$message({
              message: "请规范填写价格！！",
              type: 'warning'
            });
          return ;
      }
      this.$confirm('确定生成结算单吗？','提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(()=>{
        this.submitSettle();
      })
    },
    submitSettle(){
      const id = this.detailData.settDetailDTOList[0].delivId;
      let goodsData = {
          delivNum: this.detailData.delivNum,
          delivOrderNum:this.detailData.delivOrderNum,
          isReceived: this.detailData.isReceived,
          isSended:this.detailData.isSended,
          logisticsInfo: this.detailData.logisticsInfo,
          logisticsVoucher: this.detailData.logisticsVoucher,
          orderId:this.detailData.orderId,
          receiveAt:this.detailData.receiveAt,
          receiveVoucher:this.detailData.receiveVoucher,
          remark:this.detailData.remark,
          returnReason:this.detailData.returnReason,
          scheduledReceiveAt:this.detailData.scheduledReceiveAt,
          sendAt:this.detailData.sendAt,
          settDetailDTOList:this.tableData2,
          settStatus:this.detailData.settStatus,
          settleStyleId:this.settleId,
          settleStyleName:this.settleName,
          status:this.detailData.status,
          totalMoney:this.detailData.totalMoney
      };
      console.log(goodsData);
      this.$api.createSettle(goodsData, id)
        .then(response => {
          const result = response.data;
          if (result.code == "0") {
            this.$alert('提交成功！！返回列表页', "提示", {
              confirmButtonText: "确定",
              callback: action => {
                  this.dialogVisible2 = false;
                  this.alldelivedata = [];
                  this.Getdata();
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
    selectValues(value){
        this.settleName = this.detailData.offerSettleDTO[value].settleTypeName;
        this.settleId = this.detailData.offerSettleDTO[value].settleTypeId;
    },
  }
};
</script>
<style>
</style>