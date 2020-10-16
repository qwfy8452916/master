<template>
    <div class="platdeliverydetail">
        <p class="title">订单详情</p>
        <table cellpadding="0" cellspacing="0" class="deliveryTable">
            <tr>
                <td class="subTitle">订单号</td>
                <td class="subcont">{{orderCouponDataDetail.orderCode}}</td>
            </tr>
            <tr>
                <td class="subTitle">酒店名称</td>
                <td class="subcont">{{orderCouponDataDetail.hotelName}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户ID</td>
                <td class="subcont">{{orderCouponDataDetail.customerId}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户昵称</td>
                <td class="subcont">{{orderCouponDataDetail.nickName}}</td>
            </tr>
            <tr>
                <td class="subTitle">用户手机</td>
                <td class="subcont">{{orderCouponDataDetail.contactPhone}}</td>
            </tr>
            <tr>
                <td class="subTitle">下单时间</td>
                <td class="subcont">{{orderCouponDataDetail.payTime}}</td>
            </tr>
            <tr>
                <td class="subTitle">商品总数</td>
                <td class="subcont">{{orderCouponDataDetail.prodCount}}</td>
            </tr>
            <tr>
                <td class="subTitle">优惠金额</td>
                <td class="subcont">{{orderCouponDataDetail.couponAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">抵扣金额</td>
                <td class="subcont">{{orderCouponDataDetail.deductAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">减免金额</td>
                <td class="subcont">{{orderCouponDataDetail.discountAmount}}</td>
            </tr>
            <tr>
                <td class="subTitle">实付金额</td>
                <td class="subcont">{{orderCouponDataDetail.actualPay}}</td>
            </tr>
            <tr>
                <td class="subTitle">使用数量</td>
                <td class="subcont">{{orderCouponDataDetail.vouUserCount}}</td>
            </tr>
        </table>
        <p class="title">卡券详情</p>
        <el-table :data="orderCouponDataDetail.vouVoucherDTOS" border style="width:100%;">
            <el-table-column fixed prop="batchId" label="卡券编号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="vouName" label="卡券名称" min-width="120px"></el-table-column>
            <el-table-column prop="vouBasicPrice" label="基础价格" min-width="100px" align=center></el-table-column>
            <el-table-column prop="isGived" label="是否转增" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.isGived == 1">是</span>
                    <span v-else-if="scope.row.isGived == 0">否</span>
                </template>
            </el-table-column>
            <el-table-column prop="vouEndDate" label="有效期" min-width="160px" align=center></el-table-column>
            <el-table-column prop="vouDeductibleType" label="抵扣类型" min-width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.vouDeductibleType == 0">现金</span>
                    <span v-else-if="scope.row.vouDeductibleType == 1">商品</span>
                </template>
            </el-table-column>
            <el-table-column label="抵扣内容" min-width="120px">
                <template slot-scope="scope">
                    <span v-if="scope.row.vouDeductibleType == 0">{{scope.row.vouDeductibleMoney}}</span>
                    <span v-else-if="scope.row.vouDeductibleType == 1">{{scope.row.deductHotelProdName}}({{scope.row.deductHotelProdSpecName}})</span>
                </template>
            </el-table-column>
        </el-table>
        <br/><br/>
        <el-button @click="returnList">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'LonganOrderCouponDetails',
    data(){
        return {
            authzlist: {}, //权限数据
            ocId: '',
            orderCouponDataDetail: [],
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.ocId = this.$route.query.id;
        this.orderCouponDetail();
    },
    methods: {
        //订单商品详情
        orderCouponDetail(){
            const params = {};
            const id = this.ocId;
            this.$api.orderCouponDetail(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.orderCouponDataDetail = result.data;
                    }else{
                        this.$message.error('卡券详情获取失败！');
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
            this.$router.go(-1)
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
        clear: both;
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

