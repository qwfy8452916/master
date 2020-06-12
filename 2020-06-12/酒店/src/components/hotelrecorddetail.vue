<template>
    <div class="purchaseadd">

        <table>
          <tr>
            <td>状态</td><td>{{commodityFormData.status===0?'待确认':(commodityFormData.status===1?'已确认':'已取消')}}</td>
          </tr>
          <tr>
            <td>房间号</td><td>{{commodityFormData.roomCode}}</td>
          </tr>
          <tr v-for="(item,key) in orderinfo" :key="key">
            <td>{{item.ordertitle}}</td><td><span v-if="item.hdetailName!=''">{{item.hdetailName}}*{{item.amount}},{{item.priceDesc}}</span><span v-if="item.hdetailName==''"></span></td>
          </tr>
          <tr>
            <td>送达时间</td><td>{{commodityFormData.arrivedAt}}</td>
          </tr>
          <tr>
            <td>姓名</td><td>{{commodityFormData.customerName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{commodityFormData.mobile}}</td>
          </tr>
          <tr>
            <td>备注</td><td>{{commodityFormData.remark}}</td>
          </tr>
          <tr>
            <td>提交时间</td><td>{{commodityFormData.createdAt}}</td>
          </tr>
        </table>



        <el-row>
        <el-col :span="24" class="niuwrap">
                <el-button type="primary" @click="cancelbtn()">返回</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'hotelrecorddetail',
    data() {
        return{
            prodchangeid:"",  //查看id
            commodityFormData:{},  //数据
            orderinfo:[],   //订单信息
        }
    },
    created(){
        this.prodchangeid=this.$route.params.productid;
        this.Getdata()
    },
    methods: {


       //取消
      cancelbtn(){
       this.$router.push({name:'checkhotelrecord'})
      },

        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.getserverrecorddetail({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.commodityFormData=response.data.data
                  let noworderinfo=response.data.data.dtos
                  if(noworderinfo.length>0){
                     for(var i=0;i<noworderinfo.length;i++){
                       if(i==0){
                        noworderinfo[i].ordertitle="订单信息"
                      }else{
                        noworderinfo[i].ordertitle=""
                      }
                     }
                     that.orderinfo=noworderinfo
                  }else{
                    that.orderinfo=[{"ordertitle":"订单信息","hdetailName":"","amount":"","priceDesc":""}]
                  }
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
.purchaseadd{
    width: 80%;
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;width: 170px;border-top: none !important;}
    table {text-align: center; border-collapse: collapse;width: 350px;border-top: 1px solid #e4e4e4;}
    .wraptextarea{width:100%;margin-top:30px;
      .textarea{width:400px;}
    }
   .niuwrap{text-align:left;margin-top: 60px;}
}

</style>

<style>
   .seeordertitle .el-form-item__label{width:100px;}
</style>


