<template>
    <div class="checkCarryDetail">
       <h3 class="alignleft">查看详情</h3>
        <table>
          <tr>
            <td>状态</td><td>{{getcashdata.status==1?'待处理':(getcashdata.status==2?'已转账':'转账失败')}}</td>
          </tr>
          <!-- <tr>
            <td>处理结果</td><td>{{getcashdata.dealResult=='1'?'待处理':(getcashdata.dealResult=='2'?'处理成功':'处理失败')}}</td>
          </tr> -->
          <tr>
            <td>组织</td><td>{{getcashdata.orgName}}</td>
          </tr>
          <tr>
            <td>提现金额</td><td>{{getcashdata.withdrawalAmount}}</td>
          </tr>
          <tr>
            <td>申请人</td><td>{{getcashdata.withdrawalName}}</td>
          </tr>
          <tr>
            <td>申请时间</td><td>{{getcashdata.withdrawalTime}}</td>
          </tr>
          <tr>
            <td>开户银行</td><td>{{getcashdata.bank}}</td>
          </tr>
          <tr>
            <td>账户名称</td><td>{{getcashdata.accountName}}</td>
          </tr>
          <tr>
            <td>账号</td><td>{{getcashdata.account}}</td>
          </tr>
          <tr v-if="getcashdata.status=='2'">
            <td>转账时间</td><td>{{getcashdata.transferTime}}</td>
          </tr>
          <tr v-if="getcashdata.status=='2'">
            <td>转账凭证</td><td>
                 <template v-for="(item,key) in voucherdata">
                    <div :key="key" :class="divwrap">
                       <img @click="imgdianji(item.transferPathUrl)" :src="item.transferPathUrl" style="width:120px;height:60px;margin-bottom:5px" />
                    </div>
                 </template>
            </td>
          </tr>
          <tr v-if="getcashdata.status!='1'">
            <td>备注</td><td>{{getcashdata.remark}}</td>
          </tr>
          <tr v-if="getcashdata.status!='1'">
            <td>处理人</td><td>{{getcashdata.dealer}}</td>
          </tr>
          <tr v-if="getcashdata.status!='1'">
            <td>处理时间</td><td>{{getcashdata.dealTime}}</td>
          </tr>

        </table>



        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>


        <div :class="fangda" @click="closeimg">
            <img :src="imgData" alt="图片" />
        </div>

    </div>
</template>

<script>
export default {
    name: 'LongancheckCarryDetail',
    data() {
        return{
            prodchangeid:"",  //查看id
            getcashdata:{},  //数据
            voucherdata:[],
            query:'',
            divwrap:'divwrap',
            fangda:'desty',
            imgData:'',
        }
    },
    created(){
        this.prodchangeid=this.$route.query.id;
        this.query=this.$route.query.query
        this.Getdata()
    },
    methods: {



      imgdianji(imgUrl){
          this.fangda="desty donghua"
          this.imgData=imgUrl
        },

        closeimg(){
            this.fangda="desty"
            this.imgData=""
        },


       //取消
      cancelbtn(){
        let query=this.query;
        this.$router.push({name:'LonganCarryDetail',query:{query}})
      },

        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.getcashdetail({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.getcashdata=response.data.data;
                  that.voucherdata=response.data.data.withdrawAccessoryDTOS;
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
.checkCarryDetail{
    width: 80%;
    .alignleft{text-align: left;}
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;width: 170px;border-top: none !important;}
    table {text-align: center; border-collapse: collapse;width: 350px;border-top: 1px solid #e4e4e4;}
    .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}
    }
   .niuwrap{text-align:left;margin-top: 60px;}

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

<style>
   .seeordertitle .el-form-item__label{width:100px;}
</style>


