<template>
    <div class="allorderdetail">
         <h3 class="alignleft">查看详情</h3>
        <table v-if="typejudge=='1'">
          <tr>
            <td>状态</td><td>
                <span v-if="allorderdetail.delivStatus == 0">待确认</span>
                <span v-else-if="allorderdetail.delivStatus == 1">已确认</span>
                <span v-else-if="allorderdetail.delivStatus == 2">已完成</span>
                <span v-else-if="allorderdetail.delivStatus == 3">已取消</span>
              </td>
          </tr>
          <tr>
            <td>房间号</td><td>{{allorderdetail.cabDelivDetail.roomCode}}</td>
          </tr>
          <!-- <tr>
            <td>格子编号</td><td>{{allorderdetail.hotelName}}</td>
          </tr> -->
          <tr>
            <td>商品名称</td><td>{{allorderdetail.cabDelivDetail.prodName}}</td>
          </tr>
          <tr>
            <td>商品金额</td><td>{{allorderdetail.cabDelivDetail.prodRetailPrice}}</td>
          </tr>
          <tr>
            <td>用户ID</td><td>{{allorderdetail.cabDelivDetail.customerId}}</td>
          </tr>
          <tr>
            <td>用户昵称</td><td>{{allorderdetail.cusName}}</td>
          </tr>
          <tr>
            <td>支付时间</td><td>{{allorderdetail.delivSubmitTime}}</td>
          </tr>
          <tr v-if="allorderdetail.delivStatus != 0">
            <td>处理人</td><td>{{allorderdetail.delivSureEmpName}}</td>
          </tr>
          <tr v-if="allorderdetail.delivStatus != 0">
            <td>处理时间</td><td>{{allorderdetail.delivSureTime}}</td>
          </tr>
          <tr v-if="allorderdetail.delivStatus == '2'">
            <td>配送人</td><td>{{allorderdetail.delivCompleteEmpName}}</td>
          </tr>
          <tr v-if="allorderdetail.delivStatus == '2'">
            <td>配送时间</td><td>
              <span v-if="allorderdetail.delivCompleteTime!='2037-12-31 00:00:00'">{{allorderdetail.delivCompleteTime}}</span>
              <span v-if="allorderdetail.delivCompleteTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
        </table>

        <table v-else-if="typejudge=='2'">
          <tr>
            <td>状态</td><td>
                <span v-if="allorderdetail.delivStatus == 0">待确认</span>
                <span v-else-if="allorderdetail.delivStatus == 1">已确认</span>
                <span v-else-if="allorderdetail.delivStatus == 2">已完成</span>
                <span v-else-if="allorderdetail.delivStatus == 3">已取消</span>
                </td>
          </tr>
          <tr>
            <td>房间号</td><td>{{allorderdetail.rmsvcDelivDetail.roomCode}}</td>
          </tr>
          <tr v-for="(item,key) in orderinfo" :key="key">
             <td>{{item.ordertitle}}</td><td><span v-if="item.hdetailName!=''">{{item.hdetailName}}*{{item.amount}},{{item.priceDesc}}</span><span v-if="item.hdetailName==''"></span></td>
          </tr>
          <tr>
            <td>送达时间</td><td>{{allorderdetail.rmsvcDelivDetail.arrivedAt}}</td>
          </tr>
          <tr>
            <td>姓名</td><td>{{allorderdetail.rmsvcDelivDetail.customerName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{allorderdetail.rmsvcDelivDetail.mobile}}</td>
          </tr>
          <tr>
            <td>备注</td><td>{{allorderdetail.rmsvcDelivDetail.remark}}</td>
          </tr>
          <tr>
            <td>提交时间</td><td>{{allorderdetail.delivSubmitTime}}</td>
          </tr>
          <tr v-if="allorderdetail.rmsvcDelivDetail.status == 3">
            <td>取消时间</td><td>
              <span v-if="allorderdetail.delivCancelTime!='2037-12-31 00:00:00'">{{allorderdetail.delivCancelTime}}</span>
              <span v-if="allorderdetail.delivCancelTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
          <tr v-if="allorderdetail.rmsvcDelivDetail.status == 1 || allorderdetail.rmsvcDelivDetail.status == 2">
            <td>处理人</td><td>{{allorderdetail.delivSureEmpName}}</td>
          </tr>
          <tr v-if="allorderdetail.rmsvcDelivDetail.status == 1 || allorderdetail.rmsvcDelivDetail.status == 2">
            <td>处理时间</td><td>{{allorderdetail.delivSureTime}}</td>
          </tr>
          <tr v-if="allorderdetail.rmsvcDelivDetail.status == 2">
            <td>配送人</td><td>{{allorderdetail.delivCompleteEmpName}}</td>
          </tr>
          <tr v-if="allorderdetail.rmsvcDelivDetail.status == 2">
            <td>配送时间</td><td>
              <span v-if="allorderdetail.delivCompleteTime!='2037-12-31 00:00:00'">{{allorderdetail.delivCompleteTime}}</span>
              <span v-if="allorderdetail.delivCompleteTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
        </table>


       <div v-else-if="typejudge=='3'">
         <table   cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont" colspan="3">
                    <span v-if="allorderdetail.delivStatus == 0">待确认</span>
                    <span v-else-if="allorderdetail.delivStatus == 1">已确认</span>
                    <span v-else-if="allorderdetail.delivStatus == 2">已完成</span>
                    <span v-else-if="allorderdetail.delivStatus == 3">已取消</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.delivCode}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">楼层</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.roomFloor}}</td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.roomCode}}</td>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额(元)</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.totalAmount}}</td>
                <td class="subTitle">确认时间</td>
                <td class="subcont">
                  <span v-if="allorderdetail.delivSureTime!='2037-12-31 00:00:00'">{{allorderdetail.delivSureTime}}</span>
                  <span v-if="allorderdetail.delivSureTime=='2037-12-31 00:00:00'"></span>
                  </td>
            </tr>
            <tr>
                <td class="subTitle">实付金额(元)</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.actualAmount}}</td>
                <td class="subTitle">配送人</td>
                <td class="subcont">{{allorderdetail.delivCompleteEmpName}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.contactPeople}}</td>
                <td class="subTitle">配送时间</td>
                <td class="subcont">
                  <span v-if="allorderdetail.delivCompleteTime!='2037-12-31 00:00:00'">{{allorderdetail.delivCompleteTime}}</span>
                  <span v-if="allorderdetail.delivCompleteTime=='2037-12-31 00:00:00'"></span>
                  </td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{allorderdetail.hshopDelivDetail.contactMobile}}</td>
                <td class="subTitle">用户留言</td>
                <td class="subcont">
                  {{allorderdetail.hshopDelivDetail.userRemark}}</td>
            </tr>
        </table>
        <br/><br/>
        <el-table :data="allorderdetail.hshopDelivDetail.delivOrderProdDTOList" border style="width:88%;">
            <el-table-column prop="prodOwnerOrgKind" label="类型" align=center>
                <template slot-scope="scope">
                    <span>
                        <span v-if="scope.row.prodOwnerOrgKind == 1">平台</span>
                        <span v-else-if="scope.row.prodOwnerOrgKind == 2">运营商</span>
                        <span v-else-if="scope.row.prodOwnerOrgKind == 3">酒店</span>
                        <span v-else-if="scope.row.prodOwnerOrgKind == 4">供应商</span>
                        <span v-else-if="scope.row.prodOwnerOrgKind == 5">入驻商家</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="prodShopName" label="商家" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.prodShopName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodQuantity" label="商品数量" align=center></el-table-column>
            <el-table-column prop="prodAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="prodActualAmount" label="实付金额" align=center></el-table-column>
            <el-table-column prop="prodState" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.prodState == 0">正常</span>
                    <span v-else-if="scope.row.prodState == 1">退款</span>
                    <span v-else-if="scope.row.prodState == 2">换货</span>
                    <span v-else-if="scope.row.prodState == 3">退货退款</span>
                    <span v-else-if="scope.row.prodState == 4">待确认退款</span>
                </template>
            </el-table-column>
            <el-table-column prop="prodRefundAmount" label="退款金额" align=center></el-table-column>
            <el-table-column prop="prodRefundAt" label="退款时间" width="120px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.prodRefundAt != '1970-01-01 00:00:00'">{{scope.row.prodRefundAt}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="prodRefundOrderAt" label="退货时间" width="120px" align=center>
               <template slot-scope="scope">
                   <span v-if="scope.row.prodRefundOrderAt != '1970-01-01 00:00:00'">{{scope.row.prodRefundOrderAt}}</span>
               </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisibleDelete" width="30%">
            <span>是否确认该配送单？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDelete=false">取消</el-button>
                <el-button type="primary" @click="Confirmdel()">确定</el-button>
            </span>
        </el-dialog>

        <el-row>
          <el-col :span="24" class="niuwrap">
              <el-button type="primary" @click="cancelbtn()">返回</el-button>
              <el-button v-if="allorderdetail.delivStatus==0" @click="handlebtn()" type="primary">确认</el-button>
          </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'HotelAllOrderDetail',
    data() {
        return{
            authzData: '',
            prodchangeid:"",  //查看id
            allorderdetail:{},  //数据
            typejudge:'',
            orderinfo:[],  //订单信息
            dialogVisibleDelete:false,
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
       this.$router.push({name:'HotelAllOrderList'})
      },

      //确认
      handlebtn(){
       let that=this;
       this.dialogVisibleDelete=true;
      },

      //确定
      Confirmdel(){

        let that=this;
        let params="";
            this.$api.SureDelivery({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  this.dialogVisibleDelete=false;
                  this.$message.success("操作成功!")
                  this.$router.push({name:'HotelAllOrderList'})
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



        //更新数据
       Getdata(){
            let that=this;
            let params="";
            this.$api.AllDeliverydetail({params},that.prodchangeid).then(response=>{
                if(response.data.code==0){
                  that.allorderdetail=response.data.data;
                  that.typejudge=response.data.data.delivType;
                  var noworderinfo;
                  if(response.data.data.delivType==2){
                     that.orderinfo=response.data.data.rmsvcDelivDetail.dtos
                     noworderinfo=response.data.data.rmsvcDelivDetail.dtos
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
.allorderdetail{
    width: 80%;
    .alignleft{text-align: left;}
    table tr th, table tr td { border:1px solid #e4e4e4 !important;background: #fff;
    color: #333;font-size: 14px;padding: 5px 10px;border-top: none !important;width: 200px;}
    table {text-align: center; border-collapse: collapse;border-top: 1px solid #e4e4e4;}
   .niuwrap{text-align:left;margin-top: 60px;}

     table tr td.subTitle{
                width: 80px;
                text-align: right;
                color: #909399;
            }

       table tr td.subcont{
            width: 300px;
        }



}

</style>



