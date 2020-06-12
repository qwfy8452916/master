<template>
    <div class="supplierdetail">
         <h3 class="alignleft">查看详情</h3>
        <table>
          <tr>
            <td class="titlebacck">基本信息</td><td class="titlebacck"></td>
          </tr>
          <tr>
            <td class="tdtitle">状态</td><td>{{FormData.reviewStatus==0?'待审核':(FormData.status==1?'通过':'拒绝')}}</td>
          </tr>
          <tr>
            <td>联系人</td><td>{{FormData.merchantContact}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{FormData.merchantContactPhone}}</td>
          </tr>
          <tr>
            <td class="titlebacck">公司信息</td><td class="titlebacck"></td>
          </tr>
          <tr>
            <td>类型</td><td>
              <span v-if="FormData.merchantType=='C'">企业</span>
              <span v-if="FormData.merchantType=='P'">个人</span>
            </td>
          </tr>
          <tr>
            <td>统一社会信用代码/身份证号码</td><td>
              <span v-if="FormData.merchantUscc!=''">{{FormData.merchantUscc}}</span>
              <span v-if="FormData.merchantIdno!=''">{{FormData.merchantIdno}}</span>
            </td>
          </tr>
          <tr>
            <td>公司名称</td><td>{{FormData.merchantName}}</td>
          </tr>

          <tr>
            <td>供应商类型</td><td>
               <span v-if="FormData.supplierType=='1'">工厂</span>
               <span v-if="FormData.supplierType=='2'">品牌商</span>
               <span v-if="FormData.supplierType=='3'">代理商</span>
            </td>
          </tr>
          <tr>
            <td>营业执照</td><td>
                 <div v-for="(item,key) in FormData.merchantLicenseList" :key="key">
                    <a :href="item" target="_blank">{{item}}</a>
                 </div>
            </td>
          </tr>
          <tr>
            <td>地区</td><td>{{FormData.area.dictName}}</td>
          </tr>
          <tr>
            <td>详细地址</td><td>{{FormData.merchantAddress}}</td>
          </tr>

          <tr>
            <td class="titlebacck">产品信息</td><td class="titlebacck"></td>
          </tr>
          <tr>
            <td>供应区域</td><td>
              <div v-if="FormData.supplyAreaList!=null">
                 <span v-for="(item,index) in FormData.supplyAreaList" :key="index">{{item.dictName}}</span>
              </div>
            </td>
          </tr>

          <tr>
            <td>产品信息</td><td>
              <div v-for="(item,index) in FormData.prodDTOS" :key="index">
                   <span  v-if="FormData.prodDTOS!=null">{{item.prodName}}</span>
                    <!-- <a v-if="FormData.prodDTOS!=null" :href="item.prodImagUrl" target="_blank">{{item.prodName}}</a> -->
                    <div v-for="(itemchild,indexchild) in item.prodImagUrls" :key="indexchild">
                        <a :href="itemchild" target="_blank" >{{itemchild}}</a><br>
                    </div>

              </div>
            </td>
          </tr>
          <tr>
            <td>支持发票</td><td>
               <span  v-if="FormData.invoiceFlag=='0'">不支持</span>
               <span  v-if="FormData.invoiceFlag=='1'">普票</span>
               <span  v-if="FormData.invoiceFlag=='2'">专普票</span>
            </td>
          </tr>
          <tr>
            <td>商品销售税率发票</td><td>{{FormData.invoiceTaxRate}}</td>
          </tr>

          <tr>
            <td class="titlebacck">其他信息</td><td class="titlebacck"></td>
          </tr>
          <tr>
            <td>诚意金(元)</td><td>{{FormData.earnest}}</td>
          </tr>
          <tr>
            <td>申请时间</td><td>{{FormData.createdAt}}</td>
          </tr>
        </table>

        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button type="primary" @click="cancelbtn()">返回</el-button>
                <el-button v-if="FormData.reviewStatus=='0'" type="primary" @click="handle()">审核</el-button>
            </el-col>
        </el-row>

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete1" width="30%">
            <span>是否审核通过？</span>
            <span slot="footer">
                <el-button @click="refuse()">拒绝</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'LonganSupplierDetail',
    data() {
        return{
            authzData: '',
            supplierid:"",  //查看id
            FormData:{
              area:{
                dictName:'',
              }
            },  //数据
            accessoryPath:[],   //订单信息

            dialogVisibleDelete1:false,
            jinejudge:true,
        }
    },
    created(){
        this.supplierid=this.$route.query.id;
        this.Getdata()
    },
    mounted(){
      (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'LonganSupplierApply'})
      },

       //处理
        handle(index,row){
          this.dialogVisibleDelete1=true;
        },

        refuse(){
          let that=this;
          this.supplierExamine(2)
        },

        Confirmdel(){
          let that=this;
          this.supplierExamine(1)
        },

       supplierExamine(reviewResult ){
         let that=this;
         let params=""
         this.$api.supplierExamine({params},that.supplierid,reviewResult).then(response=>{
                if(response.data.code==0){
                   this.dialogVisibleDelete1=false;
                   this.$message.success("操作成功!")
                   that.$router.push({name:'LonganSupplierApply'})
                }else{
                  this.$alert(response.data.msg,"警告",{
                    confirmButtonText: "确定"
                   })
                }
            }).catch(err=>{
              this.$alert(err,"警告",{
                  confirmButtonText: "确定"
              })
            })

       },




        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.supplierdetail({params},that.supplierid).then(response=>{
                if(response.data.code==0){
                  that.FormData=response.data.data
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
.supplierdetail{
    width: 80%;
    .alignleft{text-align: left;}
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;width: 170px;border-top: none !important;}
    table {text-align: center; border-collapse: collapse;width: 500px;border-top: 1px solid #e4e4e4;}
   .niuwrap{text-align:left;margin-top: 60px;}
   table tr td.titlebacck{background: #e4e4e4 !important;}
   table tr td.titlebacck:nth-child(odd){
     border-right: 1px solid #fff !important;
   }



}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hanginput{
     .el-input__inner,.el-textarea__inner{width: 220px;box-sizing: border-box;}
   }
</style>


