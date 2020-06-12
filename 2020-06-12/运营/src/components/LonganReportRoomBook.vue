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
        <el-table :data="RoomBookDataList" border stripe style="width:100%;" >
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="prodSafeCount" label="房型名称"></el-table-column>
            <el-table-column prop="prodSafeCount" label="房源名称"></el-table-column>
            <el-table-column prop="prodSafeCount" label="订单总数量"></el-table-column>
            <el-table-column prop="prodSafeCount" label="客房总数量"></el-table-column>
            <el-table-column prop="prodSafeCount" label="订单总金额"></el-table-column>
            <el-table-column prop="prodSafeCount" label="退房总数量"></el-table-column>
            <el-table-column prop="prodSafeCount" label="退房总金额"></el-table-column>
            <el-table-column label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="checkTheReport(scope.row.id, scope.row.hotelName)">查看报表</el-button>
                </template>
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
            
        </el-dialog>
        <el-tabs v-model="reportTypeTab" @tab-click="typeActiveFun">
            <el-tab-pane label="数量汇总表" name="amountChart">
                <div id="amountId" style="width:600px;height:400px;"></div>
            </el-tab-pane>
            <el-tab-pane label="金额汇总表" name="moneyChart">
                <div id="moneyId" style="width:600px;height:400px;"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganReportRoomBook',
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
            RoomBookDataList: [],
            reportData: {},
            reportTypeTab: 'amountChart',
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
        this.reportAllSell();
    },
    methods: {
        resetFunc(){
            this.inquireHotelName = ''
            this.inquireTime = []
            this.reportAllSell();
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
        //全部销售汇总报表
        reportAllSell(){
            let myChart1 = this.echarts.init(document.getElementById('amountId'));
            myChart1.setOption({
                // title: {
                //     text: 'ECharts 入门示例'
                // },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });

            let myChart2 = this.echarts.init(document.getElementById('moneyId'));
            myChart2.setOption({
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '60%',
                        // roseType: 'angle',
                        data:[
                            {value:235, name:'视频广告'},
                            {value:274, name:'联盟广告'},
                            {value:310, name:'邮件营销'},
                            {value:335, name:'直接访问'},
                            {value:400, name:'搜索引擎'}
                        ]
                    }
                ]
            })

            // if(this.inquireTime == null || this.inquireTime.length == 0){
            //     this.inquireTime = this.yesterdayTime;
            // }
            // const params = {
            //     startTime: this.inquireTime[0],
            //     endTime: this.inquireTime[1],
            // };
            // this.$api.reportAllSell(params)
            //     .then(response => {
            //         const result = response.data;
            //         if(result.code == '0'){
            //             this.reportData = result.data;
            //         }else{
            //             this.$message.error(result.msg);
            //         }
            //     }).catch(err=>{
            //         this.$alert(err,"警告",{
            //             confirmButtonText: "确定"
            //         })
            //     })
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
        //切换
        typeActiveFun(){

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

