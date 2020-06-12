<template>
    <div class="reportdata">
        <el-form :inline="true" align=left class="searchform">
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
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="HotelReportDataList" border stripe style="width:100%;" >
            <el-table-column prop="prodName" label="商品名称"></el-table-column>
            <el-table-column prop="prodSafeCount" label="订单总数量"></el-table-column>
            <el-table-column prop="prodSafeCount" label="商品总数量"></el-table-column>
            <el-table-column prop="prodSafeCount" label="订单总金额"></el-table-column>
            <el-table-column prop="prodSafeCount" label="退款总数量"></el-table-column>
            <el-table-column prop="prodSafeCount" label="退款总金额"></el-table-column>
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
import resetButton from './resetButton'
export default {
    name: 'LonganReportProdSell',
    components:{
        resetButton
    },
    data(){
        return{
            echarts: require('echarts'),
            authzData: '',
            inquireTime: [],
            yesterdayTime: [],
            HotelReportDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getYesterdayDate();
        // this.reportHotelSell();
    },
    methods: {
        resetFunc(){
            this.inquireTime = []
            this.reportHotelSell();
        },
        //获取昨天日期
        getYesterdayDate(){
            let nowdate = new Date();
            let yesterdaytime = nowdate.getTime() - 3600 * 1000 * 24;
            let yesterdaydate = new Date(yesterdaytime);
            let yesDate = yesterdaydate.getFullYear() + '-' + yesterdaydate.getMonth() + '-' + yesterdaydate.getDate();
            this.inquireTime = [yesDate, yesDate];
            this.yesterdayTime = [yesDate, yesDate];
        },
        //酒店销售汇总报表
        reportHotelSell(){
            if(this.inquireTime == null || this.inquireTime.length == 0){
                this.inquireTime = this.yesterdayTime;
            }
            const params = {
                startTime: this.inquireTime[0],
                endTime: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: 10
            };
            this.$api.reportHotelSell(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == '0'){
                        this.HotelReportDataList = result.data.records;
                        this.pageTotal = result.data.total;
                    }else{
                        this.$message.error(result.msg);
                    }
                }).catch(err=>{
                    this.$alert(err,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.reportHotelSell();
            this.$store.commit('setSearchList',{
                inquireTime: this.inquireTime
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.reportHotelSell();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.reportHotelSell();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.reportHotelSell();
        },

    }
}
</script>

<style scoped>
.el-table th{
    border-right: 1px solid #ebeef5 !important;
    border-bottom: 1px solid #ebeef5 !important;
}
.el-dialog__header{
    text-align: left;
}
</style>

<style lang="less" scoped>
.reportdata{
    .pagination{
        margin-top: 20px;
    }
}
</style>

