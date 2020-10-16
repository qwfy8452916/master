<template>
    <div class="plateeliverylist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="配送单号">
                <el-input v-model="inquireDeliveryCode"></el-input>
            </el-form-item>
            <el-form-item label="功能区">
                <el-select
                    v-model="inquireFunctionName"
                    filterable
                    remote
                    :remote-method="remoteFunction"
                    :loading="loadingF"
                    @focus="getFunctionList()"
                    placeholder="请选择">
                    <el-option v-for="item in functionList" :key="item.id" :label="item.funcCnName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquirePhone"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <!-- <el-option label="待确认" value="0"></el-option> -->
                    <el-option label="已确认" value="1"></el-option>
                    <el-option label="已发货" value="2"></el-option>
                    <el-option label="已取消" value="6"></el-option>
                    <!-- <el-option label="已配送" value="2"></el-option>
                    <el-option label="部分退款" value="3"></el-option>
                    <el-option label="全部退款" value="4"></el-option>
                    <el-option label="已收货" value="5"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="支付时间">
                <el-date-picker
                    v-model="inquireTime"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="DeliveryDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="delivCode" label="配送单号" min-width="180px" align=center></el-table-column>
            <el-table-column prop="funcName" label="功能区" min-width="100px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.funcId == 0">客房服务</span>
                    <span v-else>{{scope.row.funcName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="roomFloor" label="区域" min-width="80px" align=center></el-table-column>
            <el-table-column prop="roomCode" label="地点" min-width="80px" align=center></el-table-column>
            <el-table-column prop="prodCount" label="商品总数" min-width="80px" align=center></el-table-column>
            <el-table-column prop="totalAmount" label="商品金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="couponAmount" label="优惠金额" min-width="80px" align=center></el-table-column>
            <el-table-column
                prop="allVouDeductAmount"
                label="抵扣金额"
                min-width="80px"
                align="center"
            ></el-table-column>
            <el-table-column prop="discountAmount" label="减免金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="actualPay" label="实付金额" min-width="80px" align=center></el-table-column>
            <el-table-column prop="customerId" label="用户ID" min-width="80px" align=center></el-table-column>
            <el-table-column prop="contactPeople" label="订单联系人" min-width="100px"></el-table-column>
            <el-table-column prop="contactPhone" label="手机号" min-width="120px" align=center></el-table-column>
            <el-table-column prop="payCompleteTime" label="支付时间" min-width="160px" align=center></el-table-column>
            <el-table-column prop="status" label="状态" min-width="80px" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">待确认</span>
                    <span v-else-if="scope.row.status == 1">已确认</span>
                    <span v-else-if="scope.row.status == 2">已发货</span>
                    <span v-else-if="scope.row.status == 3">部分退款</span>
                    <span v-else-if="scope.row.status == 4">全部退款</span>
                    <span v-else-if="scope.row.status == 5">已售后</span>
                    <span v-else-if="scope.row.status == 6">已取消</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="140px" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-if="scope.row.status == 0 && authzlist['F:BH_DELIV_SERVICEDELIVERYLISTSUBMIT']" @click="ensurePlatDelivery(scope.row.id)">确认</el-button>
                    <el-button v-if="authzlist['F:BH_DELIV_SERVICEDELIVERYLIST_DETAIL']" type="text" size="small" @click="deliveryDetail(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisibleOrder" width="30%">
            <span>是否确认该订单？</span>
            <span slot="footer">
                <el-button @click="dialogVisibleOrder=false">取消</el-button>
                <el-button type="primary" @click="ensureOrder">确认</el-button>
            </span>
        </el-dialog>
        <HotelPagination :pageTotal="pageTotal" @pageFunc="pageFunc" />
    </div>
</template>

<script>
import resetButton from '@/components/resetButton'
import HotelPagination from '@/components/HotelPagination'
export default {
    name: 'HotelServiceDeliveryList',
    components:{
        HotelPagination,
        resetButton
    },
    data(){
        return {
            // orgId: '',
            authzlist: {}, //权限数据
            hotelId: '',
            pdId: '',
            inquireDeliveryCode: '',
            inquireFunctionName: '',
            functionList: [],
            loadingF: false,
            inquirePhone: '',
            inquireProdName: '',
            prodList: [],
            inquireStatus: '',
            inquireTime: [],
            DeliveryDataList: [],
            dialogVisibleOrder: false,
            pageTotal: 0,
            pageSize: 10,
            pageNum: 1,
        }
    },
    mounted(){
        // this.orgId = localStorage.getItem('orgId');
        // this.orgId = this.$route.params.orgId;
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        this.hotelId = localStorage.getItem('hotelId');
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.getFunctionList();
        this.platDeliveryList();
    },
    methods: {
        resetFunc(){
            this.inquireDeliveryCode = ''
            this.inquireFunctionName = ''
            this.inquirePhone = ''
            this.inquireStatus = ''
            this.inquireTime = []
            this.platDeliveryList();
        },
        //分页
        pageFunc(data){
            this.pageSize = data.pageSize;
            this.pageNum = data.pageNum;
            this.platDeliveryList();
        },
        //功能区列表
        getFunctionList(fName){
            this.loadingF = true;
            const params = {
                isNeedRmsv: 1,
                funcName: fName,
                hotelId: this.hotelId,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.hotelFunctionList(params)
                .then(response => {
                    this.loadingF = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.functionList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                funcCnName: item.funcCnName
                            }
                        })
                        const functionAll = {
                            id: '',
                            funcCnName: '全部'
                        };
                        this.functionList.unshift(functionAll);
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
        remoteFunction(val){
            this.getFunctionList(val);
        },
        //配送单列表
        platDeliveryList(){
            this.DeliveryDataList = [];
            if(this.inquireTime == null){
                this.inquireTime = [];
            }
            const params = {
                chooseAs: 3,
                delivWay: 1,
                deliveryCode: this.inquireDeliveryCode,
                funcId: this.inquireFunctionName,
                contactPhone: this.inquirePhone,
                status: this.inquireStatus,
                payStartTime: this.inquireTime[0],
                payEndTime: this.inquireTime[1],
                // orgAs: 3,
                // hotelId: this.hotelId,
                // choose: 2,
                // delivCode: this.inquireDeliveryCode,
                // contactMobile: this.inquirePhone,
                // deilvState: this.inquireStatus,
                // startPayAt: this.inquireTime[0],
                // endPayAt: this.inquireTime[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            };
            // console.log(params);
            this.$api.platDeliveryList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.DeliveryDataList = result.data.records;
                        // result.data.records.map(item => {
                        //     if(item.delivWay == 1){
                        //         this.DeliveryDataList.push(item);
                        //     }
                        // });
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
        //确认
        ensurePlatDelivery(id){
            this.pdId = id;
            this.dialogVisibleOrder = true;
        },
        ensureOrder(){
            const params = {};
            const id = this.pdId;
            // console.log(params);
            this.$api.ensurePlatDelivery(params, id)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.$message.success('配送单确认成功！');
                        this.dialogVisibleOrder = false;
                        this.platDeliveryList();
                    }else{
                        this.$message.error('配送单确认失败！');
                        this.dialogVisibleOrder = false;
                    }
                })
                .catch(error => {
                    this.$alert(error,"警告",{
                        confirmButtonText: "确定"
                    })
                })
        },
        //查看详情
        deliveryDetail(id){
            this.$router.push({name: 'HotelServiceDeliveryDetail', query: {id}});
        },
        //查询
        inquire(){
            this.pageNum = 1;
            this.platDeliveryList();
            this.$store.commit('setSearchList',{
                inquireDeliveryCode: this.inquireDeliveryCode,
                inquireFunctionName: this.inquireFunctionName,
                inquirePhone: this.inquirePhone,
                inquireStatus: this.inquireStatus,
                inquireTime:this.inquireTime
            })
        },
    }
}
</script>

<style scoped>
.el-dialog__footer{
    text-align: center;
}
.el-date-editor.el-input{
    width: 100%;
}
</style>

<style lang="less" scoped>
.plateeliverylist{
    
}
</style>
