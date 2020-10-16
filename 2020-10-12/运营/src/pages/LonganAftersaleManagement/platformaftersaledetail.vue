<template>
    <div class="purchaseadd">
         <h3 class="alignleft">查看详情</h3>
         <p class="ptitle">订单信息</p>
         <table>
          <tr>
            <td>订单状态</td><td>{{commodityFormData.status=='1'?'待处理':(commodityFormData.status=='2'?'已通过':(commodityFormData.status=='3'?'已拒绝':'已撤销'))}}</td>
          </tr>

          <tr>
            <td>服务单号</td><td>{{commodityFormData.csCode}}</td>
          </tr>

          <tr>
            <td>酒店名称</td><td>{{commodityFormData.hotelName}}</td>
          </tr>
          <tr>
            <td>外卖状态</td><td>
              <span v-if="commodityFormData.lgcStatus==1">待取货</span>
              <span v-if="commodityFormData.lgcStatus==2">配送中</span>
              <span v-if="commodityFormData.lgcStatus==3">已完成</span>
              <span v-if="commodityFormData.lgcStatus==4">已取消</span>
              <span v-if="commodityFormData.lgcStatus==5">已过期</span>
              <span v-if="commodityFormData.lgcStatus==7">已过期</span>
              <span v-if="commodityFormData.lgcStatus==8">指派单</span>
              <span v-if="commodityFormData.lgcStatus==9">妥投异常之物品返回中</span>
              <span v-if="commodityFormData.lgcStatus==10">妥投异常之物品返回完成</span>
              <span v-if="commodityFormData.lgcStatus==1000">系统故障订单发布失败</span>
            </td>
          </tr>
          <tr>
            <td>外卖配送</td><td>{{commodityFormData.lgcName}}</td>
          </tr>
          <tr>
            <td>功能区</td><td>{{commodityFormData.funcName}}</td>
          </tr>
          <tr>
            <td>商品金额(元)</td><td>{{commodityFormData.prodAmount}}</td>
          </tr>
          <tr>
            <td>实付金额(元)</td><td>{{commodityFormData.payAmount}}</td>
          </tr>
          <tr>
            <td>下单用户</td><td>{{commodityFormData.orderContactName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{commodityFormData.orderContactPhone}}</td>
          </tr>
        </table>

        <p class="ptitle">售后信息</p>
         <table>

          <tr>
            <td>售后类型</td><td>
               <span v-if="commodityFormData.csType=='1'">换货</span>
               <span v-if="commodityFormData.csType=='2'">退货退款</span>
               <span v-if="commodityFormData.csType=='3'">迷你吧</span>
               <span v-if="commodityFormData.csType=='4'">退款</span>
               <span v-if="commodityFormData.csType=='5'">确认前退款</span>
            </td>
          </tr>
          <tr>
            <td>商品名称</td><td>{{commodityFormData.productName}}</td>
          </tr>
          <tr v-if="divideDetailData!=null">
            <td>规格</td><td>{{divideDetailData.orderDetailAllocBean.prodSpecs}}</td>
          </tr>
          <tr>
            <td>申请数量</td><td>{{commodityFormData.prodCount}}</td>
          </tr>
          <tr>
            <td>退款金额(元)</td><td>{{commodityFormData.refoundAmount}}</td>
          </tr>
          <tr>
            <td>退款说明</td><td>{{commodityFormData.csDescription}}</td>
          </tr>
          <tr>
            <td>退款凭证</td><td>
                 <!-- <div v-for="(item,key) in accessoryPath" :key="key">
                    <a :href="item" target="_blank">{{item}}</a>
                 </div> -->
                 <template v-for="(item,key) in accessoryPath">
                    <div :key="key" :class="divwrap">
                       <img @click="imgdianji(item)" :src="item" style="width:120px;height:60px;margin-bottom:5px" />
                    </div>
                 </template>
            </td>
          </tr>
        </table>

        <p class="ptitle">物流信息</p>
         <table>
          <tr>
            <td>用户物流公司</td><td>{{commodityFormData.cusLogisticsInfo}}</td>
          </tr>
          <tr>
            <td>用户物流单号</td><td>{{commodityFormData.cusLogisticsCode}}</td>
          </tr>
          <tr>
            <td>申请时间</td><td>
               <span v-if="commodityFormData.createdAt!='1970-01-01 00:00:00'">{{commodityFormData.createdAt}}</span>
            </td>
          </tr>
          <tr>
            <td>商家物流公司</td><td>{{commodityFormData.supplierLogisticsInfo}}</td>
          </tr>
          <tr>
            <td>商家物流单号</td><td>{{commodityFormData.supplierLogisticsCode}}</td>
          </tr>
          <tr>
            <td>备注</td><td>{{commodityFormData.handleRemark}}</td>
          </tr>
          <tr>
            <td>处理时间</td><td>
              <span v-if="commodityFormData.handleTime!='1970-01-01 00:00:00'">{{commodityFormData.handleTime}}</span>
            </td>
          </tr>
        </table>
        <div v-if="divideDetailData!=null && divideDetailData.refundAmount>0">
        <p class="ptitle">扣款明细</p>
         <table class="refundwrap">
           <div style="margin-bottom:5px" class="wrapRefund">
              <span class="refundTitle" style="margin-right:30px">退款金额</span><span>￥{{divideDetailData.refundAmount}}</span>
           </div>
           <div style="margin-bottom:5px" class="wrapRefund">
              <span class="refundTitle" style="margin-right:30px">支付通道费</span><span>￥{{divideDetailData.refundPayChannelAmount}}</span>
           </div>
           <template v-for="(item,key) in divideDetailData.orderDetailAllocRefundList">
                <div :key="key" style="margin-bottom:5px" class="wrapRefund">
                  <span class="refundTitle" style="margin-right:30px">{{item.deductObj}}({{item.orgOrUserName}})<span v-if="item.revenueAmountState==2">(外卖费)</span></span>
                  <span>￥{{item.deductAmount}}</span>
                </div>
            </template>

        </table>
        </div>
         <!-- <table>
          <tr>
            <td>处理状态</td><td>{{commodityFormData.status=='1'?'待处理':(commodityFormData.status=='2'?'已通过':(commodityFormData.status=='3'?'已拒绝':'已撤销'))}}</td>
          </tr>
          <tr>
            <td>服务单号</td><td>{{commodityFormData.csCode}}</td>
          </tr>
          <tr>
            <td>酒店名称</td><td>{{commodityFormData.hotelName}}</td>
          </tr>
          <tr>
            <td>功能区</td><td>{{commodityFormData.funcName}}</td>
          </tr>
          <tr>
            <td>商品金额(元)</td><td>{{commodityFormData.prodAmount}}</td>
          </tr>
          <tr>
            <td>实付金额(元)</td><td>{{commodityFormData.payAmount}}</td>
          </tr>
          <tr>
            <td>订单联系人</td><td>{{commodityFormData.orderContactName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{commodityFormData.orderContactPhone}}</td>
          </tr>
          <tr>
            <td>商品名称</td><td>{{commodityFormData.productName}}</td>
          </tr>
          <tr>
            <td>售后类型</td><td>
               <span v-if="commodityFormData.csType=='1'">换货</span>
               <span v-if="commodityFormData.csType=='2'">退货退款</span>
               <span v-if="commodityFormData.csType=='3'">迷你吧</span>
               <span v-if="commodityFormData.csType=='4'">退款</span>
               <span v-if="commodityFormData.csType=='5'">确认前退款</span>
            </td>
          </tr>
          <tr>
            <td>申请数量</td><td>{{commodityFormData.prodCount}}</td>
          </tr>
          <tr>
            <td>退款金额(元)</td><td>{{commodityFormData.refoundAmount}}</td>
          </tr>
          <tr>
            <td>退款说明</td><td>{{commodityFormData.csDescription}}</td>
          </tr>
          <tr>
            <td>退款凭证</td><td>
                 <div v-for="(item,key) in accessoryPath" :key="key">
                    <a :href="item" target="_blank">{{item}}</a>
                 </div>
            </td>
          </tr>
          <tr>
            <td>用户物流公司</td><td>{{commodityFormData.cusLogisticsInfo}}</td>
          </tr>
          <tr>
            <td>用户物流单号</td><td>{{commodityFormData.cusLogisticsCode}}</td>
          </tr>
          <tr>
            <td>申请时间</td><td>
               <span v-if="commodityFormData.createdAt!='1970-01-01 00:00:00'">{{commodityFormData.createdAt}}</span>
            </td>
          </tr>
          <tr>
            <td>商家物流公司</td><td>{{commodityFormData.supplierLogisticsInfo}}</td>
          </tr>
          <tr>
            <td>商家物流单号</td><td>{{commodityFormData.supplierLogisticsCode}}</td>
          </tr>
          <tr>
            <td>备注</td><td>{{commodityFormData.handleRemark}}</td>
          </tr>
          <tr>
            <td>处理时间</td><td>
              <span v-if="commodityFormData.handleTime!='1970-01-01 00:00:00'">{{commodityFormData.handleTime}}</span>
            </td>
          </tr>
        </table> -->

        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
                <el-button v-if="authzData['F:BO_CS_OPRPROD_DEAL'] && commodityFormData.status==1" type="primary" @click="handle()">处理</el-button>
            </el-col>
        </el-row>

        <!-- 处理弹窗 -->
          <el-dialog title="处理售后申请" :visible.sync='dialogVisibleDelete1' center width="30%" class="hanginput">
             <el-form>
                <el-form-item v-if='aftersaletype!=1' label="退款金额" label-width="130px">
                  <el-input v-model="money" :disabled="jinejudge"></el-input>
                </el-form-item>

                <el-form-item v-if='aftersaletype==1' label="商家发货物流公司" label-width="130px" maxlength="20">
                  <el-input v-model="logisticsgs"></el-input>
                </el-form-item>
                <el-form-item v-if='aftersaletype==1' label="商家发货物流单号" label-width="130px" maxlength="20">
                  <el-input v-model="businessnumber"></el-input>
                </el-form-item>

                <el-form-item label="备注" label-width="130px">
                  <el-input v-model="retreatremark" type="textarea" rows="3" maxlength="50"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="retreatrefuse">拒 绝</el-button>
                <el-button type="primary" @click="retreatadopt">通 过</el-button>
              </div>
          </el-dialog>
        <!-- 处理弹窗 -->


       <div :class="fangda" @click="closeimg">
            <img :src="imgData" alt="图片" />
        </div>

    </div>
</template>

<script>
export default {
    name: 'platformaftersaledetail',
    data() {
        return{
            authzData: '',
            prodchangeid:"",  //查看id
            commodityFormData:{},  //数据
            divideDetailData:{
              orderDetailAllocBean:{
                prodSpecs:''
              }
            }, //退款数据
            accessoryPath:[],   //退款凭证

            dialogVisibleDelete1:false,
            jinejudge:true,
            aftersaletype:'',//售后处理类型判断
            refundmoney:'',  //用户申请退款金额
            money:'',  //退款金额
            payment:'',  //实付金额
            retreatremark:'',  //备注
            logisticsgs:'',  //商家发货物流公司
            businessnumber:'',  //商家发货物流单号
             //处理事件
            aftersaleId:'',  //售后id
            divwrap:'divwrap',
            fangda:'desty',
            imgData:'',
        }
    },
    created(){
        this.prodchangeid=this.$route.query.id;
        this.Getdata()
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'platformaftersale'})
      },

       //处理
        handle(index,row){
        let that=this;
          this.aftersaletype=this.commodityFormData.csType;
          this.refundmoney=this.commodityFormData.refoundAmount;
          this.money=this.commodityFormData.refoundAmount;
          this.payment=this.commodityFormData.payAmount;
          this.aftersaleId=this.commodityFormData.id;
          this.retreatremark='';
          that.dialogVisibleDelete1=true
          if(this.aftersaletype=='4'){
            that.logisticsgs='';
            that.businessnumber='';
            that.jinejudge=false
          }else if(this.aftersaletype=='1'){
            that.money='';
          }else if(this.aftersaletype=='2'){
            that.logisticsgs='';
            that.businessnumber='';
            that.jinejudge=true
          }
        },


        //拒绝
        retreatrefuse(){
          let that=this;
          that.handleaftersale(this.aftersaletype,3)
        },

        //通过
        retreatadopt(){
          let that=this;
          that.handleaftersale(this.aftersaletype,2)
        },

        //处理事件
        handleaftersale(csType,status){
            let that=this;
            if(csType==1){
              if(that.logisticsgs=='' && status==2){
                this.$message.error('请填写商家发货物流公司!')
                return false
              }
              if(that.businessnumber=='' && status==2){
                this.$message.error('请填写商家发货物流单号!')
                return false
              }
            }
            // if(csType==4){
            //   if(that.money>that.payment){
            //      this.$message.error('退款金额小于等于实付金额!')
            //      return false
            //   }
            //   if(that.money<that.refundmoney){
            //      this.$message.error('退款金额不能小于用户申请的金额!')
            //      return false
            //   }
            // }
            if(status==3 && that.retreatremark==''){
                 this.$message.error('请填写备注!')
                 return false
              }
             if(this.money!=''){
                this.money=parseFloat(this.money);
                this.money=this.money.toFixed(2);
              }

            const params = {
                autualRefoundAmount:this.money,
                handleRemark:this.retreatremark,
                result:status,
                supplierLogisticsCode:this.businessnumber,
                supplierLogisticsInfo:this.logisticsgs,
            };

            this.$api.handleSaleApply(params,that.aftersaleId).then(response=>{
                that.dialogVisibleDelete1=false
                if(response.data.code==0){
                    this.$message.success('操作成功！');
                    this.$router.push({name:'platformaftersale'})
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              that.dialogVisibleDelete1=false
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

        },

       //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.AfterSaleDetail({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.commodityFormData=response.data.data;
                  that.accessoryPath=response.data.data.certificateImages;
                  that.getDiveideDetail(response.data.data.orderDetailId)
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


        //订单信息---分成详情
        getDiveideDetail(id){
          let that=this;
          let params={
            orderDetailId:id,
            orderType:1
          }
          this.$api.getDiveideDetail({params}).then(response=>{
            if(response.data.code==0){
               that.divideDetailData=response.data.data
            }else{
              that.$message.error(response.data.msg)
            }

          }).catch(error=>{
            that.$alert(response.data.msg,"警告",{
              confirmButtonText:"确定"
            })
          })
        },

        imgdianji(imgUrl){
          this.fangda="desty donghua"
          this.imgData=imgUrl
        },

        closeimg(){
            this.fangda="desty"
            this.imgData=""
        },


    }
}
</script>

<style lang="less" scoped>
.purchaseadd{
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
    .wrapRefund{
      width: 500px;
    }

    .refundTitle{
      width: 245px;
      display: inline-block;
      text-align: left;
    }
   .niuwrap{text-align:left;margin-top: 60px;}
    .ptitle{
       border-bottom:1px solid #e4e4e4;text-align:left;padding-bottom:10px;
   }
     .divwrap{
          width:100px;
          height:100px;

      }
      .divwrap img{
          width:100%;
          height:100%;
      }

      .desty{
          width:0;
          height:0;
          overflow:hidden;
          position:fixed;
          top:0;
          bottom:0;
          left:0;
          right:0;
          margin:auto;
      }
      .donghua{
          transition: all 0.5s;
          width:500px !important;
          height:500px !important;

      }

}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hanginput{
     .el-input__inner,.el-textarea__inner{width: 220px;box-sizing: border-box;}
   }
</style>


