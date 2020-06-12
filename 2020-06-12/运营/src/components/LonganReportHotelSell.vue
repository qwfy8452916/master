<template>
    <div class="reportdata">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称">
                <el-select 
                    v-model="inquireHotelName"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option v-for="item in hotelList" :key="item.id" :label="item.hotelName" :value="item.id"></el-option>
                </el-select>
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
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="HotelReportDataList" border stripe style="width:100%;" >
            <el-table-column label="">
                <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            </el-table-column>
            <el-table-column label="总计" align=center>
                <el-table-column prop="prodName" label="订单总数量"></el-table-column>
                <el-table-column prop="prodSafeCount" label="订单总金额"></el-table-column>
                <el-table-column prop="prodSafeCount" label="用户数量"></el-table-column>
            </el-table-column>
            <el-table-column label="商品销售" align=center>
                <el-table-column prop="prodSafeCount" label="订单总数量"></el-table-column>
                <el-table-column prop="prodSafeCount" label="商品总数量"></el-table-column>
                <el-table-column prop="prodSafeCount" label="订单总金额"></el-table-column>
            </el-table-column>
            <el-table-column label="客房预订" align=center>
                <el-table-column prop="prodSafeCount" label="订单总数量"></el-table-column>
                <el-table-column prop="prodSafeCount" label="客房总数量"></el-table-column>
                <el-table-column prop="prodSafeCount" label="订单总金额"></el-table-column>
            </el-table-column>
            <el-table-column label="">
                <el-table-column label="操作" align=center>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="checkTheReport(scope.row.id, scope.row.hotelName)">查看报表</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
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
        <el-dialog :title="reportHotelName" :visible.sync="dialogVisibleReport" width="42%">
            <div>报表</div>
        </el-dialog>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganReportHotelSell',
    components:{
        resetButton
    },
    data(){
        return{
            echarts: require('echarts'),
            authzData: '',
            hotelList: [],
            loadingH: false,
            inquireHotelName: '',
            inquireTime: [],
            yesterdayTime: [],
            HotelReportDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            dialogVisibleReport: false,
            reportHotelName: '电话鼓风机',
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                    this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getYesterdayDate();
        // this.reportHotelSell();
    },
    methods: {
        resetFunc(){
            this.inquireHotelName = ''
            this.inquireTime = []
            this.reportHotelSell();
        },
        //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                hotelName: hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelList(params)
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.hotelList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.hotelName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.hotelList.unshift(hotelAll);
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
        remoteHotel(val){
            this.getHotelList(val);
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
                hotelId: this.inquireHotelName,
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
        //查看报表
        checkTheReport(id, hotelName){
            this.reportHotelName = hotelName;
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.reportHotelSell();
            this.$store.commit('setSearchList',{
                inquireHotelName: this.inquireHotelName,
                inquireTime:this.inquireTime
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

