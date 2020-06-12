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
        <table cellpadding="0" cellspacing="0" width="100%" class="reportTable">
            <tr>
                <td class="title" colspan="3">总计</td>
                <td class="title" colspan="3">商品销售</td>
                <td class="title" colspan="3">客房预订</td>
            </tr>
            <!-- <tr>
                <td colspan="3">总计</td>
                <td colspan="3">商品销售</td>
                <td colspan="3">客房预订</td>
            </tr> -->
            <tr>
                <td class="title">订单总数量</td>
                <td class="title">订单总金额（元）</td>
                <td class="title">用户数量</td>
                <td class="title">订单总数量</td>
                <td class="title">商品总数量</td>
                <td class="title">订单总金额（元）</td>
                <td class="title">订单总数量</td>
                <td class="title">客房总数量</td>
                <td class="title">订单总金额（元）</td>
            </tr>
            <tr>
                <td>1</td>
                <td>22</td>
                <td>34</td>
                <td>76786</td>
                <td>2</td>
                <td>34</td>
                <td>45</td>
                <td>5567</td>
                <td>22</td>
            </tr>
            <!-- <tr>
                <td class="subTitle">状态</td>
                <td class="subcont" colspan="3">
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
            </tr> -->
        </table>
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
    name: 'LonganReportAllSell',
    components:{
        resetButton
    },
    data(){
        return{
            echarts: require('echarts'),
            authzData: '',
            inquireTime: [],
            yesterdayTime: [],
            reportData: {},
            reportTypeTab: 'amountChart'
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
        this.reportAllSell();
    },
    methods: {
        resetFunc(){
            this.inquireTime = []
            this.reportAllSell();
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
        //查询
        inquire(){
            this.reportAllSell();
            this.$store.commit('setSearchList',{
                inquireTime: this.inquireTime
            })
        },
        //切换
        typeActiveFun(){

        },
    }
}
</script>

<style lang="less" scoped>
.reportdata{
    .reportTable{
        font-size: 14px;
        color: #606266;
        border-top: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        margin-bottom: 20px;
        td{
            height: 42px;
            border-right: 1px solid #ebeef5;
            border-bottom: 1px solid #ebeef5;
            padding: 0px 10px;
        }
        .title{
            line-height: 42px;
            color: #fff;
            border-right: 1px solid #ebeef5;
            border-bottom: 1px solid #ebeef5;
            background: rgba(64,158,255,0.8);
        }
    }
}
</style>

