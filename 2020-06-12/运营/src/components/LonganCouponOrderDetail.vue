<template>
    <div class="CouponOrderDetail">
        <p class="title">查看详情</p>
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
                <td class="subTitle"></td>
                <td class="subcont"></td>
            </tr>
            <tr>
                <td class="subTitle">订单号</td>
                <td class="subcont">{{orderProdDataDetail.orderCode}}</td>
                <td class="subTitle">用户id</td>
                <td class="subcont">{{orderProdDataDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{orderProdDataDetail.hotelName}}</td>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{orderProdDataDetail.nickName}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品总数</td>
                <td class="subcont">{{orderProdDataDetail.prodCount}}</td>
                <td class="subTitle">联系人</td>
                <td class="subcont">{{orderProdDataDetail.contactName}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品金额</td>
                <td class="subcont">{{orderProdDataDetail.totalAmount}}</td>
                <td class="subTitle">手机号</td>
                <td class="subcont">{{orderProdDataDetail.contactPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{orderProdDataDetail.actualPay}}</td>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{orderProdDataDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle"></td>
                <td class="subcont"></td>
                <td class="subTitle">支付时间</td>
                <td class="subcont">{{orderProdDataDetail.payCompleteTime}}</td>
            </tr>

        </table>
        <el-table :data="orderProdDataDetail.orderDetailDTOList" border style="width:100%;">
            <el-table-column prop="funcName" label="功能区" align=center></el-table-column>
            <el-table-column prop="prodProductDTO.prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品数量" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品价格" align=center></el-table-column>
            <el-table-column prop="" label="优惠券金额" width="100px" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" align=center></el-table-column>
            <el-table-column prop="deliveryWay" label="配送方式" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.deliveryWay == 1">现场送</span>
                    <span v-else-if="scope.row.deliveryWay == 2">快递送</span>
                    <span v-else-if="scope.row.deliveryWay == 3">迷你吧</span>
                </template>
            </el-table-column>
            <el-table-column prop="expressPerson" label="收件人" align=center></el-table-column>
            <el-table-column prop="expressPhone" label="手机号" width="110px" align=center></el-table-column>
            <el-table-column prop="expressAddress" label="地址" align=center></el-table-column>
            <el-table-column prop="roomCode" label="房间号" align=center></el-table-column>
            <el-table-column prop="status" label="状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">正常</span>
                    <span v-else-if="scope.row.status == 1">已退款</span>
                    <span v-else-if="scope.row.status == 2">已退货退款</span>
                    <span v-else-if="scope.row.status == 3">已申请售后</span>
                </template>
            </el-table-column>
            <el-table-column prop="refundTime" label="退款时间" width="120px" align=center></el-table-column>
            <el-table-column prop="returnTime" label="退货时间" width="120px" align=center></el-table-column>
            <el-table-column prop="tipFee" label="配送服务费" width="100px" align=center>
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
            <el-table-column prop="" label="快递费" align=center>
            </el-table-column>
            <el-table-column prop="" label="支付通道费用" width="120px" align=center></el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LonganCouponOrderDetail',
    data(){
        return {
            authzlist: {}, //权限数据
            opId: '',
            orderProdDataDetail: [],
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
                    if(result.code == '0'){
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
        //返回
        returnList(){
            this.$router.push({name: 'LonganCouponOrder'});
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
.CouponOrderDetail{
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
            width: 260px;
        }
    }
}
</style>


