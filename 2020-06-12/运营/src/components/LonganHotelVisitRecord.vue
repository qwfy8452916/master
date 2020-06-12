<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="分享人类型：">
                <el-select v-model="shareUserType" placeholder="请选择分享人类型">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="1" label="员工"></el-option>
                    <el-option value="2" label="顾客"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享人ID：">
                <el-input v-model="shareUserId" placeholder="请输入分享人ID"></el-input>
            </el-form-item>
            <el-form-item label="酒店名称：">
                <el-select
                    v-model="hotelId"
                    filterable
                    remote
                    :remote-method="remoteHotel"
                    :loading="loadingH"
                    @focus="getHotelList()"
                    placeholder="请选择">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分享日期">
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
            <el-form-item>
                <resetButton @resetFunc='resetFunc'/>
            </el-form-item>
        </el-form>
        <el-table :data="CabinetList" border stripe style="width:100%;" >
            <el-table-column fixed prop="shareRecordId" label="分享记录ID" align=center></el-table-column>
            <el-table-column label="分享人类型" align=center>
                <template slot-scope="scope">
                    <span v-if="scope.row.shareUserType == 1">员工</span>
                    <span v-if="scope.row.shareUserType == 2">顾客</span>
                </template>
            </el-table-column>
            <el-table-column prop="shareUserId" label="分享人ID" align=center></el-table-column>
            <el-table-column prop="shareUserName" label="分享人名称" align=center></el-table-column>
            <el-table-column prop="shareUserMobile" label="分享人手机号" align=center></el-table-column>
            <el-table-column prop="shareTime" label="分享时间" align=center></el-table-column>
            <el-table-column prop="hotelName" label="酒店" align=center></el-table-column>
            <el-table-column prop="userId" label="访问人ID" align=center></el-table-column>
            <el-table-column prop="userName" label="访问人昵称" align=center></el-table-column>
            <el-table-column prop="userMobile" label="访问人手机号" align=center></el-table-column>
            <el-table-column prop="visitTime" label="访问时间" align=center></el-table-column>
            <el-table-column prop="prodSaleCount" label="售出商品数量" align=center></el-table-column>
            <el-table-column prop="orderCount" label="订单数量" align=center></el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" align=center></el-table-column>
            <el-table-column prop="shareBonus" label="分享奖励" align=center></el-table-column>
            <el-table-column prop="shareManageBonus" label="管理奖励" align=center></el-table-column>
        </el-table>
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
import resetButton from './resetButton'
export default {
    name: 'LaunchCabinetManagement',
    components:{
        resetButton
    },
    data() {
        return{
            authzData: '',
            CabinetList:[],
            loadingH: false,
            hotelId:'',
            hotelList:[],
            shareUserId:'',
            dateRange:[],
            shareUserType:'',
            shareCode:'',
            pageSize:10,   //每页显示条数
            pageTotal: 1,   //默认总条数
            pageNum: 1, //当前页码
        }
    },
    created() {
    //    this.oprOgrId=localStorage.orgId
        (this.$control.jurisdiction(this,3)).then(response=>{this.authzData=response}).catch(err=>{this.authzData=err})
    },
    mounted(){
        if(JSON.stringify(this.$store.state.searchList) != '{}'){
            for(var item in this.$store.state.searchList){
                this[item] = this.$store.state.searchList[item]
            }
        }
        this.shareCode = this.$route.query.modifyid;
        this.getHotelList()
        this.Getdata()
    },
    methods: {

        resetFunc(){
            this.hotelId = ''
            this.shareUserId = ''
            this.shareUserType = ''
            this.dateRange = []
            this.Getdata();
        },
       
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                shareUserId: this.shareUserId,
                shareUserType: this.shareUserType,
                dateRange: this.dateRange,
            })
        },
       
        // //详情
        // CabinetglManager(index,row){
        //     let guiId=row[index].id
        //     this.$router.push({name:'LonganEmployeeReDetail',query:{modifyid: guiId}});
        // },
        //当前页码
        current(){
            // this.pageNum = this.currentPage;
            this.Getdata();
        },
        //酒店列表
        getHotelList(hName){
            this.loadingH = true;
            const params = {
                orgAs: 2,
                pageNo:1,
                hotelName: hName,
                pageSize:50
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
                        this.hotelList.unshift({
                            id: '',
                            hotelName: '全部'
                        })
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
        
        Getdata(){ 
            let that=this;
            let params = {
                hotelId: this.hotelId,
                shareUserId: this.shareUserId,
                shareUserType: this.shareUserType,
                shareTimeFrom: this.dateRange == null ? undefined : this.dateRange[0],
                shareTimeTo: this.dateRange == null ? undefined : this.dateRange[1],
                shareCode:this.shareCode,
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.selHotelVisitRecords({params}).then(response => {
                if(response.data.code == 0){
                    that.CabinetList = response.data.data.records;
                    that.pageTotal = response.data.data.total;
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

