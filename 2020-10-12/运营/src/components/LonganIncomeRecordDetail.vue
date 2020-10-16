<template>
    <div class="IncomeRecordDetail">
         <h3 class="alignleft">查看详情</h3>
         <p class="ptitle">用户信息</p>
         <table>
          <tr>
            <td>ID</td><td>{{recordDetailFormData.id}}</td>
          </tr>
          <tr>
            <td>退款标记</td><td>
              <span v-if="recordDetailFormData.refundTags===0">否</span>
              <span v-if="recordDetailFormData.refundTags===1">是</span>
            </td>
          </tr>
          <tr>
            <td>姓名</td><td>{{recordDetailFormData.empOrCusName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{recordDetailFormData.empOrCusPhone}}</td>
          </tr>
          <tr>
            <td>组织</td><td>{{recordDetailFormData.orgName}}</td>
          </tr>
        </table>
        <div v-if="recordDetailFormData.incomeType==4">
          <p class="ptitle">补货信息</p>
          <table>
            <tr>
              <td>酒店</td><td>{{recordDetailFormData.hotelName}}</td>
            </tr>
            <tr>
              <td>楼层房间号</td><td>{{recordDetailFormData.roomFloor}}-{{recordDetailFormData.roomCode}}</td>
            </tr>
            <tr>
              <td>格子编号</td><td>{{recordDetailFormData.latticeCode}}</td>
            </tr>
            <tr>
              <td>收支类型</td><td>
                <span v-if="recordDetailFormData.incomeType==1">分享奖励</span>
                <span v-if="recordDetailFormData.incomeType==2">管理奖励</span>
                <span v-if="recordDetailFormData.incomeType==3">红包</span>
                <span v-if="recordDetailFormData.incomeType==4">补货费</span>
                <span v-if="recordDetailFormData.incomeType==6">最优弹性价提成</span>
              </td>
            </tr>
            <tr>
              <td>商品显示名称</td><td>{{recordDetailFormData.prodShowName}}</td>
            </tr>
            <tr>
              <td>商品数量</td><td>{{recordDetailFormData.prodCount}}</td>
            </tr>
            <tr>
              <td>补货时间</td><td>{{recordDetailFormData.replenishmentTime}}</td>
            </tr>
            <tr>
              <td>入账金额</td><td>{{recordDetailFormData.incomeAmount}}</td>
            </tr>
          </table>
        </div>
        <div v-if="recordDetailFormData.incomeType!=4">
          <p class="ptitle">订单信息</p>
          <table>
            <tr>
              <td>酒店</td><td>{{recordDetailFormData.hotelName}}</td>
            </tr>
            <tr>
              <td>楼层房间号</td><td>{{recordDetailFormData.roomFloor}}-{{recordDetailFormData.roomCode}}</td>
            </tr>
            <tr>
              <td>订单类型</td><td>{{recordDetailFormData.funcName}}</td>
            </tr>
            <tr>
              <td>订单号</td><td>{{recordDetailFormData.orderCode}}</td>
            </tr>
            <tr>
              <td>收入类型</td><td>
                <span v-if="recordDetailFormData.incomeType==1">分享奖励</span>
                <span v-if="recordDetailFormData.incomeType==2">管理奖励</span>
                <span v-if="recordDetailFormData.incomeType==3">红包</span>
                <span v-if="recordDetailFormData.incomeType==4">补货费</span>
              </td>
            </tr>
            <tr>
              <td>入账金额</td><td>{{recordDetailFormData.incomeAmount}}</td>
            </tr>
            <tr v-if="recordDetailFormData.incomeType!=3">
              <td>账户余额</td><td>{{recordDetailFormData.userBalance}}</td>
            </tr>
          </table>
        </div>
        <div v-if="recordDetailFormData.funcId!==-1 && (recordDetailFormData.incomeType==1 || recordDetailFormData.incomeType==2)">
           <p class="ptitle">商品信息</p>
            <table>
              <tr>
                <td>配送单号</td><td>{{recordDetailFormData.delivCode}}</td>
              </tr>
              <tr>
                <td>商品名称</td><td>{{recordDetailFormData.prodName}}</td>
              </tr>
              <tr>
                <td>商品显示名称</td><td>{{recordDetailFormData.prodShowName}}</td>
              </tr>
              <tr>
                <td>规格</td><td>{{recordDetailFormData.prodSpecs}}</td>
              </tr>
              <tr>
                <td>商品数量</td><td>{{recordDetailFormData.prodCount}}</td>
              </tr>
              <tr>
                <td>商品金额</td><td>{{recordDetailFormData.prodAmount}}</td>
              </tr>
              <tr>
                <td>实付金额</td><td>{{recordDetailFormData.actualPay}}</td>
              </tr>
              <tr>
                <td>下单时间</td><td>{{recordDetailFormData.payCompleteTime}}</td>
              </tr>
              <tr>
                <td>结算时间</td><td>{{recordDetailFormData.settlingTime}}</td>
              </tr>
            </table>
        </div>
        <div v-if="recordDetailFormData.funcId===-1 && (recordDetailFormData.incomeType==1 || recordDetailFormData.incomeType==2)">
            <p class="ptitle">客房信息</p>
              <table>
                <tr>
                  <td>订单类型</td><td>{{recordDetailFormData.funcName}}</td>
                </tr>
                <tr>
                  <td>订单号</td><td>{{recordDetailFormData.orderCode}}</td>
                </tr>
                <tr>
                  <td>房源名称</td><td>{{recordDetailFormData.prodShowName}}</td>
                </tr>
                <tr>
                  <td>入住日期</td><td>{{recordDetailFormData.arrivalDate}}至{{recordDetailFormData.leaveDate}}</td>
                </tr>
                <tr>
                  <td>房价</td><td>{{recordDetailFormData.prodAmount}}</td>
                </tr>
                <tr>
                  <td>实付金额</td><td>{{recordDetailFormData.actualPay}}</td>
                </tr>
                <tr>
                <td>下单时间</td><td>{{recordDetailFormData.payCompleteTime}}</td>
              </tr>
              <tr>
                <td>结算时间</td><td>{{recordDetailFormData.settlingTime}}</td>
              </tr>
              </table>
        </div>
        <div v-if="recordDetailFormData.incomeType==1 || recordDetailFormData.incomeType==2">
          <p class="ptitle">分享人信息</p>
          <table>
            <tr>
              <td>顾客id</td><td>{{recordDetailFormData.customerId}}</td>
            </tr>
            <tr>
              <td>顾客昵称</td><td>{{recordDetailFormData.customerName}}</td>
            </tr>
            <tr>
              <td>顾客手机号</td><td>{{recordDetailFormData.customerPhone}}</td>
            </tr>
            <tr v-if="recordDetailFormData.incomeType==2">
              <td>分享人id</td><td>{{recordDetailFormData.shareId}}</td>
            </tr>
            <tr v-if="recordDetailFormData.incomeType==2">
              <td>分享人昵称</td><td>{{recordDetailFormData.shareUserName}}</td>
            </tr>
            <tr v-if="recordDetailFormData.incomeType==2">
              <td>分享人手机号</td><td>{{recordDetailFormData.shareUserPhone}}</td>
            </tr>
          </table>
        </div>

        <div v-if="recordDetailFormData.incomeType==3">
           <p class="ptitle">发放人信息</p>
            <table>
              <tr>
                <td>发放人id</td><td>{{recordDetailFormData.redPacketGrantId}}</td>
              </tr>
              <tr>
                <td>发放人昵称</td><td>{{recordDetailFormData.redPacketGrantName}}</td>
              </tr>
              <tr>
                <td>发放人手机号</td><td>{{recordDetailFormData.redPacketGrantPhone}}</td>
              </tr>
              <tr>
                <td>发放时间</td><td>{{recordDetailFormData.redPacketGrantTime}}</td>
              </tr>
            </table>
        </div>

        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>


    </div>
</template>

<script>
export default {
    name: 'LonganIncomeRecordDetail',
    data() {
        return{
            authzlist: {}, //权限数据
            detailId:"",  //查看id
            recordDetailFormData:{},  //数据

        }
    },
    created(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.detailId=this.$route.query.id;
        this.Getdata()
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganIncomeRecord'})
      },



         //详情数据
         Getdata(){
            let that=this;
            this.$api.inRecordDetail(that.detailId,1).then(response=>{
                if(response.data.code==0){
                  that.recordDetailFormData=response.data.data
                }else{
                  that.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })
        },


    }
}
</script>

<style lang="less" scoped>
.IncomeRecordDetail{
    width: 80%;
    .alignleft{text-align: left;}
    // table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    // color: #333;font-size: 14px;padding: 5px 10px;width: 170px;border-top: none !important;}
    table {
      text-align: left; border-collapse: collapse;width: 350px;
      // border-top: 1px solid #e4e4e4;
    }
    table td:nth-child(odd){
       width: 120px;
    }
   .niuwrap{text-align:left;margin-top: 60px;}
   a{text-decoration: none;}
   .ptitle{
       border-bottom:1px solid #e4e4e4;text-align:left;padding-bottom:10px;
   }

}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hanginput{
     .el-input__inner,.el-textarea__inner{width: 220px;box-sizing: border-box;}
   }
</style>


