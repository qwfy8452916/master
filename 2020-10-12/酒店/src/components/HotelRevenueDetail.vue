<template>
    <div class="HotelRevenueDetail">
        <ul class="HotelRevenueDetail-ul" v-for="item in detailList" :key="item.id">
            <li>
                <div class="table-font1">商品名称</div>
                <div class="table-font2">{{item.prodName}}</div>
            </li>
            <li>
                <div class="table-font1">销售数量</div>
                <div class="table-font2">{{item.salesCount}}</div>
            </li>
            <li>
                <div class="table-font1">采购单价（元）</div>
                <div class="table-font2">{{item.prodPurPrice}}</div>
            </li>
            <li>
                <div class="table-font1">销售金额（元）</div>
                <div class="table-font2">{{item.actualPay}}</div>
            </li>
            <li>
                <div class="table-font1">利润额（元）</div>
                <div class="table-font2">{{item.profitAmount}}</div>
            </li>
            <li>
                <div class="table-font1">分成比例（%）</div>
                <div class="table-font2">{{item.divided}}</div>
            </li>
            <li>
                <div class="table-font1">分成金额（元）</div>
                <div class="table-font2">{{item.dividedPay}}</div>
            </li>
            <li>
                <div class="table-font1">税收损耗</div>
                <div class="table-font2">{{item.taxAmount}}</div>
            </li>
            <li>
                <div class="table-font1">成本损耗</div>
                <div class="table-font2">{{item.lossAmount}}</div>
            </li>
        </ul>
        <div class="btnbox">
            <el-button type="primary" @click="returnList">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelRevenueDetail',
    data(){
        return{
            detailList: [],
            oprId: '',
            prodId: ''
        }
    },
    mounted(){
        this.prodId = this.$route.query.id;
        this.oprId=localStorage.getItem('orgId');
        this.HotelRevenueDetail();
    },
    methods: {
        //营收统计详情
        HotelRevenueDetail(){
            const params = {
                encryptedOrgId: this.oprId,
                prodId: this.prodId
            };
            this.$api.HotelRevenueDetail({params})
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.detailList = result.data;
                    }else{
                        this.$message.error('营收统计详情获取失败');
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
            this.$router.push({name: 'HotelRevenueStatistics'});
        }
    }
}
</script>

<style lang="less" scoped>
.HotelRevenueDetail-ul{
    width: 300px;
    border:1px solid #ccc;
    padding-left: 0;
}
.HotelRevenueDetail-ul li{
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    text-align: left;
    padding-right: 10px;
}
.HotelRevenueDetail-ul li .table-font1{
    color: #606266;
}
.btnbox{
    text-align: left;
}
</style>

