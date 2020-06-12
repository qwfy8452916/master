<template>
    <div class="guestminidelidetail">
         <h3 class="alignleft">查看详情</h3>
        <table v-if="deliveryType==1">
          <tr>
            <td>状态</td><td>
              <span v-if="guestminidelidata.delivStatus==0">待确认</span>
              <span v-if="guestminidelidata.delivStatus==1">已确认</span>
              <span v-if="guestminidelidata.delivStatus==2">已完成</span>
              <span v-if="guestminidelidata.delivStatus==3">已取消</span>
            </td>
          </tr>
          <tr>
            <td>酒店名称</td><td>{{guestminidelidata.hotelName}}</td>
          </tr>
          <tr>
            <td>房间号</td><td>{{guestminidelidata.cabDelivDetail.roomCode}}</td>
          </tr>
          <!-- <tr>
            <td>格子编号</td><td>{{guestminidelidata.roomCode}}</td>
          </tr> -->
          <tr>
            <td>商品名称</td><td>{{guestminidelidata.cabDelivDetail.prodName}}</td>
          </tr>
          <tr>
            <td>商品金额</td><td>{{guestminidelidata.cabDelivDetail.prodRetailPrice}}</td>
          </tr>
          <tr>
            <td>用户id</td><td>{{guestminidelidata.cabDelivDetail.customerId}}</td>
          </tr>
          <tr>
            <td>用户昵称</td><td>{{guestminidelidata.cusName}}</td>
          </tr>
          <tr>
            <td>支付时间</td><td>{{guestminidelidata.delivSubmitTime}}</td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus!=0">
            <td>确认人</td><td>{{guestminidelidata.delivSureEmpName}}</td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus!=0">
            <td>确认时间</td><td>
              <span v-if="guestminidelidata.delivSureTime!='2037-12-31 00:00:00'">{{guestminidelidata.delivSureTime}}</span>
              <span v-if="guestminidelidata.delivSureTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus==2">
            <td>配送人</td><td>{{guestminidelidata.delivCompleteEmpName}}</td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus==2">
            <td>配送时间</td><td>
              <span v-if="guestminidelidata.delivCompleteTime!='2037-12-31 00:00:00'">{{guestminidelidata.delivCompleteTime}}</span>
              <span v-if="guestminidelidata.delivCompleteTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
        </table>

        <table v-else-if="deliveryType==2">
          <tr>
            <td>状态</td><td>
              <span v-if="guestminidelidata.delivStatus==0">待确认</span>
              <span v-if="guestminidelidata.delivStatus==1">已确认</span>
              <span v-if="guestminidelidata.delivStatus==2">已完成</span>
              <span v-if="guestminidelidata.delivStatus==3">已取消</span></td>
          </tr>
          <tr>
            <td>酒店名称</td><td>{{guestminidelidata.hotelName}}</td>
          </tr>
          <tr>
            <td>房间号</td><td>{{guestminidelidata.rmsvcDelivDetail.roomCode}}</td>
          </tr>
          <tr v-for="(item,key) in orderinfo" :key="key">
             <td>{{item.ordertitle}}</td><td><span v-if="item.hdetailName!=''">{{item.hdetailName}}*{{item.amount}},{{item.priceDesc}}</span><span v-if="item.hdetailName==''"></span></td>
          </tr>
          <tr>
            <td>送达时间</td><td>{{guestminidelidata.rmsvcDelivDetail.arrivedAt}}</td>
          </tr>
          <tr>
            <td>姓名</td><td>{{guestminidelidata.rmsvcDelivDetail.customerName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{guestminidelidata.rmsvcDelivDetail.mobile}}</td>
          </tr>
          <tr>
            <td>备注</td><td>{{guestminidelidata.rmsvcDelivDetail.remark}}</td>
          </tr>
          <tr>
            <td>提交时间</td><td>{{guestminidelidata.delivSubmitTime}}</td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus==3">
            <td>取消时间</td><td>
              <span v-if="guestminidelidata.delivCancelTime=='2037-12-31 00:00:00'"></span>
              <span v-if="guestminidelidata.delivCancelTime!='2037-12-31 00:00:00'">{{guestminidelidata.delivCancelTime}}</span>
              </td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus!=3">
            <td>确认人</td><td>{{guestminidelidata.delivSureEmpName}}</td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus!=3">
            <td>确认时间</td><td>
              <span v-if="guestminidelidata.delivSureTime!='2037-12-31 00:00:00'">{{guestminidelidata.delivSureTime}}</span>
              <span v-if="guestminidelidata.delivSureTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus==2">
            <td>配送人</td><td>{{guestminidelidata.delivCompleteEmpName}}</td>
          </tr>
          <tr v-if="guestminidelidata.delivStatus==2">
            <td>配送时间</td><td>
              <span v-if="guestminidelidata.delivCompleteTime!='2037-12-31 00:00:00'">{{guestminidelidata.delivCompleteTime}}</span>
              <span v-if="guestminidelidata.delivCompleteTime=='2037-12-31 00:00:00'"></span>
              </td>
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
    name: 'LonganGuestMiniDelidetail',
    data() {
        return{
            authzData: '',
            prodchangeid:"",  //查看id
            guestminidelidata:{},  //数据
            deliveryType:'',  //配送单类型
            orderinfo:[],  //订单信息
            typejudge:true,
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
       this.$router.push({name:'LonganAllDelivery'})
      },



        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.AllDeliverydetail({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.guestminidelidata=response.data.data;
                  that.deliveryType = response.data.data.delivType;

                  var noworderinfo;
                  if(response.data.data.delivType==2){
                      that.orderinfo=response.data.data.rmsvcDelivDetail.dtos;
                      noworderinfo=response.data.data.rmsvcDelivDetail.dtos;
                  }else{
                      that.orderinfo=[];
                      noworderinfo=[];
                  }

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
        },


    }
}
</script>

<style lang="less" scoped>
.guestminidelidetail{
    width: 80%;
    .alignleft{text-align: left;}
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;width: 170px;border-top: none !important;}
    table {text-align: center; border-collapse: collapse;width: 350px;border-top: 1px solid #e4e4e4;}
   .niuwrap{text-align:left;margin-top: 60px;}


}

</style>

<style lang="less">
   .seeordertitle .el-form-item__label{width:100px;}
   .hanginput{
     .el-input__inner,.el-textarea__inner{width: 220px;box-sizing: border-box;}
   }
</style>


