<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="活动名称">
                <el-select
                    filterable
                    remote
                    :remote-method="remoteActName"
                    @focus="getActList()"
                    :loading="loadingH"
                    v-model="activityName"
                    placeholder="请选择活动名称">
                    <el-option
                        v-for="item in activityList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动类型">
                <el-select 
                    v-model="activityType"
                    :loading="loadingH"
                    placeholder="请选择活动类型">
                    <el-option v-for="item in activityTypeList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="酒店名称">
                <el-select
                    filterable
                    remote
                    :loading="loadingH"
                    :remote-method="remoteCabType"
                    @focus="getHotelList()"
                    v-model="hotelId"
                    placeholder="请选择酒店名称">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参与人id">
                <el-input v-model="partInId" placeholder="请输入参与人Id"></el-input>
            </el-form-item>
            <el-form-item label="参与人昵称">
                <el-input v-model="partInName" placeholder="请输入参与人昵称"></el-input>
            </el-form-item>
            <el-form-item label="参与时间">
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>  
            <el-form-item>
                <el-button type="primary" @click="inquire">查&nbsp;&nbsp;询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="actName" label="活动名称" align=center></el-table-column>
            <el-table-column prop="actTypeName" label="活动类型" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店名称" align=center></el-table-column>
            <el-table-column prop="customerId" label="参与id" align=center></el-table-column>
            <el-table-column prop="customerNickName" label="参与人昵称" align=center></el-table-column>
            <el-table-column prop="partInTime" label="参与时间" align=center>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="viewDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
         <el-dialog title="查看详情(新人大礼包)" :visible.sync="dialogRecordVisible" width="56%">
            <el-table :data="getRecordData">
                <el-table-column prop="couponName" width="320px" label="券名称" align=center></el-table-column>
                <el-table-column label="使用门槛" align=center>
                    <template slot-scope="scope">
                        {{'满' + scope.row.useLimitMoney + '减' + scope.row.reduceMoney}}
                    </template>
                </el-table-column>
                <el-table-column prop="reduceMoney" label="券金额" align=center></el-table-column>
                <el-table-column label="使用期限" width="200px" align=center>
                    <template slot-scope="scope">
                        {{(scope.row.couponStartDate=='1970-01-01'?'-':scope.row.couponStartDate) + ' 至 ' + (scope.row.couponEndDate=='1970-01-01'?'-':scope.row.couponEndDate)}}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :pager-count = "11"
                :page-size="10"
                :total="pageTotal"
                :current-page.sync="pageNum"
                @current-change = "current"
                @prev-click="prev"
                @next-click="next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LaunchCabinetManagement',
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            activityName:'',
            hotelList:[],
            activityList:[],
            hotelId:'',
            partInName:'',
            getRecordData:[],
            partInId:'',
            dialogRecordVisible:false,
            activityTypeList:[],
            activityType:'',
            dateRange:[],
            
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
        }
    },
    created() {
        // this.getHotelList();
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        this.Getdata()
        this.getHotelList()
        this.getActList()
    },
    methods: {
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
        },
        //查看详情
        viewDetail(index){
            let guiId=index
            this.dialogRecordVisible = true;
            this.GetDetaildata(guiId)
        },
        getActTypeList(){
            this.$api.basicDataItems({key:'ACTTYPE',orgId:0}).then(response => {
                if(response.data.code==0){
                    this.activityTypeList = response.data.data.map(item => {
                        return {
                            id: item.dictValue,
                            label: item.dictName
                        }
                    })
                    this.activityTypeList.unshift({
                        id: '',
                        label: '全部'
                    })
                    this.CabinetList.forEach((item,index) => {
                        this.activityTypeList.forEach(key => {
                            if(key.id == item.actType){
                                this.$set(this.CabinetList[index],'actTypeName',key.label)
                            }
                        })
                    })
                }else{
                    this.$alert(response.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                this.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        //当前页码
        current(){
            // this.pageNum = this.currentPage;
            this.Getdata();
        },
        remoteCabType(val){
            this.getHotelList(val);
        },
        remoteActName(val){
            this.getActList(val);
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
        //活动列表
        getActList(hName){
            this.loadingH = true;
            const params = {
                actName : hName,
                pageNo: 1,
                pageSize: 50
            };
            this.$api.selectActivity({params})
                .then(response => {
                    this.loadingH = false;
                    const result = response.data;
                    if(result.code == 0){
                        this.activityList = result.data.records.map(item => {
                            return{
                                id: item.id,
                                hotelName: item.actName
                            }
                        })
                        const hotelAll = {
                            id: '',
                            hotelName: '全部'
                        };
                        this.activityList.unshift(hotelAll);
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
        //上一页
        prev(){
            this.pageNum = this.pageNum - 1;
            this.Getdata();
        },
        //下一页
        next(){
            this.pageNum = this.pageNum + 1;
            this.Getdata();
        },
        // //获取数据
        // ifEmpty(item){
        //     if(item === ''){
        //         return undefined;
        //     }else{
        //         return item;
        //     }
        // },
        Getdata(){ 
            let that=this;
            let params = {
                actId: this.activityName,
                actType: this.activityType,
                customerId: this.partInId,
                customerNickName: this.partInName,
                hotelId: this.hotelId,
                partInTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
                partInTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.getActivityRecords({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
                    that.pageTotal = response.data.data.total;
                    this.getActTypeList()
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
        getTime(time){
            var date = new Date(time)
            var year = date.getFullYear()  
            var month = this.getDoubleNum(date.getMonth()+1)
            var day = this.getDoubleNum(date.getDate())
            console.log(year);
            return year + '-' + month + '-'  + day
        },
        getDoubleNum(item){
            return item < 10 ? '0' + item : item;
        },
        GetDetaildata(id){ 
            let that=this;
            this.$api.getRecordsDetail(id).then(response => {
                if(response.data.code == 0){
                    that.getRecordData = JSON.parse(response.data.data.detail);
                    console.log(that.getRecordData);
                    that.getRecordData.forEach(item => {
                        item.couponStartDate = this.getTime(item.couponStartDate)
                        item.couponEndDate = this.getTime(item.couponEndDate)
                    })
                }else{
                    that.$alert(response.data.data.msg,"警告",{
                        confirmButtonText: "确定"
                    })
                }
            })
            .catch(error => {
                that.$alert(error,"警告",{
                    confirmButtonText: "确定"
                })
            })
        },
    }
}
</script>

<style lang="less" scoped>
.pagination{
    margin-top: 20px;
}
</style>

