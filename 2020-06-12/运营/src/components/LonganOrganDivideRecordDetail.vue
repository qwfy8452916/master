<template>
    <div class="OrganDivideRecordDetail">
         <h3 class="alignleft">查看详情</h3>
         <p class="ptitle">基本信息</p>
         <table>
          <tr>
            <td>组织</td><td>{{recordDetailFormData.orgName}}</td>
          </tr>
          <tr>
            <td>分成身份</td><td>
              <span v-if="recordDetailFormData.revenueAs==2">平台</span>
              <span v-if="recordDetailFormData.revenueAs==3">酒店</span>
              <span v-if="recordDetailFormData.revenueAs==4">供应商</span>
              <span v-if="recordDetailFormData.revenueAs==7">合伙人</span>
              <span v-if="recordDetailFormData.revenueAs==8">加盟商</span>
            </td>
          </tr>
          <tr>
            <td>酒店</td><td>{{recordDetailFormData.hotelName}}</td>
          </tr>
          <tr>
            <td>退款标记</td><td>
               <span v-if="recordDetailFormData.refundTags===0">否</span>
               <span v-if="recordDetailFormData.refundTags===1">是</span>
            </td>
          </tr>
          <tr>
            <td>楼层房间号</td><td>{{recordDetailFormData.roomFloor}}-{{recordDetailFormData.roomCode}}</td>
          </tr>
          <tr>
            <td>分成金额</td><td>{{recordDetailFormData.revenueAmount}}</td>
          </tr>
        </table>
        <div v-if="recordDetailFormData.funcId!==-1">
           <p class="ptitle">商品信息</p>
            <table>
              <tr>
                <td>订单类型</td><td>{{recordDetailFormData.funcName}}</td>
              </tr>
              <tr>
                <td>订单号</td><td>{{recordDetailFormData.orderCode}}</td>
              </tr>
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
            </table>
        </div>
        <div v-if="recordDetailFormData.funcId===-1">
            <p class="ptitle">客房信息</p>
              <table>
                <tr>
                  <td>订单类型</td><td>{{recordDetailFormData.funcName}}</td>
                </tr>
                <tr>
                  <td>订单号</td><td>{{recordDetailFormData.orderCode}}</td>
                </tr>
                <tr>
                  <td>房型名称</td><td>{{recordDetailFormData.prodName}}</td>
                </tr>
                <tr>
                  <td>房源名称</td><td>{{recordDetailFormData.prodShowName}}</td>
                </tr>
                <tr>
                  <td>入住日期</td><td>{{recordDetailFormData.arrivalDate}}至{{recordDetailFormData.leaveDate}}</td>
                </tr>
                <tr>
                  <td>房价</td><td>{{recordDetailFormData.prodPrice}}</td>
                </tr>
                <tr>
                  <td>实付金额</td><td>{{recordDetailFormData.actualPay}}</td>
                </tr>
              </table>
        </div>

        <p class="ptitle">其他信息</p>
         <table>
          <tr>
            <td>下单时间</td><td>{{recordDetailFormData.payCompleteTime}}</td>
          </tr>
          <tr>
            <td>结算时间</td><td>{{recordDetailFormData.settlingTime}}</td>
          </tr>
          <tr>
            <td>顾客id</td><td>{{recordDetailFormData.customerId}}</td>
          </tr>
          <tr>
            <td>顾客昵称</td><td>{{recordDetailFormData.customerName}}</td>
          </tr>
          <tr>
            <td>顾客手机号</td><td>{{recordDetailFormData.customerPhone}}</td>
          </tr>
        </table>

        <el-row>
            <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>


    </div>
</template>

<script>
export default {
    name: 'LonganOrganDivideRecordDetail',
    data() {
        return{
            authzlist: {}, //权限数据
            detailId:'',
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
       this.$router.push({name:'LonganOrganDivideRecord'})
      },



        //更新数据
       Getdata(){
            let that=this;
            this.$api.divideRecordDetail(that.detailId).then(response=>{
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
.OrganDivideRecordDetail{
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


