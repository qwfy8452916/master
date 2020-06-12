<template>
    <div class="platdeliverydetail">
        <p class="title">查看详情</p>

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
                    <span v-if="deliveryDateDetail.delivWay == 1">现场送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 2">快递送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 3">迷你吧</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.funcName}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1">
                <td class="subTitle">楼层</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1">
                <td class="subTitle">房间号</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
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
        </table>
        <el-table :data="deliveryDateDetail.orderDeliveryDetailDTOList" border style="width:100%;">
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="couponAmount" label="优惠券金额" width="100px" align=center></el-table-column>
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
            <el-table-column prop="refundTime" label="退款时间" width="120px" align=center></el-table-column>
            <el-table-column prop="returnTime" label="退货时间" width="120px" align=center></el-table-column>
            <el-table-column prop="rebateState" label="退款说明" width="120px" align=center></el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
        <el-button type="primary" v-if="deliveryDateDetail.status == 0" @click="ensurePlatDelivery">确认</el-button>
        <el-button type="primary" v-if="deliveryDateDetail.delivWay == 2 && deliveryDateDetail.status == 1" @click="shipmentsPlatDelivery">发货</el-button>

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
    </div>
</template>

<script>
export default {
    name: 'MerchantCouponDeliveryDetail',
    data(){
        return {
            orderId:'',
            pdId: '',
            deliveryDateDetail: [],
            deliveryType: '',
            dialogVisibleOrder: false,
            dislogVisibleShipments: false,
            shipmentsForm: {},
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
                    {required: true, message: '请选择发货时间', trigger: 'blur'},
                ]
            },
            isSubmit: false
        }
    },
    mounted(){
        this.pdId = this.$route.query.id;
        this.orderId=this.$route.query.orderId;
        this.platDeliveryDetail();
    },
    methods: {
        //获取配送单详情
        platDeliveryDetail(){
            const params = {
              couponId:this.pdId,
              orderId:this.orderId
            };
            const id = this.pdId;
            this.$api.couponDeliveryDetail(params,id)
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
                        this.platDeliveryDetail();
                        this.dialogVisibleOrder = false;

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
        //返回
        returnList(){
            this.$router.push({name: 'MerchantCouponList'});
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
            width: 80px;
            text-align: right;
            color: #909399;
        }
        .subcont{
            width: 300px;
        }
    }
}
</style>

