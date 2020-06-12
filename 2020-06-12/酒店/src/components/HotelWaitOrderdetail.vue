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
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.funcName}}</td>
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
                <td class="subTitle">用户id</td>
                <td class="subcont">{{deliveryDateDetail.customerId}}</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont"></td>
            </tr> -->
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
                <td class="subTitle">楼层</td>
                <td class="subcont">{{deliveryDateDetail.roomFloor}}</td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{deliveryDateDetail.roomCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">服务类型</td>
                <td class="subcont">{{deliveryDateDetail.rmavcRecordsDto.hotelCategoryName}}</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">订单详情</td>
                <td class="subcont"><span style="color:blue;cursor:pointer;" @click="showOrderDetail">查看详情</span></td>
            </tr> -->
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
        <br/>
        <label v-if="deliveryType == 1" style="font-size:14px;">订单详情</label>
        <div v-if="deliveryType == 1">
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
        </div>
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
                </td>
            </tr>
            <tr>
                <td class="subTitle">功能区</td>
                <td class="subcont">{{deliveryDateDetail.funcName}}</td>
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
            <tr v-if="deliveryDateDetail.status != 0">
                <td class="subTitle">配送人</td>
                <td class="subcont">{{deliveryDateDetail.shipmentsPeople}}</td>
            </tr>
            <tr v-if="deliveryDateDetail.status != 0">
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
                <td class="subcont">{{deliveryDateDetail.payChannelFee}}</td>
            </tr>
        </table>
        <el-table v-if="deliveryType == 0" :data="deliveryDateDetail.orderDeliveryDetailDTOList" border style="width:100%;">
            <el-table-column prop="prodOrgKindName" label="类型" align=center></el-table-column>
            <el-table-column prop="prodOwner" label="商家" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodShowName" label="显示名称" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
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
        </el-table>
        <br/><br/>
        <div style="width: 100%; float: left;">
            <el-button @click="returnList">返回</el-button>
            <el-button type="primary" v-if="deliveryDateDetail.status == 0" @click="ensurePlatDelivery">确认</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisibleOrder" width="30%">
            <span>是否确认该配送单？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleOrder=false">取消</el-button>
                <el-button type="primary" @click="ensureOrder">确认</el-button>
            </span>
        </el-dialog>
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
    name: 'HotelWaitOrderdetail',
    data(){
        return {
            pdId: '',
            deliveryDateDetail: {},
            deliveryType: '',
            dialogVisibleOrder: false,
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
        //确认订单
        ensurePlatDelivery(){
            this.dialogVisibleOrder = true;
        },
        ensureOrder(){
            const that = this;
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
                        // this.allDeliveryDetail();
                        that.$router.push({name: 'HotelWaitDealOrder'});
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
        //查看详情
        showOrderDetail(){
            this.dialogVisibleDetail = true;
        },
        //返回
        returnList(){
            this.$router.push({name: 'HotelWaitDealOrder'});
        }
    }
}
</script>

<style>
.el-dialog__body{
    padding: 10px 20px 20px 20px;
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


<!-- 旧版
<template>
    <div class="guestminidelidetail">
         <h3 class="alignleft">查看详情</h3>
        <table v-if="typejudge=='1'">
          <tr>
            <td>状态</td><td>
                <span v-if="waitorderdetail.delivStatus == 0">待确认</span>
                <span v-else-if="waitorderdetail.delivStatus == 1">已确认</span>
                <span v-else-if="waitorderdetail.delivStatus == 2">已完成</span>
                <span v-else-if="waitorderdetail.delivStatus == 3">已取消</span>
            </td>
          </tr>
          <tr>
            <td>房间号</td><td>{{waitorderdetail.cabDelivDetail.roomCode}}</td>
          </tr>
          <tr>
            <td>商品名称</td><td>{{waitorderdetail.cabDelivDetail.prodName}}</td>
          </tr>
          <tr>
            <td>商品金额</td><td>{{waitorderdetail.cabDelivDetail.prodRetailPrice}}</td>
          </tr>
          <tr>
            <td>用户id</td><td>{{waitorderdetail.cabDelivDetail.customerId}}</td>
          </tr>
          <tr>
            <td>用户昵称</td><td>{{waitorderdetail.cusName}}</td>
          </tr>
          <tr>
            <td>支付时间</td><td>
              <span v-if="waitorderdetail.delivSubmitTime!='2037-12-31 00:00:00'">{{waitorderdetail.delivSubmitTime}}</span>
              <span v-if="waitorderdetail.delivSubmitTime=='2037-12-31 00:00:00'"></span>
              </td>
          </tr>
        </table>

        <table v-else-if="typejudge=='2'">
          <tr>
            <td>状态</td><td>
                <span v-if="waitorderdetail.delivStatus == 0">待确认</span>
                <span v-else-if="waitorderdetail.delivStatus == 1">已确认</span>
                <span v-else-if="waitorderdetail.delivStatus == 2">已完成</span>
                <span v-else-if="waitorderdetail.delivStatus == 3">已取消</span>
            </td>
          </tr>
          <tr>
            <td>房间号</td><td>{{waitorderdetail.rmsvcDelivDetail.roomCode}}</td>
          </tr>
          <tr v-for="(item,key) in orderinfo" :key="key">
             <td>{{item.ordertitle}}</td><td><span v-if="item.hdetailName!=''">{{item.hdetailName}}*{{item.amount}},{{item.priceDesc}}</span><span v-if="item.hdetailName==''"></span></td>
          </tr>
          <tr>
            <td>送达时间</td><td>{{waitorderdetail.rmsvcDelivDetail.arrivedAt}}</td>
          </tr>
          <tr>
            <td>姓名</td><td>{{waitorderdetail.rmsvcDelivDetail.customerName}}</td>
          </tr>
          <tr>
            <td>手机号</td><td>{{waitorderdetail.rmsvcDelivDetail.mobile}}</td>
          </tr>
          <tr>
            <td>备注</td><td>{{waitorderdetail.rmsvcDelivDetail.remark}}</td>
          </tr>
          <tr>
            <td>提交时间</td><td>{{waitorderdetail.delivSubmitTime}}</td>
          </tr>
        </table>


       <div v-else-if="typejudge=='3'">
         <table   cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">状态</td>
                <td class="subcont" colspan="3">
                    <span v-if="waitorderdetail.delivStatus == 0">待确认</span>
                    <span v-else-if="waitorderdetail.delivStatus == 1">已确认</span>
                    <span v-else-if="waitorderdetail.delivStatus == 2">已完成</span>
                    <span v-else-if="waitorderdetail.delivStatus == 3">已取消</span>
                </td>
            </tr>
            <tr>
                <td class="subTitle">配送单号</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.delivCode}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.createdAt}}</td>
            </tr>
            <tr>
                <td class="subTitle">楼层</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.roomFloor}}</td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">
                  <span v-if="waitorderdetail.hshopDelivDetail.payTime!='2037-12-31 00:00:00'">{{waitorderdetail.hshopDelivDetail.payTime}}</span>
                  <span v-if="waitorderdetail.hshopDelivDetail.payTime=='2037-12-31 00:00:00'"></span>
                  </td>
            </tr>
            <tr>
                <td class="subTitle">房间号</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.roomCode}}</td>
                <td class="subTitle">确认人</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.confirmPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额(元)</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.totalAmount}}</td>
                <td class="subTitle">确认时间</td>
                <td class="subcont">
                  <span v-if="waitorderdetail.hshopDelivDetail.confirmAt!='2037-12-31 00:00:00'">{{waitorderdetail.hshopDelivDetail.confirmAt}}</span>
                  <span v-if="waitorderdetail.hshopDelivDetail.confirmAt=='2037-12-31 00:00:00'"></span>
                  </td>
            </tr>
            <tr>
                <td class="subTitle">实付金额(元)</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.actualAmount}}</td>
                <td class="subTitle">配送人</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.shipmentsPeople}}</td>
            </tr>
            <tr>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.contactPeople}}</td>
                <td class="subTitle">配送时间</td>
                <td class="subcont">
                  <span v-if="waitorderdetail.hshopDelivDetail.shipmentsAt!='2037-12-31 00:00:00'">{{waitorderdetail.hshopDelivDetail.shipmentsAt}}</span>
                  <span v-if="waitorderdetail.hshopDelivDetail.shipmentsAt=='2037-12-31 00:00:00'"></span>
                  </td>
            </tr>
            <tr>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.contactMobile}}</td>
                <td class="subTitle">用户留言</td>
                <td class="subcont">{{waitorderdetail.hshopDelivDetail.userRemark}}</td>
            </tr>
        </table>
        <br/><br/>
        <el-table :data="waitorderdetail.hshopDelivDetail.delivOrderProdDTOList" border style="width:88%;">
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
                    <span v-else-if="scope.row.prodState == 5">售后待处理</span>
                </template>
            </el-table-column>
            <el-table-column prop="prodRefundAmount" label="退款金额" align=center></el-table-column>
            <el-table-column prop="prodRefundAt" label="退款时间" width="120px" align=center></el-table-column>
            <el-table-column prop="prodRefundOrderAt" label="退货时间" width="120px" align=center></el-table-column>
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
              <el-button v-if="waitorderdetail.delivStatus=='0'" @click="handlebtn()" type="primary">确认</el-button>
          </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
    name: 'HotelWaitOrderdetail',
    data() {
        return{
            authzData: '',
            prodchangeid:"",  //查看id
            waitorderdetail:{},  //数据
            typejudge:'',  //配送单类型
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
       this.$router.push({name:'HotelWaitDealOrder'})
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
                  this.$router.push({name:'HotelWaitDealOrder'})
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
                  that.waitorderdetail=response.data.data;
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
.guestminidelidetail{
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
-->

