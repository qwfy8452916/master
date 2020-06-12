<template>
    <div>
        <el-form :inline="true" align=left class="searchform">
            <el-form-item label="酒店名称：" prop="hotelId">
                <el-select
                    v-model="hotelId"
                    filterable
                    remote
                    :loading="loadingH"
                    :remote-method="remoteHotel"
                    @focus="getHotelList()"
                    placeholder="请选择酒店">
                    <el-option
                        v-for="item in hotelList"
                        :key="item.id"
                        :label="item.hotelName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="统计时间">
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
            <el-table-column fixed label="酒店" min-width="100" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.hotelName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分销推广员数量" min-width="80" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.promoterCounts}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分销管理员数量" min-width="100" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.managerCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分享次数" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分享访问次数" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareVisitCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="售出商品数量" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.saleProdCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单数量" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.orderCount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="订单金额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.orderAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分享奖励总额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareBonus}}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理奖励总额" align=center>
                <template slot-scope="scope">
                    <span>{{scope.row.shareManageBonus}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align=center>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="empShareTotal(scope.$index, CabinetList)">员工分销统计</el-button>
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
            hotelId:"",
            hotelList:[],
            dateRange:[],
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
        this.getHotelList()
        this.Getdata()
    },
    methods: {
        resetFunc(){
            this.hotelId = ''
            this.dateRange = []
            this.Getdata();
        },
        empShareTotal(index,row){
            let guiId=row[index].hotelId
            this.$router.push({name:'LonganEmpRetailRecord',query:{modifyid: guiId}});
        },
        //查询
        inquire(){
            this.pageNum = 1
            this.Getdata();
            this.$store.commit('setSearchList',{
                hotelId: this.hotelId,
                dateRange: this.dateRange,
            })
        },
       
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
                hotelId:  this.hotelId,
                censusTimeFrom:  this.dateRange[0],
                censusTimeTo:  this.dateRange[1],
                pageNo: this.pageNum,
                pageSize: this.pageSize,
            }
            this.$api.hotelShareTotal(params).then(response => {
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

