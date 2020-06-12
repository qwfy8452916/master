<template>
    <div class="orderlist">
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="订单状态">
                <!-- <el-select v-model="inquireStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待处理" value="0"></el-option>
                    <el-option label="已接单" value="1"></el-option>
                    <el-option label="已拒单" value="2"></el-option>
                    <el-option label="申请退订" value="3"></el-option>
                    <el-option label="已退订" value="4"></el-option>
                    <el-option label="已拒绝" value="5"></el-option>
                    <el-option label="已消费" value="6"></el-option>
                </el-select> -->
                <el-select v-model="inquireStatus" placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.id"
                        :label="item.statusVal"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="inquireOrderCode"></el-input>
            </el-form-item>
            <el-form-item label="客人姓名">
                <el-input v-model="inquireUserName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="inquireUserPhone"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-select
                    v-model="inquireHotel"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择"
                    @change="selectHotel">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房源名称">
                <el-select v-model="inquireResource" placeholder="请选择">
                    <el-option
                        v-for="item in resourceDataList"
                        :key="item.id"
                        :label="item.resourceName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入住日期">
                <el-date-picker
                    v-model="inquireCheckIn"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="核销状态">
                <el-select v-model="inquireIsVerification">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未核销" value="0"></el-option>
                    <el-option label="已核销" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="orderDataList" border stripe style="width:100%;" >
            <el-table-column fixed prop="orderCode" label="订单号" width="180px" align=center></el-table-column>
            <el-table-column prop="dealStatusName" label="状态" width="80px"></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
            <el-table-column prop="resourceName" label="房源名称" width="150px"></el-table-column>
            <el-table-column prop="cusName" label="客人姓名"></el-table-column>
            <el-table-column prop="cusPhone" label="联系电话" width="120px" align=center></el-table-column>
            <el-table-column prop="arrivalDate" label="入住日期" width="100px" align=center></el-table-column>
            <el-table-column prop="leaveDate" label="离店日期" width="100px" align=center></el-table-column>
            <el-table-column prop="roomCount" label="房间数" width="80px" align=center></el-table-column>
            <el-table-column prop="payTime" label="下单时间" width="160px" align=center></el-table-column>
            <el-table-column prop="writeOffStatus" label="核销状态" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.writeOffStatus == 1">已核销</span>
                    <span v-else>未核销</span>
                </template>
            </el-table-column>
            <el-table-column prop="writeOffRemark" label="核销备注" align=center></el-table-column>
            <el-table-column fixed="right" label="操作" width="100px" align=center>
                <template slot-scope="scope">
                    <el-button v-if="authzlist['F:BO_BOOK_ORDER_DETAIL']" type="text" size="small" @click="bookOrderDetail(scope.row.id)">查看详情</el-button>
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
    </div>
</template>

<script>
import resetButton from './resetButton'
export default {
    name: 'LonganBookOrder',
    components:{
        resetButton
    },
    data(){
        return {
            authzlist: {}, //权限数据
            hotelList: [],
            statusList: [],
            resourceDataList: [],
            inquireStatus: '',
            inquireOrderCode: '',
            inquireUserName: '',
            inquireUserPhone: '',
            inquireHotel: '',
            inquireResource: '',
            inquireCheckIn: [],
            inquireIsVerification: '',
            orderDataList: [],
            pageTotal: 1,
            currentPage: 1,
            pageNum: 1,
            loadingH: false,
        }
    },
    mounted(){
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzlist=response}).catch(err=>{this.datalist=err})//获取权限数据
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.getHotelList();
        this.getOrderStatusList();
        this.bookOrderList();
    },
    methods: {
        resetFunc(){
            this.inquireStatus = ''
            this.inquireOrderCode = ''
            this.inquireUserName = ''
            this.inquireUserPhone = ''
            this.inquireHotel = ''
            this.inquireResource = ''
            this.inquireCheckIn = []
            this.inquireIsVerification = ''
            this.bookOrderList();
        },
        //获取订单状态
        getOrderStatusList(){
            const params = {
                key: 'ROOM_ORDER_STATUS',
                orgId: '0',
                parentKey: '',
                parentValue: ''
            };
            this.$api.basicDataItems(params)
                .then(response => {
                    const result = response.data;
                    if(result.code == 0){
                        this.statusList = result.data.map(item => {
                            return{
                                id: item.dictValue,
                                statusVal: item.dictName
                            }
                        })
                        const statusAll = {
                            id: '',
                            statusVal: '全部'
                        };
                        this.statusList.push(statusAll);
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
        selectHotel(){
            this.getResourceList();
        },
        //获取房源列表
        getResourceList(){
            if(this.inquireHotel != ''){
                const params = {
                    hotelId: this.inquireHotel
                };
                // console.log(params);
                this.$api.getBookResourceList(params)
                    .then(response => {
                        // console.log(response);
                        const result = response.data;
                        if(result.code == '0'){
                            this.resourceDataList = result.data.map(item => {
                                return {
                                    id: item.id,
                                    resourceName: item.resourceName
                                }
                            });
                            const resourceAll = {
                                id: '',
                                resourceName: '全部'
                            };
                            this.resourceDataList.push(resourceAll);
                        }else{
                            this.$message.error(result.msg);
                        }
                    })
                    .catch(error => {
                        this.$alert(error,"警告",{
                            confirmButtonText: "确定"
                        })
                    })
            }
        },
        //订单列表
        bookOrderList(){
            if(this.inquireCheckIn == null){
                this.inquireCheckIn = [];
            }
            const params = {
                dealStatus: this.inquireStatus,
                orderCode: this.inquireOrderCode,
                cusName: this.inquireUserName,
                cusPhone: this.inquireUserPhone,
                hotelId: this.inquireHotel,
                resourceId: this.inquireResource,
                arrivalStartDate: this.inquireCheckIn[0],
                arrivalEndDate: this.inquireCheckIn[1],
                writeOffStatus: this.inquireIsVerification,
                pageNo: this.pageNum,
                pageSize: 10
            };
            // console.log(params);
            this.$api.bookOrderList(params)
                .then(response => {
                    // console.log(response);
                    const result = response.data;
                    if(result.code == '0'){
                        this.orderDataList = result.data.records;
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
            this.bookOrderList();
            this.$store.commit('setSearchList',{
                inquireStatus: this.inquireStatus,
                inquireOrderCode: this.inquireOrderCode,
                inquireUserName: this.inquireUserName,
                inquireUserPhone: this.inquireUserPhone,
                inquireHotel: this.inquireHotel,
                inquireResource: this.inquireResource,
                inquireCheckIn: this.inquireCheckIn,
                inquireIsVerification:this.inquireIsVerification
            })
        },
        //页面跳转
        current(){
            this.pageNum = this.currentPage;
            this.bookOrderList();
        },
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.bookOrderList();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.bookOrderList();
        },
        //处理、查看详情
        bookOrderDetail(id){
            this.$router.push({name: 'LonganBookOrderDetail', query: {id}});
        },
    }
}
</script>

<style lang="less" scoped>
.orderlist{
    .pagination{
        margin-top: 20px;
    }
}
</style>
