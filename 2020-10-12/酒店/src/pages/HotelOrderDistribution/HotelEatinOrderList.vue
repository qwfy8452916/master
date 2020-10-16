<template>
    <div class="orderlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="流水号">
                <el-input v-model.trim="inquireSerialNum"></el-input>
            </el-form-item>
            <el-form-item label="桌号">
                <el-input v-model.trim="inquireTableNum"></el-input>
            </el-form-item>
            <el-form-item label="下单时间" prop="inquireTime">
                <el-date-picker
                    v-model="inquireOrderTime"
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
        <el-table :data="hotelEatinDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="serialNumber" label="流水号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomFloor" label="区域" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="桌号" min-width="80px" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品金额" min-width="80px" align=center></el-table-column>
            <!-- <el-table-column prop="couponAmount" label="优惠金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="discountAmount" label="减免金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" min-width="80px" align=center></el-table-column> -->
            <el-table-column prop="customerId" label="用户ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="userPhone" label="手机号" min-width="120px" align=center></el-table-column>
            <el-table-column prop="orderStatusStr" label="订单状态" min-width="80px" align=center></el-table-column>
            <el-table-column prop="payTime" label="下单时间" min-width="160px" align=center></el-table-column>
            <!-- <el-table-column prop="payCompleteTime" label="支付时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="cancelTime" label="取消时间" min-width="160px" align=center></el-table-column> -->
            <el-table-column fixed="right" label="操作" width="80px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="hotelEatinOrderDetail(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    </div>
</template>

<script>
import resetButton from '@/components/resetButton'
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'HotelEatinOrderList',
    components:{
        resetButton,
        HotelPagination
    },
    data(){
        return{
            authzData: '',
            hotelId: '',
            inquireSerialNum: '',
            inquireTableNum: '',
            inquireOrderTime: [],
            hotelEatinDataList: [],
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
        }
    },
    created(){
        this.getNowDate();
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.hotelEatinOrderList();
    },
    methods: {
        resetFunc(){
            this.inquireSerialNum = ''
            this.inquireTableNum = ''
            this.inquireOrderTime = []
            this.hotelEatinOrderList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.hotelEatinOrderList();
        },
        //酒店功堂食订单列表
        hotelEatinOrderList(){
            const params = {
                // hotelId: this.hotelId,
                serialNumber: this.inquireSerialNum,
                roomCode: this.inquireTableNum,
                startTime: this.inquireOrderTime[0],
                endTime: this.inquireOrderTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            // console.log(params);
            this.$api.hotelEatinOrderList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.hotelEatinDataList = result.data.records;
                        this.pageTotal = result.data.total;
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
        //查询
        inquire(){
            this.pageNum = 1;
            this.hotelEatinOrderList();
            this.$store.commit('setSearchList',{
                inquireSerialNum: this.inquireSerialNum,
                inquireTableNum: this.inquireTableNum,
                inquireOrderTime: this.inquireOrderTime,
            })
        },
        //查看详情
        hotelEatinOrderDetail(id){
            this.$router.push({name:'HotelOrderDetails', query: {id}});
        },
        /*//选择下单时间
        selectOrderTime(e){
            let start = new Date(e[0]).getTime();
            let endtinme = new Date(e[1]).getTime();
            let difference = endtinme - start;
            this.addmulMonth(e[0],2)
            let twodatetime = new Date(this.twotime).getTime() - start + 1000*3600*24;
            if(difference > twodatetime){
                this.formdata.inquireTime[1] = this.twotime
                this.$message.error('时间范围最大为两个月！');
            }
        },
        addmulMonth(dtstr, n){
            var s = dtstr.split("-");
            var yy = parseInt(s[0]);
            var mm = parseInt(s[1]);
            var dd = parseInt(s[2]);
            var dt = new Date(yy, mm, dd);
            var num = dt.getMonth() + parseInt(n);
            if(num/12 > 1){
                yy += Math.floor(num/12) ;
                mm = num%12;
            }else{
                mm += parseInt(n);
            }
            this.twotime = yy + "-" + mm  + "-" + dd;
            return yy + "-" + mm  + "-" + dd;
        },*/
        //获取当前日期
        getNowDate(){
            let newDate = new Date();
            let nowDate = newDate.getFullYear() +'-'+ parseInt(newDate.getMonth() + 1) +'-'+ newDate.getDate();
            this.inquireOrderTime = [nowDate,nowDate];
        },
    },
}
</script>

<style lang="less" scoped>
.orderlist{
   
}
</style>

