<template>
    <div class="platdeliverydetail">
        <p class="title">订单商品详情</p>
        <table cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">订单状态</td>
                <td class="subcont">
                    <span v-if="orderProdDataDetail.orderStatus == 0">待支付</span>
                    <span v-else-if="orderProdDataDetail.orderStatus == 1">已支付</span>
                    <span v-else-if="orderProdDataDetail.orderStatus == 2">已取消</span>
                    <span v-else-if="orderProdDataDetail.orderStatus == 3">部分退款</span>
                    <span v-else-if="orderProdDataDetail.orderStatus == 4">全部退款</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">订单号</td>
                <td class="subcont">{{orderProdDataDetail.orderCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{orderProdDataDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">楼层</td>
                <td class="subcont">{{orderProdDataDetail.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{orderProdDataDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品总数</td>
                <td class="subcont">{{orderProdDataDetail.prodCount}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{orderProdDataDetail.totalAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{orderProdDataDetail.actualPay}}</td>
            </tr>
            <tr>
                <td class="subTitle">抵扣金额</td>
                <td class="subcont">{{orderProdDataDetail.deductAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">优惠金额</td>
                <td class="subcont">{{orderProdDataDetail.couponAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">使用数量</td>
                <td class="subcont">{{orderProdDataDetail.vouUserCount}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户id</td>
                <td class="subcont">{{orderProdDataDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{orderProdDataDetail.nickName}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{orderProdDataDetail.contactName}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{orderProdDataDetail.contactPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{orderProdDataDetail.payTime}}</td>
            </tr>
            <tr v-if="orderProdDataDetail.orderStatus == 1">
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{orderProdDataDetail.payCompleteTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">现场送留言</td>
                <td class="subcont">{{orderProdDataDetail.roomDeliveryRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">快递送留言</td>
                <td class="subcont">{{orderProdDataDetail.expressRemark}}</td>
            </tr>
            <tr v-if="orderProdDataDetail.orderStatus == 2">
                <td class="subTitle">取消类型</td>
                <td class="subcont">
                    <span v-if="orderProdDataDetail.cancelType == 1">用户取消</span>
                    <span v-else>自动取消</span>
                </td>
            </tr>
            <tr v-if="orderProdDataDetail.orderStatus == 2">
                <td class="subTitle">取消时间</td>
                <td class="subcont">{{orderProdDataDetail.cancelTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">分享人</td>
                <td class="subcont">{{orderProdDataDetail.shareUserName}}</td>
            </tr>
        </table>
        <br/><br/>
        <el-button type="primary" @click="couponUseDetails">查看使用的卡券</el-button>
        <el-table :data="orderProdDataDetail.orderDetailDTOList" border style="width:100%;">
            <el-table-column prop="funcName" label="功能区" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="prodProductDTO.prodShowName" label="显示名称"></el-table-column>
            <el-table-column prop="prodGenre" label="商品形式" align=center></el-table-column>
            <el-table-column prop="prodSpecs" label="商品规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="discountWay" label="优惠方式" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.discountWay == 1">订房满减券</span>
                    <span v-else-if="scope.row.discountWay == 2">订房折扣券</span>
                </template>
            </el-table-column>
            <el-table-column prop="couponAmount" label="优惠金额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="vouUserCount" label="使用数量" align=center></el-table-column>
            <!-- <el-table-column prop="vouIsUse" label="领用" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.vouIsUse == 0">否</span>
                    <span v-else-if="scope.row.vouIsUse == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column prop="vouIsUse" label="领用数量" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.vouIsUse == 1"></span>
                </template>
            </el-table-column> -->
            <el-table-column prop="deductAmount" label="抵扣金额" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="deliveryWay" label="配送方式" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.deliveryWay == 1">店内送</span>
                    <span v-else-if="scope.row.deliveryWay == 2">快递送</span>
                    <span v-else-if="scope.row.deliveryWay == 3">迷你吧</span>
                    <span v-else-if="scope.row.deliveryWay == 4">自提</span>
                    <span v-else-if="scope.row.deliveryWay == 5">电子券</span>
                </template>
            </el-table-column>
            <el-table-column prop="expressPerson" label="收件人"></el-table-column>
            <el-table-column prop="expressPhone" label="手机号" min-width="120px" align=center></el-table-column>
            <el-table-column prop="expressAddress" label="地址" min-width="140px"></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">正常</span>
                    <span v-else-if="scope.row.status == 1">已退款</span>
                    <span v-else-if="scope.row.status == 2">已退货退款</span>
                    <span v-else-if="scope.row.status == 3">已申请售后</span>
                </template>
            </el-table-column>
            <el-table-column prop="refundTime" label="退款时间" min-width="120px" align=center></el-table-column>
            <el-table-column prop="returnTime" label="退货时间" min-width="120px" align=center></el-table-column>
            <el-table-column prop="tipFee" label="配送服务费" min-width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.deliveryWay == 1 || scope.row.deliveryWay == 2">{{scope.row.tipFee}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="tipFee" label="补货费" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.deliveryWay == 3">{{scope.row.tipFee}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="expressFee" label="快递费" align=center>
            </el-table-column>
            <el-table-column prop="payChannelFee" label="支付通道费用" min-width="120px" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button :disabled="true" type="text" size="small" @click="couponUserDetails(scope.row.id)">卡券详情</el-button>
                    <el-button type="text" size="small" @click="divideDetail(scope.row.id)">分成详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>

        <el-dialog title="分成详情" :visible.sync="divideDetaildialog" v-if="divideDetaildialog" class="dividedialog">
            <el-form align="left" label-width="120px" :model="divideDetailData" ref="LogisticsEditData">
               <div v-if="divideDetailData.orderType==1">
                  <p class="InfoTitle">商品信息</p>
                  <el-form-item label="商品名称">
                      <span>{{divideDetailData.orderDetailAllocBean.prodName}}</span>
                  </el-form-item>
                  <el-form-item label="显示名称">
                      <span>{{divideDetailData.orderDetailAllocBean.prodShowName}}</span>
                  </el-form-item>
                  <el-form-item label="规格">
                      <span>{{divideDetailData.orderDetailAllocBean.prodSpecs}}</span>
                  </el-form-item>
                  <el-form-item label="商品数量">
                      <span>{{divideDetailData.orderDetailAllocBean.prodCount}}</span>
                  </el-form-item>
                  <el-form-item label="商品价格">
                      <span>￥{{divideDetailData.orderDetailAllocBean.prodPrice}}</span>
                  </el-form-item>
                  <el-form-item label="优惠券金额">
                      <span>￥{{divideDetailData.orderDetailAllocBean.couponAmount}}</span>
                  </el-form-item>
                  <el-form-item label="抵扣金额">
                      <span>￥{{divideDetailData.orderDetailAllocBean.deductAmount}}</span>
                  </el-form-item>
                  <el-form-item label="实付金额">
                      <span>￥{{divideDetailData.orderDetailAllocBean.actualPay}}</span>
                  </el-form-item>
                </div>

                  <p class="InfoTitle">费用信息</p>
                  <el-form-item label="支付通道费">
                      <span>￥{{divideDetailData.orderDetailAllocBean.prodPayChannel}}</span>
                  </el-form-item>

                  <el-form-item label="红包">
                      <span>￥{{divideDetailData.orderDetailAllocBean.redPacketAmount}}</span>
                  </el-form-item>
                  <template v-for="(item,key) in divideDetailData.orderDetailAllocDetailDTOS">
                    <el-form-item :label=item.deductObj  :key="key" v-if="item.deductObj==='分享奖励' || item.deductObj==='管理奖励'">
                        <span>￥{{item.deductAmount}}</span>
                    </el-form-item>
                  </template>
                  <p class="InfoTitle">成本信息</p>
                     <div v-if="divideDetailData.allocType===0">
                        <el-form-item label="供货价">
                          <span>￥{{divideDetailData.prodSupplyPrice}}</span>
                        </el-form-item>
                        <el-form-item label="零售价">
                          <span>￥{{divideDetailData.prodPrice}}</span>
                        </el-form-item>
                     </div>
                     <div v-if="divideDetailData.allocType===1">
                        <el-form-item label="零售价">
                          <span>￥{{divideDetailData.prodPrice}}</span>
                        </el-form-item>
                        <el-form-item label="佣金比例">
                          <span>{{divideDetailData.commissionRate}}%</span>
                        </el-form-item>
                     </div>

                  <p class="InfoTitle">利润信息</p>
                  <template v-for="(item,key) in divideDetailData.orderDetailAllocDetailDTOS">
                    <div :key="key" v-if="item.deductObj!='分享奖励' || item.deductObj!='管理奖励'" style="margin-bottom:5px">
                      <span class="leftitle" style="margin-right:30px">{{item.deductObj}}({{item.orgOrUserName}})</span>
                      <span>￥{{item.deductAmount}}</span><span class="dividebli">({{item.revenueRate}}%)</span>
                    </div>

                  </template>
                  <div v-if="divideDetailData.refundAmount>0">
                    <p class="InfoTitle">退款信息</p>
                    <el-form-item label="退款金额">
                        <span>{{divideDetailData.refundAmount}}</span>
                    </el-form-item>
                    <el-form-item label="支付通道费">
                        <span>{{divideDetailData.refundPayChannelAmount}}</span>
                    </el-form-item>
                    <template v-for="(item,key) in divideDetailData.orderDetailAllocRefundList">
                      <!-- <el-form-item :label=item.deductObj :key="key">
                          <span>￥{{item.deductAmount}}</span>
                      </el-form-item> -->
                        <div :key="key" style="margin-bottom:5px">
                          <span style="margin-right:30px">{{item.deductObj}}({{item.orgOrUserName}})</span>
                          <span>￥{{item.deductAmount}}</span>
                      </div>
                    </template>
                  </div>
              </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganOrderProductDetails',
    data(){
        return {
            authzlist: {}, //权限数据
            divideDetailData:{},
            opId: '',
            orderProdDataDetail: [],
            divideDetaildialog:false,

        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.opId = this.$route.query.id;
        this.orderProdDetail();
    },
    methods: {
        //订单商品详情
        orderProdDetail(){
            const params = {};
            const id = this.opId;
            this.$api.orderProdDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == 0){
                        this.orderProdDataDetail = result.data;
                        this.orderProdDataDetail.orderDetailDTOList.map(item => {
                            item.roomCode = result.data.roomCode;
                            return item;
                        });
                    }else{
                        this.$message.error('商品详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //卡券详情-查看使用的卡券
        couponUseDetails(){
            const id = this.orderProdDataDetail.id;
            this.$router.push({name: 'LonganOrderCouponDetails', query: {id}});
        },
        //卡券详情-查看用户卡券详情
        couponUserDetails(id){
            //跳 ‘ 查看用户卡券详情 ’
            this.$router.push({name: 'LonganCardCouponDetail', query: {id}});
        },
        //分成详情
        divideDetail(id){
          this.getDiveideDetail(id)
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
               that.$nextTick(()=>{
                 that.divideDetaildialog=true;
               });
            }else{
              that.$message.error(response.data.msg)
            }

          }).catch(error=>{
            that.$alert(response.data.msg,"警告",{
              confirmButtonText:"确定"
            })
          })
        },



        //返回
        returnList(){
            this.$router.push({name: 'LonganOrderList'});
        }
    }
}
</script>

<style lang="less">

.platdeliverydetail{
   .el-dialog__body{
        padding-top: 0px !important;
      }
    .el-dialog__footer{
    text-align: center;
    }
    .el-date-editor.el-input{
        width: 100%;
    }
    .dividedialog{
          .el-dialog{
            height: 70%;
            overflow-y: scroll;
          }
          .el-form-item__label{
             text-align: left;
          }
      }
}
</style>

<style lang="less" scoped>
.platdeliverydetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .deliveryTable{
        font-size: 14px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
        margin-right: 80px;
        margin-bottom: 50px;
        float: left;
        td{
            height: 30px;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            padding: 0px 10px;
        }
        .subTitle{
            width: 80px;
            text-align: left;
            color: #909399;
        }
        .subcont{
            width: 260px;
        }
    }
    .InfoTitle{
        padding: 10px 0;
        border-bottom: 1px solid #d7d7d7;
      }
      .el-form-item{
        margin-bottom: 5px !important;
      }
      .dividebli{
          margin-left: 30px;
          color: #999;
        }
        .leftitle{
          width: 245px;
          display: inline-block;
          text-align: left;
        }



}
</style>


<!-- 旧版
<template>
    <div class="LonganOrderProductDetails">
        <div class="font-bt">订单商品详情</div>
        <ul class="HotelRevenueDetail-ul">
            <li>
                <div class="table-font1">订单状态</div>
                <div class="table-font2" v-if="detailList.orderStatus == 0">待支付</div>
                <div class="table-font2" v-else-if="detailList.orderStatus == 1">已支付</div>
                <div class="table-font2" v-else-if="detailList.orderStatus == 2">已取消</div>
            </li>
            <li>
                <div class="table-font1">订单编号</div>
                <div class="table-font2">{{detailList.orderCode}}</div>
            </li>
            <li>
                <div class="table-font1">酒店名称</div>
                <div class="table-font2">{{detailList.hotelName}}</div>
            </li>
            <li>
                <div class="table-font1">商品总数</div>
                <div class="table-font2">{{detailList.prodCount}}</div>
            </li>
            <li>
                <div class="table-font1">商品金额</div>
                <div class="table-font2">{{detailList.totalAmount}}</div>
            </li>
            <li>
                <div class="table-font1">实付金额</div>
                <div class="table-font2">{{detailList.actualPay}}</div>
            </li>
            <li>
                <div class="table-font1">用户id</div>
                <div class="table-font2">{{detailList.customerId}}</div>
            </li>
            <li>
                <div class="table-font1">用户昵称</div>
                <div class="table-font2">{{detailList.nickName}}</div>
            </li>
            <li>
                <div class="table-font1">联系人</div>
                <div class="table-font2">{{detailList.contactName}}</div>
            </li>
            <li>
                <div class="table-font1">手机号</div>
                <div class="table-font2">{{detailList.contactPhone}}</div>
            </li>
            <li>
                <div class="table-font1">下单时间</div>
                <div class="table-font2">{{detailList.createdAt}}</div>
            </li>
            <li>
                <div class="table-font1">客房配送留言</div>
                <div class="table-font2">{{detailList.roomDeliveryRemark}}</div>
            </li>
            <li>
                <div class="table-font1">快递到家留言</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li v-if="detailList.cancelType != 0">
                <div class="table-font1">取消类型</div>
                <div class="table-font2" v-if="detailList.cancelType == 1">手动取消</div>
                <div class="table-font2" v-else-if="detailList.cancelType == 2">自动取消</div>
            </li>
            <li v-if="detailList.cancelType != 0">
                <div class="table-font1">取消时间</div>
                <div class="table-font2">{{detailList.cancelTime}}</div>
            </li>
        </ul>

        <el-table :data="orderProdDTOS" border style="width:100%;margin-bottom: 30px;" >
            <el-table-column prop="hotelProductDTO.prodProductDTO.prodName" label="商品名称"></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="deliveryWay" label="配送方式" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.deliveryWay == '1'">客房配送</span>
                    <span v-else-if="scope.row.deliveryWay == '2'">快递</span>
                </template>
            </el-table-column>
            <el-table-column prop="expressPerson" label="收件人" align=center></el-table-column>
            <el-table-column prop="expressPhone" label="手机号" align=center></el-table-column>
            <el-table-column prop="expressAddress" label="地址" align=center></el-table-column>
            <el-table-column prop="" label="房间号" align=center>{{detailList.roomCode}}</el-table-column>
            <el-table-column prop="status" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">正常</span>
                    <span v-else-if="scope.row.status == 1">退款申请中</span>
                    <span v-else-if="scope.row.status == 2">已退款</span>
                    <span v-else-if="scope.row.status == 3">已申请售后</span>
                </template>
            </el-table-column>
            <el-table-column prop="refundTime" label="退款时间" align=center></el-table-column>
            <el-table-column prop="returnTime" label="退货时间" align=center></el-table-column>
        </el-table>

        <div class="btnbox">
            <el-button @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganOrderProductDetails',
    data(){
        return{
            detailList: {},
            orderProdDTOS: [],
            id: '',
            oprId: ''
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        // this.oprId=localStorage.getItem('orgId');
        // this.oprId = this.$route.params.orgId;
        this.LonganOrderProductDetails();
    },
    methods: {
        //订单商品详情
        LonganOrderProductDetails(){
            this.$api.LonganOrderProductDetails(this.id).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    this.detailList = result.data;
                    this.orderProdDTOS = result.data.orderProdDTOS;
                }else{
                    this.$message.error('酒店商城订单商品详情获取失败');
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganOrderList'});
        }
    }
}
</script>

<style lang="less" scoped>
.HotelRevenueDetail-ul{
    width: 300px;
    border:1px solid #ccc;
    padding-left: 0;
    margin-bottom: 30px;
}
.HotelRevenueDetail-ul li{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
}
.HotelRevenueDetail-ul li:last-child{
    border-bottom: none;
}
.HotelRevenueDetail-ul li div{
    flex-grow: 1;
    width: 45%;
    line-height: 50px;
    padding-left: 5%;
    text-align: left;
    font-size: 14px;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #909399;
    font-weight: bold;
    border-right: 1px solid #ccc;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #606266;
}
.btnbox{
    text-align: left;
}
.font-bt{
    text-align: left;
    font-size: 25px;
    color: #000;
    font-weight: bold;
    margin-bottom: 30px;
}
</style>
-->
