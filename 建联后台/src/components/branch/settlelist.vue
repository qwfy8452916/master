<template>
  <div class="purorderdetail">
   <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
            <el-tab-pane label="订单详情" name="Purorderdetail"></el-tab-pane>
            <el-tab-pane label="供货单列表" name="supplyList" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL_DELIVERY']"></el-tab-pane>
            <el-tab-pane label="结算单列表" name="settleList" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL_SETTLE']"></el-tab-pane>
            <el-tab-pane label="付款单列表" name="paylist" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL_PAYMENT']"></el-tab-pane>
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
          <div v-if="scope.row.settStatus==1">
            <el-button
              type="text"
              v-if="dataAuth['F:CM_SETTLE_SETTLE_CREATE']"
              size="small"
              @click="checkdetail(scope.row.settDetailDTOList[0].delivId,1)"
              class="check-text"
            >生成结算单</el-button>
          </div>
          <div v-else-if="scope.row.settStatus==2">
            <el-button
              type="text"
              size="small"
              v-if="dataAuth['F:CM_BSETTLE_BSETTLE_DETAIL']"
              @click="checkdetail(scope.row.settDetailDTOList[0].delivId,0)"
              class="check-text"
            >查看详情</el-button>
           
          </div>
          <div v-else-if="scope.row.settStatus==3">
            <el-button
              type="text"
              v-if="dataAuth['F:CM_SETTLE_SETTLE_CREATE']"
              size="small"
              @click="checkdetail(scope.row.settDetailDTOList[0].delivId,1)"
              class="check-text"
            >重新生成</el-button>
            
          </div>
          <div v-else>
            <el-button
              type="text"
              v-if="dataAuth['F:CM_BSETTLE_BSETTLE_DETAIL']"
              size="small"
              @click="checkdetail(scope.row.settDetailDTOList[0].delivId,0)"
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
        <span>报价参考方式:</span>
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
      <div class="align-left hangitem" v-show="detailData.settStatus === 3">
        <span class="hangitemtitle">退回原因：</span>
        <span v-html="detailData.returnReason"></span>
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
      <el-button class="marginleft15 btn-mid" v-if="dataAuth['F:CM_SETTLE_SETTLE_CREATE_APPROVE']||dataAuth['F:CM_SETTLE_SETTLE_RECREATE_APPROVE']" type="primary" @click="ensuredeliv()">提交</el-button>
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
      judge: true,
      tableData2: [],
      tableData1: [],
      dialogVisible2: false,
      receiveTime: "",
      detailData: {},
      settlevalue: '',
      settleName: '',
      settleId: '',
      dataAuth:{},
      stepData: {},
      receiveAt: "",
      activeName:'settleList'
    };
  },
  created() {
    if (this.$route.params) {
      this.checkid = this.$route.params.id;
    }
    this.dataAuth = this.$store.state.authData;
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
            switch(tab.index){
            case '1':
            this.delivlist();
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
    selectValues(value){
        this.settleName = this.detailData.offerSettleDTO[value].settleTypeName;
        this.settleId = this.detailData.offerSettleDTO[value].settleTypeId;
    },
    delivlist(){
        let id = this.checkid;
        this.$router.push({name: 'delivlist', params:{id: id}});
    },
    paylist(){
        let id = this.checkid;
        this.$router.push({name: 'paylist', params:{id: id}});
    },
    detailback() {
      this.dialogVisible = false;
      this.getSupList()
    },
    //取消生成结算单
    back() {
      this.detailData = {};
      (this.tableData2 = []), (this.dialogVisible2 = false);
    },
    //导航栏切换
    orderdetail() {
      let id = this.checkid;
      this.$router.push({ path: "/branch/Purorderdetailbra/" + id });
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
    //查看详情 || 生成结算单
    checkdetail(delivId,num) {
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
              this.dialogVisible = true;
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
    //获取数据
    getSupList() {
      let that = this;
      const params = {
        pageNo: this.pageNum,
        pageSize: 10,
        orderId: that.checkid
      };
      this.$api.getSetList(params)
        .then(response => {
            const result = response.data;
            if (result.code == "0") {
                that.tableData = result.data.records.filter(item=>{
                    return item.status == 3;
                });
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

