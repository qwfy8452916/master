<template>
    <div class="platdeliverydetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.orderDeliveryDTO.status == 0">待确认</span>
                    <span v-else-if="deliveryDateDetail.orderDeliveryDTO.status == 1">已确认</span>
                    <span v-else-if="deliveryDateDetail.orderDeliveryDTO.status == 2">已配送</span>
                    <span v-else-if="deliveryDateDetail.orderDeliveryDTO.status == 3">部分退款</span>
                    <span v-else-if="deliveryDateDetail.orderDeliveryDTO.status == 4">全部退款</span>
                    <span v-else-if="deliveryDateDetail.orderDeliveryDTO.status == 5">已收货</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.delivCode}}</td>
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
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.funcName}}</td>
            </tr>
            <tr>
                <td class="subTitle">楼层</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品名称</td>
                <td class="subcont">{{deliveryDateDetail.prodProductDTO.prodName}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品数量</td>
                <td class="subcont">{{deliveryDateDetail.prodCount}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.totalAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">优惠金额</td>
                <td class="subcont">{{deliveryDateDetail.couponAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.actualPay}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品状态</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.prodStatus == 0">正常</span>
                    <span v-else-if="deliveryDateDetail.prodStatus == 1">确认前退款</span>
                    <span v-else-if="deliveryDateDetail.prodStatus == 2">退款</span>
                    <span v-else-if="deliveryDateDetail.prodStatus == 3">换货</span>
                    <span v-else-if="deliveryDateDetail.prodStatus == 4">退货退款</span>
                    <span v-else-if="deliveryDateDetail.prodStatus == 5">售后待处理</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.contactPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.contactPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.payCompleteTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.orderDeliveryDTO.status != 0">
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.confirmTime}}</td>
            </tr>
            <tr  v-if="deliveryDateDetail.delivWay == 1 && deliveryDateDetail.orderDeliveryDTO.status != 0">
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.orderDeliveryDTO.shipmentsTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.orderDeliveryDTO.status != 0">
                <td class="subTitle">退款金额</td>
                <td class="subcont">{{deliveryDateDetail.refundAmount}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.orderDeliveryDTO.status != 0">
                <td class="subTitle">退款时间</td>
                <td class="subcont">{{deliveryDateDetail.refundTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.orderDeliveryDTO.status != 0">
                <td class="subTitle">退货时间</td>
                <td class="subcont">{{deliveryDateDetail.returnTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.orderDeliveryDTO.status != 0">
                <td class="subTitle">退款说明</td>
                <td class="subcont">{{deliveryDateDetail.rebateState}}</td>
            </tr>
            <tr>
                <td class="subTitle">补货费</td>
                <td class="subcont">{{deliveryDateDetail.tipFee}}</td>
            </tr>
            <tr>
                <td class="subTitle">支付通道费</td>
                <td class="subcont">{{deliveryDateDetail.payChannelFee}}</td>
            </tr>
        </table>
        <el-button @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'MerchantServiceDeliveryDetail',
    data(){
        return {
            sdId: '',
            deliveryDateDetail: {
                orderDeliveryDTO: {
                    status: '',
                },
                prodProductDTO: {
                    prodName: ''
                }
            },
            deliveryType: '',
        }
    },
    mounted(){
        this.sdId = this.$route.query.id;
        this.AllDeliveryDetail();
    },
    methods: {
        //获取配送单详情
        AllDeliveryDetail(){
            const params = {};
            const id = this.sdId;
            this.$api.AllDeliveryDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.deliveryDateDetail = result.data;
                        this.deliveryType = result.data.delivWay;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //返回
        returnList(){
            this.$router.push({name: 'MerchantServiceDeliveryList'});
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
        margin-bottom: 30px;
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

