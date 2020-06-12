<template>
    <div class="platdeliverydetail">
        <p class="title">查看详情</p>
        <!-- <table v-if="deliveryType == 1" cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.status == 0">待确认</span>
                    <span v-else-if="deliveryDateDetail.status == 1">已确认</span>
                    <span v-else-if="deliveryDateDetail.status == 2">已发货</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送方式</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.delivWay == 1">客房配送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 2">快递到家</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{deliveryDateDetail.delivCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">楼层</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.totalAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.actualAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{deliveryDateDetail.contactPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.contactMobile}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{deliveryDateDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{deliveryDateDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.confirmAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户留言</td>
                <td class="subcont">{{deliveryDateDetail.userRemark}}</td>
            </tr>
        </table> -->
        <table cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.status == 0">待确认</span>
                    <span v-else-if="deliveryDateDetail.status == 1">已确认</span>
                    <span v-else-if="deliveryDateDetail.status == 2">已配送</span>
                    <span v-else-if="deliveryDateDetail.status == 3">部分退款</span>
                    <span v-else-if="deliveryDateDetail.status == 4">全部退款</span>
                    <span v-else-if="deliveryDateDetail.status == 5">已收货</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{deliveryDateDetail.delivCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送方式</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.delivWay == 1">店内送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 2">快递送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 3">迷你吧</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 4">自提</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 5">电子券</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">楼层</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.funcName}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户id</td>
                <td class="subcont">{{deliveryDateDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{deliveryDateDetail.customerName}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">收货人</td>
                <td class="subcont">{{deliveryDateDetail.consignee}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.consigneePhone}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">地址</td>
                <td class="subcont">{{deliveryDateDetail.consigneeSite}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.totalAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.actualPay}}</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">抵扣金额</td>
                <td class="subcont">{{deliveryDateDetail.deductAmount}}</td>
            </tr> -->
            <tr>
                <td class="subTitle">优惠金额</td>
                <td class="subcont">{{deliveryDateDetail.couponAmount}}</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">领用数量</td>
                <td class="subcont">{{deliveryDateDetail.vouUserCount}}</td>
            </tr> -->
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{deliveryDateDetail.contactPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.contactPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{deliveryDateDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{deliveryDateDetail.payCompleteTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0">
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.confirmPeople}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0">
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.confirmTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1 && deliveryDateDetail.status != 0">
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1 && deliveryDateDetail.status != 0">
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2 && deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">发货时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2 && deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">物流信息</td>
                <td class="subcont">{{deliveryDateDetail.logistics}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2 && deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">物流单号</td>
                <td class="subcont">{{deliveryDateDetail.logisticsCode}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1">
                <td class="subTitle">现场送留言</td>
                <td class="subcont">{{deliveryDateDetail.roomDeliveryRemark}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">快递送留言</td>
                <td class="subcont"></td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1">
                <td class="subTitle">补货费</td>
                <td class="subcont">{{deliveryDateDetail.tipFee}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">配送服务费</td>
                <td class="subcont">{{deliveryDateDetail.tipFee}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">快递费</td>
                <td class="subcont">{{deliveryDateDetail.expressFee}}</td>
            </tr>
            <tr>
                <td class="subTitle">支付通道费</td>
                <td class="subcont">{{deliveryDateDetail.payChannelFee}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.lgcHotelId != 0">
                <td class="subTitle">外部物流状态</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.lgcStatus == 1">待接单</span>
                    <span v-else-if="deliveryDateDetail.lgcStatus == 2">待取货</span>
                    <span v-else-if="deliveryDateDetail.lgcStatus == 3">配送中</span>
                    <span v-else-if="deliveryDateDetail.lgcStatus == 4">已完成</span>
                    <span v-else-if="deliveryDateDetail.lgcStatus == 5">已取消</span>
                    <span v-else-if="deliveryDateDetail.lgcStatus == 6">异常</span>
                </td>
            </tr>
            <tr v-if="deliveryDateDetail.lgcHotelId != 0">
                <td class="subTitle">外部物流</td>
                <td class="subcont">{{deliveryDateDetail.lgcName}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.lgcHotelId != 0">
                <td class="subTitle">实收费用</td>
                <td class="subcont">{{deliveryDateDetail.lgcActualFee}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.lgcHotelId != 0">
                <td class="subTitle">实扣费用</td>
                <td class="subcont">{{deliveryDateDetail.lgcDeductFee}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.lgcHotelId != 0">
                <td class="subTitle">送达时间</td>
                <td class="subcont">{{deliveryDateDetail.lgcFinishTime}}</td>
            </tr>
        </table>
        <el-table :data="deliveryDateDetail.orderDeliveryDetailDTOList" border style="width:100%;">
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" min-width="200px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodShowName" label="显示名称" min-width="200px"></el-table-column>
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
            <el-table-column prop="couponName" label="优惠券名称" min-width="100px" align=center></el-table-column>
            <el-table-column prop="couponAmount" label="优惠金额" min-width="100px" align=center></el-table-column>
            <el-table-column prop="vouIsUse" label="领用" align=center></el-table-column>
            <el-table-column prop="deductAmount" label="抵扣金额" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="prodStatus" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.prodStatus == 0">正常</span>
                    <span v-else-if="scope.row.prodStatus == 1">确认前退款</span>
                    <span v-else-if="scope.row.prodStatus == 2">退款</span>
                    <span v-else-if="scope.row.prodStatus == 3">换货</span>
                    <span v-else-if="scope.row.prodStatus == 4">退货退款</span>
                    <span v-else-if="scope.row.prodStatus == 5">售后待处理</span>
                </template>
            </el-table-column>
            <el-table-column prop="refundAmount" label="退款金额" align=center></el-table-column>
            <el-table-column prop="refundTime" label="退款时间" min-width="120px" align=center></el-table-column>
            <el-table-column prop="returnTime" label="退货时间" min-width="120px" align=center></el-table-column>
            <el-table-column prop="rebateState" label="待确认退款说明" min-width="120px"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160px" align=center>
                <template slot-scope="scope">
                    <el-button :disabled="true" type="text" size="small" @click="couponUserDetails(scope.row.id)">卡券详情</el-button>
                    <el-button type="text" size="small" @click="divideDetail(scope.row.id)">分成详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
        <el-button type="primary" v-if="authzData['F:BO_ORDER_OPRDELIV_SUBMIT'] && deliveryDateDetail.status == 0" @click="ensurePlatDelivery">确认</el-button>
        <el-button type="primary" v-if="authzData['F:BO_ORDER_OPRDELIV_DELIV'] && deliveryDateDetail.delivWay == 2 && deliveryDateDetail.status == 1" @click="shipmentsPlatDelivery">发货</el-button>

        <el-dialog title="提示" :visible.sync="dialogVisibleOrder" width="30%">
            <span>是否确认该订单？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleOrder=false">取消</el-button>
                <el-button type="primary" @click="ensureOrder">确认</el-button>
            </span>
        </el-dialog>
        <el-dialog title="发货" :visible.sync="dislogVisibleShipments" width="30%">
            <el-form :model="shipmentsForm" :rules="rules" ref="shipmentsForm" label-width="80px">
                <el-form-item label="物流公司" prop="logisticsCompany">
                    <el-input v-model.trim="shipmentsForm.logisticsCompany"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" prop="trackingCode">
                    <el-input v-model="shipmentsForm.trackingCode"></el-input>
                </el-form-item>
                <el-form-item label="发货时间" prop="shipmentsTime">
                    <el-date-picker
                        v-model="shipmentsForm.shipmentsTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleShipments = false">取 消</el-button>
                <el-button type="primary" :disabled="isSubmit" @click="EnsureReset('shipmentsForm')">发 货</el-button>
            </div>
        </el-dialog>

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
                      <span style="margin-right:30px" class="leftitle">{{item.deductObj}}({{item.orgOrUserName}})</span>
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
    name: 'LonganPlatDeliveryDetail',
    data(){
        return {
            authzData: '',
            // orgId: '',
            pdId: '',
            source: '',
            deliveryDateDetail: [],
            deliveryType: '',
            dialogVisibleOrder: false,
            dislogVisibleShipments: false,
            shipmentsForm: {},
            divideDetailData:{},
            divideDetaildialog:false,
            rules: {
                logisticsCompany: [
                    {required: true, message: '请填写物流公司', trigger: 'blur'},
                    {min: 1, max: 20, message: '物流公司请保持在20个字符以内', trigger: ['blur','change']}
                ],
                trackingCode: [
                    {required: true, message: '请填写快递单号', trigger: 'blur'},
                    {min: 1, max: 30, message: '快递单号请保持在30个字符以内', trigger: ['blur','change']}
                ],
                shipmentsTime: [
                    {required: true, message: '请选择发货时间', trigger: 'change'},
                ]
            },
            isSubmit: false
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        // this.orgId = this.$route.params.orgId;
        this.pdId = this.$route.query.id;
        this.source = this.$route.query.source;
        this.platDeliveryDetail();
    },
    methods: {
        //获取配送单详情
        platDeliveryDetail(){
            const params = {};
            const id = this.pdId;
            this.$api.platDeliveryDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.deliveryDateDetail = result.data;
                        this.deliveryType = result.data.delivWay;
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
        //确认订单
        ensurePlatDelivery(){
            this.dialogVisibleOrder = true;
        },
        ensureOrder(){
            const params = {};
            const id = this.pdId;
            // console.log(params);
            this.$api.ensurePlatDelivery(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('配送单确认成功！');
                        this.dialogVisibleOrder = false;
                        this.platDeliveryDetail();
                    }else{
                        this.$message.error('配送单确认失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //发货
        shipmentsPlatDelivery(){
            this.dislogVisibleShipments = true;
        },
        EnsureReset(shipmentsForm){
            const params = {
                deliveryId: this.pdId,
                logistics: this.shipmentsForm.logisticsCompany,
                logisticsCode: this.shipmentsForm.trackingCode,
                shipmentsTime: this.shipmentsForm.shipmentsTime,
            };
            // const id = this.pdId;
            // console.log(params);
            this.$refs[shipmentsForm].validate((valid) => {
                if(valid){
                    this.isSubmit = true;
                    this.$api.shipmentsPlatDelivery(params)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('配送单发货成功！');
                                this.dislogVisibleShipments = false;
                                this.isSubmit = false;
                                this.platDeliveryDetail();
                            }else{
                                this.$message.error('配送单发货失败！');
                                this.dislogVisibleShipments = false;
                                this.isSubmit = false;
                            }
                        })
                        .catch(error => {
                            this.$alert(error,"警告",{
                                confirmButtonText: "确定"
                            })
                        })
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        //卡券详情-查看用户卡券详情
        couponUserDetails(id){
            //跳 ‘ 查看用户卡券详情 ’
            this.$router.push({name: 'LonganCardCouponDetail', query: {id}});
        },

        //分成详情
        divideDetail(id){

           this.getDeliDiveideDetail(id)
        },

        //配送信息---分成详情
        getDeliDiveideDetail(id){
          let that=this;
          let params={
            orderDelivDetailId:id,
            orderType:1
          }
          this.$api.getDeliDiveideDetail({params}).then(response=>{
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
            if(this.source){
                window.history.back();
            }else{
                this.$router.push({name: 'LonganPlatDeliveryList'});
            }
        }
    }
}
</script>

<style scoped>
.el-dialog__footer{
    text-align: center;
}
.el-date-editor.el-input{
    width: 100%;
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
            width: 100px;
            text-align: right;
            color: #909399;
        }
        .subcont{
            width: 300px;
        }
    }
    .InfoTitle{
        padding: 10px 0;
        border-bottom: 1px solid #d7d7d7;
      }
    .leftitle{
        width: 245px;
        display: inline-block;
        text-align: left;
      }
      .dividedialog{
         .el-form-item__label{
             text-align: left;
          }
      }

}
</style>

