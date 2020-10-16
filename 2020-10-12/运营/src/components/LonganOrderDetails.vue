<template>
    <div class="LonganOrderDetails">
        <div class="font-bt">配送单详情</div>
        <ul class="HotelRevenueDetail-ul">
            <li>
                <div class="table-font1">订单状态</div>
                <div class="table-font2" v-if="detailList.orderStatus == 0">待支付</div>
                <div class="table-font2" v-else-if="detailList.orderStatus == 1">已支付</div>
                <div class="table-font2" v-else-if="detailList.orderStatus == 2">已取消</div>
            </li>
            <li>
                <div class="table-font1">酒店名称</div>
                <div class="table-font2">{{detailList.hotelName}}</div>
            </li>
            <li>
                <div class="table-font1">配送单号</div>
                <div class="table-font2">{{detailList.prodCount}}</div>
            </li>
            <li>
                <div class="table-font1">配送方式</div>
                <div class="table-font2">{{detailList.totalAmount}}</div>
            </li>
            <li>
                <div class="table-font1">楼层</div>
                <div class="table-font2">{{detailList.actualPay}}</div>
            </li>
            <!-- <li>
                <div class="table-font1">收货人</div>
                <div class="table-font2">{{detailList.actualPay}}</div>
            </li> -->
            <li>
                <div class="table-font1">房间号</div>
                <div class="table-font2">{{detailList.customerId}}</div>
            </li>
            <!-- <li>
                <div class="table-font1">手机号</div>
                <div class="table-font2">{{detailList.customerId}}</div>
            </li> -->
            <!-- <li>
                <div class="table-font1">地址</div>
                <div class="table-font2">{{detailList.customerId}}</div>
            </li> -->
            <li>
                <div class="table-font1">类型</div>
                <div class="table-font2">{{detailList.nickName}}</div>
            </li>
            <li>
                <div class="table-font1">商家</div>
                <div class="table-font2">{{detailList.contactName}}</div>
            </li>
            <li>
                <div class="table-font1">商品金额</div>
                <div class="table-font2">{{detailList.contactPhone}}</div>
            </li>
            <li>
                <div class="table-font1">实付金额</div>
                <div class="table-font2">{{detailList.createdAt}}</div>
            </li>
            <li>
                <div class="table-font1">联系人</div>
                <div class="table-font2">{{detailList.roomDeliveryRemark}}</div>
            </li>
            <li>
                <div class="table-font1">手机号</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li>
                <div class="table-font1">下单时间</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li>
                <div class="table-font1">支付时间</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li>
                <div class="table-font1">确认人</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li>
                <div class="table-font1">确认时间</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <li>
                <div class="table-font1">配送人</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <!-- <li>
                <div class="table-font1">发货时间</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li> -->
            <li>
                <div class="table-font1">配送时间</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <!-- <li>
                <div class="table-font1">物流信息</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li> -->
            <li>
                <div class="table-font1">用户留言</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li>
            <!-- <li>
                <div class="table-font1">物流单号</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li> -->
            <!-- <li>
                <div class="table-font1">用户留言</div>
                <div class="table-font2">{{detailList.expressRemark}}</div>
            </li> -->
        </ul>

        <el-table :data="orderProdDTOS" border style="width:100%;margin-bottom: 30px;" >
            <el-table-column prop="" label="商品名称" align=center></el-table-column>
            <el-table-column prop="" label="商品数量" align=center></el-table-column>
            <el-table-column prop="" label="商品价格" align=center></el-table-column>
            <el-table-column prop="" label="实付金额" align=center></el-table-column>
            <el-table-column prop="" label="状态" align=center></el-table-column>
            <el-table-column prop="" label="退款金额" align=center></el-table-column>
            <el-table-column prop="" label="退款时间" align=center></el-table-column>
            <el-table-column prop="" label="退货时间" align=center></el-table-column>
        </el-table>

        <div class="btnbox">
            <el-button type="primary" @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LonganOrderDetails',
    data(){
        return{
            detailList: {},
            orderProdDTOS: [],
            id: '',
            oprId: ''
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        // this.oprId=localStorage.getItem('orgId');
        this.oprId = this.$route.params.orgId;
        // this.LonganOrderDetails();
    },
    methods: {
        //配送单详情
        LonganOrderDetails(){
            this.$api.LonganOrderDetails(this.id).then(response => {
                const result = response.data;
                if(result.code == '0'){
                    this.detailList = result.data;
                    this.orderProdDTOS = result.data.orderProdDTOS;
                }else{
                    this.$message.error('配送单详情获取失败');
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //返回
        returnList(){
            this.$router.push({name: 'LonganOrderDeliveryDetails'});
        }
    }
}
</script>

<style lang="less" scoped>
.HotelRevenueDetail-ul{
    width: 300px;
    border:1px solid #ccc;
    padding-left: 0;
    margin-bottom: 30px;
}
.HotelRevenueDetail-ul li{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #ccc;
}
.HotelRevenueDetail-ul li:last-child{
    border-bottom: none;
}
.HotelRevenueDetail-ul li div{
    flex-grow: 1;
    width: 45%;
    line-height: 50px;
    padding-left: 5%;
    text-align: left;
    font-size: 14px;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #909399;
    font-weight: bold;
    border-right: 1px solid #ccc;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #606266;
}
.btnbox{
    text-align: left;
}
.font-bt{
    text-align: left;
    font-size: 25px;
    color: #000;
    font-weight: bold;
    margin-bottom: 30px;
}
</style>

