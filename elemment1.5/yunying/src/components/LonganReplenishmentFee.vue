<template>
    <div class="LonganWithdrawalsRecord">
        <el-form :inline="true" align=left>
            <el-form-item label="酒店名称">
                <el-input v-model="HotelName"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="HotelName"></el-input>
            </el-form-item>
            <el-form-item label="补货人">
                <el-input v-model="HotelName"></el-input>
            </el-form-item>
            <el-form-item label="选择时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择日期"
                    end-placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="LonganWithdrawalsRecordDataList" border style="width:100%;" >
            <el-table-column prop="HotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="TradeName" label="楼层" align=center></el-table-column>
            <el-table-column prop="SalesAmount" label="房间号" align=center></el-table-column>
            <el-table-column prop="DividedTntoAmount" label="补货格子" align=center></el-table-column>
            <el-table-column prop="SalesAmount" label="商品名称" align=center></el-table-column>
            <el-table-column prop="DividedTntoAmount" label="补货人" align=center></el-table-column>
            <el-table-column prop="SalesAmount" label="补货费" align=center></el-table-column>
            <el-table-column prop="DividedTntoAmount" label="补货时间" align=center></el-table-column>
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
    name: 'LonganWithdrawalsRecord',
    data(){
        return{
            inquireTime: [],
            LonganWithdrawalsRecordDataList: [],
            HotelName: '',
            dealStatus: '',
            inquireCommodityName: '',
            pageNum: 1,
            currentPage: 1,
            pageTotal: 1,
            GrossIncome: '',
        }
    },
    mounted(){
        this.LonganWithdrawalsRecord();
    },
    methods: {
        //酒店提现记录
        LonganWithdrawalsRecord(){
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                HotelName: this.HotelName,
                purchaseAtStart: this.inquireTime[0],
                purchaseAtEnd: this.inquireTime[1],
                supplName: this.inquireCommodityName,
                pageNo: this.pageNum,
                pageSize: 10
            };
            console.log(params);
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.LonganWithdrawalsRecord();
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.LonganWithdrawalsRecord();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.LonganWithdrawalsRecord();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.LonganWithdrawalsRecord();
        }
    }
}
</script>

<style lang="less" scoped>
    .Revenue-font{
        text-align: left;
        margin-bottom: 20px;
    }
    .pagination{
        margin-top: 20px;
    }
</style>

