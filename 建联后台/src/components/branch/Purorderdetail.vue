<template>
    <div class="purorderdetail">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="width:50%;">
            <el-tab-pane label="订单详情" name="Purorderdetail"></el-tab-pane>
            <el-tab-pane label="供货单列表" name="supplyList" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL_DELIVERY']"></el-tab-pane>
            <el-tab-pane label="结算单列表" name="settleList" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL_SETTLE']"></el-tab-pane>
            <el-tab-pane label="付款单列表" name="paylist" v-if="dataAuth['F:CM_BORDER_BORDER_DETAIL_PAYMENT']"></el-tab-pane>
        </el-tabs>
        <div class="wrapniu" v-if="tableData.status==2">
            <el-button type="primary" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_APPROVE']" @click="agree">同意关闭</el-button>
            <el-button type="primary" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_REJECT']" @click="returnsj">驳回关闭</el-button>
        </div>
        <ul class="align-left orderxq">
            <li>
                <span>状态：</span><span class="org">{{tableData.status===1?"履约中":(tableData.status===2?"关闭中":"已关闭")}}</span>
            </li>
            <li>
                <span>订单号：</span><span>{{tableData.id}}</span>
            </li>
            <li>
                <span>订单生成时间：</span><span>{{dateToString(tableData.createdAt)}}</span>
            </li>
            <li>
                <span>申请关闭原因：</span><span>{{tableData.closeReason}}</span>
            </li>
            <li>
                <span>项目名称：</span><span>{{tableData.projectName}}</span>
            </li>
            <li>
                <span>项目编码：</span><span>{{tableData.projectNo}}</span>
            </li>
        </ul>
   
        <h3 class="align-left">产品信息</h3>
        <ul class="align-left orderxq">
            <li>
                <div class="hanginline">
                    <span>产品名：</span><span>{{tableData.productName}}</span>
                </div>
                <div class="hanginline inlineleft">
                    <span>单位：</span><span>{{tableData.purchaseUnit}}</span>
                </div>
            </li>
            <li>
                <div class="hanginline">
                    <span>品牌：</span><span>{{tableData.productBrand}}</span>
                </div>
                <div class="hanginline inlineleft">
                    <span>规格：</span><span>{{tableData.productSpec}}</span>
                </div>
            </li>
            <li>
                <div class="hanginline">
                    <span>数量：</span><span>{{tableData.purchaseNum}}</span>
                </div>
            </li>
        </ul>
        <h3 class="align-left">收货信息</h3>
        <ul class="align-left orderxq">
            <li>
                <span>收货人：</span><span>{{tableData.shippingInspector}}</span>
            </li>
            <li>
                <span>收货人手机号：</span><span>{{tableData.shippingInspectorMobile}}</span>
            </li>
            <li>
                <span>收货人身份证：</span><span>{{tableData.shippingInspectorIdentityCard}}</span>
            </li>
            <li>
                <span>收货地址：</span><span>{{tableData.shippingAddr}}</span>
            </li>
        </ul>
        <h4 class="align-left">报价信息</h4>
        <table class="baojiatable" width="600" style="background-color:#FAFAFA">
            <thead>
                <th style="width:25%">供应商名</th>
                <th style="width:25%">报价时间</th>
                <th style="width:25%;border-bottom:0 !important;">结算方式</th>
                <th style="width:25%;border-bottom:0 !important;">价格</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{tableData.supplierEntName}}</td>
                    <td>{{dateToString(tableData.tenderTime)}}</td>
                    <td colspan="2" style="border:0 !important;vertical-align:text-top;">
                        <table class="tableqian" style="width:100%;">
                            <tbody>
                                <tr v-for="(item,key) in baojiadata" :key="key">
                                    <td class="jiesuantd" style="width:50%;border-left:0 !important;">{{item.settleTypeName}}</td>
                                    <td class="baojiatd" style="width:50%;border-right:0 !important;">{{item.offer}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
            
        </table>
        <!-- 驳回弹窗 -->
        <el-dialog title="驳回" class="returnwrap" :visible.sync="dialogreturn" width="20%" top="30vh" center>
            <el-form>
                <el-form-item>
                    <el-input type="textarea" v-model="bohuireason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                    <el-button @click="dialogreturn=false">取消</el-button>
                    <el-button type="primary" v-if="dataAuth['F:CM_ORDER_ORDER_DETAIL_REJECT_SUBMIT']" @click.native.prevent="createreturn()">确定</el-button>
                </span>
        </el-dialog>
        <!-- 驳回弹窗 -->
    
    </div>
</template>

<script>
export default {
    name:"Purorderdetailbra",
    data(){
        return{
            tableData:{}, //数据
            baojiadata:[],
            bohuireason:"",//驳回原因
            count:1,
            dialogreturn:false,
            checkid:"",
            status:'',
            dataAuth:{
                
            },
            activeName: 'Purorderdetail'
        }
    },
    mounted(){
        this.dataAuth = this.$store.state.authData;
        console.log(this.dataAuth)
    },
    created(){
        if(this.$route.params){
            this.checkid=this.$route.params.id;         
        }
        this.Getdata()
    },
    methods:{
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
        // 供货单列表
        delivlist(){
            let id = this.checkid;
            let status = this.status;
            this.$router.push({name: 'delivlist', params:{id:id,status:status}});
        },
        settlelist(){
            let id = this.checkid;
            this.$router.push({name: 'settlelist', params:{id: id}});
        },
        // 付款单列表
        paylist(){
            let id = this.checkid;
            this.$router.push({name: 'paylist', params:{id: id}});
        },
        //同意
        agree(){
            let that=this;
            let params={
               result:1,
               reason:'' 
              }
            that.$api.trialclose(params,that.checkid).then(response=>{
               if(response.data.code==0){
                   this.$message.success('操作成功'); 
                }else{
                    this.$message.error(response.data.msg);
                }
            }).catch(function(error){
               that.$alert(error,'警告',{
                   confirmButtonText:'确定',
                   callback: action => {
                        }
               })
            })

        },
        //驳回
        returnsj(){
          let that=this;
          that.bohuireason='',
          that.dialogreturn=true
        },
        //确定驳回
        createreturn(){
            let that=this;
            if(!that.bohuireason){
               this.$message.error('请输入驳回原因');
               return false
            }
            let params={
               result:0,
               reason:that.bohuireason
              }
            that.$api.trialclose(params,that.checkid).then(response=>{
               if(response.data.code==0){
                   this.$message.success('操作成功');
                   that.dialogreturn=false 
                }else{
                    this.$message.error(response.data.msg);
                    that.dialogreturn=false
                }
            }).catch(function(error){
               that.$alert(error,'警告',{
                   confirmButtonText:'确定',
                   callback: action => {
                        }
               })
               that.dialogreturn=false
            })

        },


        //获取数据
        Getdata:function(){
            let that = this;
            let params = {}
            that.$api.purorderdetail({params},that.checkid).then(response=>{
                let result = response.data;
                if(result.code==0){
                    that.tableData = result.data;
                    that.status = that.tableData.status;
                    that.baojiadata=result.data.offerSettleDTO
                }else{
                    that.$alert(response.data.msg , '警告', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            }).catch(function (error) {
                that.$alert(error , '警告', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // that.canClick = !that.canClick;
                    }
                });
            });
        },

    }
}
</script>

<style lang="less">
.purorderdetail{
    
    .navtab{text-align: left;overflow: hidden;margin-bottom: 35px;
     .el-button+.el-button{margin-left: 0;}
    }
  .wrapniu{overflow: hidden;text-align: right;}
  .el-dialog__title{color: #fff;}
  .el-dialog__header{background: #2793f4;text-align: left !important;
  }
  .el-dialog__headerbtn .el-dialog__close{color: #fff;}
  .el-collapse-item__header{text-align: left;}
  .inline-block{display:inline-block;}
  .marginleft15{margin-left: 15px;}
  .returnwrap{
            .el-dialog--center .el-dialog__body{padding-bottom: 0 !important;}
        }
}


</style>


<style lang="less" scoped>
.purorderdetail{
  .orderxq{font-size: 14px;
  li{margin-bottom: 10px;overflow:hidden;
    .hanginline{display: inline-block;float: left;}
    .inlineleft{margin-left: 100px;}
  }
  
  }
  .baojiatable,.baojiatable th,.baojiatable tr td {border:1px solid #ccc !important;
  border-collapse: collapse;padding:0 !important;}
  .baojiatable th{background:#409EFF !important;color: #fff;}
  .tableqian{border-collapse: collapse;padding:0;}
  .tableqian tr td.jiesuantd{border-bottom: 0 !important;}
  .tableqian tr td.baojiatd{border-bottom: 0 !important;}

}

  
</style>
