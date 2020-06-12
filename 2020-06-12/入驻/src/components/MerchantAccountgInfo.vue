<template>
    <div class="MerchantAccountgMan">
       <h3 class="alignleft">账户管理</h3>
       <div class="btnwrap">
           <el-button v-if="authzlist['F:BM_FIN_MERACCOUNTINFO_WAITINCOME']" type="primary" class="waiteBtn" @click="waiteRecord">待入账记录></el-button>
           <el-button v-if="authzlist['F:BM_FIN_MERACCOUNTINFO_INCOME']" type="warning" class="entrydis" @click="entryRecord">入账记录></el-button>
           <el-button v-if="authzlist['F:BM_FIN_ACCOUNT_APPLYGETCASH']" type="success" @click="applycash">提现></el-button>
           <el-button v-if="authzlist['F:BM_FIN_ACCOUNT_CHECKGETCASH']" type="primary" @click="Merchantgetcashdetail">提现记录></el-button>
       </div>
       <el-table :data="amountInfo" border stripe style="width:100%;">
          <el-table-column prop="revenueAmount" label="分成总额" align="center">
            <template slot-scope="scope">
               <span>{{scope.row.revenueAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pendingAmount" label="待入账总额" align="center">
            <template slot-scope="scope">
               <span>{{scope.row.pendingAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="withdrawAmount" label="提现总额" align="center">
            <template slot-scope="scope">
               <span>{{scope.row.withdrawAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="withdrawMayAmount" label="可提现总额" align="center">
            <template slot-scope="scope">
               <span>{{scope.row.withdrawMayAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="frozeAmount" label="提现中金额" align="center">
            <template slot-scope="scope">
               <span>{{scope.row.frozeAmount}}</span>
            </template>
          </el-table-column>
       </el-table>
       <!-- <div class="wrap">
           <div class="hangitem"><span>销售总额(元)：</span>{{accountdetail.salesAmount}}</div>
           <div class="hangitem"><span>分成总额(元)：</span>{{accountdetail.revenueAmount}}</div>
           <div class="hangitem"><span>提现总额(元)：</span>{{accountdetail.withdrawAmount}}</div>
           <div class="hangitem"><span>可提现余额(元)：</span><span>{{accountdetail.withdrawMayAmount}}</span>
           <el-button v-if="authzlist['F:BM_FIN_ACCOUNT_APPLYGETCASH']" class="applycash" type="primary" @click="applycash">申请提现</el-button></div>
           <div class="hangitem"><span>账户锁定金额(元):</span>{{accountdetail.frozeAmount}}</div>
           <div class="hangitem"><span v-if="authzlist['F:BM_FIN_ACCOUNT_CHECKDIVIDE']" class="checkdetail" @click="MerchantDividedetail">查看分成明细></span></div>
           <div><span v-if="authzlist['F:BM_FIN_ACCOUNT_CHECKGETCASH']" class="checkdetail" @click="Merchantgetcashdetail">查看提现明细></span></div>
       </div> -->
        <!-- 提现弹窗 -->
          <el-dialog title="" :visible.sync='dialogVisibleDelete' center width="30%">
              <div class="diacontent">
                  <div class="diahangitem">请输入提现金额</div>
                  <div class="diahangitem jinewrap">
                    <input v-model="getcashcount" class="jineput" type="text" placeholder="￥">
                  </div>
                  <div v-if="tiperror" class="diahangitem redcolor">提现金额错误</div>
                  <div class="diahangitem">请确认账户信息</div>
                  <div class="diahangitem hangwrap">
                     <span class="inputitle">开户银行</span>
                     <input v-model="bankdetail.bank" type="text" :disabled="true" placeholder="请输入开户银行账户">
                  </div>
                  <div class="diahangitem hangwrap">
                     <span class="inputitle">账户名称</span>
                     <input type="text" v-model="bankdetail.bankAccountName" :disabled="true" placeholder="请输入账户名称">
                  </div>
                  <div class="diahangitem hangwrap">
                     <span class="inputitle">账 &nbsp&nbsp&nbsp&nbsp 号</span>
                     <input type="text" v-model="bankdetail.bankAccount" :disabled="true" placeholder="请填写账号">
                  </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="diacancel">取 消</el-button>
                <el-button v-if="authzlist['F:BM_FIN_ACCOUNT_APPLYGETCASHSUBMIT']" type="primary" @click="submitniu">提 交</el-button>
                <div class="ruleswrap">
                  <div class="rulestitle">提现规则：</div>
                  <div>每周能提现两次，每周一，周四为可提现日.</div>
                  <div>申请提现后，提现金额进入审核阶段。</div>
                  <div>审核通过后提现金额将转入您的账户，请注意查收.</div>
               </div>
              </div>

          </el-dialog>
        <!-- 提现弹窗 -->
    </div>
</template>

<script>
export default {
    name: 'MerchantAccountgInfo',
    data() {
        return{
          authzlist: {}, //权限数据
          amountInfo:[], //账户金额信息
          orgId:'',
          dialogVisibleDelete:false,
          accountData:[{name:255}],
          accountdetail:{},
          bankdetail:{},
          bankid:'',
          getcashcount:'',
          tiperror:false,
        }
    },
    created(){
        this.orgId=localStorage.orgId;
        this.getAccountAmount();
        // this.Getdata()
    },

     mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
     },

    methods: {
       applycash(){
         this.tiperror=false
         this.getcashcount='';
         this.dialogVisibleDelete=true;

        //  this.Getbankdata();

       },

       //取消
       diacancel(){
         this.dialogVisibleDelete=false;
         this.tiperror=false
       },

       //提交
       submitniu(){
         let that=this;
         this.tiperror=false
         if(isNaN(this.getcashcount)){
            this.tiperror=true
            return false;
         }
         if(this.getcashcount=='' || this.getcashcount=='0'){
            this.$message.error('请输入提现金额!')
            return false;
         }
         if(this.getcashcount<0){
            this.tiperror=true
            return false;
         }
         if(this.getcashcount>this.accountdetail.withdrawMayAmount){
            this.$message.error('提现金额不能大于可提现金额!')
            return false;
         }
         if(that.bankdetail.bank=='' || that.bankdetail.bank==null){
           this.$message.error('账户信息不完整!')
           return false;
         }
         if(that.bankdetail.bankAccountName=='' || that.bankdetail.bankAccountName==null){
           this.$message.error('账户信息不完整!')
           return false;
         }
         if(that.bankdetail.bankAccount=='' || that.bankdetail.bankAccount==null){
           this.$message.error('账户信息不完整!')
           return false;
         }
         if(that.bankdetail.accountStatus=='1'){
           this.$message.error('您的账户已被冻结!')
           return false;
         }
         let params={
             withdrawalAmount:that.getcashcount,
             bank:that.bankdetail.bank,
             accountName:that.bankdetail.bankAccountName,
             account:that.bankdetail.bankAccount,
            //  oprId:that.bankdetail.oprId,
             accountId:that.accountdetail.id
         }

         this.$api.getmoney(params).then(response=>{
                if(response.data.code==0){
                  that.dialogVisibleDelete=false;
                  // that.Getdata()
                  that.getAccountAmount();
                  that.$message.success('操作成功')
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

       //查看分成明细
      //  MerchantDividedetail(){
      //    this.$router.push({name:'MerchantDividedetail'})
      //  },

      //待入账记录
      waiteRecord(){
        this.$router.push({name:"MerchantWaiteEntryRecord"})
      },

      //入账记录
      entryRecord(){
        this.$router.push({name:"MerchantEntryRecord"})
      },

       //查看提现明细
       Merchantgetcashdetail(){
         this.$router.push({name:'Merchantgetcashdetail'})
       },

        //新财务获取账户金额信息
       getAccountAmount(){
         let that=this;
         let params={
           orgId:this.orgId,
         }
         this.$api.getAccountAmount({params}).then(response=>{
           if(response.data.code==0){
              that.bankdetail=response.data.data
              that.amountInfo.push(response.data.data);
           }else{
              that.$message.error(response.data.msg)
           }
         }).catch(error=>{
           that.$alert(response.data.msg,"警告",{
             confirmButtonText:"确定"
           })
         })
       },

       //获取账户信息
       Getdata(){
            let that=this;
            let params={
               orgAs:5
            };
            this.$api.accountInfo({params}).then(response=>{
                if(response.data.code==0){
                  that.accountdetail=response.data.data
                  that.bankid=response.data.data.orgId
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

        //获取银行信息
       Getbankdata(){
            let that=this;
            let params={
               orgId :that.bankid
            };
            this.$api.bankInfo({params}).then(response=>{

                if(response.data.code==0){
                  this.dialogVisibleDelete=true;
                  that.bankdetail=response.data.data
                  console.log(that.bankdetail)
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
        }

    }
}
</script>



<style lang="less" scoped>
.MerchantAccountgMan{
    color:#333;
    .alignleft{text-align: left;}
    .btnwrap{
      text-align: left;
      margin-bottom: 15px;
    }
    .waiteBtn{
      background: #8400ff;
      border-color: #8400ff;
    }
    .entrydis{
      margin-right: 150px;
    }

    // .wrap{padding: 30px 60px;box-sizing: border-box;
    // border: 1px solid #bcbcbc;text-align: left;
    // .hangitem{margin-bottom: 25px;
    //  .applycash{margin-left: 30px;}
    // }
    // .checkdetail{font-size: 14px;color: #199ed8;cursor: pointer;}
    // }
    .diacontent{overflow: hidden;
     .diahangitem{margin-bottom: 10px;}
     .redcolor{color: #ff5353;}
     .jineput{height: 40px;line-height: 40px;outline: none;padding-left: 10px;
     width: 100%;box-sizing: border-box;font-size: 14px;}
     .jinewrap{position: relative;}
     .hangwrap{border-bottom: 1px solid #e4e4e4;position: relative;
      input{height: 30px;line-height: 30px;outline: none;border: none;
      padding-left: 85px;box-sizing: border-box;}
      input:disabled{background: #fff;}
      .inputitle{position: absolute;left: 0px;top: 5px;color: #333;}
     }
    }
    .ruleswrap{text-align: left;font-size: 12px;color: #949494;line-height: 20px;
    margin-top: 20px;
     .rulestitle{font-size: 14px;color: #333;}
    }

}

</style>


<style lang="less">
 .MerchantAccountgMan{
   .el-dialog--center .el-dialog__body{padding: 10px 25px !important;}
   }
</style>

