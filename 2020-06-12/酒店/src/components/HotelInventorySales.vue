<template>
    <div class="salesdetail">
        <p class="title">销售明细</p>
        <el-form :inline="true" align=left>
            <el-form-item label="用户昵称">
                <el-input v-model="inquireUserName"></el-input>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="InventorySalesDataList" border style="width:100%;" >
            <el-table-column fixed prop="orderCode" label="订单号" width="100px" align=center></el-table-column>
            <el-table-column prop="cabId" label="柜子id" align=center></el-table-column>
            <el-table-column prop="customerId" label="用户id" align=center></el-table-column>
            <el-table-column prop="nickName" label="用户昵称" align=center></el-table-column>
            <el-table-column prop="prodId" label="商品id" align=center></el-table-column>
            <el-table-column prop="prodName" label="商品名称" align=center></el-table-column>
            <el-table-column prop="orderCount" label="数量" align=center></el-table-column>
            <el-table-column prop="actualPay" label="金额" align=center></el-table-column>
            <el-table-column prop="orderAt" label="下单时间" align=center></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="currentPage"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HotelInventorySales',
    data(){
        return{
            encryptedHotelOrgId: '',
            id: '',
            inquireUserName: '',
            inquireTime: [],
            InventorySalesDataList: [],
            pageTotal: 1,     //总条目数
            currentPage: 1,   //当前页数
            pageNum: 1,
        }
    },
    mounted(){
        // this.encryptedHotelOrgId = localStorage.getItem('orgId');
        this.encryptedHotelOrgId = this.$route.params.orgId;
        this.id = this.$route.query.id;
        this.salesList();
    },
    methods: {
        //列表
        salesList(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                encryptedHotelOrgId: this.encryptedHotelOrgId,
                prodId: this.id,
                nickName: this.inquireUserName,
                orderAtStart : this.inquireTime[0],
                orderAtEnd : this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.salesList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.InventorySalesDataList = result.data.list;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error('销售明细获取失败！');
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.salesList();
        },
        //跳转
        current(){
            this.pageNum = this.currentPage;
            this.salesList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.salesList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.salesList();
        }
    },
}
</script>

<style lang="less" scoped>
.salesdetail{
    .title{
        font-weight: bold;
        text-align: left;
    }
    .pagination{
        margin-top: 20px;
    }
}
</style>

