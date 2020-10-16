<template>
    <div>
        <div class="download">
            <div><el-button class="addbutton" @click="exportExe(1)">订房报表下载</el-button></div>
            <div><el-button class="addbutton" @click="exportExe(2)">商品报表下载</el-button></div>
            <div><el-button class="addbutton" @click="exportExe(3)">餐饮销售报表下载</el-button></div>
            <div><el-button class="addbutton" @click="exportExe(4)">预售报表下载</el-button></div>
            <div><el-button class="addbutton" @click="exportExe(5)">活动报表下载</el-button></div>
        </div>
        <!-- <div><el-button class="addbutton" @click="exportExe">导&nbsp;&nbsp;出</el-button></div> -->
        <el-dialog title="选择报表时间范围" :visible.sync="dislogVisibleTime" width="30%">
            <el-form align=left label-width="80px">
                <el-form-item label="下单时间">
                    <el-date-picker
                        v-model="orderTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="请选择日期"
                        end-placeholder="请选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dislogVisibleTime = false">取 消</el-button>
                <el-button type="primary" @click="ensureDownload">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LonganReportOrderAll',
    data(){
        return{
            authzData: '',
            token:'',
            dislogVisibleTime: false,
            orderTime: [],
            exportType: '',
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.token = localStorage.getItem('Authorization');
    },
    methods: {
        //下载
        exportExe(type){
            this.exportType = type;
            this.dislogVisibleTime = true;
        },
        // //导出
        // exportExe(){
        //     if(this.inquireTime == null){
        //         this.inquireTime = [];
        //     }
        //     window.location.href = "http://opr.kefangbao.com.cn/longan/api/order/export/download?orgAs=2&hotelId="+ this.hotelId +"&phone="+ this.phone +"&orderAmountStatus="+ this.orderAmountStatus +"&status="+ this.status +"&startTime="+ this.inquireTime[0] +"&endTime="+ this.inquireTime[1] +"&token="+ this.token;
        //     // window.location.href = "http://3020ff7582.qicp.vip:32025/longan/api/order/export/download?orgAs=2&hotelId="+ this.hotelId +"&phone="+ this.phone +"&orderAmountStatus="+ this.orderAmountStatus +"&status="+ this.status +"&startTime="+ this.inquireTime[0] +"&endTime="+ this.inquireTime[1];
        // },
        //确定
        ensureDownload(){
            this.dislogVisibleTime = false;
            if(this.orderTime == null){
                this.orderTime = [];
            }
            if(this.exportType == 1){   //订房
                window.location.href = "http://122.51.200.225/longan/api/report/report-book-room-data-po/export?t="+ this.token +"&startTime="+ this.orderTime[0] +"&endTime="+ this.orderTime[1];
            }else if(this.exportType == 2){   //商品
                window.location.href = "http://122.51.200.225/longan/api/report/report-product-sale-data-po/export?t="+ this.token +"&startTime="+ this.orderTime[0] +"&endTime="+ this.orderTime[1];
            }else if(this.exportType == 3){   //餐饮
                window.location.href = "http://122.51.200.225/longan/api/report/report-catering-sales-data-po/export?t="+ this.token +"&startTime="+ this.orderTime[0] +"&endTime="+ this.orderTime[1];
            }else if(this.exportType == 4){   //预售
                window.location.href = "http://122.51.200.225/longan/api/report/report-vou-sales-data-po/export?t="+ this.token +"&startTime="+ this.orderTime[0] +"&endTime="+ this.orderTime[1];
            }else if(this.exportType == 5){   //活动
                window.location.href = "http://122.51.200.225/longan/api/report/report-act-sales-data-po/export?t="+ this.token +"&startTime="+ this.orderTime[0] +"&endTime="+ this.orderTime[1];
            }
            this.orderTime = [];
        },
    }
}
</script>

<style lang="less" scoped>
.download{
    display: flex;
    flex-direction: column;
}
</style>>

