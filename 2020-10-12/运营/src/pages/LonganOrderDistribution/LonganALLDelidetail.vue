<template>
    <div class="platdeliverydetail">
        <p class="title">查看详情</p>
        <!--迷你吧现场配送详情-->
        <table v-if="deliveryType == 2" cellpadding="0" cellspacing="0" class="deliveryTable">
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
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
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
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.funcName}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户ID</td>
                <td class="subcont">{{deliveryDateDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{deliveryDateDetail.customerName}}</td>
            </tr>
            <tr>
                <td class="subTitle">格子编号</td>
                <td class="subcont"></td>
            </tr>
            <tr>
                <td class="subTitle">商品名称</td>
                <td class="subcont"></td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.totalAmount}}</td>
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
            <tr v-if="deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">配送人</td>
                <td class="subcont"></td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">配送时间</td>
                <td class="subcont"></td>
            </tr>
            <!--
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.delivCode}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送方式</td>
                <td class="subcont">
                    <span v-if="deliveryDateDetail.hshopDelivDetail.delivWay == 1">客房配送</span>
                    <span v-else-if="deliveryDateDetail.hshopDelivDetail.delivWay == 2">快递到家</span>
                </td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">区域</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.roomFloor}}</td>
                <td class="subTitle">确认时间</td>
                <td class="subcont">
                  <span v-if="deliveryDateDetail.hshopDelivDetail.confirmAt!='2037-12-31 00:00:00'">{{deliveryDateDetail.hshopDelivDetail.confirmAt}}</span>
                  <span v-if="deliveryDateDetail.hshopDelivDetail.confirmAt=='2037-12-31 00:00:00'"></span>
                  </td>
            </tr>
            <tr>
                <td class="subTitle">地点</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.roomCode}}</td>
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.shipmentsPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.totalAmount}}</td>
                <td class="subTitle">配送时间</td>
                <td class="subcont">
                  <span v-if="deliveryDateDetail.hshopDelivDetail.shipmentsAt!='2037-12-31 00:00:00'">{{deliveryDateDetail.hshopDelivDetail.shipmentsAt}}</span>
                  <span v-if="deliveryDateDetail.hshopDelivDetail.shipmentsAt=='2037-12-31 00:00:00'"></span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.actualAmount}}</td>
                <td class="subTitle">用户留言</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.userRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{deliveryDateDetail.hshopDelivDetail.contactPeople}}</td>
                <td class="subTitle"></td>
                <td class="subcont"></td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.contactMobile}}</td>
                <td class="subTitle"></td>
                <td class="subcont"></td>
            </tr>-->
        </table>
        <!--客房服务配送详情-->
        <table v-if="deliveryType == 1" cellpadding="0" cellspacing="0" class="deliveryTable">
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
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{deliveryDateDetail.hotelName}}</td>
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
            <tr>
                <td class="subTitle">服务类型</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.hotelCategoryName}}</td>
            </tr>
            <tr>
                <td class="subTitle">订单详情</td>
                <td class="subcont"><span style="color:blue;cursor:pointer;" @click="showOrderDetail">查看详情</span></td>
            </tr>
            <tr>
                <td class="subTitle">用户备注</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.userRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">提交时间</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.createdAt}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.rmavcRecordsDto.status == 1 || deliveryDateDetail.rmavcRecordsDto.status == 2">
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.confirmTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.rmavcRecordsDto.status == 3">
                <td class="subTitle">取消时间</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.cancelTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.rmavcRecordsDto.status == 3">
                <td class="subTitle">取消原因</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.cancelReason}}</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">订单信息</td>
                <td class="subcont">
                    <span v-for="item in deliveryDateDetail.rmavcRecordsDto.dtos" :key="item.id" class="orderinfo">
                        {{item.hdetailName}} * {{item.amount}}, {{item.priceDesc}}
                    </span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">送达时间</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.arrivedAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">姓名</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.customerName}}</td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.mobile}}</td>
            </tr>
            <tr>
                <td class="subTitle">备注</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.remark}}</td>
            </tr>
            <tr>
                <td class="subTitle">提交时间</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.createdAt}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.rmavcRecordsDto.status == 2">
                <td class="subTitle">取消原因</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.cancelReason}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.rmavcRecordsDto.status == 2">
                <td class="subTitle">取消时间</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.lastUpdatedAt}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0">
                <td class="subTitle">确认人</td>
                <td class="subcont">{{deliveryDateDetail.confirmPeople}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0">
                <td class="subTitle">确认时间</td>
                <td class="subcont">{{deliveryDateDetail.confirmTime}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0 && deliveryDateDetail.status != 1">
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsTime}}</td>
            </tr> -->
        </table>
        <!--现场配送单详情-->
        <table v-if="deliveryType == 0" cellpadding="0" cellspacing="0" class="deliveryTable">
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
                <td class="subTitle">区域</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">地点</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.funcName}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户ID</td>
                <td class="subcont">{{deliveryDateDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{deliveryDateDetail.customerName}}</td>
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
            <tr>
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">配送时间</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">现场送留言</td>
                <td class="subcont">{{deliveryDateDetail.roomDeliveryRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">补货费</td>
                <td class="subcont">{{deliveryDateDetail.tipFee}}</td>
            </tr>
            <tr>
                <td class="subTitle">支付通道费</td>
                <td class="subcont" v-if="deliveryDateDetail.payChannelFee">{{deliveryDateDetail.payChannelFee.toFixed(2)}}</td>
            </tr>
        </table>
        <el-table v-if="deliveryType == 0" :data="deliveryDateDetail.orderDeliveryDetailDTOList" border style="width:100%;">
            <el-table-column prop="prodOrgKindName" label="类型" align=center></el-table-column>
            <el-table-column prop="prodOwner" label="商家" min-width="180px" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" min-width="200px"></el-table-column>
            <el-table-column prop="prodProductDTO.prodShowName" label="显示名称" min-width="200px"></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="couponAmount" label="优惠金额" min-width="80px" align=center></el-table-column>
            <el-table-column
                prop="deductAmount"
                label="抵扣金额"
                min-width="80px"
                align=center
            ></el-table-column>
            <el-table-column prop="discountAmount" label="减免金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodStatus" label="状态" min-width="100px">
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
        </el-table>
        <br/><br/>
        <div style="width: 100%; float: left;"><el-button @click="returnList">返回</el-button></div>
        <el-dialog title="订单详情" :visible.sync="dialogVisibleDetail" width="60%">
            <!-- <label v-if="isShowSelectList">列表式下单</label> -->
            <table v-if="isShowSelectList" cellpadding="0" cellspacing="0" class="deliveryTable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td class="detailTitle">商品名称</td>
                    <td class="detailTitle">商品数量</td>
                    <td class="detailTitle">单价</td>
                    <td class="detailTitle">单位</td>
                </tr>
                <tr v-for="item in SelectDataList" :key="item.id">
                    <td>{{deliveryDateDetail.rmavcRecordsDto.hotelCategoryName}}</td>
                    <td>{{item.commonStyleDTO.name}}</td>
                    <td>{{item.count}}</td>
                    <td>{{item.commonStyleDTO.price}}</td>
                    <td>{{item.commonStyleDTO.unit}}</td>
                </tr>
            </table>
            <!-- <label v-if="isShowBannerList">banner图详情下单</label> -->
            <table v-if="isShowBannerList" cellpadding="0" cellspacing="0" class="deliveryTable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td class="detailTitle">商品名称</td>
                    <td class="detailTitle">数量</td>
                    <td class="detailTitle">描述</td>
                    <td class="detailTitle">图片</td>
                </tr>
                <tr v-for="item in BannerDataList" :key="item.id">
                    <td>{{deliveryDateDetail.rmavcRecordsDto.hotelCategoryName}}</td>
                    <td>{{item.commonStyleDTO.name}}</td>
                    <td>{{item.count}}</td>
                    <td>{{item.commonStyleDTO.description}}</td>
                    <td>
                        <img :src="item.commonStyleDTO.picUrl" alt="" style="width:45px;height:35px">
                    </td>
                </tr>
            </table>
            <!-- <label v-if="isShowIconList">图标式下单</label> -->
            <table v-if="isShowIconList" cellpadding="0" cellspacing="0" class="deliveryTable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td class="detailTitle">商品名称</td>
                    <td class="detailTitle">数量</td>
                    <!-- <td class="detailTitle">描述</td> -->
                    <td class="detailTitle">图片</td>
                </tr>
                <tr v-for="item in IconDataList" :key="item.id">
                    <td>{{deliveryDateDetail.rmavcRecordsDto.hotelCategoryName}}</td>
                    <td>{{item.commonStyleDTO.name}}</td>
                    <td>{{item.count}}</td>
                    <!-- <td>{{item.commonStyleDTO.description}}</td> -->
                    <td>
                        <img :src="item.commonStyleDTO.picUrl" alt="" style="width:45px;height:35px">
                    </td>
                </tr>
            </table>
            <!-- <label v-if="isShowFormList">动态表单下单</label> -->
            <table v-if="isShowFormList" cellpadding="0" cellspacing="0" class="deliveryTable" width="100%">
                <tr>
                    <td class="detailTitle">服务类型</td>
                    <td>{{deliveryDateDetail.rmavcRecordsDto.hotelCategoryName}}</td>
                </tr>
                <tr v-for="item in FormDataList" :key="item.id">
                    <td class="detailTitle">{{item.commonStyleDTO.name}}</td>
                    <td></td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganALLDelidetail',
    data(){
        return {
            pdId: '',
            deliveryDateDetail: {},
            deliveryType: '',
            dialogVisibleDetail: false,
            isShowSelectList: false,
            SelectDataList: [],
            isShowBannerList: false,
            BannerDataList: [],
            isShowIconList: false,
            IconDataList: [],
            isShowFormList: false,
            FormDataList: []
        }
    },
    mounted(){
        this.pdId = this.$route.query.id;
        this.allDeliveryDetail();
    },
    methods: {
        //获取配送单详情
        allDeliveryDetail(){
            const that = this;
            const params = {};
            const id = this.pdId;
            this.$api.AllDeliverydetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.deliveryDateDetail = result.data;
                        this.deliveryType = result.data.delivType;
                        if(result.data.rmavcRecordsDto != null){
                            let detailObj = result.data.rmavcRecordsDto.orderDetailMap;
                            for(let i in detailObj){
                                switch(i){
                                    case 'LIST_ORDER':
                                        that.isShowSelectList = true;
                                        that.SelectDataList =  detailObj[i];
                                        break
                                    case 'BANNER_DETAIL_ORDER':
                                        that.isShowBannerList = true;
                                        that.BannerDataList =  detailObj[i];
                                        break
                                    case 'ICON_ORDER':
                                        that.isShowIconList = true;
                                        that.IconDataList =  detailObj[i];
                                        break
                                    case 'DYNAMIC_FORM':
                                        that.isShowFormList = true;
                                        that.FormDataList =  detailObj[i];
                                        break
                                }
                            }
                        }
                    }else{
                        this.$message.error('配送详情获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error, '警告', {
                        confirmButtonText: '确定'
                    })
                })
        },
        //查看详情
        showOrderDetail(){
            this.dialogVisibleDetail = true;
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganAllDelivery'});
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
        margin: 5px 0px 15px 0px;
        .orderinfo{
            display: block;
            line-height: 24px;
        }
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

