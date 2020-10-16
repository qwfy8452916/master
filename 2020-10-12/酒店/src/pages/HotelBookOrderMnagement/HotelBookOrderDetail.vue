<template>
    <div class="bookorderdetail">
        <p v-if="orderStatus == 0 || orderStatus == 3" class="title">处理</p>
        <p v-else class="title">查看详情</p>
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
        <el-button v-if="orderStatus == 1 || orderStatus == 2 || orderStatus == 4 || orderStatus == 5" @click="returnList">返回</el-button>
        <el-button v-else @click="returnList">返回</el-button>
        <el-button v-if="orderStatus != 0 && orderStatus != 3 && orderStatus != 4 && writeOffStatus == 0" type="primary" @click="bookOrderWriteOff">核销</el-button>
        <el-button v-if="orderStatus == 0 && authzlist['F:BH_BOOK_ORDER_DEAL_CONFIRM']" type="primary" @click="orderDeal">处理</el-button>
        <el-button v-if="orderStatus == 3 && authzlist['F:BH_BOOK_ORDER_DEAL_UNSUBSCRIBE']" type="primary" @click="orderUnsubscribeDeal">处理</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisibleDeal" width="30%">
            <span v-if="isRoomEnough">是否确认该订单？</span>
            <span v-else style="color: #ff3030;">客房不足，是否确认该订单？（如不能确认用户订单，请联系用户取消该订单）</span>
            <span slot="footer">
                <el-button @click="dialogVisibleDeal=false">取消</el-button>
                <el-button type="primary" :disabled="isEnsureDeal" @click="ensureDeal">确认</el-button>
            </span>
        </el-dialog>
        <el-dialog title="处理" :visible.sync="dialogVisibleUnsubscribe" width="30%">
            <el-form :model="dealForm" :rules="dealRules" ref="dealForm" label-width="60px">
                <el-form-item label="状态" prop="orderState">
                    <el-select v-model="dealForm.orderState">
                    <el-option label="同意" value="4"></el-option>
                    <el-option label="拒绝" value="5"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="dealRemark">
                    <el-input type="textarea" :rows="3" v-model.trim="dealForm.dealRemark" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogVisibleUnsubscribe = false">取 消</el-button>
                <el-button type="primary" :disabled="isEnsureUnsubscribe" @click="ensureUnsubscribe('dealForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dislogVisibleWriteOff" width="30%">
            <span slot="title">是否确定核销？</span>
            <el-form :model="writeoffForm" label-width="80px">
                <el-form-item label="核销备注" prop="writeoffRemark">
                    <el-input type="textarea" :rows="3" v-model.trim="writeoffForm.writeoffRemark" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleWriteOff = false">取 消</el-button>
                <el-button type="primary" @click="writeoffEnsure('writeoffForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'HotelBookOrderDetail',
    data(){
        return {
            authzlist: {}, //权限数据
            boId: '',
            orderDataDetail: [],
            orderStatus: '',
            writeOffStatus: '',
            hourCheckIn: 0,
            dayCheckIn: 0,
            dialogVisibleDeal: false,
            isRoomEnough: true,
            isEnsureDeal: false,
            dialogVisibleUnsubscribe: false,
            isEnsureUnsubscribe: false,
            ifCode: '',
            dealForm: {},
            dealRules: {
                orderState: [
                    {required: true, message: '请选择状态', trigger: 'change'}
                ]
            },
            dislogVisibleWriteOff: false,
            writeoffForm: {
                writeoffRemark: ''
            }
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.boId = this.$route.query.id;
        this.ifCode = this.$route.query.ifCode;
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
                        this.writeOffStatus = result.data.writeOffStatus;
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
        //处理
        orderDeal(){
            const params = {
                bookOrderId: this.boId
            };
            // console.log(params);
            this.$api.checkOrderRoomnum(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        if(result.data == 1){
                            this.isRoomEnough = true;
                        }else{
                            this.isRoomEnough = false;
                        }
                        this.dialogVisibleDeal = true;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        ensureDeal(){
            const params = {};
            const id = this.boId;
            // console.log(params);
            this.isEnsureDeal = true;
            this.$api.ensureOrderDeal(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('订单处理成功！');
                        this.dialogVisibleDeal = false;
                        this.bookOrderDetail();
                    }else{
                        this.$message.error(result.msg);
                        this.isEnsureDeal = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //处理 - 申请退订
        orderUnsubscribeDeal(){
            this.dialogVisibleUnsubscribe = true;
        },
        ensureUnsubscribe(dealForm){
            const that = this;
            const params = {
                dealStatus: this.dealForm.orderState,
                unsubscribeRemark: this.dealForm.dealRemark
            };
            const id = this.boId;
            this.$refs[dealForm].validate((valid) => {
                if(valid){
                    if(this.dealForm.orderState == 5){
                        if(this.dealForm.dealRemark == undefined || this.dealForm.dealRemark == ''){
                            this.$message.error('请在备注输入拒绝原因');
                            return false;
                        }
                    }
                    this.isEnsureUnsubscribe = true;
                    this.$api.orderUnsubscribeDeal(params, id)
                        .then(response => {
                            // console.log(response);
                            const result = response.data;
                            if(result.code == '0'){
                                this.$message.success('退订处理成功！');
                                this.dialogVisibleUnsubscribe = false;
                                this.bookOrderDetail();
                            }else{
                                this.$message.error(result.msg);
                                this.isEnsureUnsubscribe = false;
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
        //核销
        bookOrderWriteOff(){
            this.dislogVisibleWriteOff = true;
        },
        writeoffEnsure(writeoffForm){
            const params = {
                remark: this.writeoffForm.writeoffRemark
            };
            const id = this.boId
            this.$api.bookOrderWriteOff(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('核销成功！');
                        this.dislogVisibleWriteOff = false;
                        this.bookOrderDetail();
                    }else{
                        this.dislogVisibleWriteOff = false;
                        this.$message.error(result.msg);
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },   
        //返回、取消
        returnList(){
            if(this.ifCode == 1){
                this.$router.push({name: 'HotelEnterprisesCodeOrderList'});
            }else{
                this.$router.push({name: 'HotelBookOrderList'});
            }
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

