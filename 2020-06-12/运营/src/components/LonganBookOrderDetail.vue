<template>
    <div class="bookorderdetail">
        <p class="title">查看详情</p>
        <table cellpadding="0" cellspacing="0" class="ordertable">
            <tr>
                <td class="subTitle">订单号</td>
                <td class="subcont">{{orderDataDetail.orderCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">订单状态</td>
                <td class="subcont">{{orderDataDetail.dealStatusName}}</td>
            </tr>
            <tr>
                <td class="subTitle">核销状态</td>
                <td class="subcont">
                    <span v-if="orderDataDetail.writeOffStatus == 1">已核销</span>
                    <span v-else>未核销</span>
                </td>
            </tr>
            <tr v-if="orderDataDetail.writeOffStatus == 1">
                <td class="subTitle">核销备注</td>
                <td class="subcont">{{orderDataDetail.writeOffRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{orderDataDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">房源名称</td>
                <td class="subcont">{{orderDataDetail.resourceName}}&nbsp;&nbsp;{{orderDataDetail.roomCount}}间<br/>
                    <span v-if="orderDataDetail.hourTime != ''" class="subspan">可住时段：{{orderDataDetail.hourTime}}，连住&nbsp;{{hourCheckIn}}&nbsp;小时</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{orderDataDetail.cusName}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系电话</td>
                <td class="subcont">{{orderDataDetail.cusPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">入住日期</td>
                <td class="subcont">{{orderDataDetail.arrivalDate}}&nbsp;至&nbsp;{{orderDataDetail.leaveDate}}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-if="orderDataDetail.hourTime == ''">{{dayCheckIn}}&nbsp;晚</span>
                    <span v-else>{{orderDataDetail.hourTime}}</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">房价</td>
                <td class="subcont">￥{{orderDataDetail.totalAmount}}</td>
            </tr>
            <tr v-if="orderDataDetail.discountWay != 0">
                <td class="subTitle">优惠方式</td>
                <td class="subcont">
                    <span v-if="orderDataDetail.discountWay == 1">订房满减券</span>
                    <span v-else>订房折扣券</span>
                </td>
            </tr>
            <tr v-if="orderDataDetail.discountWay != 0">
                <td class="subTitle">优惠金额</td>
                <td class="subcont">{{orderDataDetail.couponAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">付款方式</td>
                <td class="subcont">{{orderDataDetail.payWay == 0?'微信支付':''}}</td>
            </tr>
            <tr>
                <td class="subTitle">备注</td>
                <td class="subcont">{{orderDataDetail.cusRemark}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{orderDataDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">红包金额</td>
                <td class="subcont">{{orderDataDetail.redPacketAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">分享奖励</td>
                <td class="subcont">{{orderDataDetail.shareReward}}</td>
            </tr>
            <tr>
                <td class="subTitle">管理奖励</td>
                <td class="subcont">{{orderDataDetail.shareSecReward}}</td>
            </tr>
            <!-- 0:初始状态；1:已接单；2:已拒单；3:申请退订；4:已退订；5：已拒绝；6：已消费 -->
            <tr v-if="orderStatus == 1 || orderStatus == 2">
                <td class="subTitle">处理人</td>
                <td class="subcont">{{orderDataDetail.orderDealPerson}}</td>
            </tr>
            <tr v-if="orderStatus == 1 || orderStatus == 2">
                <td class="subTitle">处理时间</td>
                <td class="subcont">{{orderDataDetail.orderDealTime}}</td>
            </tr>
            <tr v-if="orderStatus == 3 || orderStatus == 4 || orderStatus == 5">
                <td class="subTitle">申请退订时间</td>
                <td class="subcont">{{orderDataDetail.unsubscribeTime}}</td>
            </tr>
            <tr v-if="orderStatus == 4">
                <td class="subTitle">退款金额</td>
                <td class="subcont">{{orderDataDetail.unsubscribeAmount}}</td>
            </tr>
            <tr v-if="orderStatus == 4 || orderStatus == 5">
                <td class="subTitle">退订处理人</td>
                <td class="subcont">{{orderDataDetail.unsubscribeDealPerson}}</td>
            </tr>
            <tr v-if="orderStatus == 4 || orderStatus == 5">
                <td class="subTitle">退订处理时间</td>
                <td class="subcont">{{orderDataDetail.unsubscribeDealTime}}</td>
            </tr>
            <tr  v-if="orderStatus == 4 || orderStatus == 5">
                <td class="subTitle">退订备注</td>
                <td class="subcont">{{orderDataDetail.unsubscribeRemark}}</td>
            </tr>
        </table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LonganBookOrderDetail',
    data(){
        return {
            authzlist: {}, //权限数据
            boId: '',
            orderDataDetail: [],
            orderStatus: '',
            hourCheckIn: 0,
            dayCheckIn: 0,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.boId = this.$route.query.id;
        this.bookOrderDetail();
    },
    methods: {
        //获取订单详情
        bookOrderDetail(){
            const params = {};
            const id = this.boId;
            this.$api.bookOrderDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.orderDataDetail = result.data;
                        this.orderStatus = result.data.dealStatus;
                        //几晚
                        let dayDataNum = new Date(result.data.leaveDate).getTime() - new Date(result.data.arrivalDate).getTime();
                        this.dayCheckIn = dayDataNum/(24*60*60*1000);
                        //几小时
                        if(result.data.hourTime != ''){
                            let hourStart = result.data.hourTime.substr(0,5) + ':00';
                            let hourEnd = result.data.hourTime.substr(6,5) + ':00';
                            let arrivalTime = result.data.arrivalDate + ' ' + hourStart;
                            let leaveTime = result.data.leaveDate + ' ' + hourEnd;
                            let hourDataNum = new Date(leaveTime).getTime() - new Date(arrivalTime).getTime();
                            this.hourCheckIn = hourDataNum/(60*60*1000)
                        }
                    }else{
                        this.$message.error('订单详情获取失败！');
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
            this.$router.push({name: 'LonganBookOrder'});
        }
    }
}
</script>

<style lang="less" scoped>
.bookorderdetail{
    text-align: left;
    .title{
        font-weight: bold;
    }
    .ordertable{
        font-size: 14px;
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;
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
            width: 360px;
        }
        .subspan{
            font-size: 12px;
            line-height: 24px;
            color: #909399;
        }
    }
}
</style>

