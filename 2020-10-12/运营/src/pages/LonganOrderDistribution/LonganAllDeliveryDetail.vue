<template>
    <div class="platdeliverydetail">
        <p class="title">查看详情</p>
        <!-- <table v-if="deliveryType == 1" cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont" colspan="3">
                    <span v-if="deliveryDateDetail.delivStatus == 0">待确认</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 1">已确认</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 2">已发货</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 3">已退款</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 4">已售后</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{deliveryDateDetail.delivCode}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{deliveryDateDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送方式</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.delivWay == 1">客房配送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 2">快递到家</span>
                </td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{deliveryDateDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">区域</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.confirmAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">地点</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.totalAmount}}</td>
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.actualAmount}}</td>
                <td class="subTitle">用户留言</td>
                <td class="subcont">{{deliveryDateDetail.userRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{deliveryDateDetail.contactPeople}}</td>
                <td class="subTitle"></td>
                <td class="subcont"></td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.contactMobile}}</td>
                <td class="subTitle"></td>
                <td class="subcont"></td>
            </tr>
        </table>
        <table  v-else-if="deliveryType == 2" cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont" colspan="3">
                    <span v-if="deliveryDateDetail.delivStatus == 0">待确认</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 1">已确认</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 2">已发货</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 3">已退款</span>
                    <span v-else-if="deliveryDateDetail.delivStatus == 4">已售后</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{deliveryDateDetail.delivCode}}</td>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{deliveryDateDetail.contactPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送方式</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.delivWay == 1">客房配送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 2">快递到家</span>
                </td>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.contactMobile}}</td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{deliveryDateDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">收货人</td>
                <td class="subcont">{{deliveryDateDetail.consignee}}</td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{deliveryDateDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.consigneeMobile}}</td>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">地址</td>
                <td class="subcont">{{deliveryDateDetail.consigneeSite}}</td>
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.confirmAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">类型</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.prodOwnerOrgKind == 1">平台</span>
                    <span v-else-if="deliveryDateDetail.prodOwnerOrgKind == 2">运营商</span>
                    <span v-else-if="deliveryDateDetail.prodOwnerOrgKind == 3">酒店</span>
                    <span v-else-if="deliveryDateDetail.prodOwnerOrgKind == 4">供应商</span>
                    <span v-else-if="deliveryDateDetail.prodOwnerOrgKind == 5">入驻商家</span>
                </td>
                <td class="subTitle">发货时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">商家</td>
                <td class="subcont">{{deliveryDateDetail.shopName}}</td>
                <td class="subTitle">物流信息</td>
                <td class="subcont">{{deliveryDateDetail.logistics}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.totalAmount}}</td>
                <td class="subTitle">物流单号</td>
                <td class="subcont">{{deliveryDateDetail.logisticsCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.actualAmount}}</td>
                <td class="subTitle">用户留言</td>
                <td class="subcont">{{deliveryDateDetail.userRemark}}</td>
            </tr>
        </table> -->
        <table cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont" colspan="3">
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
                <td class="subTitle">流水号</td>
                <td class="subcont">{{deliveryDateDetail.serialNumber}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送方式</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.delivWay == 1">现场送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 2">快递送</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 3">迷你吧</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 4">自提</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 5">电子商品</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 6">堂食</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 7">外卖</span>
                    <span v-else-if="deliveryDateDetail.delivWay == 8">外带</span>
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
            <tr>
                <td class="subTitle">区域</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">地点</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户ID</td>
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
                <td class="subTitle">优惠金额</td>
                <td class="subcont">{{deliveryDateDetail.couponAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">优惠券数量</td>
                <td class="subcont">{{deliveryDateDetail.allCouUseCount}}</td>
            </tr>
            <tr>
                <td class="subTitle">抵扣金额</td>
                <td class="subcont">{{deliveryDateDetail.allVouDeductAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">减免金额</td>
                <td class="subcont">{{deliveryDateDetail.discountAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.actualPay}}</td>
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
            <tr>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.confirmTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1">
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 1">
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">发货时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">物流信息</td>
                <td class="subcont">{{deliveryDateDetail.logistics}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay == 2">
                <td class="subTitle">物流单号</td>
                <td class="subcont">{{deliveryDateDetail.logisticsCode}}</td>
            </tr>
            <tr v-if="(deliveryDateDetail.delivWay>6||deliveryDateDetail.delivWay==6||deliveryDateDetail.delivWay==1)&&deliveryDateDetail.roomDeliveryRemark!=''">
                <td
                    class="subTitle"
                    v-if="deliveryDateDetail.delivWay==7"
                >外卖送留言</td>
                <td
                    class="subTitle"
                    v-else
                >现场送留言</td>
                <td class="subcont">{{deliveryDateDetail.roomDeliveryRemark}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.delivWay==2&&deliveryDateDetail.expressRemark!=''">
                <td class="subTitle">快递送留言</td>
                <td class="subcont">{{deliveryDateDetail.expressRemark}}</td>
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
                <td class="subcont" v-if="deliveryDateDetail.payChannelFee">{{deliveryDateDetail.payChannelFee.toFixed(2)}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.lgcHotelId != 0">
                <td class="subTitle">外卖状态</td>
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
                <td class="subTitle">外卖配送</td>
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
            <el-table-column prop="prodOrgKindName" label="类型" align=center></el-table-column>
            <el-table-column prop="prodOwner" label="商家" min-width="180px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" min-width="200px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodShowName" label="显示名称" min-width="200px"></el-table-column>
            <el-table-column prop="prodGenre" label="商品形式" align=center></el-table-column>
            <el-table-column prop="prodSpecs" label="商品规格" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="couponName" label="优惠券名称" width="100px" align=center></el-table-column>
            <el-table-column prop="couponAmount" label="优惠金额" width="100px" align=center></el-table-column>
            <!-- <el-table-column prop="vouIsUse" label="领用" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.vouIsUse == 0">否</span>
                    <span v-else-if="scope.row.vouIsUse == 1">是</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="deductAmount" label="抵扣金额" align=center></el-table-column>
            <el-table-column prop="discountAmount" label="减免金额" align=center></el-table-column>
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
            <el-table-column fixed="right" label="操作" width="80px" align=center>
                <template slot-scope="scope">
                    <!-- <el-button :disabled="true" type="text" size="small" @click="couponUserDetails(scope.row.id)">卡券详情</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LonganAllDeliveryDetail',
    data(){
        return {
            pdId: '',
            deliveryDateDetail: [],
            deliveryType: '',
        }
    },
    mounted(){
        this.pdId = this.$route.query.id;
        this.allDeliveryDetail();
    },
    methods: {
        //获取配送单详情
        allDeliveryDetail(){
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
        //卡券详情-查看用户卡券详情
        couponUserDetails(id){
            //跳 ‘ 查看用户卡券详情 ’
            this.$router.push({name: 'LonganCardCouponDetail', query: {id}});
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganAllDeliveryList'});
        }
    }
}
</script>

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
}
</style>

